const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('addWord', {word:null});
});

module.exports = router;
