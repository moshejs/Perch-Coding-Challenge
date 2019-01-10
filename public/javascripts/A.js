'use strict';
import Particle from './Particle.js';

export class A {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 500;
        this.canvas.width = 500;
        this.socket = new WebSocket('ws://localhost:3000');
        this.wait = false;
        this.particles = [];

        this.canvas.addEventListener('mousemove', e => this.recordCursor(e, Date.now()));
    }
    recordCursor(event, timestamp) {
        const mousemovePayload = {
            x: event.pageX, y: event.pageY, timestamp: timestamp
        };

        if(!this.wait) {
            this.sendToServer(mousemovePayload);
            this.createTrail(mousemovePayload);

            this.wait = true;
            setTimeout(() => { this.wait = false; }, 100);
        }
    }
    sendToServer(payload) {
        const envelope = JSON.stringify({...payload, type: 'cursorLocation'});
        this.socket.send(envelope);
    }

    drawTrail() {
        this.particles.forEach(particle => {
            particle.draw(this.canvas);
        })
    }
    createTrail(payload) {
        for(let i = 0; i < 3; i++){
            const p = new Particle(payload.x, payload.y);
            this.particles.push(p);
        }
    }
}

/* init code */

const myApp = new A();

function animate() {
    myApp.ctx.clearRect(0,0, myApp.canvas.width,myApp.canvas.height );
    myApp.drawTrail();
    window.requestAnimationFrame(animate);
}
animate();