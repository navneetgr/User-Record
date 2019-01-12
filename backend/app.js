var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var router = require('./routes/routes');

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdata', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("DB connection alive");
});

app.use('/api', router);

app.listen(port);
console.log('Server bind on port ' + port);