const User = require('../models/user');
const Match = require('../models/match');
const bcrypt = require('bcrypt');
let saltRounds = 10;

let userControl = {
  showAll: function(req, res) {
    User.find({}).populate(['matchCreated', 'matchSelected']).exec((err, users) => {
      if(err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  },
  showOne: function(req, res) {
    let method = req.params.login_method;
    if (method === "local") {
      User.findOne({'local.username': req.params.user}).populate(['matchCreated', 'matchSelected']).exec((err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    } else if (method === "facebook") {
      User.findOne({'facebook.id': req.params.user}).populate(['matchCreated', 'matchSelected']).exec((err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    }
  },
  update: function(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        let matchCreated = req.body.matchCreated || user.matchCreated;
        let matchSelected = req.body.matchSelected || user.matchSelected;
        if(user.local) {
          User.update({_id: req.params.id}, {$set:{
            'local.username': req.body.name || user.local.username,
            'local.email': req.body.email || user.local.email,
            'local.phone': req.body.phone || user.local.phone,
            'local.password': user.local.password,
            matchCreated: matchCreated,
            matchSelected: matchSelected
          }}, (err, updated) => {
            if (err) {
              console.log('goes to error in local user update');
              res.send(err);
            } else {
              console.log('local user is updated');
              res.send(updated);
            }
          });
        } else if(user.facebook) {
          User.update({_id: req.params.id}, {$set:{
            'facebook.name': user.facebook.username,
            'facebook.email': user.facebook.email,
            'facebook.id': user.facebook.id,
            'facebook.token': user.facebook.token,
            matchCreated: matchCreated,
            matchSelected: matchSelected
          }}, (err, updated) => {
            if (err) {
              res.send(err);
            } else {
              res.send(updated);
            }
          });
        }
      }
    });
  },
  register: function(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    User.findOne({'local.username': username}, function(err, user) {
      if(err) {
        let response = {
          status: 'failed',
          message: 'error in finding the user in database'
        };
        res.send(response);
      }
      if(user) {
        let response = {
          status: 'failed',
          message: 'username is already taken'
        };
        res.send(response);
      } else {
        let newUser = new User();
        newUser.local.username = username;
        newUser.local.email = email;
        newUser.local.phone = phone;
        bcrypt.hash(password, saltRounds, function(err, hashed) {
          if(err) {
            res.send(err);
          }
          newUser.local.password = hashed;
          newUser.save((err) => {
            if(err) {
              res.send(err);
            }
            let response = {
              status: 'success',
              message: 'user is successfully registered',
              user: newUser
            };
            res.send(response);
          });
        });
      }
    });
  },
  localSignin: function(req, res) {
    console.log('status: ', req.user.status);
    console.log('message: ', req.user.message);
    if(req.user.status === "failed") {
      res.send({status: req.user.status, message: req.user.message});
    }
    if(req.user.status === "success"){
      res.send(req.user)
    } else {
      res.send('error');
    }
  },
  facebookLogin: function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    User.findOne({'facebook.id': id}, function(err, user) {
      if(err) {
        res.send(err);
      }
      if(user) {
        res.send(user);
      } else {
        let newUser = new User({
          id: id,
          name: name,
          email: email,
          todos: []
        });
        newUser.save(function(err) {
          if(err) {
            res.send(err);
          } else {
            res.send(newUser);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, (err, match) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.id,
          status: 'success',
          message: 'user is sucessfully deleted'
        };
        res.send(response);
      }
    });
  }
}

module.exports = userControl;
