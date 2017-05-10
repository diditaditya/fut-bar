const Match = require('../models/match');

let matchControl = {
  showAll: function(req, res) {
    Match.find({}).populate(['creator', 'against']).exec((err, matches) => {
      if(err) {
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

        Match.update({_id: req.params.matchId}, {$set:{
          coordinate: req.body.coordinate || match.coordinate,
          place: req.body.place || match.place,
          address: req.body.address || match.address,
          phone: req.body.phone || match.phone,
          createdAt: match.createdAt,
          updatedAt: new Date(),
          matchTime: req.body.matchTime || match.matchTime,
          openStatus: req.body.openStatus || match.openStatus
        }}, (err, updated) => {
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
  add: function(req, res) {
    let newMatch = new Match({
      creator: req.body.creator,
      against: null,
      coordinate: req.body.coordinate,
      place: req.body.place,
      address: req.body.address,
      phone: req.body.phone,
      createdAt: new Date(),
      matchTime: req.body.matchTime,
      openStatus: true
    });

    newMatch.save((err) => {
      if(err) {
        res.send(err);
      } else {
        res.send(newMatch);
      }
    });

  },
  delete: function(req, res) {
    Match.findByIdAndRemove(req.params.matchId, (err, match) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.matchId,
          status: 'success',
          message: 'match is sucessfully deleted'
        };
        res.send(response);
      }
    });
  }
}

module.exports = matchControl;
