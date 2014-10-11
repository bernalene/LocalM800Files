var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-draft', { title: 'Draft Page', user: username });
});

router.get('/edit', function(req, res){
  	res.render('layout-draft-edit', { title: 'Draft Edit Page', user: username });
});

module.exports = router;