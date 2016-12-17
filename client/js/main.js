'use strict';

import Game from 'game';
import Board from 'board';

document.addEventListener('DOMContentLoaded', () => {

    let game = new Game();

    game.on('connected', () => {
        console.log('connected');
        document.getElementById('loader').classList.add('is-hidden');
        document.getElementById('login').classList.remove('is-hidden');

        let board = new Board();
        board.instantiateCanvas();

        document.getElementById('login-form').addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let name = document.getElementById('username').value;
            let localPlayer;

            game.askForPlayers();
            game.askForApples();

            game.on('listWithPlayers', players => {
                console.log('old players', players);
                players.forEach(player => {
                    let localPlayerAlreadyInGame = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                    localPlayerAlreadyInGame.drawSnake();
                });
            });

            game.on('listWithApples', apples => {
                console.log('old apples', apples);
                apples.forEach(apple => {
                    let localApplesAlreadyInGame = board.addApple(apple.x, apple.y);
                    localApplesAlreadyInGame.draw();
                });
            });

            game.registerPlayer(name);

            game.on('newPlayerCreated', player => {
                console.log('new player', player);
                localPlayer = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                localPlayer.drawSnake();

                document.getElementById('login').classList.add('is-hidden');
                document.getElementById('board').classList.remove('is-hidden');
            });

            game.on('newAppleGenerated', apple => {
                console.log('new apple', apple);
                let localApple = board.addApple(apple.x, apple.y);
                localApple.draw();
            });

            game.on('newPlayerJoined', player => {
                console.log('new player joined', player);
                let newLocalPlayer = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                newLocalPlayer.drawSnake();
            });

            game.on('playerDisconnected', playerId => {
                console.log('player disconnected', playerId);
                let removedPlayer = board.removePlayer(playerId);
                removedPlayer[0].removeSnake();
            });

            game.on('moveSnake', data => {
                let playerToMove = board.players.filter(player => {
                    return player.id === data.playerId;
                });
                playerToMove[0].snake.direction = data.direction;
                playerToMove[0].snake.move();
            });

            game.on('snakeWithAppleCollision', data => {
                console.log('snake with apple collision');
                board.apples.forEach((apple, index) => {
                    if (apple.x === data.x && apple.y === data.y) {
                        board.removeAppleFromArray(index);
                    }
                });
                let playerToAddScore = board.players.filter(player => {
                    return player.id === data.playerId;
                });
                playerToAddScore[0].score += 1;
                playerToAddScore[0].snake.addBodyPart();
            });

            document.addEventListener('keydown', event => {
                if (event.keyCode === 37 && localPlayer.snake.direction !== 'right') {
                    game.changeDirection(localPlayer.id, 'left');
                }
                else if (event.keyCode === 38 && localPlayer.direction !== 'down') {
                    game.changeDirection(localPlayer.id, 'up');
                }
                else if (event.keyCode === 39 && localPlayer.direction !== 'left') {
                    game.changeDirection(localPlayer.id, 'right');
                }
                else if (event.keyCode === 40 && localPlayer.direction !== 'up') {
                    game.changeDirection(localPlayer.id, 'down');
                }
            });
        });
    });

});