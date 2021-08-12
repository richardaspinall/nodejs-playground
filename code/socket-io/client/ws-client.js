//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', { reconnect: true });

// Add a connect listener
socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.emit('message', 'Hi from client');

socket.on('message', (arg) => {
  console.log(arg);
});
