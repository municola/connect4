const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

const howMany = [0, 0, 0];

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');
  socket.on('connectMe', () => {
    console.log('func: connect');
    socket.emit('connected');
    socket.emit('update', howMany);
  });
  socket.on('subscribe', (roomId) => {
    console.log('readycount: ', howMany);
    if (howMany[roomId] === 1) {
      console.log('howMany === 1', howMany[roomId]);
      socket.join(roomId);
      howMany[roomId] = 2;
      socket.emit('confirmed');
      socket.emit('ready', 'X', 'Your Turn');
      socket.to(roomId).emit('ready', 'O', 'Enemy Turn');
      socket.emit('firstTurn');
      socket.emit('update', howMany);
      socket.broadcast.emit('update', howMany);
    }
    if (howMany[roomId] === 0) {
      console.log('howMany === 0', howMany[roomId]);
      socket.join(roomId);
      howMany[roomId] = 1;
      socket.emit('update', howMany);
      socket.emit('confirmed');
      socket.broadcast.emit('update', howMany);
    }
  });
  socket.on('turn', (table) => {
    socket.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('turn', table);
  });
  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnect');
    const roomId = socket.rooms[Object.keys(socket.rooms)[0]];
    console.log('roomId: ', roomId);
    howMany[roomId] = howMany[roomId] - 1;
    console.log(howMany);
    socket.leave(roomId);
    socket.broadcast.emit('update', howMany);
  });
});
