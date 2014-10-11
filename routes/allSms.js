var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-all-sms-validating', { title: 'Validating', user: username });
});

router.get('/outbox', function(req, res){
  	res.render('layout-all-sms-outbox', { title: 'Outbox', user: username });
});

router.get('/sent', function(req, res){
  	res.render('layout-all-sms-sent', {  title: 'Sent', user: username });
});

router.get('/scheduled', function(req, res){
  	res.render('layout-all-sms-scheduled', {  title: 'Schedule', user: username });
});

module.exports = router;