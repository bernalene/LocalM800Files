var models = require("../models");
var persist = require('persist');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var auth = require('./js/auth');

router.use(auth);

router.get('/', function(req, res){
	
	var taskName = 'task3';
	var tempTaskName = 'task3';

	persist.connect(function(err, conn){
		if (err) { next(err); res.render('test', { user: username }); return; }
		
		var sql = 'insert all ' +
					'into tb_wsms_temptask (taskid, contactid, taskname, type, schtype, ISGLOBALSCH, originalFileName, ValidateFileName, Status, remarks, createuser, createdate, updateuser, updatedate) ' +
					'values (seq_wsms_temptask.nextval, seq_wsms_temptask.nextval, \'' + tempTaskName + '\', 1, 2, 1,\'task1\',\'task1\', 0,\'Lorem ipsum dolor sit amet\', 1, \'10-Oct-14\', 1, \'10-Oct-14\') ' +
					'into tb_wsms_task (taskid, contactid, taskname, type, schtype, ISGLOBALSCH, status, createuser, createdate, updateuser, updatedate) ' +
					'values (seq_wsms_task.nextval, seq_wsms_task.nextval, \'' + taskName + '\', 1, 2, 1, 1, 1, \'10-Oct-14\', 1, \'10-Oct-14\') ' +
					'select * from dual';

		console.log(sql);
		
		// run a query
		conn.runSqlAll(sql, [], function(err, results) {
			
			console.log(err);
			console.log(results);

			if(err) { return; }

			res.render('tasks', {
				title: 'Tasks',
				data: (results != null) ? results : {}
			});
		});
		
		// // via model
		// var queries = { testing: models.Testing.all };
		// // var queries = {testing: models.Testing.update(4, {label: 'Apple'})}

		// conn.chain(queries, function(err, results) {
		// 	console.log(err);
		// 	console.log(results);
			
		// 	if(err) { next(err); return; }
			
		// 	// console.log(results.testing[0].label);

		// 	res.render('test', {
		// 		title: 'Testing',
		// 		user: username,
		// 		data: (results != null) ? results.testing : {}
		// 	});
		// });
	});

	
});


module.exports = router;