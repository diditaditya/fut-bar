const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

let index = require('./routes/index');

const app = express();

let db_config = {
  development: 'mongodb://localhost/futbar-dev',
  test: 'mongodb://localhost/futbar-test'
}

let app_env = app.settings.env;

mongoose.connect(db_config[app_env], function(err, res) {
  console.log('connected to database ' + db_config[app_env]);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.use('/', index);

app.listen(3000);
console.log('listening to port 3000');
