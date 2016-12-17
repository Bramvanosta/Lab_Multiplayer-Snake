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

    drawSnake() {
        this.snake.createSnake();
    }

    removeSnake() {
        this.snake.remove();
    }

}