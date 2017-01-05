'use strict';

import Snake from './snake';

export default class Player {

    constructor(context, id, name, color, startX, startY) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.score = 0;

        this.snake = new Snake(context, color, startX, startY);
    }

    createSnake() {
        this.snake.createSnake();
    }

    drawSnake() {
        this.snake.drawSnake();
    }

    removeSnake() {
        this.snake.remove();
    }

}