const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', function(req, res, next) {
    res.send('Login page')
  });
  
  router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }));
  
  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

module.exports = router