const mongoose = require('mongoose')
require('dotenv').config();

const Message = require('./models/messages.js')

async function seed() {
    console.log('Seeding has begun! 🌱')
  
    // ! We need to AWAIT mongoose.connect first, before we drop our database.
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connection successful! 🚀')
  
    // ! When seeding, we can clear the database like so:
    await mongoose.connection.db.dropDatabase()
  
    //const messages = await Message.create(messagesData)
  
    mongoose.disconnect()
  }
  
  seed()