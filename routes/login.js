var express = require('express');
var type = require('type-of-is');
var router = express.Router();
var crypto = require('crypto');
var http = require('http');
var moment = require('moment');
var auth = require('./js/auth');
var isEmpty = false;
var alert = '';
var changePW = false;

function authenticate(user, pw, fn) {
 // 	var reqLogin = {
	// 	id: "1223434",
	// 	account: {
	// 		loginName: user,
	// 		password: pw,
	// 		SSOToken: "12345555t6"
	// 	}
	// }

	// var reqLoginString = JSON.stringify(reqLogin);

	// var headers = {
	//   	'Content-Type': 'application/json',
	//   	'Content-Length': reqLoginString.length
	// };

	// var options = {
	// 	host: 'myServer.example.com',
	// 	port: 80,
	// 	path: '/api/webSMSLogin',
	// 	method: 'POST',
	// 	headers: headers
	// };

	// var request = http.request(options, function(response) {
	// 	response.setEncoding('utf-8');

	// 	var responseString = '';

	// 	response.on('data', function(data) {
	// 		responseString += data;
	// 	});

	// 	response.on('end', function() {
	// 		var resultObject = JSON.parse(responseString);
	// 	});
	// });
	
	// request.on('error', function(err) {

	// });

	// request.write(reqLoginString);
	// request.end();
	var apiResponse = 'loginFailed';
	console.log('enter authenticate function');
	switch(user) {
		case 'king':
		console.log('in king case');
			var responseString = {
				id: "1325fd",
				success: true,
				result: {
					account: {
						contactId: '2201',
						lastPwdDate: '2014-7-19 3:21:43',
						isContactAdmin: true
					}
				}
			}
			var responseString = JSON.stringify(responseString);
			console.log('case king');
			break;
		case 'teresa':
			var responseString = {
				id: "3249kj",
				success: true,
				result: {
					account: {
						contactId: '2201',
						lastPwdDate: '2014-4-19 3:21:43',
						isContactAdmin: true
					}
				}
			}
			var responseString = JSON.stringify(responseString);
			console.log('case teresa');
			break;
		case 'tommy':
			var responseString = {
				id: "93d381",
				success: false,
				error: {
					code: 10001,
					description: 'Compulsory field'
				}
			}
			var responseString = JSON.stringify(responseString);
			console.log('in tommy case');
			break;
		default:
			console.log("in authenticate function swtich default case");
			var responseString = '';
			break;
	}

	console.log('responseString = %s', responseString);

	if (responseString != '') {
		console.log('null ok');
		var resultObject = JSON.parse(responseString);
		var loginSuccess = resultObject['success'];

		if (loginSuccess) {
			var moment = require('moment');
			var lastPwdDate = moment(resultObject['result']['account']['lastPwdDate'], 'YYYY-M-DD HH:mm:ss');
			var currentDate = moment(moment(new Date()), 'YYYY-M-DD HH:mm:ss');
			var secondsDiff = currentDate.diff(lastPwdDate, 'seconds');

			if (secondsDiff <= '7776000') {
				apiResponse = 'showOverviewPage';
			} else {
				apiResponse = 'showChangePwPage';
			}
		} else {
			apiResponse = 'loginFailed';
		}
	}
		console.log("outside switch");
		console.log("apiResponse: %s", apiResponse);
	fn(apiResponse);
}

/* GET login page. */
router.get('/', function(req, res) {
	var u = "unest";
	if (req.session.user){
		u = req.session.user;
		//res.redirect('/overview?user='+req.session.user);
	}

	if (isEmpty) {
		alert1 = 'Please input username and password.';
		isEmpty = false;
	} else {
		alert1 = '';
	}

	if (changePW) {
		alert2 = 'Password Incorrect. Please check again and contact customer service noc@m800.com';
		changePW = false;
	} else {
		alert2 = '';
	}
  	res.render('layout-login', { alerts: alert1 + alert2});
}).post('/', function(req, res){
 	var user = req.body.user.trim();
 	var pw = req.body.password.trim();

 	if (user == '' || pw == '') {
 		console.log('user is null???');
 		isEmpty = true;
 		res.redirect('/login');
 	} else {
 		isEmpty = false;

 		var shasum = crypto.createHash('sha1');
 		shasum.update(pw);
 		pw = shasum.digest('hex');
 		console.log(pw);
 		authenticate(user, pw, function(apiResponse){
 			console.log('yyyyyyyyyyyyyyy authenticate function ran');
 			switch(apiResponse) {
 				case 'showOverviewPage':
 					console.log('showOverviewPage');
			 		//req.session.regenerate(function(){
					req.session.user = user;
				 	//});
					if(req.session.user){
						//console.log('session: &j', req.session);
						//res.redirect('/test?user='+req.session.user); 
						res.redirect('/overview');
					}
					break;
				case 'showChangePwPage':
					console.log('showChangePwPage');
			 		//req.session.regenerate(function(){
					req.session.user = user;
				 	//});
					if(req.session.user){
						//console.log('session: &j', req.session);
						res.redirect('/login/changepassword'); 
					}
					break;
				case 'loginFailed':
					console.log('loginFailed');
					changePW = true;
					res.redirect('/login');
					break;
				default:
					console.log('loginFailed');
					changePW = true;
					res.redirect('/login');
					break;
 			}
 		});
	}
});

//Authentication middleware
router.use(auth);

router.get('/logout', function(req, res) {
    req.session.destroy(function () {
        res.redirect('/login');
    });
});

router.get('/test', function(req, res){
  	res.render('test', { title: req.session.user });
});

router.get('/changepassword', function(req, res){
	res.render('layout-login-change-password', { title: 'Please Change Password!'});
});

module.exports = router;

