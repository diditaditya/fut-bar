const firebase = require('firebase');
const User = require('../models/user');
const Match = require('../models/match');

let config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(config);

let sendNotifToCreator = function(match) {
  let challenger = '';
  let challenger = match.against._id;
  if (match.against.local) {
    challenger = match.against.local.username;
  } else if(match.against.facebook) {
    challenger = match.against.facebook.username;
  }

  let creator = '';
  let creatorId = match.creator._id;
  if (match.creator.local) {
    creator = match.creator.local.username;
  } else if(match.creator.facebook) {
    challenger = match.creator.facebook.username;
  }

  let title = match.name;
  let place = match.place;
  let matchTime = match.matchTime;

  let message = `${creator}! You got challenge from ${challenger} for the ${title} at ${place}, ${matchTime}!`;



}
