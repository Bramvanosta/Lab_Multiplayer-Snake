'use strict';

import * as config from './config';
import Player from './player';
import Apple from './apple';

export default class Board {

    constructor() {
        this.players = [];
        this.apples = [];
    }

    instantiateCanvas() {
        let canvas = document.getElementById('canvas');
        canvas.width = config.CANVAS_WIDTH;
        canvas.height = config.CANVAS_HEIGHT;

        this.context = canvas.getContext('2d');

        this.context.fillStyle = config.CANVAS_COLOR;
        this.context.fillRect(0, 0, config.CANVAS_WIDTH, config.CANVAS_HEIGHT);
    }

    getAvailableColor() {
        let colorsInUse = this.players.map(function (player) {
            return player.snake.color;
        });

        return config.COLORS.find(function (color) {
            if (!colorsInUse.includes(color)) {
                return color;
            }
        });
    }

    addPlayer(id, name, color, startX, startY) {
        let player = new Player(this.context, id, name, color, startX, startY);
        this.players.push(player);

        return player;
    }

    removePlayer(id) {
        return this.players.filter((player, index) => {
            if (player.id === id) {
                this.players.splice(index, 1);
                return true;
            }
        });
    }

    checkNumberOfApples(io) {
        while (this.apples.length < config.MAX_APPLES_ON_FIELD) {
            let apple = this.addApple();
            io.emit('newAppleGenerated', apple);
        }
    }

    addApple(x, y) {
        let apple = new Apple(this.context, x, y);
        this.apples.push(apple);

        return apple;
    }
}