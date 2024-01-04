const mongoose = require("mongoose");

const MessageModal = mongoose.Schema({
  roomName:  {
    type: String,
  },
  messages: [
    {
      name:{
        type: String,
      },
      message:{
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Message", MessageModal);
