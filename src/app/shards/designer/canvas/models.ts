export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Size {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export interface Tool {
    name: string;
    id: string;
    parent?: Tool;
    useTool(point: Point);
}

export interface Rectangle{
    point: Point;
    size: Size;
}
