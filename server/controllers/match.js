const Match = require('../models/match');
const User = require('../models/user');
var map = require('../models/mapapi');
const Relation = require('../helpers/relation.js');
const CronJob = require('../background-jobs/cron-job');

let matchControl = {
  showAll: function(req, res) {
    Match.find({}).populate(['creator', 'against']).exec((err, matches) => {
      if (err) {
        res.send(err);
      } else {
        res.send(matches);
      }
    });
  },
  showById: function(req, res) {
    let method = req.params.login_method;
    Match.findById(req.params.matchId).populate(['creator', 'against']).exec((err, match) => {
      if (err) {
        res.send(err);
      } else {
        res.send(match);
      }
    });
  },
  update: function(req, res) {
    Match.findById(req.params.matchId, (err, match) => {
      if (err) {
        res.send(err);
      } else {
        let creator = req.body.creator;
        let against = req.body.against || match.against;

        Match.update({
          _id: req.params.matchId
        }, {
          $set: {
            creator: creator,
            against: against,
            name: req.body.name || match.name,
            coordinate: req.body.coordinate || match.coordinate,
            place_id: req.body.place_id || match.place_id,
            place: req.body.place || match.place,
            address: req.body.address || match.address,
            phone: req.body.phone || match.phone,
            createdAt: match.createdAt,
            updatedAt: new Date(),
            matchTime: req.body.matchTime || match.matchTime,
            openStatus: req.body.openStatus || match.openStatus
          }
        }, (err, updated) => {
          if (err) {
            console.log('goes to error in local match update');
            res.send(err);
          } else {
            console.log('match is updated');
            res.send(updated);
          }
        });
      }
    });
  },
  create: function(req, res) {
    let newMatch = new Match({
      creator: req.body.creator,
      against: null,
      coordinate: req.body.coordinate,
      name: req.body.name,
      place_id: req.body.place_id,
      place: req.body.place,
      address: req.body.address,
      phone: req.body.phone,
      createdAt: new Date(),
      matchTime: req.body.matchTime,
      openStatus: true
    });

    newMatch.save((err) => {
      if (err) {
        res.send(err);
      } else {
        Relation.user.appendCreatedMatch(req.body.creator, newMatch._id);
        User.findById(req.body.creator, (err, user) => {
          if(err) {
            res.send(err);
          } else {
            CronJob(user, newMatch);
          }
        }).
        res.send(newMatch);
      }
    });

  },
  delete: function(req, res) {
    Match.findByIdAndRemove(req.params.matchId, (err, match) => {
      if (err) {
        res.send(err);
      } else {
        // let removeFromCreated = Relation.user.removeCreatedMatch(match.creator, req.params.matchId);
        // let removeFromSelected = Relation.user.removeSelectedMatch(match.against, req.params.matchId);
        // console.log('removeFromCreated: ', removeFromCreated);
        // console.log('removeFromSelected: ', removeFromSelected);
        let response = {};
        // if (removeFromCreated && removeFromSelected) {
        //   response.status = 'success';
        //   response.message = 'match has been deleted, and users have been updated';
        // } else {
        //   response.status = 'failed',
        //     response.message = 'match has been deleted, but users are not updated';
        // }
        response.status = 'success';
        response.message = 'match has been deleted';
        res.send(response);
      }
    });
  },
  selected: function(req, res) {
    let matchSelect = Relation.match.selected(req.params.matchId, req.body.userId);
    let appendSelected = Relation.user.appendSelectedMatch(req.body.userId, req.params.matchId);
    let response = {};
    User.findById(req.body.userId, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        Match.findById(req.params.matchId, (err, match) => {
          if(err) {
            res.send(err);
          } else {
            CronJob(user, match);
          }
        });
      }
    });
    if (matchSelect && appendSelected) {
      response.status = 'success';
      response.message = 'match and user have been updated';
    } else {
      response.status = 'failed',
        response.message = 'match and/or user are not updated';
    }
    res.send(response);
  },
  place: (req, res) => {
    map.getmap(function(err, result) {
      if (!err) {
        res.send(result.slice(0, 5));
      } else {
        res.send(err);
      }
    })
  },
  pdetail: (req, res) => {
    map.getdetail(req.body.id, function(err, result) {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    })
  }
}

module.exports = matchControl;
