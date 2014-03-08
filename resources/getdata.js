var socket = io.connect('http://localhost:8000/socket');

ss(socket).on('argotdata', function(stream) {

  stream = argot.toStream(stream._object);
  var dataObject = argot.readMessage(stream);
   dataObject.then(function(result) {
     alert(Object.keys(result));
   });
});
