'use strict';

import EventEmitter from 'event-emitter-es6';
import io from 'socket.io-client';
import serverMessages from 'serverMessages';

export default class Game extends EventEmitter {

    constructor() {
        super();
        this.socket = io();
        serverMessages(this);
    }

    askForPlayers() {
        this.socket.emit('askForPlayers');
    }

    askForApples() {
        this.socket.emit('askForApples');
    }

    registerPlayer(name) {
        this.socket.emit('registerNewPlayer', name);
    }

}