'use strict';

export default function serverMessages(game) {

    game.socket.on('connected', () => {
        game.emit('connected');
    });

    game.socket.on('playerDisconnected', playerId => {
        game.emit('playerDisconnected', playerId);
    });

    game.socket.on('listWithPlayers', players => {
        game.emit('listWithPlayers', players);
    });

    game.socket.on('listWithApples', apples => {
        game.emit('listWithApples', apples);
    });

    game.socket.on('newPlayerCreated', player => {
        game.emit('newPlayerCreated', player);
    });

    game.socket.on('newPlayerJoined', player => {
        game.emit('newPlayerJoined', player);
    });

    game.socket.on('newAppleGenerated', apple => {
        game.emit('newAppleGenerated', apple);
    });

    game.socket.on('moveSnake', data => {
        game.emit('moveSnake', data);
    });

    game.socket.on('snakeWithAppleCollision', data => {
        game.emit('snakeWithAppleCollision', data);
    })

    game.socket.on('snakeCollision', data => {
        game.emit('snakeCollision', data);
    })

}

