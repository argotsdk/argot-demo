var express = require('express'),
    app = express(),
    addArgot = require('argot-browser/lib/argotExpress'),
    fs = require('fs'),
    streamifier = require('streamifier');


app.use('/resources', express.static(__dirname + '/../resources'));
app.use('/public', express.static(__dirname + '/../public'));
app.use('/', express.static(__dirname + '/../bower_components'));

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

var y = 0;


function run() {
  if (sockets.length > 0) {
    var input_start = [65, 19, 1, 50, 32, 0, 4, 100, 97, 116, 97, 1, 0, 27, 15, 3, 14, 5, 115, 104, 111, 114, 116, 13, 40, 14, 4, 98, 121, 116, 101, 13, 1, 14, 4, 116, 101, 120, 116, 13, 8, 50, 0];
    var input_end = [50, 5, 104, 101, 108, 108, 111];
    var sin = Math.sin((y++)/50);
    var thisY = [(~~(sin*100)) + 100];
    var input = input_start.concat(thisY).concat(input_end);
    var inputStream = streamifier.createReadStream(new Buffer(input));
    for (var i = sockets.length -1; i >= 0; i--) {
      var socket = sockets[i];
      if (socket.disconnected) {
        sockets.splice(i,1);
      } else {
        ss(socket).emit('argotdata', inputStream);
      }
    }
  }
}

var intervalId = setInterval(run,10);

io.of('/socket').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  sockets.push(socket);
});
