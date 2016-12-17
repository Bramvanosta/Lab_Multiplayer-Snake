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

    game.socket.on('newPlayerCreated', player => {
        game.emit('newPlayerCreated', player);
    });

    game.socket.on('newPlayerJoined', player => {
        game.emit('newPlayerJoined', player);
    })

}

