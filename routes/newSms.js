var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-new-sms-step1', { user: username });
});

router.get('/simple', function(req, res){
  	res.render('layout-new-sms-simple', { title: 'Simple SMS', user: username });
});

router.get('/excel', function(req, res){
  	res.render('layout-new-sms-excel', { title: 'Excel SMS', user: username });
});

router.get('/excel/with-schedule', function(req, res){
  	res.render('layout-new-sms-excel', { title: 'Excel SMS', user: username });
});

router.get('/merger', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username });
});

router.get('/merger/with-schedule', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username });
});

router.get('/merger/preview', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username });
});

router.get('/confirm', function(req, res){
  	res.render('layout-new-sms-confirm', { title: 'Simple SMS', user: username });
});

module.exports = router;