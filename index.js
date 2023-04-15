const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000)

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

connections = []

io.sockets.on('connection', (socket) => {
    connections.push(socket)
    console.log(`New user has connected`);

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        console.log(`User has been leave the page`);
    })

    socket.on('send mess', ({ msg, name }) => {
        let time = new Date().toLocaleTimeString()
        io.sockets.emit('add mess', { msg, name, time })
    })
})
