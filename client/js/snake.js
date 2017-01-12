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
        this.addBodyPart();
        this.addBodyPart();
        this.addBodyPart();
    }

    drawSnake() {
        let firstBodyPart = this.bodyParts[0];
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

    moveBodyPartsInArray() {
        this.bodyParts.splice(0, 0, this.bodyParts.splice(this.bodyParts.length - 1, 1)[0]);
    }

    updateSnakeCoordinates() {
        if (this.direction === 'right') {
            this.x = this.x + config.SNAKE_WIDTH + config.BODY_PART_MARGIN;
            if (this.x >= config.CANVAS_WIDTH) {
                this.x = 0;
            }
            let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
            let firstBodyPart = this.bodyParts[0];

            lastBodyPart.y = firstBodyPart.y;
            lastBodyPart.x = firstBodyPart.x + config.SNAKE_WIDTH + config.BODY_PART_MARGIN;

            if (lastBodyPart.x >= config.CANVAS_WIDTH) {
                lastBodyPart.x = 0;
            }

            this.moveBodyPartsInArray();
        }
        else if (this.direction === 'down') {
            this.y = this.y + config.SNAKE_HEIGHT + config.BODY_PART_MARGIN;
            if (this.y + config.SNAKE_HEIGHT >= config.CANVAS_HEIGHT - config.BODY_PART_MARGIN) {
                this.y = 0;
            }
            let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
            let firstBodyPart = this.bodyParts[0];

            lastBodyPart.y = firstBodyPart.y + config.SNAKE_HEIGHT + config.BODY_PART_MARGIN;
            lastBodyPart.x = firstBodyPart.x;

            if (firstBodyPart.y + config.SNAKE_HEIGHT >= config.CANVAS_HEIGHT - config.BODY_PART_MARGIN) {
                lastBodyPart.y = 0;
            }

            this.moveBodyPartsInArray();

        }
        else if (this.direction === 'up') {
            this.y = this.y - config.SNAKE_HEIGHT - config.BODY_PART_MARGIN;
            if (this.y <= 0) {
                this.y = config.CANVAS_HEIGHT - (config.SNAKE_HEIGHT + config.BODY_PART_MARGIN);
            }
            let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
            let firstBodyPart = this.bodyParts[0];

            lastBodyPart.y = firstBodyPart.y - config.SNAKE_HEIGHT - config.BODY_PART_MARGIN;
            lastBodyPart.x = firstBodyPart.x;

            if (firstBodyPart.y <= 0) {
                lastBodyPart.y = config.CANVAS_HEIGHT - (config.SNAKE_HEIGHT + config.BODY_PART_MARGIN);
            }

            this.moveBodyPartsInArray();
        }
        else if (this.direction === 'left') {
            this.x = this.x - config.SNAKE_WIDTH - config.BODY_PART_MARGIN;
            if (this.x <= 0) {
                this.x = config.CANVAS_WIDTH - (config.SNAKE_WIDTH + config.BODY_PART_MARGIN);
            }
            let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
            let firstBodyPart = this.bodyParts[0];

            lastBodyPart.y = firstBodyPart.y;
            lastBodyPart.x = firstBodyPart.x - config.SNAKE_WIDTH - config.BODY_PART_MARGIN;

            if (firstBodyPart.x <= 0) {
                lastBodyPart.x = config.CANVAS_WIDTH - (config.SNAKE_WIDTH + config.BODY_PART_MARGIN);
            }

            this.moveBodyPartsInArray();
        }
    }

    move(snake) {
        let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
        lastBodyPart.remove();

        lastBodyPart.x = snake.bodyParts[snake.bodyParts.length - 1].x;
        lastBodyPart.y = snake.bodyParts[snake.bodyParts.length - 1].y;
        lastBodyPart.draw();

        this.moveBodyPartsInArray();
    }

}