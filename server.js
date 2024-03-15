const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('check clickjacking', (url) => {
     
        const isVulnerable = !url.includes("https://");
        io.emit('clickjacking result', { url, isVulnerable });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
