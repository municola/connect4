const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

let games = [[], [], []];
const readycount = [];

io.on('connection', (socket) => {

  socket.on('subscribe', (gameId) => {
    if (games[gameId].length < 2) {
      socket.join(gameId);
      games[gameId].push(socket.id);
      socket.emit('update', gameId, games[gameId].length);
      socket.broadcast.emit('update', gameId, games[gameId].length);
    }
  });

  socket.on('ready', (gameId) => {
    readycount[gameId] = readycount[gameId] + 1;
    if (readycount[gameId] === 2) {
      console.log('sent start request');
      io.to(games[gameId][0]).emit('start');
      io.to(games[gameId][0]).emit('symbol', 'X');
      io.to(games[gameId][1]).emit('symbol', 'O');
    }
  });

  socket.on('turn', (gameId, table) => {
    socket.to(gameId).emit('turn', table);
  });

  socket.on('disconnect', () => {
    games = games.filter((item) => {
      return item.filter((item2) => {
        return item2 !== socket.id;
      });
    });
    readycount[socket.room] = readycount[socket.room] - 1;
    socket.leave(socket.room);
    socket.emit('update', socket.room, games[socket.room].length);
    socket.broadcast.emit('update', socket.room, games[socket.room].length);
  });
});
