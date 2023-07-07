var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',number:20 });
});
router.get('/wlit', function(req, res, next) {
  res.render('index', { title: 'WLIT', number:10});

});

module.exports = router;
