var chai = require('chai');
var chai_http = require('chai-http');
chai.use(chai_http);
const should = chai.should();

var server = require('../app');
var User = require('../models/user');
var Match = require('../models/match');

describe('User', function() {

  let userId = "";

  beforeEach((done) => {
    var newUser = new User({
      'local.username': "ivanhabib",
      'local.email': "ivan@habib.co.id",
      'local.password': "ivanhabib",
      'local.phone': "018771928371"
    })
    newUser.save((err, user) => {
      userId = user._id;
      done();
    })
  })

  afterEach((done) => {
    User.remove({}, (err) => {
      done();
    })
  })

  describe('GET - /users', function() {
    it('should get all users', function(done) {
      chai.request(server)
        .get('/users')
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('array');
          result.body.length.should.equal(1);
          done();
        })
    });
  });

  describe('GET - /random', function() {
    it('should return error 404', function(done) {
      chai.request(server)
        .get('/random')
        .end((err, result) => {
          result.should.have.status(404);
          done();
        })
    });
  });



  describe('POST:/signUp', function() {
    it('create new user', function(done) {
      chai.request(server)
        .post('/signUp')
        .send({
          'username': "ivanhoe",
          'email': "ivanhoe@habib.co.id",
          'password': "ivanhoe",
          'phone': "091873491287"
        })
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('object');
          result.body.user.local.email.should.to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          result.body.user.local.phone.should.to.have.length.above(8);
          done();
        })
    });
  });
  describe('POST:/signIn', function() {
    it('signing a user in', function(done) {
      chai.request(server)
        .post('/signin')
        .send({
          'username': "ivanhabib",
          'password': "ivanhabib"
        })
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('object');
          result.body.should.to.have.property('status');
          result.body.should.to.have.property('message');
          done();
        })
    });
  });


  describe('PUT:/user/:id', function() {
    it('update user data', function(done) {
      chai.request(server)
        .put('/user/' + userId)
        .send({
          'username': "temp",
          'email': "temp",
          'phone': "temp"
        })
        .end((err, result) => {
          result.body.ok.should.equal(1);
          result.body.should.to.have.property('nModified');
          result.body.should.to.have.property('ok');
          done();
        })
    });
  });

  describe('DELETE:/user/:id', function() {
    it('delete user', function(done) {
      chai.request(server)
        .delete('/user/' + userId)
        .end((err, result) => {
          result.body.should.to.have.property('status');
          result.body.message.should.equal('user is sucessfully deleted');
          result.body.status.should.equal('success');
          done();
        })
    });
  });

});

describe('Match', function() {

  let userId = "";
  let matchId = "";

  beforeEach((done) => {
    var newUser = new User({
      'local.username': "ivanhabib",
      'local.email': "ivan@habib.co.id",
      'local.password': "ivanhabib",
      'local.phone': "018771928371"
    })
    newUser.save((err, user) => {
      userId = user._id;
    })
    var newMatch = new Match({
      'creator': userId,
      'against': userId,
      'name': 'Chealse Fc',
      'coordinate': '106.00123,23.2223',
      'place_id': 'asdjh123h1jsansamsd1',
      'place': 'Metro Futsal',
      'address': 'Jl MERDEKA 21',
      'phone': '+621837376663',
      'createdAt': new Date(),
      'updatedAt': new Date(),
      'matchTime': new Date(),
      'openStatus': false
    })

    newMatch.save((err, match) => {
      console.log(match);
      // matchId = match._id;
    })
  })

  afterEach((done) => {
    User.remove({}, (err) => {
      console.log(err);
    })
    Match.remove({}, (err) => {
      done();
    })
  })

  // describe('GET - /match', function() {
  //   it('should get all match', function(done) {
  //     chai.request(server)
  //       .get('/matches')
  //       .end((err, result) => {
  //         console.log(result.body);
  //         result.should.have.status(200);
  //         result.body.should.be.a('array');
  //         result.body.length.should.equal(1);
  //         done();
  //       })
  //   });
  // });
  //
  // describe('GET - /random', function() {
  //   it('should return error 404', function(done) {
  //     chai.request(server)
  //       .get('/random')
  //       .end((err, result) => {
  //         result.should.have.status(404);
  //         done();
  //       })
  //   });
  // });
  //
  //
  //
  // describe('POST:/signUp', function() {
  //   it('create new user', function(done) {
  //     chai.request(server)
  //       .post('/signUp')
  //       .send({
  //         'username': "ivanhoe",
  //         'email': "ivanhoe@habib.co.id",
  //         'password': "ivanhoe",
  //         'phone': "091873491287"
  //       })
  //       .end((err, result) => {
  //         result.should.have.status(200);
  //         result.body.should.be.a('object');
  //         result.body.user.local.email.should.to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  //         result.body.user.local.phone.should.to.have.length.above(8);
  //         done();
  //       })
  //   });
  // });
  // describe('POST:/signIn', function() {
  //   it('signing a user in', function(done) {
  //     chai.request(server)
  //       .post('/signin')
  //       .send({
  //         'username': "ivanhabib",
  //         'password': "ivanhabib"
  //       })
  //       .end((err, result) => {
  //         result.should.have.status(200);
  //         result.body.should.be.a('object');
  //         result.body.should.to.have.property('status');
  //         result.body.should.to.have.property('message');
  //         done();
  //       })
  //   });
  // });
  //
  //
  // describe('PUT:/user/:id', function() {
  //   it('update user data', function(done) {
  //     chai.request(server)
  //       .put('/user/' + userId)
  //       .send({
  //         'username': "temp",
  //         'email': "temp",
  //         'phone': "temp"
  //       })
  //       .end((err, result) => {
  //         result.body.ok.should.equal(1);
  //         result.body.should.to.have.property('nModified');
  //         result.body.should.to.have.property('ok');
  //         done();
  //       })
  //   });
  // });
  //
  // describe('DELETE:/user/:id', function() {
  //   it('delete user', function(done) {
  //     chai.request(server)
  //       .delete('/user/' + userId)
  //       .end((err, result) => {
  //         result.body.should.to.have.property('status');
  //         result.body.message.should.equal('user is sucessfully deleted');
  //         result.body.status.should.equal('success');
  //         done();
  //       })
  //   });
  // });

});
