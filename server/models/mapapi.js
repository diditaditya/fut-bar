require('dotenv').config();
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});


module.exports = {
  getmap: (callback) => {
    googleMapsClient.places({
      query: 'futsal',
      location: [-6.260703, 106.781560],
      radius: 100
    }, function(err, response) {
      if (!err) {
        callback(null, response.json.results);
      } else {
        callback({
          message: 'Error getmap.'
        }, null);
      }
    });
  },
  getdetail: (id, callback) => {
    googleMapsClient.place({
      placeid: id
    }, function(err, responses) {
      if (!err) {
        callback(null, responses.json.result);
      } else {
        callback({
          message: 'Error getmap.'
        }, null);
      }
    });
  }
}
