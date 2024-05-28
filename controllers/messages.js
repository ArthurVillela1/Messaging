const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");

//GET main page
router.get("/main", async (req, res) => {
    const messages = await Message.find()
    res.render('../views/main.ejs', {
        messages: messages, // ! pass through the messages to ejs template.
    })
})

//POST message
router.post('/main', async (req, res) => {
    // Create the message using mongoose.
    const message = await Message.create(req.body)
    // Send back the new message to the user.
    res.send(message)
})

//router.put
//router.delete

module.exports = router;