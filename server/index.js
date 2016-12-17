'use strict';

const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as config from '../client/js/config';
import Board from '../client/js/board';

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let board = new Board();

io.on('connection', socket => {
    console.log('connecting', socket.id);
    socket.emit('connected', socket.id);

    socket.on('disconnect', () => {
        console.log('disconnecting', socket.id);
        board.removePlayer(socket.id);
        socket.broadcast.emit('playerDisconnected', socket.id);
    });

    socket.on('askForPlayers', () => {
        socket.emit('listWithPlayers', board.players);
    });

    socket.on('askForApples', () => {
        socket.emit('listWithApples', board.apples);
    });

    socket.on('registerNewPlayer', userName => {
        let userColor = board.getAvailableColor();
        let newPlayer = board.addPlayer(socket.id, userName, userColor);

        socket.emit('newPlayerCreated', newPlayer);
        socket.broadcast.emit('newPlayerJoined', newPlayer);
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

setInterval(() => {
    board.checkNumberOfApples(io);
}, config.DELAY);