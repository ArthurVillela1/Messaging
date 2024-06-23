const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");
const moment = require("moment")

// Routs (endpoints):
//GET main page
router.get("/main", async (req, res) => {
    //try {
    const messages = await Message.find().populate('createdBy')
    const userSession = req.session.user
    //const userId = await Message.find(req.session.user.userId);
    res.render('../views/main.ejs', {
        messages: messages, // pass through the messages to ejs template.
        userSession: userSession,
        moment: moment
    })
    //} catch (){

    //}
})

//POST message
router.post('/main', async (req, res) => {
    const { content } = req.body;
    if (content.length <= 30) {
        try {
            // Create the message using mongoose.
            req.body.createdBy = req.session.user.userId
            const message = await Message.create(req.body)

            // Send back the new message to the user.
            res.redirect('/messages/main')
        } catch (err) {
            if (err.name === 'ValidationError') {
                res.redirect('/messages/main')
            }
        }
    } else {
        let errorMsg = 'Comment must be 30 characters or less.';
        return res.send(errorMsg);
    }
})

// DELETE message
router.delete('/main/:id', async (req, res) => {
    const deletedmessage = await Message.findByIdAndDelete(req.params.id);
    res.redirect('/messages/main')
})

// EDIT message
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const messageToUpdate = await Message.findById(id)

    res.render('../views/edit.ejs', {
        messageToUpdate: messageToUpdate
    })
})

router.put('/edit/:id', async (req, res) => {
    const messageUpdate = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/messages/main')
})


module.exports = router;