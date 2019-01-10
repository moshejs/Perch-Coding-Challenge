'use strict';
export default class Rectangle {

    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    checkOverlap(a, b) {
        return !(a.p1.x > b.p2.x ||
            b.p1.x > a.p2.x ||
            a.p1.y > b.p2.y ||
            b.p1.y > a.p2.y);
    }

    isOverlapping(r) {
        return this.checkOverlap(this, r) || this.checkOverlap(r, this);
    }

}