var express = require('express'),
    app = express(),
    addArgot = require('argot-browser/lib/argotExpress'),
    fs = require('fs'),
    streamifier = require('streamifier');




app.use('/resources', express.static(__dirname + '/../resources'));

app.get('/', function(req, res){
  fs.readFile(__dirname + '/index.html',
              function (err, data) {
                if (err) {
                  res.writeHead(500);
                  res.end('Error loading index.html');
                } else {
                  res.writeHead(200);
                  res.end(data);
                }
              });
});

addArgot(app);

var server = app.listen(8000);


var io = require('socket.io').listen(server);
var ss = require('socket.io-stream');

var sockets = [];

function run() {
  for (var i = sockets.length -1; i >= 0; i--) {
    var socket = sockets[i];
    if (socket.disconnected) {
      sockets.splice(i,1);
    } else {
      var input = [65, 19, 1, 50, 32, 0, 4, 100, 97, 116, 97, 1, 0, 27, 15, 3, 14, 5, 115, 104, 111, 114, 116, 13, 40, 14, 4, 98, 121, 116, 101, 13, 1, 14, 4, 116, 101, 120, 116, 13, 8, 50, 0, 10, 50, 5, 104, 101, 108, 108, 111];
      var inputStream = streamifier.createReadStream(new Buffer(input));
      ss(socket).emit('argotdata', inputStream);
    }

  }
  setTimeout(run,15000);
}
run();

io.of('/socket').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  sockets.push(socket);
});
