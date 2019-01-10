'use strict';
import Point from './Point.js';

export default class Particle extends Point{
    constructor(x, y) {
        super(x,y);
        this.dy = 1 + (Math.random()*3);
        this.dx = -1 + (Math.random()*2);
        this.color = this.randomColor();
        this.size = 2 + Math.floor(Math.random()*8);
        this.alpha = 0.5;
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.update();
    }


    update() {
        this.y += this.dy;
        this.x += this.dx;
        this.alpha -= 0.03;
        this.color = this.color.replace(/[^,]+(?=\))/, this.alpha); // regex to update alpha code

        }

    randomColor(){
        const r = 50+(Math.floor(Math.random()*205));
        const g = 0;
        const b = 50+(Math.floor(Math.random()*205));
        return "rgba(" + r + "," + g + "," + b + ", " + this.alpha + ")";
    }
}