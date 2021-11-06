"use strict";

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('addmods', {
    title: 'addmods'
  });
  var query = req.query;
  console.log("rows ".concat(query.rows));
  console.log("cols ".concat(query.cols));
  res.render('addmods', {
    title: 'Addmods',
    query: query
  });
});
module.exports = router;
//# sourceMappingURL=addmods.dev.js.map
