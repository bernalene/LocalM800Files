var models = require("../models");
var persist = require('persist');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var auth = require('./js/auth');
var graph = require('./js/graph');
var receive_result = 0;

function gd(year, month, day) {
	return new Date(year, month - 1, day).getTime();
}

function successRate(success,total){
	return Math.round((success/total)*100);
}

function graphData(err, conn, res, sql_sms_total, sql_sms_fail, sql_sms_success, username, type, array_dateFormat) {
	this.type = type;

	this.token = Math.random();
	
	this.status = 0;
	
	this.err = null;
	
	this.conn = conn;
	
	this.res = res;
	
	this.username = username;

	this.sql_sms_total = sql_sms_total;
	this.sql_sms_fail = sql_sms_fail;
	this.sql_sms_success = sql_sms_success;

	this.array_dateFormat = array_dateFormat;
	this.array_success = [];
	this.array_fail = [];
	this.array_total = [];
	this.array_rate = [];
	this.array_test = [];

	console.log('=========================');
	console.log('graphData - define variable');
	console.log('=========================');
	console.log('token = ' + this.token);
}

graphData.prototype = {
	get_total: function() {

		var obj = this;

		this.conn.runSqlAll(this.sql_sms_total, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: total');
	
			var raw_date = null, raw_total = null, array_total = [];
			
			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_total = results[i].total;

				array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
			}

			obj.status++;

			obj.array_total = obj.preProcessing(array_total);

			console.log(obj.array_total);
			console.log('=========================');

			if(obj.type == 'normal') obj.rendering();
			else obj.rendering_ajax();

		});
		// this.conn.runSqlAll(this.sql_sms_total, [], function(obj){
		// 	return function(err, results){
		// 		var raw_date = null, raw_total = null, array_total = [];
				
		// 		if(err) {return;}

		// 		for(var i in results){
		// 			raw_date = results[i].senddate;
		// 			raw_date = raw_date.split("/");
		// 			raw_total = results[i].total;

		// 			array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
		// 		}

		// 		obj.status = this.status++;
		// 		obj.array_total = array_total;
		// 		console.log('====================================');
		// 		console.log('====================================');
		// 		console.log(obj);
		// 		console.log('====================================');
		// 		console.log('====================================');

		// 	}
		// }(this));
	},
	get_fail: function() {

		var obj = this;

		this.conn.runSqlAll(this.sql_sms_fail, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: fail');

			var raw_date = null, raw_fail = null, array_fail = [];

			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_fail = results[i].total;
				
				array_fail[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_fail];
			}

			obj.status++;

			// obj.array_fail = array_fail;

			obj.array_fail = obj.preProcessing(array_fail);

			console.log(obj.array_fail);
			console.log('=========================');

			if(obj.type == 'normal') obj.rendering();
			else obj.rendering_ajax();
		});
	},
	get_suc: function() {

		var obj = this;

		this.conn.runSqlAll(this.sql_sms_success, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: success');

			var raw_date = null, raw_success = null, array_success = [];

			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_success = results[i].total;
				
				array_success[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_success];
			}

			obj.status++;

			// obj.array_success = array_success;

			obj.array_success = obj.preProcessing(array_success);

			console.log(obj.array_success);
			console.log('=========================');

			if(obj.type == 'normal') obj.rendering();
			else obj.rendering_ajax();
		});
	},
	init: function(){
		console.log('=========================');
		console.log('graphData - initialization starts');
		console.log('=========================');

		this.get_total();
		this.get_fail();
		this.get_suc();
	},
	preProcessing: function(array_preProcess){
		console.log('=========================');
		console.log('graphData - data preprocessing');

		// var raw_dateFormat = null, array_dateFormat = [];

		// for (var i = 0; i < duration; i++){
		// 	raw_dateFormat = moment().subtract(6 - i, 'days').format('YYYY/MM/DD');
		// 	raw_dateFormat = raw_dateFormat.split("/");
		// 	array_dateFormat[duration - i - 1] = [gd(raw_dateFormat[0], raw_dateFormat[1], raw_dateFormat[2]), 0];
		// }

		var array_temp = [];
		var index = 0;

		for(var i in this.array_dateFormat) {
			array_temp[i] = this.array_dateFormat[i];
		}

		if(typeof array_preProcess[0] === 'undefined'){
			console.log("array_fail is null");
			return array_temp;
		}

		for(var i in array_temp){
			if(array_temp[i][0] != array_preProcess[index][0]) {
				continue;
			}
			else {
				array_temp[i] = array_preProcess[index];
				index++;
			}
		}

		// for(var i in this.array_dateFormat) {
		// 	this.array_dateFormat[i][1] = 0;
		// }

		console.log('array_temp');
		console.log(array_temp);
		console.log('array_preProcess');
		console.log(array_preProcess);
		console.log('this.array_dateFormat');
		console.log(this.array_dateFormat);
		console.log('=========================');

		return array_temp;
	},
	postProcessing: function(){
		console.log('=========================');
		console.log('graphData - data postprocessing');
		console.log('=========================');

		for(var i in this.array_success){
			// this.array_total[i][0] = this.array_success[i][0];
			// this.array_fail[i][0] = this.array_success[i][0];
			this.array_rate[i] = [this.array_success[i][0],  successRate(this.array_success[i][1], this.array_total[i][1])];
		}
	},
	rendering: function () {
		if(this.status == 3){

			this.postProcessing();

			console.log('=========================');
			console.log('graphData - layout rendering');
			console.log('=========================');
			// var array_rate = [];

			// for(var i in this.array_success){
			// 	this.array_total[i][0] = this.array_success[i][0];
			// 	// array_fail[i][0] = array_success[i][0];
			// 	array_rate[i] = [this.array_success[i][0],  successRate(this.array_success[i][1], this.array_total[i][1])];
			// }

			this.res.render('layout-overview-volume', {
				user: this.username, 
				rate: this.array_rate, 
				totalsms: this.array_total, 
				successSMS: this.array_success, 
				failSMS: this.array_fail 
			});
		}
	},
	rendering_ajax: function () {
		if(this.status == 3){

			this.postProcessing();

			console.log('=========================');
			console.log('graphData - layout rendering ajax');
			console.log('=========================');

			this.res.send({
				user: this.username, 
				rate: this.array_rate, 
				totalsms: this.array_total, 
				successSMS: this.array_success, 
				failSMS: this.array_fail
			});
		}
	}
};

function totalProcessing(err, conn, sql_sms_total, callback) {
	conn.runSqlAll(sql_sms_total, [], function(err, results){

		if(err) {return;}

		for(var i in results){
			raw_date = results[i].senddate;
			raw_date = raw_date.split("/");
			raw_total = results[i].total;

			array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
		}
		receive_result++;
		callback();
	});
}

function failProcessing(err, conn, sql_sms_fail, callback) {
	conn.runSqlAll(sql_sms_fail, [], function(err, results){
		console.log('===================================');
		console.log(results);
		console.log('===================================');
		if(err) {return;}

		for(var i in results){
			raw_date = results[i].senddate;
			raw_date = raw_date.split("/");
			raw_fail = results[i].total;
			
			array_fail[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_fail];
		}
		receive_result++;
		callback();
	});
}

function successProcessing(err, conn, sql_sms_success, callback) {
	conn.runSqlAll(sql_sms_success, [], function(err, results){

		if(err) {return;}

		for(var i in results){
			raw_date = results[i].senddate;
			raw_date = raw_date.split("/");
			raw_success = results[i].total;
			
			array_success[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_success];
		}
		receive_result++;
		callback();
	});
}

function rendering(res) {
	if(receive_result == 2){
		for(var i in array_success){
			array_total[i][0] = array_success[i][0];
			// array_fail[i][0] = array_success[i][0];
			array_rate[i] = [array_success[i][0],  successRate(array_success[i][1], array_total[i][1])];
		}
		res.render('layout-overview-volume', {
			user: this.username, 
			rate: this.array_rate, 
			totalsms: this.array_total, 
			successSMS: this.array_success, 
			failSMS: this.array_fail 
		});
	}
}
function rendering_ajax(res) {
	if(receive_result == 2){
		for(var i in array_success){
			array_total[i][0] = array_success[i][0];
			// array_fail[i][0] = array_success[i][0];
			array_rate[i] = [array_success[i][0],  successRate(array_success[i][1], array_total[i][1])];
		}
		res.send({ user: username, rate: rate, totalsms: array_total, successSMS: array_success });
	}
}



router.use(auth);
router.use(graph);

router.get('/', function(req, res){

	var startDate = moment().subtract(7, 'days');
	var endDate = moment();
	var duration = endDate.diff(startDate, 'days');
	var raw_dateFormat = null, array_dateFormat = [];

	for (var i = 0; i < duration; i++){
		raw_dateFormat = moment().subtract(6 - i, 'days').format('YYYY/MM/DD');
		raw_dateFormat = raw_dateFormat.split("/");
		array_dateFormat[duration - i - 1] = [gd(raw_dateFormat[0], raw_dateFormat[1], raw_dateFormat[2]), 0];
	}

	console.log("===============================");
	console.log(array_dateFormat[1][1]);
	console.log("===============================");

	var sql_sms_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - 7) and status = 2 group by senddate order by senddate desc';
	var sql_sms_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - 7) and status = 2 and msgstatus = 2 group by senddate order by senddate desc';
	var sql_sms_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - 7) and status = 2 and msgstatus = 3 group by senddate order by senddate desc';

	persist.connect(function(err, conn){
		if (err) {next(err); res.render('layout-overview-volume', {user: username}); return; }

		var graphdata = new graphData(err, conn, res, sql_sms_total, sql_sms_fail, sql_sms_success, username, 'normal', array_dateFormat);
		graphdata.init();
		

		// var raw_date = null, raw_total = null, raw_success = null, raw_fail = null;
		// array_total = [], array_success = [], array_rate = [], array_fail = [];


		// // total query
		// // conn.runSqlAll(sql_sms_total, [], function(err, results){
		// // 	if(err) {return;}

		// var run_callback = function(){
		// 	rendering(res);
		// };
		// receive_result = 0;
		// totalProcessing(err, conn, sql_sms_total, run_callback);
			
		// // failProcessing(err, conn, sql_sms_fail, run_callback);

		// successProcessing(err, conn, sql_sms_success, run_callback);


			// receive_result++;
			// console.log(receive_result);
		// res.render('layout-overview-volume', {user: username, rate: rate, totalsms: total, successSMS: success });
	});	
	
	//res.render('layout-overview-volume', { user: username });
});

router.get('/distribution', function(req, res){
  	res.render('layout-overview-distribution', { user: username });
});

router.get('/record', function(req, res){
  	res.render('layout-overview-record', { user: username });
});

router.get('/record-detail', function(req, res){
  	res.render('layout-overview-record-detail', { user: username });
});

router.get('/ajax/lastxdaysfilter', function(req, res){

	var query = req.query;
	// var currentDate = moment().format('DD-MMM-YY');

	console.log("============================================================");
	//var sql_sms_total = 'select senddate, count(*) total from tb_wsms where senddate > (sysdate - 7) group by senddate order by senddate desc';

	switch(query.lastxday) {
		case 'Last 7 days':
			lastxday = 7;
			break;
		case 'Last 14 days':
			lastxday = 14;
			break;
		case 'Last 30 days':
			lastxday = 30;
			break;
		default:
			lastxday = 7;
			break;
	}

	var sql_sms_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + lastxday +  ') and status = 2 group by senddate order by senddate desc';
	var sql_sms_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + lastxday +  ') and status = 2 and msgstatus = 2 group by senddate order by senddate desc';
	var sql_sms_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + lastxday + ') and status = 2 and msgstatus = 3 group by senddate order by senddate desc';
	
	console.log(sql_sms_total);
	console.log(sql_sms_success);
	console.log("============================================================");

	persist.connect(function(err, conn){
		if (err) {next(err); res.send({user: username, rate: rate, totalsms: total, successSMS: success }); return; }

		var graphdata = new graphData(err, conn, res, sql_sms_total, sql_sms_fail, sql_sms_success, username, 'ajax');
		graphdata.init();

		// if (err) {next(err); return; }

		// // var raw_total = null, raw_success = null;
		// // var array_total, array_success;
		// // var receive_result = 0;
		// var raw_date = null, raw_total = null, raw_success = null;
		// array_total = [], array_success = [], array_rate = [];
		// var receive_result = 0;

		// var run_callback = function(){
		// 	rendering_ajax(res);
		// };

		// // totalProcessing(err, conn, sql_sms_total, run_callback);
			
		// // // failProcessing(err, conn, sql_sms_fail, run_callback);

		// // successProcessing(err, conn, sql_sms_success, run_callback);

		// // total query
		// conn.runSqlAll(sql_sms_total, [], function(err, results){
		// 	if(err) {return;}

		// 	for(var i in results){
		// 		raw_date = results[i].senddate;
		// 		raw_date = raw_date.split("/");
		// 		raw_total = results[i].total;

		// 		array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
		// 	}

		// 	 receive_result++;
		// 	// if(receive_result == 2){
		// 	// 	res.send({ user: username, rate: rate, totalsms: array_total, successSMS: array_success });
		// 	// }
		// });

		// // // success query
		// // conn.runSqlAll(sql_sms_success, [], function(err, results){
		// // 	if(err) {return;}

		// // 	successProcessing(results);

		// // 	receive_result++;
		// // 	if(receive_result == 2){
		// // 		res.send({ user: username, rate: array_rate, totalsms: array_total, successSMS: array_success });
		// // 	}
		// // });

		// // success query
		// conn.runSqlAll(sql_sms_success, [], function(err, results){
		
		// 	if(err) {return;}

		// 	for(var i in results){
		// 		raw_date = results[i].senddate;
		// 		raw_date = raw_date.split("/");
		// 		raw_success = results[i].total;
				
		// 		array_success[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_success];
		// 		array_total[i][0] = gd(raw_date[0], raw_date[1], raw_date[2]);
		// 		array_rate[i] = [gd(raw_date[0], raw_date[1], raw_date[2]),  successRate(array_success[i][1], array_total[i][1])];
		// 	}

		// 	receive_result++;
		// 	if(receive_result == 2){
		// 		res.send({ user: username, rate: rate, totalsms: array_total, successSMS: array_success });
		// 	}
		// });

	});
});

router.get('/ajax/calendarfilter', function(req, res){
	// data preprocessing
	var query = req.query;
	var currentDate = moment().format('DD-MMM-YY');

	console.log("============================================================");
	console.log(query.calendarFrom);
	console.log(query.calendarTo);
	
	// if(moment(query.calendarTo).isAfter(moment(query.calendarFrom))) {

		console.log('sql setting');

		var sql_sms_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 group by senddate order by senddate desc';

		var sql_sms_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 2 group by senddate order by senddate desc';
	
		var sql_sms_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 3 group by senddate order by senddate desc';
	// }
	
	console.log(sql_sms_total);
	console.log(sql_sms_success);
	console.log("============================================================");

	persist.connect(function(err, conn){
		if (err) {next(err); res.send({user: username, rate: rate, totalsms: total, successSMS: success }); return; }

		var graphdata = new graphData(err, conn, res, sql_sms_total, sql_sms_fail, sql_sms_success, username, 'ajax');
		graphdata.init();
		// if (err) {next(err); return; }

		// var raw_date = null, raw_total = null, raw_success = null;
		// array_total = [], array_success = [], array_rate = [];
		// var receive_result = 0;

		// // total query
		// conn.runSqlAll(sql_sms_total, [], function(err, results){
		// 	if(err) {return;}

		// 	for(var i in results){
		// 		raw_date = results[i].senddate;
		// 		raw_date = raw_date.split("/");
		// 		raw_total = results[i].total;

		// 		array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
		// 	}

		// 	receive_result++;
		// 	if(receive_result == 2){
		// 		res.send({ user: username, rate: rate, totalsms: array_total, successSMS: array_success });
		// 	}

		// });

		// // success query
		// conn.runSqlAll(sql_sms_success, [], function(err, results){
		// 	if(err) {return;}

		// 	for(var i in results){
		// 		raw_date = results[i].senddate;
		// 		raw_date = raw_date.split("/");
		// 		raw_success = results[i].total;
				
		// 		array_success[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_success];
		// 		array_total[i][0] = array_success[i][0];
		// 		array_rate[i] = [array_success[i][0],  successRate(array_success[i][1], array_total[i][1])];
		// 	}

		// 	receive_result++;
		// 	if(receive_result == 2){
		// 		res.send({ user: username, rate: rate, totalsms: array_total, successSMS: array_success });
		// 	}
		// });

		// // var run_callback = function(){
		// // 	rendering_ajax(res);
		// // };
		// // receive_result = 0;
		// // totalProcessing(err, conn, sql_sms_total, run_callback);
			
		// // // failProcessing(err, conn, sql_sms_fail, run_callback);

		// // successProcessing(err, conn, sql_sms_success, run_callback);

	});
});

//example of pass data to views from query string
// get /search?last=7&range=20140603+20140604&type=daily&contact=user1
// router.get('/', function(req, res){
// 	res.render('postpay-overview-volume', { contact: req.query.contact }); //return "user1"
// }

module.exports = router;