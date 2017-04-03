var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
var WordsFile = require('../scripts/words.js')

// FOR USE WITH FRONT END DICT BUILDER
router.route('/all')
.get(function(req, res){
  res.send({
    words: WordsFile.words
  })
})

// For use with DB
router.route('/:id')
.get(function(req, res){
  console.log("ID", req.params.id);
  var query = req.params.id + "";
  models.Key.findOne({
    Key: query
  }, function(err, key){
    console.log(err, key);
    if(!key){
      res.send({
        data: []
      })
    } else{
      res.send({
        data: key.Words
      })
    }
  })
})

module.exports = router;
