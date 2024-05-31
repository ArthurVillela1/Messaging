const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    length:Number,
  },
  password: {
    type: String,
    required: true,
    length:Number,
  }
});

// Creates de user area in the database and attach the schema
const User = mongoose.model("User", userSchema);
module.exports = User
