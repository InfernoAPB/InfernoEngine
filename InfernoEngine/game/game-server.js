const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9000 });
var eventControllers = require('../game/controllers/EventControllers');

wss.on('connection', function (session) {
    console.log("Connection Opened " + session);
    session.onmessage = messageHandler;
    session.onclose = function () {
        console.log("session disconnected");
    }
});

wss.on('error', function (error) {
    if (error) {
        console.error(error);   
    }
});

async function messageHandler(message) {
    console.log("received : %s",message.data);
    var result =  await eventControllers.processRequest(message.data);
     if (message.target.readyState === WebSocket.OPEN) {
        message.target.send(result);
     }
 }
