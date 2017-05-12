const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let matchSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  against: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  coordinate: String,
  place: String,
  address: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date,
  matchTime: Date,
  openStatus: Boolean
});

let Match = mongoose.model('Match', matchSchema);

module.exports = Match;
