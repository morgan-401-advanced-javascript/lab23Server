const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
require('dotenv').config();

const port = process.env.PORT;

let socketPool = {};

io.on('connection', socket => {
    console.log('Socket', socket.id, 'connected');

    socketPool[socket.id.toString()] = socket;

    socket.on('disconnect', data => {
        delete socketPool[socket.id.toString()];
        console.log('Socket', socket.id, 'disconnected');
    });

    socket.on('message', function(data) {
        let sockets = Object.keys(socketPool);
        sockets.forEach(val => {
            socketPool[val].emit('read message', data);
        });
    });
});

const listenCb = () =>
    console.table([
        ['status', 'port'],
        ['started', port],
    ]);
server.listen(port, listenCb);
