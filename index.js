var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

// FOR USE WITH DB ITERATION
// var mongoose = require('mongoose');
// var models = require('./models/schemas');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// API
app.use('/api/words', require('./controllers/words'));


app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
