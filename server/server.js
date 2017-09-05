const io = require('socket.io')(4003, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

let howMany = [[], [], []];

function howManyPeople(arr) {
  return arr.map((item) => {
    return item.length;
  });
}

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');
  socket.on('connectMe', () => {
    console.log('func: connect');
    socket.emit('connected');
    socket.emit('update', howManyPeople(howMany));
  });
  socket.on('subscribe', (roomId) => {
    const people = howManyPeople(howMany);
    console.log('readycount: ', people);
    if (people[roomId] === 1) {
      console.log('people === 1', people[roomId]);
      socket.join(roomId);
      howMany[roomId].push(socket.id);
      socket.emit('confirmed');
      socket.emit('ready', 'X', 'Your Turn');
      socket.to(roomId).emit('ready', 'O', 'Enemy Turn');
      socket.emit('firstTurn');
      socket.emit('update', people);
      socket.broadcast.emit('update', people);
    }
    if (people[roomId] === 0) {
      console.log('howMany === 0', people[roomId]);
      socket.join(roomId);
      howMany[roomId].push(socket.id);
      socket.emit('update', people);
      socket.emit('confirmed');
      socket.broadcast.emit('update', people);
    }
  });
  socket.on('turn', (table) => {
    socket.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('turn', table);
  });
  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnect');
    console.log('before', howMany);
    console.log('socket.id; ', socket.id);
    for (let i = 0; i < howMany.length; i++) {
      howMany[i] = howMany[i].filter((item) => {
        return item !== socket.id;
      });
    }
    console.log('after', howMany);
    socket.broadcast.emit('update', howManyPeople(howMany));
  });
});
