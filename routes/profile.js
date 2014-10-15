var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-profile', { title: 'Profile Account Info Page', user: username,  menu: {main: 'profile', sub: 'account-info'} });
});

router.get('/change-password', function(req, res){
  	res.render('layout-profile-pw', { title: 'Profile Change Password Page', user: username,  menu: {main: 'profile', sub: 'password'} });
});

module.exports = router;