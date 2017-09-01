const server = require('http').createServer();

const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on('connection', (socket) => {
  socket.on('message', () => {
    socket.emit('answer', 'hello');
  });
});
