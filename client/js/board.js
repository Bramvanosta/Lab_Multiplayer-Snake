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

    moveSnakes(io) {
        this.players.forEach(player => {
            player.snake.updateSnakeCoordinates();
            io.emit('moveSnake', {playerId: player.id, direction: player.snake.direction});
        })
    }

    changeDirection(id, direction) {
        let playerToChangeDirection = this.players.filter(player => {
            return player.id === id;
        });
        playerToChangeDirection[0].snake.direction = direction;
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

    removeAppleFromArray(index) {
        this.apples.splice(index, 1);
    }

    checkCollisionWithApples(io) {
        this.players.forEach(player => {
            this.apples.forEach((apple, index) => {
                if (player.snake.x < apple.x + apple.radius * 2 &&
                    player.snake.x + config.SNAKE_WIDTH > apple.x &&
                    player.snake.y < apple.y + apple.radius * 2 &&
                    config.SNAKE_HEIGHT + player.snake.y > apple.y) {

                    this.removeAppleFromArray(index);

                    io.emit('snakeWithAppleCollision', {playerId: player.id, x: apple.x, y: apple.y});
                }
            });
        });
    }
}