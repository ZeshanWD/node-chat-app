var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'Mariano',
    text: "Hey, Whatsapp you there...",
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {
  console.log('new Message received from server', newMessage);
});
