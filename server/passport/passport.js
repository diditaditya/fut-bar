const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
let saltRounds = 10;
const jwt = require('jsonwebtoken');

passport.use('local-signin', new LocalStrategy(
  function(username, password, done) {
    User.findOne({'local.username': username}, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, {status: 'failed', message: 'Username is not found'});
      }
      if(user) {
        console.log('given password: ', password);
        console.log('stored password: ', user.local.password);
        bcrypt.compare(password, user.local.password, function(err, res) {
          console.log('res: ', res);
          if(err) {
            return done(err, {status: 'failed', message: 'Error in decoding the password-hash'});
          }
          if(res === true) {
            let userInfo = {
              username: user.local.username,
              email: user.local.email,
            };
            let token = jwt.sign(userInfo, process.env.JWT_SECRET);
            let message = 'Sucessfully signed in';
            return done(null, {status: 'success', message: message, user: userInfo, token: token});
          } else {
            return done(null, {status: 'failed', message: 'Password is incorrect'});
          }
        });
      }
    });
  }
));

module.exports = passport;
