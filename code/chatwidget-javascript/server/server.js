import dotenv from 'dotenv';
dotenv.config();

import web from './SlackAPI.js';
import startSlackClient from './SlackClient.js';

import WebSocket from 'websocket';
import http from 'http';

const server = http.createServer(function (request, response) {
  console.log(new Date() + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(3000, function () {
  console.log(new Date() + ' Server is listening on port 3000');
});

const connections = [];
startSlackClient(connections);

const wsServer = new WebSocket.server({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  console.log(origin);
  return true;
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(new Date() + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(new Date() + ' Connection accepted.');

  // TODO: Send first message to Slack, get back root id and store it with the connection and on the connection
  // web.chatPostMessage('C023TTD1VC1', message.utf8Data);

  connections.push({
    connection: connection,
    chat_id: '',
  });

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      web.chatPostMessage('C023TTD1VC1', message.utf8Data);
    } else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function (reasonCode, description) {
    console.log(new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
