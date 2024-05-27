const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/users.js");
const bcrypt = require("bcrypt");