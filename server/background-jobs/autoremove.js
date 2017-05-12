const CronJob = require('cron').CronJob;
const Kue = require('kue');
const queue = Kue.createQueue();
const User = require('../models/user');
const Match = require('../models/match');

function removeMatch(job, done) {
  Match.findById(job.data.id, (err, match) => {
    if(err) {
      console.log(err);
      done(err);
    } else {
      Match.update({_id: job.data.id}, {
        $set: {
          creator: match.creator,
          against: match.against,
          name: match.name,
          coordinate: match.coordinate,
          place_id: match.place_id,
          place: match.place,
          address: match.address,
          phone: match.phone,
          createdAt: match.createdAt,
          updatedAt: new Date(),
          matchTime: match.matchTime,
          openStatus: match.openStatus,
          expire: true
        }
      }, (err, updated) => {
        if(err) {
          console.log(err);
          done();
        } else {
          console.log('match has expired');
        }
      });
    }
  });
}

let autoRemove = function(userData, match) {

  // console.log('cron-job is called!');

  let id = match._id;

  let title = match.name;
  let matchTime = match.matchTime;
  let place = match.place;

  let month = matchTime.getMonth();
  let date = matchTime.getDate();
  let hour = matchTime.getHours() - 1;
  let minute = matchTime.getMinutes();

  let setTime = `0 ${minute} ${hour} ${date} ${month} *`;

  let cronJob = new CronJob(setTime, function() {
    let job = queue.create('remove', {
      id: id
    }).save(function(err) {
      if (!err) console.log(job.id);
      console.log('Error sending email');
    });

    queue.process('remove', function(job, done) {
      removeMatch(job, done);
    });

  }, null, true, 'Asia/Jakarta');

}


module.exports = autoRemove;
