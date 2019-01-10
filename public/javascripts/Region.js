'use strict';
import Rectangle from './Rectangle.js';

export default class Region extends Rectangle {
    constructor(p1, p2) {
        super(p1, p2);
        this.isActive = false;
        this.currentSpeed = 0;
        this.averageSpeed = 0;
        this.history = [];
        this.speedHistory = [];
    }

    isCursorInside(cursor) {
        return (cursor.x >= this.p1.x &&
            cursor.x <= this.p2.x &&
            cursor.y >= this.p1.y &&
            cursor.y <= this.p2.y);
    }

    updateAverageSpeed() {
        // Sum of all speed logs, divided by length, 0 as fallback
        this.averageSpeed = Math.round(this.speedHistory.reduce((acc, curr) => acc + curr, 0) / this.speedHistory.length) || 0;
    }

    updateCurrentSpeed() {
        if (!this.isActive || this.history.length <= 1) {
            this.currentSpeed = 0; // Resets currrent speed when not active, and edge case
            return;
        }
        const lastTwoPoints = this.history.slice(-2);

        // get the distance between the last two points
        const xDistance = lastTwoPoints[1].x - lastTwoPoints[0].x;
        const yDistance = lastTwoPoints[1].y - lastTwoPoints[0].y;


        const d = Math.hypot(xDistance, yDistance);
        const t = (lastTwoPoints[1].timestamp - lastTwoPoints[0].timestamp) / 1000; // calculates by the second.

        this.currentSpeed = Math.round(d / t); // speed = distance / time (px/s)
        this.speedHistory.push(this.currentSpeed); // log this instance for moving average

    }
}
