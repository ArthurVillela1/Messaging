const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");

// Routs (endpoints):
//GET main page
router.get("/main", async (req, res) => {
    const messages = await Message.find().populate('createdBy')
    const userId = await Message.find().populate('userId')
    res.render('../views/main.ejs', {
        messages: messages, // pass through the messages to ejs template.
        userId: userId, // pass through the userId to ejs template.
    })
})

//POST message
router.post('/main', async (req, res) => {
    try {
        // Create the message using mongoose.
        req.body.createdBy = req.session.user.userId
        const message = await Message.create(req.body)
        // Send back the new message to the user.
        res.redirect('/messages/main')
    } catch (err) {
        let errorMsg = 'Comment must be 60 characters or less.';
        if (err.name === 'ValidationError') {
            return res.send(errorMsg);
        }
    }
})

router.delete('/main/:id', async (req, res) => {
      const deletedmessage = await Message.findByIdAndDelete(req.params.id);
      res.redirect('/messages/main')
})

//router.put

module.exports = router;