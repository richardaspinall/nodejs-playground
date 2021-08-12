const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  // ...
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (arg) => {
    console.log(arg);
    socket.emit('message', 'Hi from server');
  });
});

httpServer.listen(3000);
