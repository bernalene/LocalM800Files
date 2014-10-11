var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-contact', { title: 'Contact Page', user: username });
});

module.exports = router;