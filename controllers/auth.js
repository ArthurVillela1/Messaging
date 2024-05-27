const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

// GET sign-in
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
 });

// POST sign-in
router.post('/sign-in', async (req, res) => {
  const userFromDatabase = await UserModel.findOne({
    username: req.body.username,
  });

  const passwordsMatch = await compare(
    req.body.password,
    userFromDatabase.password
  );
  
  req.session.user = {
    username: userFromDatabase.username,
    userId: userFromDatabase._id,
  };

  if (passwordsMatch) {
    res.redirect("/");
  } else {
    return res.send(`Login Failed`);
  }

});

// GET sign-up
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
  });

// POST sign-up
router.post('/sign-up', async (req, res) => {
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.send('Username already taken.');
      }

      if(req.body.password !==req.body.passwordConfirmation){
        return res.send("Passwords don't match.")
      }
      // Check UpperCase
      // < 8 characters
      // encrypt

      const user = await User.create(req.body);
      res.send(`Thanks for signing up ${user.username}`)
});

// GET sign-out
router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
