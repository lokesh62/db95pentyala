var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('car', { title: 'search results for car' });
});

module.exports = router;
