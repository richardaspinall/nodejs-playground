import WebSocket from 'websocket';
import web from './slackAPI.js';

// Change to a class
export default async function startSlackClient(connections) {
  const SlackClient = new WebSocket.client();
  SlackClient.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
  });

  SlackClient.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
      console.log('Connection Error: ' + error.toString());
    });
    connection.on('close', function () {
      console.log('echo-protocol Connection Closed');
    });

    // Handle events and interactivity down the socket
    connection.on('message', function (message) {
      const socketMessage = JSON.parse(message.utf8Data);

      // Send back envelope_id as acknowledgment
      if (socketMessage.envelope_id) {
        connection.send(
          JSON.stringify({
            envelope_id: socketMessage.envelope_id,
          })
        );
        /*
          DO SOME COOL STUFF OFF THE BACK OF THE MESSAGE
          
        */
        console.log(socketMessage.payload);
        if (!socketMessage.payload.event.bot_id) {
          connections.forEach((element) => {
            element.connection.sendUTF(socketMessage.payload.event.text);
          });
        }
      } else {
        // Hello from Slack – No need to respond
        console.log(socketMessage);
      }
    });
  });

  try {
    const wsUrl = await web.appsConnectionsOpen();
    SlackClient.connect(wsUrl);
  } catch (err) {
    console.error(err);
  }
}
