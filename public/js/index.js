var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {

  const formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html();

  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime,
  });

  jQuery("#messages").append(html);
});


socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery("#location-message-template").html();

  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url,
  });

  jQuery("#messages").append(html);
})


jQuery("#message-form").on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val(),
  }, function () {
    messageTextBox.val('');
  })
});

var locationBtn = jQuery("#send-location");
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  locationBtn.attr('disabled', 'disabled').text('Send Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function () {
    location.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
})