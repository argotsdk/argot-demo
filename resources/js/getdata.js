var socket = io.connect('/socket');
var anArgot = argot('/dictionaries');

var graph = makeGraph($('#content'));

ss(socket).on('argotdata', function(stream) {
  var dataObject = anArgot.readMessage(stream);
  dataObject.then(function(result) {
    graph.addValue(result['short']);
  });
});
