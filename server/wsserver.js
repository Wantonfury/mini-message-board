const server = require('./bin/www');
const WebSocket = require('ws');
let wss = null; //= new WebSocket.Server({ server });

// function heartbeat() {
//   this.isAlive = true;
// }

// wss.on('connection', ws => {
//   ws.isAlive = true;
//   ws.on('error', console.error);
//   ws.on('pong', heartbeat);
  
//   console.log("New connection.");
// });

// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();
    
//     ws.isAlive = false;
//     ws.ping();
//   });
// }, 30000);

// wss.on('close', function  close() {
//   clearInterval(interval);
// });

exports.getWss = () => wss;
exports.setWss = (wssNew) => wss = wssNew;