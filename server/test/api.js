var chai = require('chai');
var chai_http = require('chai-http');
chai.use(chai_http);
const should = chai.should();

var server = require('../app');
var User = require('../models/user');
var Match = require('../models/match');

describe('User-local', function() {

  let userId = "";

  // beforeEach((done) => {
  //   var newUser = new User({
  //     'local.username': "ivanhabib",
  //     'local.email': "ivan@habib.co.id",
  //     'local.password': "ivanhabib",
  //     'local.phone': "018771928371"
  //   })
  //   newUser.save((err, user) => {
  //     userId = user._id;
  //     done();
  //   })
  // })

  // afterEach((done) => {
  //   User.remove({}, (err) => {
  //     done();
  //   })
  // })

  describe('GET - /users', function() {
    it('should get all users', function(done) {
      chai.request(server)
        .get('/users')
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('array');
          result.body.length.should.equal(0);
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

  // describe('GET:/user/:id', function() {
  //   it('get one user data', function(done) {
  //     chai.request(server)
  //       .get('/user/'+userId)
  //       .end((err, result) => {
  //         result.should.have.status(200);
  //         result.body.should.be.a('object');
  //         result.body.author.should.be.a('object');
  //         result.body.blog.should.be.a('object');
  //         done();
  //       })
  //   });
  // });

  // describe('POST:/signUp', function() {
  //   it('create new user', function(done) {
  //     chai.request(server)
  //       .post('/register')
  //       .send({
  //         'username': "ivanhoe",
  //         'email': "ivanhoe@habib.co.id",
  //         'password': "ivanhoe",
  //         'phone': "091873491287"
  //       })
  //       .end((err, result) => {
  //         result.should.have.status(200);
          // result.body.should.be.a('object');
          // result.body.should.have.property('status');
          // result.body.should.have.property('message');
          // result.body.author.email.should.to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          // result.body.blog.website.should.to.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
          // result.body.blog.description.should.to.have.length.above(50);
          // result.body.author.address.should.to.have.length.above(20);
  //         done();
  //       })
  //   });
  // });

  // describe('POST:/signIn', function() {
  //   it('signing a user in', function(done) {
  //     chai.request(server)
  //       .post('/signin')
  //       .send({
  //         'username': "ivanhoe",
  //         'password': "ivanhoe"
  //       })
  //       .end((err, result) => {
  //         result.should.have.status(200);
  //         result.body.should.be.a('object');
  //         result.body.should.have.property('status');
  //         result.body.should.have.property('message');
          // result.body.author.email.should.to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          // result.body.blog.website.should.to.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
          // result.body.blog.description.should.to.have.length.above(50);
          // result.body.author.address.should.to.have.length.above(20);
  //         done();
  //       })
  //   });
  // });


  // describe('PUT:/user/:id', function() {
  //   it('update user data', function(done) {
  //     chai.request(server)
  //       .put('/user/'+userId)
  //       .send({
  //         'username': "temp",
  //         'email': "temp",
  //         'phone': "temp"
  //       })
  //       .end((err, result) => {
  //         result.body.ok.should.equal(1);
  //         done();
  //       })
  //   });
  // });

  // describe('DELETE:/user/:id', function() {
  //   it('delete user', function(done) {
  //     chai.request(server)
  //       .delete('/user/'+userId)
  //       .end((err, result) => {
  //         result.should.have.property('status');
  //         result.should.have.property('message');
  //         done();
  //       })
  //   });
  // });

});
