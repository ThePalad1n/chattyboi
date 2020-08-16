const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {

    //single client and welcomes current user
    socket.emit('message', 'Welcome to ChattyBoi');

    //Broadcastt when a user connects
    //all clients except the one connecting
    socket.broadcast.emit('message', ' A user booty bounced into the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat.')
    })

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
