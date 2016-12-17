'use strict';

import Game from 'game';
import Board from 'board';

document.addEventListener('DOMContentLoaded', function () {

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

            game.askForPlayers();
            game.askForApples();

            game.on('listWithPlayers', players => {
                console.log('old players', players);
                players.forEach(player => {
                    let localPlayer = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                    localPlayer.drawSnake();
                });
            });

            game.on('listWithApples', apples => {
                console.log('old apples', apples);
                apples.forEach(apple => {
                    let localApple = board.addApple(apple.x, apple.y);
                    localApple.draw();
                });
            });

            game.registerPlayer(name);

            game.on('newPlayerCreated', player => {
                console.log('new player', player);
                let localPlayer = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                localPlayer.drawSnake();

                document.getElementById('login').classList.add('is-hidden');
                document.getElementById('board').classList.remove('is-hidden');
            });

            game.on('newPlayerJoined', player => {
                console.log('new player joined', player);
                let localPlayer = board.addPlayer(player.id, player.name, player.color, player.snake.x, player.snake.y);
                localPlayer.drawSnake();
            });

            game.on('playerDisconnected', playerId => {
                console.log('player disconnected', playerId);
                let removedPlayer = board.removePlayer(playerId);
                removedPlayer[0].removeSnake();
            });
        });
    });

});