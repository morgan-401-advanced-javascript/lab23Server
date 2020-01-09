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
    
});
        setInterval(() => {
            const temp = Math.floor(Math.random() * 100);
            const topic = 'temperature';
            console.info(`TEMP : ${temp}`);
            io.emit(topic, temp);
        }, 10000);
        setInterval(() => {
            const precip = Math.random() >= 0.5;
            const topic = 'precipitation';
            console.info(`Precipitation : ${precip}`);
            io.emit(topic, precip);
        }, 10000);

const listenCb = () =>
    console.table([
        ['status', 'port'],
        ['started', port],
    ]);
server.listen(port, listenCb);
