var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-help', { title: 'Help', user: username, menu: {main: 'help', sub: ''} });
});

module.exports = router;