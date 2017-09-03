const server = require('http').createServer();

const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

let players = [];

io.on('connection', (socket) => {
  players.push(socket.id);
  console.log(players.length, players);
  if (players.length === 2) {
    io.to(players[0]).emit('start');
  }
  socket.on('turn', (id) => {
    socket.broadcast.emit('turn', (id));
  });
  socket.on('ready', () => {
    console.log('ready');
  });
  socket.on('disconnect', () => {
    players = players.filter((item) => {
      return item !== socket.id;
    });
  });
});
