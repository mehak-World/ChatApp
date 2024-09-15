const express = require("express");
const router = express.Router();
const Message= require("../models/Message")

router.post("/send", async (req, res) => {

    try{
        const {from, to, message} = req.body;
        const new_message = new Message({sender: from, receiver: to, message })
        await new_message.save();
        res.send({success: true})
    }

    catch(err){
        res.send({success: false})
    }
 

})

router.get("/messages/:sender_id/:receiver_id", async (req, res) => {

    const {sender_id, receiver_id } = req.params;
    const messages = await Message.find({});
    const all_messages= messages.filter((msg) => (msg.sender == sender_id && msg.receiver == receiver_id) || msg.sender == receiver_id && msg.receiver == sender_id)
    const senderMessages = messages.filter((msg) => msg.sender == sender_id && msg.receiver == receiver_id);
    const receiverMessages = messages.filter((msg) => msg.sender == receiver_id && msg.receiver == sender_id);
  
    res.send({senderMessages, receiverMessages, all_messages})
})

module.exports = router;