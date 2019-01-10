'use strict';
import Point from './Point.js';
import Region from './Region.js';
import Particle from './Particle.js';


export  class B {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.canvas.height = 500;
        this.canvas.width = 500;
        this.ctx = this.canvas.getContext('2d');
        this.socket = new WebSocket('ws://localhost:3000');
        this.allowOverlap = false;
        this.regions = this.generateRegions();
        this.history = [];
        this.particles = [];

        this.socket.onmessage = (message) => {
            const messageData = JSON.parse(message.data);
            if(messageData.type === 'replay') {
                this.history = []; // reset history
                this.handleReplay(messageData.history);
            } else {
                this.history.push(messageData);
                this.updateRegions(messageData);
                this.drawTrail(messageData);
                this.renderTable();

            }
        };

        this.drawRegions();
        this.renderTable();

    }
    /* Using a queue to get the timing right */
    handleReplay(playback) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
        if(playback.length === 0 ) return;
        const point = playback.shift(); // remove playback[0] from array
        this.history.push(point);
        this.updateRegions(point);
        this.drawTrail(point);

        return setTimeout(() => { this.handleReplay((playback)) }, 10);
    }

    createTrail() {
        this.particles.forEach(particle => {
            particle.draw(this.canvas);
        })
    }

    drawTrail(payload) {
        for(let i = 0; i < 3; i++){
            const p = new Particle(payload.x, payload.y);
            this.particles.push(p);
        }
    }

    requestReplay() {
        const payload = JSON.stringify({ type: 'replay'});
        this.socket.send(payload);
    }
    generateRegions() {
        const regions = [];
        for (let i = 0; i < 10; i++) {
            const xPoint = this.randomBetween(0, this.canvas.height);
            const yPoint = this.randomBetween(0, this.canvas.width);
            const width = this.randomBetween(10, 300);
            const length = this.randomBetween(10, 300);
            const newRegion = new Region(new Point(xPoint, yPoint), new Point(xPoint + length, yPoint + width));
            if(this.allowOverlap || !regions.some((region) => region.isOverlapping(newRegion)) ) {
                regions.push(newRegion);
            } else {
                i--;
            }
        }
        return regions;
    }
    drawRegions() {
        this.regions.forEach(region => {
            this.ctx.lineWidth = 1;
            if (region.isActive) {
                this.ctx.strokeStyle = 'red';
            } else {
                this.ctx.strokeStyle = 'black';
            }
            this.ctx.strokeRect(
                region.p1.x + 0.5,
                region.p1.y + 0.5,
                region.p2.x - region.p1.x - 1,
                region.p2.y - region.p1.y - 1
            );
        });
    }
    updateRegions(point = null) {
        this.regions.forEach(region => {
            if(point != null) region.isActive = region.isCursorInside(point);
            region.history = this.history.filter(p => region.isCursorInside(p));
            region.updateCurrentSpeed();
            region.updateAverageSpeed();
        });

        this.drawRegions();
        this.renderTable();


    }
    randomBetween(start, end) {
        return Math.floor(Math.random() * end) + start;
    }
    renderTable() { // TODO: might be a way to modify row instead of wiping and appending.
        const table = document.getElementById('myTable');
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
        this.regions.forEach((region, index) => {
            const newRow = table.insertRow(-1);
            newRow.insertCell(0).appendChild(document.createTextNode(index));
            newRow.insertCell(1).appendChild(document.createTextNode(region.isActive));
            newRow.insertCell(2).appendChild(document.createTextNode(region.currentSpeed));
            newRow.insertCell(3).appendChild(document.createTextNode(region.averageSpeed));
        })
    }
}
/* init code */
const myApp = new B();

function animate() {
    myApp.ctx.clearRect(0,0, myApp.canvas.width,myApp.canvas.height );
    myApp.createTrail();
    myApp.drawRegions();
    window.requestAnimationFrame(animate);
}
animate();

document.getElementById('replay').addEventListener('click', () => myApp.requestReplay());
document.getElementById('overlap').addEventListener('click', () => {
    myApp.allowOverlap = !myApp.allowOverlap;
    myApp.regions = myApp.generateRegions();
    myApp.updateRegions();
    myApp.renderTable();
});