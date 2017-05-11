const Match = require('../models/match');
const User = require('../models/user');

let Relation = {
  user: {
    appendCreatedMatch: function(userId, newMatchId) {
      User.findById(userId, (err, user) => {
        let matchCreated = user.matchCreated;
        matchCreated.push(newMatchId);
        if(user.local) {
          User.update({_id: userId}, {$set:{
            'local.username': user.local.username,
            'local.email': user.local.email,
            'local.phone': user.local.phone,
            'local.password': user.local.password,
            matchCreated: matchCreated,
            matchSelected: user.matchSelected
          }}, (err, updated) => {
            if (err) {
              console.log('error in local user update');
              throw err;
            } else {
              console.log('local user is updated');
              return true;
            }
          });
        } else if (user.facebook) {
          User.update({_id: userId}, {$set:{
            'facebook.name': user.facebook.username,
            'facebook.email': user.facebook.email,
            'facebook.id': user.facebook.id,
            'facebook.token': user.facebook.token,
            matchCreated: matchCreated,
            matchSelected: user.matchSelected
          }}, (err, updated) => {
            if (err) {
              throw err;
            } else {
              console.log('facebook user is updated');
              return true;
            }
          });
        }
      });
    },
    appendSelectedMatch: function(userId, newMatchId) {
      User.findById(userId, (err, user) => {
        let matchSelected = user.matchSelected;
        matchSelected.push(newMatchId);
        if(user.local) {
          User.update({_id: userId}, {$set:{
            'local.username': user.local.username,
            'local.email': user.local.email,
            'local.phone': user.local.phone,
            'local.password': user.local.password,
            matchCreated: user.matchCreated,
            matchSelected: matchSelected
          }}, (err, updated) => {
            if (err) {
              console.log('error in local user update');
              throw err;
            } else {
              console.log('local user is updated');
              return true;
            }
          });
        } else if (user.facebook) {
          User.update({_id: userId}, {$set:{
            'facebook.name': user.facebook.username,
            'facebook.email': user.facebook.email,
            'facebook.id': user.facebook.id,
            'facebook.token': user.facebook.token,
            matchCreated: user.matchCreated,
            matchSelected: matchSelected
          }}, (err, updated) => {
            if (err) {
              throw err;
            } else {
              console.log('local user is updated');
              return true;
            }
          });
        }
      });
    },
    removeCreatedMatch: function(userId, matchId) {
      User.findById(userId, (err, user) => {
        if(err) {
          throw err;
        } else {
          let matchCreated = user.matchCreated;
          console.log('matchCreated before deletion: ', matchCreated);
          let index = matchCreated.indexOf(matchId);
          console.log('index of match to be deleted: ', index);
          if(index) {
            matchCreated.splice(index,1);
          }
          console.log('matchCreated after deletion: ', matchCreated);
          if(user.local) {
            User.update({_id: userId}, {$set:{
              'local.username': user.local.username,
              'local.email': user.local.email,
              'local.phone': user.local.phone,
              'local.password': user.local.password,
              matchCreated: matchCreated,
              matchSelected: user.matchSelected
            }}, (err, updated) => {
              if (err) {
                console.log('error in local user update');
                console.log('---------- removeCreatedMatch');
                throw err;
              } else {
                console.log('local user is updated');
                console.log('---------- removeCreatedMatch');
                return true;
              }
            });
          } else if (user.facebook) {
            User.update({_id: userId}, {$set:{
              'facebook.name': user.facebook.username,
              'facebook.email': user.facebook.email,
              'facebook.id': user.facebook.id,
              'facebook.token': user.facebook.token,
              matchCreated: matchCreated,
              matchSelected: user.matchSelected
            }}, (err, updated) => {
              if (err) {
                throw err;
              } else {
                console.log('facebook user is updated');
                return true;
              }
            });
          }
        }
      });
    },
    removeSelectedMatch: function(userId, matchId) {
      User.findById(userId, (err, user) => {
        if(user) {
          let matchSelected = user.matchSelected;
          let index = matchSelected.indexOf(matchId);
          if(index) {
            matchSelected.splice(index, 1);
          }
          if(user.local) {
            User.update({_id: userId}, {$set:{
              'local.username': user.local.username,
              'local.email': user.local.email,
              'local.phone': user.local.phone,
              'local.password': user.local.password,
              matchCreated: user.matchCreated,
              matchSelected: matchSelected
            }}, (err, updated) => {
              if (err) {
                console.log('error in local user update');
                throw err;
              } else {
                console.log('local user is updated');
                return true;
              }
            });
          } else if (user.facebook) {
            User.update({_id: userId}, {$set:{
              'facebook.name': user.facebook.username,
              'facebook.email': user.facebook.email,
              'facebook.id': user.facebook.id,
              'facebook.token': user.facebook.token,
              matchCreated: user.matchCreated,
              matchSelected: matchSelected
            }}, (err, updated) => {
              if (err) {
                throw err;
              } else {
                console.log('facebook user is updated');
                return true;
              }
            });
          }
        } else {
          console.log('user is not found');
          return false;
        }
      });
    }
  },
  match: {
    delete: function(matchId) {
      Match.findByIdAndRemove(matchId, (err, deleted) => {
        if(err) {
          throw err;
        } else {
          console.log(deleted);
        }
      });
    },
    selected: function(matchId, userId) {
      Match.findById(matchId, (err, match) => {
        if (err) {
          throw err;
        } else {
          Match.update({_id: matchId}, {$set:{
            creator: match.creator,
            against: userId,
            coordinate: match.coordinate,
            place: match.place,
            address: match.address,
            phone: match.phone,
            createdAt: match.createdAt,
            updatedAt: new Date(),
            matchTime: match.matchTime,
            openStatus: false
          }}, (err, updated) => {
            if (err) {
              console.log('goes to error in local match update');
              return false;
              throw err;
            } else {
              console.log('match is updated');
              return true;
            }
          });
        }
      });
    }
  }
}

module.exports = Relation;
