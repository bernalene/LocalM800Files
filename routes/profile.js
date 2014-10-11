var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-profile', { title: 'Profile Account Info Page', user: username });
});

router.get('/pw', function(req, res){
  	res.render('layout-profile-pw', { title: 'Profile PW Page', user: username });
});

module.exports = router;