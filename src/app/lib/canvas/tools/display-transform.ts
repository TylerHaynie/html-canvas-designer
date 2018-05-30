/*
    adapted from
        https://stackoverflow.com/questions/33925012/how-to-pan-the-canvas?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    because mine sucked

    terms:
        Real space, real, r (prefix) refers to the transformed canvas space.
        c (prefix), chase is the value that chases a required value
*/

export class DisplayTransform {
    x: number = 0;
    y: number = 0;
    ox: number = 0;
    oy: number = 0;
    scale: number = 1;
    rotate: number = 0;
    cx: number = 0;  // chase values Hold the actual display
    cy: number = 0;
    cox: number = 0;
    coy: number = 0;
    cscale: number = 1;
    crotate: number = 0;
    dx: number = 0;  // deltat values
    dy: number = 0;
    dox: number = 0;
    doy: number = 0;
    dscale: number = 1;
    drotate: number = 0;
    drag: number = 0.1;  // drag for movements
    accel: number = 0.7; // acceleration
    matrix: number[] = [0, 0, 0, 0, 0, 0]; // main matrix
    invMatrix: number[] = [0, 0, 0, 0, 0, 0]; // invers matrix;
    mouseX: number = 0;
    mouseY: number = 0;
    ctx: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;
    }

    setTransform() {
        let m = this.matrix;
        let i = 0;
        this.ctx.setTransform(m[i++], m[i++], m[i++], m[i++], m[i++], m[i++]);
    }

    setHome() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

    update(mouse) {
        // smooth all movement out. drag and accel control how this moves
        // acceleration
        this.dx += (this.x - this.cx) * this.accel;
        this.dy += (this.y - this.cy) * this.accel;
        this.dox += (this.ox - this.cox) * this.accel;
        this.doy += (this.oy - this.coy) * this.accel;
        this.dscale += (this.scale - this.cscale) * this.accel;
        this.drotate += (this.rotate - this.crotate) * this.accel;

        // drag
        this.dx *= this.drag;
        this.dy *= this.drag;
        this.dox *= this.drag;
        this.doy *= this.drag;
        this.dscale *= this.drag;
        this.drotate *= this.drag;

        // set the chase values. Chase chases the requiered values
        this.cx += this.dx;
        this.cy += this.dy;
        this.cox += this.dox;
        this.coy += this.doy;
        this.cscale += this.dscale;
        this.crotate += this.drotate;

        // create the display matrix
        this.matrix[0] = Math.cos(this.crotate) * this.cscale;
        this.matrix[1] = Math.sin(this.crotate) * this.cscale;
        this.matrix[2] = - this.matrix[1];
        this.matrix[3] = this.matrix[0];

        // set the coords relative to the origin
        this.matrix[4] = -(this.cx * this.matrix[0] + this.cy * this.matrix[2]) + this.cox;
        this.matrix[5] = -(this.cx * this.matrix[1] + this.cy * this.matrix[3]) + this.coy;


        // create invers matrix
        let det = (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
        this.invMatrix[0] = this.matrix[3] / det;
        this.invMatrix[1] = - this.matrix[1] / det;
        this.invMatrix[2] = - this.matrix[2] / det;
        this.invMatrix[3] = this.matrix[0] / det;

        // check for mouse. Do controls and get real position of mouse.
        if (mouse !== undefined) {  // if there is a mouse get the real cavas coordinates of the mouse
            if (mouse.oldX !== undefined && (mouse.buttonRaw & 1) === 1) { // check if panning (middle button)
                let mdx = mouse.x - mouse.oldX; // get the mouse movement
                let mdy = mouse.y - mouse.oldY;
                // get the movement in real space
                let mrx = (mdx * this.invMatrix[0] + mdy * this.invMatrix[2]);
                let mry = (mdx * this.invMatrix[1] + mdy * this.invMatrix[3]);
                this.x -= mrx;
                this.y -= mry;
            }
            // do the zoom with mouse wheel
            if (mouse.w !== undefined && mouse.w !== 0) {
                this.ox = mouse.x;
                this.oy = mouse.y;
                this.x = this.mouseX;
                this.y = this.mouseY;
                /* Special note from answer */
                // comment out the following is you change drag and accel
                // and the zoom does not feel right (lagging and not
                // zooming around the mouse
                /*
                this.cox = mouse.x;
                this.coy = mouse.y;
                this.cx = this.mouseX;
                this.cy = this.mouseY;
                */
                if (mouse.w > 0) { // zoom in
                    this.scale *= 1.1;
                    mouse.w -= 20;
                    if (mouse.w < 0) {
                        mouse.w = 0;
                    }
                }
                if (mouse.w < 0) { // zoom out
                    this.scale *= 1 / 1.1;
                    mouse.w += 20;
                    if (mouse.w > 0) {
                        mouse.w = 0;
                    }
                }

            }
            // get the real mouse position
            let screenX = (mouse.x - this.cox);
            let screenY = (mouse.y - this.coy);
            this.mouseX = this.cx + (screenX * this.invMatrix[0] + screenY * this.invMatrix[2]);
            this.mouseY = this.cy + (screenX * this.invMatrix[1] + screenY * this.invMatrix[3]);
            mouse.rx = this.mouseX;  // add the coordinates to the mouse. r is for real
            mouse.ry = this.mouseY;
            // save old mouse position
            mouse.oldX = mouse.x;
            mouse.oldY = mouse.y;
        }

    }
}


