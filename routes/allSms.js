var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-all-sms-validating', { title: 'Validating', user: username, menu: {main: 'all-sms', sub: 'validating'} }); 
});

router.get('/outbox', function(req, res){
  	res.render('layout-all-sms-outbox', { title: 'Outbox', user: username, menu: {main: 'all-sms', sub: 'outbox'} });
});

router.get('/detail', function(req, res){
  	res.render('layout-all-sms-outbox-detail', { title: 'Record Detail', user: username, taskname: 'Task Name', menu: {main: 'all-sms', sub: 'outbox'} });
});

router.get('/sent', function(req, res){
  	res.render('layout-all-sms-sent', {  title: 'Sent', user: username, menu: {main: 'all-sms', sub: 'sent'} });
});

router.get('/scheduled', function(req, res){
  	res.render('layout-all-sms-scheduled', {  title: 'Schedule', user: username, menu: {main: 'all-sms', sub: 'scheduled'} });
});

router.get('/scheduled/with-calendar', function(req, res){
  	res.render('layout-all-sms-scheduled', {  title: 'Schedule', user: username, menu: {main: 'all-sms', sub: 'scheduled'} });
});

router.get('/scheduled/detail', function(req, res){
  	res.render('layout-all-sms-scheduled-detail', {  title: 'Schedule', user: username, taskname: 'Task Name', menu: {main: 'all-sms', sub: 'scheduled'} });
});

module.exports = router;