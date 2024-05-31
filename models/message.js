
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: { type: String, length: Number, required: true, trim: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  userId: {type: String}
},{
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message

