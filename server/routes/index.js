const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Match = require('../controllers/match');
const passport = require('../passport/passport');

router.get('/', (req, res) => {
  res.send('Up and Running');
});

// User routes
router.get('/users', User.showAll);
router.post('/signUp', User.register);
router.post('/signIn', passport.authenticate('local-signin', { session: false}), User.localSignin);
router.put('/user/:id', User.update);
router.delete('/user/:id', User.delete);

module.exports = router;
