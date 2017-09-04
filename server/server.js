const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

let players = [];
let readycount = 0;

io.on('connection', (socket) => {
  players.push(socket.id);
  console.log(players.length, players);
  socket.on('ready', () => {
    readycount++;
    console.log('ready');
    if (readycount === 2) {
      console.log('sent start request');
      io.to(players[0]).emit('start');
      io.to(players[0]).emit('symbol', 'X');
      io.to(players[1]).emit('symbol', 'O');
    }
  });
  socket.on('turn', (id) => {
    socket.broadcast.emit('turn', (id));
  });
  socket.on('disconnect', () => {
    players = players.filter((item) => {
      return item !== socket.id;
    });
    readycount--;
    console.log(players.length, players);
  });
});
