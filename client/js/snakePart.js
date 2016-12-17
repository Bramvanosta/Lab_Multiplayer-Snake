'use strict';

import * as config from './config';

export default class SnakePart {

    constructor(context, x, y, color) {
        this.context = context;

        this.x = x;
        this.y = y;

        this.color = color;

        this.width = config.SNAKE_WIDTH;
        this.height = config.SNAKE_HEIGHT;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }

    remove() {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = config.CANVAS_COLOR;
        this.context.fill();
        this.context.closePath();
    }

}