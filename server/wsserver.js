const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('pong', heartbeat);
  
  console.log("New connection.");
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function  close() {
  clearInterval(interval);
});

module.exports = wss;