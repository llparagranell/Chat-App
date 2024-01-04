const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const mongoose = require("mongoose");
const app = express();
const server = require('http').Server(app);
const io = socketio(server);
const router = require('./routes/messageRouter');
var bodyParser = require('body-parser')

dotenv.config();
const port = process.env.PORT || 5000;

// Middleware


app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api',router);


mongoose
  .connect(
    process.env.MONGO,
    // { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err, "something went wrong"));

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.IO
var userNames = [];

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}
var clientsmessages = [];

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    const { name,room } = data; 
    socket.join(room); 
    console.log(name,room);
  });
  socket.on('connectedUser', (users) =>{
    socket.name = users;
    io.emit('connectedUser', users);
    console.log(users + ' has joined the chat.');
    console.log(removeDuplicates(userNames));
  });
  socket.on('sendMessage', ({name,message}) => {
    io.emit('message', message);
    clientsmessages.push({name,message});
    console.log(clientsmessages);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});