const server = require('http').createServer();

const io = require('socket.io')(5609, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on('connection', (socket) => {
  socket.on('message', () => {
  	console.log('hihih');	
    socket.emit('answer', 'hello');
  });
});
