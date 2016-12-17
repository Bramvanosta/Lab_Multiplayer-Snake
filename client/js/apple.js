'use strict';

import * as config from './config';

export default class Apple {

    constructor(context, x, y) {
        this.context = context;
        this.x = x !== undefined ? x : Math.floor(Math.random() * config.CANVAS_WIDTH / config.GRID_SIZE) * config.GRID_SIZE + config.GRID_SIZE / 2;
        this.y = y !== undefined ? y : Math.floor(Math.random() * config.CANVAS_HEIGHT / config.GRID_SIZE) * config.GRID_SIZE + config.GRID_SIZE / 2;
        this.radius = config.APPLE_RADIUS;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = config.APPLE_COLOR;
        this.context.fill();
        this.context.closePath();
    }

    remove() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = config.CANVAS_COLOR;
        this.context.fill();
        this.context.closePath();
    }

}