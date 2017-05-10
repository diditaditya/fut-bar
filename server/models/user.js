const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  local: {
    username: String,
    email: String,
    password: String,
    phone: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    username: String,
  },
  matchCreated: [{type: Schema.Types.ObjectId, ref: 'Match'}],
  matchSelected: [{type: Schema.Types.ObjectId, ref: 'Match'}]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
