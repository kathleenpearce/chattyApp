const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require("uuid/v1")

// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({type: "usersUpdate", clientUpdate: wss.clients.size}));
    }
  });


 ws.on('message', (message) => {
   const messageObject = JSON.parse(message)
   console.log("Got a new message: ", messageObject);

switch(messageObject.type) {
  case "postMessage":
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
      const messageString = JSON.stringify({type: "incomingMessage", id: uuidv1(), username: messageObject.username, content: messageObject.content})
      console.log('messageString', messageString)
      client.send(messageString);
    }
});
      break;

  case "postNotification":
    wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
    const messageString = JSON.stringify({type: "incomingNotification", content: messageObject.content})
    console.log('messageString', messageString)
    client.send(messageString);
  }
});
      break;

  case "usersUpdate":
    wss.clients.forEach(function each(client) {
})
    break;

    default:
        // show an error in the console if the message type is unknown
    console.log(messageObject.type)
    throw new Error("Unknown event type " + message.type);
  }
});

 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => {
  wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({type: "usersUpdate", clientUpdate: wss.clients.size}));
    }
  });
  console.log('Client disconnected');

}
);
});


