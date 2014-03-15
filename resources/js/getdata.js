var socket = io.connect('/socket');
var anArgot = argot('/dictionaries');

var graph = makeGraph($('#content'));

function registerForData(lib) {
  ss(socket).on('argotdata', function(stream) {
    var data = anArgot.read(lib,stream);
    graph.addValue(data['short']);
  });
}

ss(socket).on('argotsetup', function(stream) {
  anArgot.readMessage(stream)
    .then(function(libAndData) {
      var lib = libAndData[0];
      registerForData(lib);
    });
});
