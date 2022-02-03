import { DisplayTransform } from './display-transform';

/*
    adapted from
        https://stackoverflow.com/questions/33925012/how-to-pan-the-canvas?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    because mine sucked
*/
export class MouseData {
    x: number = 0;
    y: number = 0;
    w: number = 0;
    alt: boolean = false;
    shift: boolean = false;
    ctrl: boolean = false;
    buttonLastRaw: number = 0; // user modified value
    buttonRaw: number = 0;
    over: boolean = false;
    buttons: number[] = [1, 2, 4, 6, 5, 3]; // masks for setting and clearing button raw bits;

    constructor() { }
}

export class Pan {
    private mouse: MouseData;

    private timer = 0;
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private displayTransform: DisplayTransform;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.canvas = this.context.canvas;
        // this.mouse = new MouseData();

        this.displayTransform = new DisplayTransform(this.context);
        // this.setupMouse(this.canvas);
    }

    mouseMove(event: any) {

        if (!this.mouse) {
            this.mouse = new MouseData();
        }

        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
        if (this.mouse.x === undefined) {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        }
        this.mouse.alt = event.altKey;
        this.mouse.shift = event.shiftKey;
        this.mouse.ctrl = event.ctrlKey;

        if (event.type === 'mousedown') {
            event.preventDefault();
            this.mouse.buttonRaw |= this.mouse.buttons[event.which - 1];
        } else if (event.type === 'mouseup') {
            this.mouse.buttonRaw &= this.mouse.buttons[event.which + 2];
        } else if (event.type === 'mouseout') {
            this.mouse.buttonRaw = 0;
            this.mouse.over = false;
        } else if (event.type === 'mouseover') {
            this.mouse.over = true;
        } else if (event.type === 'mousewheel') {
            event.preventDefault();
            this.mouse.w = (<WheelEvent>event).deltaY;
        } else if (event.type === 'DOMMouseScroll') { // FF you pedantic doffus
            this.mouse.w = -event.detail;
        }
    }

    setupMouse(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousemove', this.mouseMove);
        canvas.addEventListener('mousedown', this.mouseMove);
        canvas.addEventListener('mouseup', this.mouseMove);
        canvas.addEventListener('mouseout', this.mouseMove);
        canvas.addEventListener('mouseover', this.mouseMove);
        canvas.addEventListener('mousewheel', this.mouseMove);
        canvas.addEventListener('DOMMouseScroll', this.mouseMove); // fire fox

        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        }, false);
    }


    draw() {
        this.timer += 1; // update timere
        // update the transform
        this.displayTransform.update(this.mouse);
        // set home transform to clear the screem
        // this.displayTransform.setHome();

        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.displayTransform.setTransform();

        if (this.mouse.buttonRaw === 4) { // right click to return to homw
            this.displayTransform.x = 0;
            this.displayTransform.y = 0;
            this.displayTransform.scale = 1;
            this.displayTransform.rotate = 0;
            this.displayTransform.ox = 0;
            this.displayTransform.oy = 0;
        }
    }
}
