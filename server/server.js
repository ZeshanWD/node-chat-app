const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMessage', (newMessage = {}) => {
    console.log('newMessage from User', newMessage);

    const { from, text } = newMessage;

    io.emit('newMessage', {
      from,
      text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
});
