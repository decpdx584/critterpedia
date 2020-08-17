const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then(([user, created]) => {
    if (created) {
      // if created, success
      console.log(`${user.name} was created`);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: `Account created! You're now logged in as ${user.name}`
      })(req, res);
      // Before passport.authenticate
      // res.redirect('/');
    } else {
      // email already exists
      console.log('Email already exists');
      // FLASH
      req.flash('Error','Email already exists. Please try again.')
      res.redirect('/auth/signup');
    }
  })
  .catch(err => {
    console.log('Error', err);
    // FLASH 
    req.flash('Error', `Error... &#129335;${err}`)
    res.redirect('/auth/signup')
  })
});

// FLASH
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: `Welcome back!`,
  failureFlash: 'Email or password is incorrect. Please try again'
}));


router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Thank you. Come again.');
  res.redirect('/');
});

module.exports = router;
