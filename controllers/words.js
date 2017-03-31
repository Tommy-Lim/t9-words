var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');

router.route('/')
.get(function(req, res){

  res.send({
    "data":"test data"
  })
})

module.exports = router;
