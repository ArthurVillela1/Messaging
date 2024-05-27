const mongoose = require('mongoose')
require('dotenv').config();

const Messages = require('./models/messages.js')

async function seed() {
    console.log('Seeding has begun! 🌱')
  
    // ! We need to AWAIT mongoose.connect first, before we drop our database.
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connection successful! 🚀')
  
    // ! When seeding, we can clear the database like so:
    await mongoose.connection.db.dropDatabase()
  
    // ! Replace diehard with an array of movies!
    const movies = await Movies.create(moviesData)
  
    console.log(movies)
  
    mongoose.disconnect()
  }
  
  seed()