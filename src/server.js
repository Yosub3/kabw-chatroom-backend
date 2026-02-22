const app = require('./app');
const config = require('./config/config');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

const PORT = config.server.port || 5001;

io.on('connection', (socket) => {
    console.log("USER CONNECTED:", socket.id);
    socket.on('disconnect', () => {
        console.log("USER DISCONNECTED:", socket.id);
    });
    socket.on('message', (data) => {
        console.log("USER MESSAGE:", data);
        console.log("EMITTING MESSAGE TO ALL NON EMITTER USERS");
        socket.broadcast.emit('message', {...data, user_id: -1});
        // io.emit('message', {...data, user_id: -1});
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${config.server.baseUrl}`);
});
