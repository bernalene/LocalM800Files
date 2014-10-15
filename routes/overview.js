var models = require("../models");
var persist = require('persist');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var auth = require('./js/auth');
var graph = require('./js/graph');

function gdMonth(year, month) {
 	return new Date(year, month-1).getTime();
 }

function gd(year, month, day) {
	return new Date(year, month - 1, day).getTime();
}

function successRate(success,total){
	return Math.round((success/total)*100);
}

function graphData(err, conn, res, sql_volume_total, sql_volume_fail, sql_volume_success, username, type, array_dateFormat, dispMode) {
	this.type = type;

	this.token = Math.random();
	
	this.status = 0;
	
	this.err = null;
	
	this.conn = conn;
	
	this.res = res;
	
	this.username = username;

	this.dispMode = dispMode;

	this.sql_volume_total = sql_volume_total;
	this.sql_volume_fail = sql_volume_fail;
	this.sql_volume_success = sql_volume_success;

	this.array_dateFormat = array_dateFormat;
	this.array_success = [];
	this.array_fail = [];
	this.array_total = [];
	this.array_rate = [];

	console.log('=========================');
	console.log('graphData - define variable');
	console.log('=========================');
	console.log('token = ' + this.token);
}

graphData.prototype = {
	get_total: function() {

		var obj = this;

		this.conn.runSqlAll(this.sql_volume_total, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: total');
			console.log(results);
			console.log('=========================');
	
			var raw_date = null, raw_total = null, array_total = [];
			
			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_total = results[i].total;

				if (obj.dispMode === 'month') {
					array_total[i] = [gdMonth(raw_date[0], raw_date[1]), raw_total];
				}
				else
					array_total[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_total];
			}

			obj.status++;

			obj.array_total = obj.preProcessing(array_total);

			if(obj.type == 'normal') obj.rendering();
			else obj.rendering_ajax();

		});
	},
	get_fail: function() {

		var obj = this;
		console.log(this.sql_volume_fail);
		this.conn.runSqlAll(this.sql_volume_fail, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: fail');
			console.log(results);

			var raw_date = null, raw_fail = null, array_fail = [];

			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_fail = results[i].fail;
				
				if (obj.dispMode === 'month')
					array_fail[i] = [gdMonth(raw_date[0], raw_date[1]), raw_fail];
				else
					array_fail[i] = [gd(raw_date[0], raw_date[1], raw_date[2]), raw_fail];
			}

			obj.status++;

			// obj.array_fail = array_fail;
			console.log(array_fail);

			obj.array_fail = obj.preProcessing(array_fail);

			console.log(obj.array_fail);
			console.log('=========================');

			if(obj.type == 'normal') obj.rendering();
			else obj.rendering_ajax();
		});
	},
	get_success: function() {

		var obj = this;
		console.log(this.sql_volume_success);
		this.conn.runSqlAll(this.sql_volume_success, [], function(err, results){

			console.log('=========================');
			console.log('graphData - query ::: success');

			var raw_date = null, raw_success = null, array_success = [];

			if(err) {return;}

			for(var i in results){
				raw_date = results[i].senddate;
				raw_date = raw_date.split("/");
				raw_success = results[i].success;
				
				if (obj.dispMode === 'month')
					array_success[i] = [gdMonth(raw_date[0], raw_date[1]), raw_success];
				else
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
		this.get_success();
	},
	preProcessing: function(array_preProcess){
		console.log('=========================');
		console.log('graphData - data preprocessing');

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
			console.log(array_preProcess);
			console.log(array_temp);
			if(index < array_preProcess.length){
				if(array_temp[i][0] == array_preProcess[index][0]) {

					array_temp[i] = array_preProcess[index];
					index++;
				}
				else {
					continue;
				}
			}		
		}

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
			this.array_rate[i] = [this.array_success[i][0],  successRate(this.array_success[i][1], this.array_total[i][1])];
		}
	},
	rendering: function () {
		if(this.status == 3){

			this.postProcessing();

			console.log('=========================');
			console.log('graphData - layout rendering');
			console.log('=========================');

			this.res.render('layout-overview-volume', {
				user: this.username, 
				rate: this.array_rate, 
				totalSMS: this.array_total, 
				successSMS: this.array_success, 
				failSMS: this.array_fail,
				view: 'volumne',
				menu: {main: 'overview', sub: 'overview'}
			});
		}
	},
	rendering_ajax: function () {
		if (this.status == 3) {

			this.postProcessing();

				console.log('=========================');
				console.log('graphData - layout rendering ajax');
				console.log('=========================');


			if (this.dispMode === 'month') {
				console.log(this.array_total);
				console.log(this.array_rate);
				this.res.send({
					user: this.username, 
					rateMonth: this.array_rate, 
					totalSMSMonth: this.array_total, 
					successSMSMonth: this.array_success, 
					failSMSMonth: this.array_fail,
					menu: {main: 'overview', sub: 'overview'}
				});
			} else {
				
				this.res.send({
					user: this.username, 
					rate: this.array_rate, 
					totalSMS: this.array_total, 
					successSMS: this.array_success, 
					failSMS: this.array_fail,
					menu: {main: 'overview', sub: 'overview'}
				});
			}
		}
	}
};

function recordData(err, conn, res, sql_record, sql_record_count, username, displayMode, page, url, type) {
	this.type = type;

	this.displayMode = displayMode;

	this.token = Math.random();
	
	this.status = 0;
	
	this.err = null;
	
	this.conn = conn;
	
	this.res = res;
	
	this.username = username;

	this.recordPage = page;

	this.recordPages = 1;

	this.prev = page;

	this.nxt = page;

	this.url = url;

	this.sql_record = sql_record;
	this.sql_record_count = sql_record_count;

	this.record_data = [];
	this.sms_stat = [];

	console.log('=========================');
	console.log('recordData - define variable');
	console.log('=========================');
	console.log('token = ' + this.token);
}

recordData.prototype = {
	get_record: function() {

		var obj = this, perPage = 10;

		this.conn.runSqlAll(this.sql_record, [], function(err, results){

			console.log('=========================');
			console.log(obj.sql_record);
			console.log('recordData - query ::: record');
			console.log(results);
			console.log('=========================');
			
			if (err) {return;}
			
			if (obj.displayMode == 'month') {
				for (var i in results) {
					obj.record_data[i] = [
											results[i].destaddrctyid, 
											results[i].total + ' / ' + results[i].success + ' / ' + results[i].fail + ' / ' + results[i].waiting, 
											results[i].senddate_r
										];
				}
			} else {
				for (var i in results) {
					obj.record_data[i] = [
											results[i].destaddrctyid, 
											results[i].total + ' / ' + results[i].success + ' / ' + results[i].fail + ' / ' + results[i].waiting, 
											moment(results[i].senddate_r).format("DD/MM/YYYY")
										];
				}
			}

			obj.status++;
			obj.postProcessing();
		});
	},
	get_count: function() {

		var obj = this, perPage = 10;

		this.conn.runSqlAll(this.sql_record_count, [], function(err, results) {

			console.log('=========================');
			console.log('recordData - query ::: pages count');
			console.log(results);
			console.log('=========================');
			
			if(err) {return;}

			obj.recordPages = results[0].count / perPage;

			if (results[0].count % perPage > 0) {
				obj.recordPages++;
			}

			obj.status++;
			obj.postProcessing();
		});
	},
	init: function() {

		console.log('=========================');
		console.log('recordData - initialization starts');
		console.log('=========================');

		this.get_record();
		this.get_count();
	},
	postProcessing: function() {

		if (this.status == 2) {
			console.log('=========================');
			console.log('recordData - data postprocessing');
			console.log('=========================');

			this.nxt++;

			if (this.recordPage > 1) {
				this.prev--;
			}

			if (this.nxt > this.recordPages)
				this.nxt--;

			console.log(this.record_data);
			console.log(this.recordPage);
			console.log(this.recordPages);
			console.log(this.prev);
			console.log(this.nxt);

			if(this.type == 'normal') this.rendering();
			else this.rendering_ajax();
		}

	},
	rendering: function () {

		console.log('=========================');
		console.log('recordData - layout rendering');
		console.log('=========================');

		this.res.render('layout-overview-record', { 
			user: username, 
			record: this.record_data,
			url: this.url,
			totalPage: this.recordPages, 
			currentPage: this.recordPage,
			prev: this.prev,
			nxt: this.nxt,
			menu: {main: 'overview', sub: 'record'}
		});

	},
	rendering_ajax: function () {
		console.log('=========================');
		console.log('recordData - layout rendering ajax');
		console.log('=========================');


		if (this.dispMode === 'month') {
			console.log(this.array_total);
			console.log(this.array_rate);
			this.res.send({
				user: this.username, 
				rateMonth: this.array_rate, 
				totalSMSMonth: this.array_total, 
				successSMSMonth: this.array_success, 
				failSMSMonth: this.array_fail,
				menu: {main: 'overview', sub: 'record'}
			});
		} else {
			
			this.res.send({
				user: username, 
				record: this.record_data,
				url: this.url,
				totalPage: this.recordPages, 
				currentPage: this.recordPage,
				prev: this.prev,
				nxt: this.nxt,
				menu: {main: 'overview', sub: 'record'}
			});
		}
	}
};

router.use(auth);
router.use(graph);

router.get('/', function(req, res) {

	// var startDate = moment().subtract(7, 'days');
	// var endDate = moment();
	var duration = 7, raw_dateFormat = null, array_dateFormat = [];

	for (var i = 0; i < duration; i++) {
		raw_dateFormat = moment().subtract(duration - i - 1, 'days').format('YYYY/MM/DD');
		raw_dateFormat = raw_dateFormat.split("/");
		array_dateFormat[duration - i - 1] = [gd(raw_dateFormat[0], raw_dateFormat[1], raw_dateFormat[2]), 0];
	}

	var sql_volume_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 group by senddate order by senddate desc';
	var sql_volume_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) success from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 and msgstatus = 2 group by senddate order by senddate desc';
	var sql_volume_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by senddate order by senddate desc';

	persist.connect(function(err, conn){
		if (err) {next(err); res.render('layout-overview-volume', {user: username, menu: {main: 'overview', sub: 'overview'}}); return; }

		var graphdata = new graphData(err, conn, res, sql_volume_total, sql_volume_fail, sql_volume_success, username, 'normal', array_dateFormat);
		graphdata.init();

	});	

});

router.get('/distribution', function(req, res){
	console.log(markers);
  	res.render('layout-overview-distribution', { user: username, marker: markers,  menu: {main: 'overview', sub: 'distribution'} });
});

router.get('/record', function(req, res){

	var query = req.query, page, duration, url = "record", displayMode;
	console.log('========== debug only ==========');
	console.log(query);
	console.log('========== debug only ==========');

	// displayMode = query.displaymode;

	if (typeof query.page === 'undefined')
		page = 1;
	else 
		page = query.page;

	// if (displayMode == 'month') {

	// 	duration = 90;
	// 	url = url + "?displaymode=" + displayMode;

	// 	var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
	// 						'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
	// 						'select destaddrctyid, to_char(senddate, \'mm/yyyy\') senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by to_char(senddate, \'mm/yyyy\'), DESTADDRCTYID) total_t ' +
	// 						'left join(' +
	// 						'select destaddrctyid, to_char(senddate, \'mm/yyyy\') senddate_r, sum(msglength) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by to_char(senddate, \'mm/yyyy\'), DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
	// 						'left join (' +
	// 						'select destaddrctyid, to_char(senddate, \'mm/yyyy\') senddate_r, sum(msglength) success from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 2 group by to_char(senddate, \'mm/yyyy\'), DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
	// 						'left join(' +
	// 						'select destaddrctyid, to_char(senddate, \'mm/yyyy\') senddate_r, sum(msglength) waiting from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 1 group by to_char(senddate, \'mm/yyyy\'), DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
	// 						' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
	// 	var sql_record_count = 'select count(*) count from (select destaddrctyid, to_char(senddate, \'mm/yyyy\') senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by to_char(senddate, \'mm/yyyy\'), DESTADDRCTYID)';

	// } else {
	// if (typeof query.lastxday === 'undefined') {
	duration = 7;
	// url = url + "?displaymode=" + displayMode;
	// }	
	// else {
	// 	url = url + "?displaymode=" + displayMode + "&lastxday=" + query.lastxday;
	// 	switch(query.lastxday) {
	// 		case 'Last 7 days':
	// 			duration = 7;
	// 			break;
	// 		case 'Last 14 days':
	// 			duration = 14;
	// 			break;
	// 		case 'Last 30 days':
	// 			duration = 30;
	// 			break;
	// 		default:
	// 			duration = 7;
	// 			break;
	// 	}
	// }


	// if (typeof query.calendarFrom === 'undefined' || typeof query.calendarTo === 'undefined') {

	var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
						'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
						'select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID) total_t ' +
						'left join(' +
						'select destaddrctyid, senddate senddate_r, sum(msglength) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by senddate, DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
						'left join (' +
						'select destaddrctyid, senddate senddate_r, sum(msglength) success from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 2 group by senddate, DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
						'left join(' +
						'select destaddrctyid, senddate senddate_r, sum(msglength) waiting from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 1 group by senddate, DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
						' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
	var sql_record_count = 'select count(*) count from (select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID)';
	// } 
	// else {

	// 	url = url + "?displaymode=" + displayMode + "&calendarFrom=" + query.calendarFrom + "&calendarTo=" + query.calendarTo;

	// 	var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
	// 						'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
	// 						'select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' group by senddate, DESTADDRCTYID) total_t ' +
	// 						'left join(' +
	// 						'select destaddrctyid, senddate senddate_r, sum(msglength) fail from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 3 group by senddate, DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
	// 						'left join (' +
	// 						'select destaddrctyid, senddate senddate_r, sum(msglength) success from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 2 group by senddate, DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
	// 						'left join(' +
	// 						'select destaddrctyid, senddate senddate_r, sum(msglength) waiting from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 1 group by senddate, DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
	// 						' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;

	// 	var sql_record_count = 'select count(*) count from (select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' group by senddate, DESTADDRCTYID)';

	// }
	// }
	
	persist.connect(function(err, conn) {
		if (err) {next(err); res.render('layout-overview-record', { user: username,  menu: {main: 'overview', sub: 'record'} }); return; }

		var recorddata = new recordData(err, conn, res, sql_record, sql_record_count, username, displayMode, page, url, 'normal');
		recorddata.init();
	});
});

router.get('/record-detail', function(req, res){
  	// res.render('layout-overview-record-detail', { title: 'Record Detail', user: username, taskname: 'Task Name' });
  	res.render('layout-overview-record-detail', { user: username,  menu: {main: 'overview', sub: 'record'} });
});

router.get('/ajax/lastxdaysfilter', function(req, res){

	var query = req.query, duration = null;

	switch(query.lastxday) {
		case 'Last 7 days':
			duration = 7;
			break;
		case 'Last 14 days':
			duration = 14;
			break;
		case 'Last 30 days':
			duration = 30;
			break;
		default:
			duration = 7;
			break;
	}

	if (query.view == "Volume") {

		var raw_dateFormat = null, array_dateFormat = [];

		for (var i = 0; i < duration; i++) {
			raw_dateFormat = moment().subtract(duration - i - 1, 'days').format('YYYY/MM/DD');
			raw_dateFormat = raw_dateFormat.split("/");
			array_dateFormat[duration - i - 1] = [gd(raw_dateFormat[0], raw_dateFormat[1], raw_dateFormat[2]), 0];
		}

		var sql_volume_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 group by senddate order by senddate desc';
		var sql_volume_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) success from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 and msgstatus = 2 group by senddate order by senddate desc';
		var sql_volume_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by senddate order by senddate desc';

		console.log("============================================================");
		console.log("array_dateFormat");
		console.log(array_dateFormat);
		console.log('sql_volume_total');
		console.log(sql_volume_total);
		console.log("============================================================");

		persist.connect(function(err, conn){
			if (err) {next(err); res.send({user: username}); return; }

			var graphdata = new graphData(err, conn, res, sql_volume_total, sql_volume_fail, sql_volume_success, username, 'ajax', array_dateFormat);
			graphdata.init();
		});
	}

	if (query.view == "Distribution") {
		console.log(markers);
  		res.send({ user: username, marker: markers });
	}

	if (query.view == "Record") {

		if (typeof query.page === 'undefined')
			var page = 1;
		else 
			var page = query.page;

		if (typeof query.lastxday === 'undefined') {
			duration = 7;
			// url = url + "?displaymode=" + displayMode;
		}	
		else {
			// url = url + "?displaymode=" + displayMode + "&lastxday=" + query.lastxday;
			switch(query.lastxday) {
				case 'Last 7 days':
					duration = 7;
					break;
				case 'Last 14 days':
					duration = 14;
					break;
				case 'Last 30 days':
					duration = 30;
					break;
				default:
					duration = 7;
					break;
			}
		}

		var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
							'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID) total_t ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by senddate, DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
							'left join (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) success from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 2 group by senddate, DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) waiting from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 1 group by senddate, DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
							' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
		var sql_record_count = 'select count(*) count from (select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID)';
	
		persist.connect(function(err, conn) {
			if (err) {next(err); res.send({ user: username }); return; }

			var recorddata = new recordData(err, conn, res, sql_record, sql_record_count, username, 'Day', page, '', 'ajax');
			recorddata.init();
		});
	}

	
});

router.get('/ajax/calendarfilter', function(req, res){

	var query = req.query;

	if (query.view == "Volume") {

		var startDate = null, endDate = null, duration = null, raw_dateFormat = null, array_dateFormat = [];

		startDate = moment(query.calendarFrom, "DD-MMM-YY");
		endDate = moment(query.calendarTo, "DD-MMM-YY");
		console.log(startDate);
		console.log(endDate);
		duration =  endDate.diff(startDate, 'days') + 1;

		for (var i = 0; i < duration; i++) {
			if(i == 0) {
				raw_dateFormat = startDate.format('YYYY/MM/DD');
				console.log(raw_dateFormat);
			} else {
				raw_dateFormat = startDate.add(1, 'days').format('YYYY/MM/DD');
				console.log(raw_dateFormat);
			}
				raw_dateFormat = raw_dateFormat.split("/");
				array_dateFormat[duration - i - 1] = [gd(raw_dateFormat[0], raw_dateFormat[1], raw_dateFormat[2]), 0];	
		}

		if(duration > 0) {

			var sql_volume_total = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 group by senddate order by senddate desc';
			var sql_volume_success = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) success from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 2 group by senddate order by senddate desc';	
			var sql_volume_fail = 'select to_char(senddate, \'yyyy/mm/dd\') senddate, count(*) fail from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 3 group by senddate order by senddate desc';

			console.log("============================================================");
			console.log(duration);
			console.log(array_dateFormat);
			console.log(query.calendarFrom);
			console.log(query.calendarTo);
			console.log(sql_volume_total);
			console.log(sql_volume_success);
			console.log("============================================================");

			persist.connect(function(err, conn){
				if (err) {next(err); res.send({user: username}); return; }

				var graphdata = new graphData(err, conn, res, sql_volume_total, sql_volume_fail, sql_volume_success, username, 'ajax', array_dateFormat);
				graphdata.init();

			});
		}
	}

	if (query.view == "Distribution") {

		console.log(markers);
  		res.render('layout-overview-distribution', { user: username, marker: markers,  menu: {main: 'overview', sub: 'distribution'} });
	}

	if (query.view == "Record") {

		if (typeof query.page === 'undefined')
			var page = 1;
		else 
			var page = query.page;

		var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
							'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' group by senddate, DESTADDRCTYID) total_t ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) fail from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 3 group by senddate, DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
							'left join (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) success from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 2 group by senddate, DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) waiting from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' and status = 2 and msgstatus = 1 group by senddate, DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
							' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;

		var sql_record_count = 'select count(*) count from (select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate >= \'' + query.calendarFrom + '\' and senddate <= \'' + query.calendarTo + '\' group by senddate, DESTADDRCTYID)';
		
		console.log(query.view);
		console.log(sql_record);
		console.log(sql_record_count);

		persist.connect(function(err, conn) {
			if (err) {next(err); res.send({ user: username }); return; }

			var recorddata = new recordData(err, conn, res, sql_record, sql_record_count, username, 'Day', page, '', 'ajax');
			recorddata.init();
		});
	}
});

router.get('/ajax/monthly', function(req, res){

	var query = req.query, duration = 90;

	if (query.view == "Volume") {

		var raw_dateFormat = null, array_dateFormat = [];

		var i = 30;
		while (i <= duration) {
			raw_dateFormat = moment().subtract(duration - i , 'day').format('YYYY/MM');
			raw_dateFormat = raw_dateFormat.split("/");
			console.log(raw_dateFormat);
			array_dateFormat[(duration - i) / 30] = [gdMonth(raw_dateFormat[0], raw_dateFormat[1]), 0];
			i += 30;
		}

		console.log("=========================");
		console.log(array_dateFormat);
		console.log("=========================");

		var sql_volume_total = 'select to_char(senddate, \'yyyy/mm\') senddate, count(*) total from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 group by to_char(senddate, \'yyyy/mm\') order by senddate desc';
		var sql_volume_success = 'select to_char(senddate, \'yyyy/mm\') senddate, count(*) success from tb_wsms where senddate > (sysdate - ' + duration +  ') and status = 2 and msgstatus = 2 group by to_char(senddate, \'yyyy/mm\') order by senddate desc';
		var sql_volume_fail = 'select to_char(senddate, \'yyyy/mm\') senddate, count(*) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by to_char(senddate, \'yyyy/mm\') order by senddate desc';

		persist.connect(function(err, conn){
			if (err) {next(err); res.send({user: username}); return; }

			var graphdata = new graphData(err, conn, res, sql_volume_total, sql_volume_fail, sql_volume_success, username, 'ajax', array_dateFormat, query.dispMode);
			graphdata.init();
		});
	}

	if (query.view == "Record") {

		console.log(query.view);

		if (typeof query.page === 'undefined')
			var page = 1;
		else 
			var page = query.page;

		var sql_record = 'select * from (select ROWNUM rn, t.* from (' +
							'select total_t.*, NVL(fail_t.fail, 0) fail, NVL(success_t.success, 0) success, NVL(waiting_t.waiting, 0) waiting from (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID) total_t ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) fail from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 3 group by senddate, DESTADDRCTYID) fail_t on fail_t.destaddrctyid = total_t.destaddrctyid and fail_t.senddate_r = total_t.senddate_r ' +
							'left join (' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) success from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 2 group by senddate, DESTADDRCTYID) success_t on success_t.destaddrctyid = total_t.destaddrctyid and success_t.senddate_r = total_t.senddate_r ' +
							'left join(' +
							'select destaddrctyid, senddate senddate_r, sum(msglength) waiting from tb_wsms where senddate > (sysdate - ' + duration + ') and status = 2 and msgstatus = 1 group by senddate, DESTADDRCTYID) waiting_t on waiting_t.destaddrctyid = total_t.destaddrctyid and waiting_t.senddate_r = total_t.senddate_r ORDER BY total_t.senddate_r desc)' +
							' t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
		var sql_record_count = 'select count(*) count from (select destaddrctyid, senddate senddate_r, sum(msglength) total from tb_wsms where senddate > (sysdate - ' + duration + ') group by senddate, DESTADDRCTYID)';
		
		console.log(sql_record_count);

		persist.connect(function(err, conn) {
			if (err) {next(err); res.send({ user: username }); return; }

			var recorddata = new recordData(err, conn, res, sql_record, sql_record_count, username, 'Month', page, '', 'ajax');
			recorddata.init();
		});
	}

});

module.exports = router;