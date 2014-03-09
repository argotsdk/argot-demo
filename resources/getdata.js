var socket = io.connect('/socket');

ss(socket).on('argotdata', function(stream) {

  stream = argot.toStream(stream._object);
  var dataObject = argot.readMessage(stream);
   dataObject.then(function(result) {
     updateGraph(result['short']);
   });
});
