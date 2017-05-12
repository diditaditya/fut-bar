const CronJob = require('cron').CronJob;
const Kue = require('kue');
const queue = Kue.createQueue();
const sendmail = require('sendmail')();
const User = require('../models/user');
const Match = require('../models/match');

function sendEmail(job, done) {
  sendmail({
    from: 'no-reply@futbar.com',
    to: job.data.email,
    subject: job.data.name,
    html: job.data.message,
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
  done();
}

let setCronJob = function(user, match) {

  console.log('cron-job is called!');

  let user = {};
  if(user.local) {
    user = user.local;
  } else if(user.facebook) {
    user = user.facebook;
  }

  let title = match.name;
  let matchTime = match.matchTime;
  let place = match.place;

  let month = matchTime.getMonth();
  let date = matchTime.getDate();
  let hour = matchTime.getHours()-1;
  let minute = matchTime.getMinutes();

  let setTime = `0 ${minute} ${hour} ${date} ${month} *`;

  let message = `${user.username}, you have futsal match ${title} at ${place} ${matchTime}! Be there and win the match!`;

  let cronJob = new CronJob(setTime, function() {
    let job = queue.create('email', {
      message: message,
      email: user.email,
      subject: title
    }).save(function(err) {
      if(!err) console.log(job.id);
      console.log('Error sending email');
    });

    queue.process('email', function(job, done) {
      sendEmail(job, done);
    });

  }, null, true, 'Asia/Jakarta');

}


module.exports = setCronJob;
