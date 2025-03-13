const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Handle WebSocket connection
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on('message', (data) => {
        console.log(`Received: ${data}`);
        socket.emit('reply', `Server received: ${data}`);
    });

    socket.on('message', (data) => {
        console.log(`Received: ${data}`);
        socket.emit('reply', `Server received: ${data}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Express route
app.get('/', (req, res) => {
    res.send('Socket.IO server is running.');
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
