import { Point } from '../canvas/models/point';
class WithinBoundsResponse {
    canContain = false;
    tooWide = false;
    tooHigh = false;
}

class Rectangle {
    point: Point;
    height: number;
    width: number;

    constructor(point: Point, width: number, height: number) {
        this.point = point;
        this.width = width;
        this.height = height;
    }

    // getBounds() {

    // }

    // bounds(other: Rectangle): WithinBoundsResponse {
    //     return <WithinBoundsResponse>{
    //         canContain: (other.width <= this.width) && (other.height <= this.height),
    //         tooWide: other.width > this.width,
    //         tooHigh: other.height > this.height
    //     };
    // }

    // fillsSpace(other: Rectangle) {
    //     return (other.width === this.width && other.height === this.height);
    // }

    // private getDistance(p1: number, p2: number): number {
    //     return Math.abs(Math.max(p1, p2) - Math.min(p1, p2));
    // }
}

class Quad {
    boundry: Rectangle;
    capicity: number;
    points: Point[];

    topLeft: Quad | undefined;
    topRight: Quad | undefined;
    bottomLeft: Quad | undefined;
    bottomRight: Quad | undefined;

    constructor(boundry: Rectangle, capicity: number = 1) {
        this.boundry = boundry;
        this.capicity = capicity;
        this.points = [];
    }

    insert(p: Point) {
        if (this.points.length < this.capicity) {

        }
        else {
            this.divide();
        }
    }

    divide() {
        // let tlRect: Rectangle = new Rectangle();
    }
}


// // Can the rectangle fit here?
// if (this.fitsHere(rectangle)) {
//     // does this have sub sections?
//     if (this.subSections !== undefined) {

//     }
//     // no sub-sections
//     else {
//         // can I fill this entire space?
//         if (this.fillsSpace(rectangle)) {
//             this.rectangle = rectangle;
//             // all done with this section
//             this.isFull = true;
//         }
//         else {
//             // create subsection and add to newly created array
//             this.subSections = [];
//             this.subSections.push(new Section(rectangle));
//         }
//     }

//     // it has been added
//     return true;
// }

// //wrong size for this section
// return false;


// insertPoint(point: dPoint) {
//     // Can I be here?
//     if (this.boundry.containspoint(point)) {
//         // Oh, I belong in this area? Sweet! Could I please stay here? If there's enough room of course.
//         if (this.points.length < this.pointCapicity) {
//             // Yes? Really?! Oh to be home! I've found myself! I am saved!! Oh Happy days!
//             this.points.push(point);
//         }
//         else {
//             // Oh, there's not enough room for me? have you tried sub areas?
//             if (!this.divided) {
//                 // let's divide this area up!
//                 this.divideArea(point);
//             }
//             else {
//                 // ???
//             }
//         }
//     }
//     else {
//         // No? Okay I'll get out of here, thank you!
//         return;
//     }
// }



