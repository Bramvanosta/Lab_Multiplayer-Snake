'use strict';

import * as config from './config';
import SnakePart from './snakePart';

export default class Snake {

    constructor(context, color, x, y) {
        this.context = context;

        this.x = x !== undefined ? x : Math.floor(Math.random() * (config.CANVAS_WIDTH / config.GRID_SIZE)) * config.GRID_SIZE;
        this.y = y !== undefined ? y : Math.floor(Math.random() * (config.CANVAS_HEIGHT / config.GRID_SIZE)) * config.GRID_SIZE;
        this.direction = 'right';

        this.color = color;

        this.bodyParts = [];
    }

    createSnake() {
        let firstBodyPart = this.addBodyPart();
        this.addBodyPart();
        this.addBodyPart();

        firstBodyPart.draw();
    }

    addBodyPart() {
        let snakePart = new SnakePart(this.context, this.x, this.y, this.color);
        this.bodyParts.push(snakePart);

        return snakePart;
    }

    remove() {
        this.bodyParts.forEach(bodyPart => {
            bodyPart.remove();
        });
    }

}