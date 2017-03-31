var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
