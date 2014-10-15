var express = require('express');
var router = express.Router();
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-template', { title: 'Template', user: username, menu: {main: 'template', sub: ''} });
});

module.exports = router;