const server = require('http').createServer();

const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

const players = [];

io.on('connection', (socket) => {
  players.push(socket.id);
  if (players.length === 2) {
    io.to(players[0]).emit('start');
  }
  socket.on('turn', (id) => {
    socket.emit('turn', id);
  });
});
