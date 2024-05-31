const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// GET sign-in
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
 });

// GET sign-up
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// POST sign-up
router.post('/sign-up', async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const userInDatabase = await User.findOne({ username: req.body.username });
  try{
    if (username.length > 10){
      return res.send('Username must be 10 characters or less.');
      }  
    
    if (password.length > 8){
      return res.send('Username must be 8 characters or less.');
      } 

    if (userInDatabase) {
        return res.send('Username already taken.');
      }

    if(req.body.password !== req.body.confirmPassword){
        return res.send("Passwords don't match.")
      }

      const hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;

      const user = await User.create(req.body);
      res.redirect("/auth/sign-in")
    }catch(err){
      return res.send('Please fill in the required fields.');
    }
});

// POST sign-in
router.post('/sign-in', async (req, res) => {
  try{
    const userFromDatabase = await User.findOne({
      username: req.body.username,
    });

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      userFromDatabase.password
    );
    
    req.session.user = {
      username: userFromDatabase.username,
      userId: userFromDatabase._id,
    };

    if (passwordsMatch) {
      res.redirect("/messages/main");
    } else {
      return res.send(`Login Failed`);
    }
  }catch(err){
    return res.send('Please fill in the required fields.');
  }
});

// GET sign-out
router.get("/sign-out", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;

