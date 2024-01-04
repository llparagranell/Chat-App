const messageModel = require("../model/messageModel");

exports.getMessageData = async (req, res) => {
  try {
    const data = await messageModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.createMessageData = async (req, res) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newMessage = new messageModel({roomName});
  newMessage.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.postMessageData = async (req, res) => {
  var messagedata = {
    name: req.body.name,
    message: req.body.message,
  };
 try {
   await messageModel.updateOne(
    { roomName: req.params.roomName },
      {
        $push: {
          messages: messagedata,
        },
      },
   )
    res.status(200).json("Item added to cart successfully !!!");
  } catch (error) {
   console.log(error);
  }
};

exports.deleteMessageData = async (req,res)=>{
  const { roomName } = req.params;
  messageModel.findOneAndDelete({roomName})
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });

}