const CronJob = require('cron').CronJob;
const Kue = require('kue');
const firebase = require('firebase');
const queue = Kue.createQueue();
const User = require('../models/user');
const Match = require('../models/match');

let config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(config);

let setCronJob = function(user, match) {

  let time = match.matchTime;

  let cronJob = new CronJob('* * * * * *', function() {

  }, null, true, 'Asia/Jakarta');


}

module.exports = setCronJob;
