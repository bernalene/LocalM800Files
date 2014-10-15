var express = require('express');
var router = express.Router();
var models = require("../models");
var persist = require('persist');
var moment = require('moment');
var auth = require('./js/auth');
var menu = {main: 'newsms', sub: 'simple'};

function getContacts(err, conn, res, username, menu, sql_contacts, sql_contacts_count, sql_contacts_group, sql_template, sql_template_count, currentPage, type) {

	this.token = Math.random();
	
	this.status = 0;
	
	this.err = null;
	
	this.conn = conn;
	
	this.res = res;

	this.username = username;

	this.menu = menu;

	this.currentPage = currentPage;

	this.totalPage = 1;

	this.prev = currentPage;

	this.nxt = currentPage;

	this.type = type;

	this.sql_contacts = sql_contacts;
	this.sql_contacts_count = sql_contacts_count;
	this.sql_contacts_group = sql_contacts_group;
	this.sql_template = sql_template;
	this.sql_template_count = sql_template_count;

	this.array_contacts = [];
	this.array_contacts_group =[];
	this.array_template = [];

	console.log('=========================');
	console.log('getContacts - define variable');
	console.log('=========================');
	console.log('token = ' + this.token);
}
 
getContacts.prototype = {
	get_contact: function() {

		var obj = this;

		if (this.sql_contacts == '') {
			obj.status++;
			obj.postProcessing();

		} else {
			this.conn.runSqlAll(this.sql_contacts, [], function(err, results){

				console.log('=========================');
				console.log('getContacts - query ::: Contacts');
				console.log(results);
				console.log('=========================');
				
				if (err) {return;}

				for (var i in results) {
					obj.array_contacts[i] = [results[i]['name'], results[i]['mobile']];
					console.log(results[i]['name']);
					console.log(results[i]['mobile']);
				}

				// console.log(obj.array_contacts);
				obj.status++;
				obj.postProcessing();
			});
		}
	},
	get_contact_count: function() {
		var obj = this, perPage = 10;

		if (this.sql_contacts_count == '') {
			obj.status++;
			obj.postProcessing();

		} else {
			this.conn.runSqlAll(this.sql_contacts_count, [], function(err, results){

				console.log('=========================');
				console.log('getContacts - query ::: Contacts Count');
				console.log(obj.sql_contacts_count);
				console.log(results);
				console.log('=========================');
				
				if (err) {return;}

				obj.totalPage = results[0].count / perPage;

				if (results[0].count % perPage > 0) {
					obj.totalPage++;
				}

				obj.status++;
				obj.postProcessing();
			});
		}
	},
	get_contact_group: function() {
		var obj = this;

		if (this.type === 'ajax') {
			obj.status++;
			obj.postProcessing();

		} else {
			this.conn.runSqlAll(this.sql_contacts_group, [], function(err, results){
				console.log('=========================');
				console.log('getContacts - query ::: Contacts Group');
				console.log(results);
				console.log('=========================');

				if (err) {return;}

				for (var i in results) {
					obj.array_contacts_group[i] = results[i]['name'];
				}

				console.log(obj.array_contacts_group);

				obj.status++;
				obj.postProcessing();
			});
		}
	},
	get_template: function() {
		var obj = this;

		if (this.sql_template == '') {
			obj.status++;
			obj.postProcessing();

		} else {
			this.conn.runSqlAll(this.sql_template, [], function(err, results){
				console.log('=========================');
				console.log('getContacts - query ::: Template');
				console.log(results);
				console.log('=========================');

				if (err) {return;}

				for (var i in results) {
					obj.array_template[i] = [results[i]['name'], results[i]['content']];
				}

				console.log(obj.array_template);

				obj.status++;
				obj.postProcessing();
			});
		}
	},
	get_template_count: function() {
		var obj = this, perPage = 4;

		if (this.sql_template_count == '') {
			obj.status++;
			obj.postProcessing();

		} else {

			this.conn.runSqlAll(this.sql_template_count, [], function(err, results){

				console.log('=========================');
				console.log('getContacts - query ::: Template Count');
				console.log(results);
				console.log('=========================');
				
				if (err) {return;}

				obj.totalPage = results[0].count / perPage;

				if (results[0].count % perPage > 0) {
					obj.totalPage++;
				}

				obj.status++;
				obj.postProcessing();
			});
		}
	},
	init: function() {

		console.log('=========================');
		console.log('getContacts - initialization starts');
		console.log('=========================');

		this.get_contact();
		this.get_contact_count();
		this.get_contact_group();
		this.get_template();
		this.get_template_count();
	},
	postProcessing: function() {

		if (this.status == 5) {
			console.log('=========================');
			console.log('getContacts - data postprocessing');
			console.log('=========================');

			// this.nxt++;

			// if (this.currentPage > 1) {
			// 	this.prev--;
			// }

			// if (this.nxt > this.totalPage)
			// 	this.nxt--;

			console.log(this.array_contacts);
			console.log(this.currentPage);
			console.log(this.totalPage);
			console.log(this.array_template);
			// console.log(this.nxt);

			if(this.type == 'normal') this.rendering();
			else this.rendering_ajax();
		}

	},
	rendering: function () {

		console.log('=========================');
		console.log('getContacts - layout rendering');
		console.log('=========================');

		this.res.render('layout-new-sms-simple', { 
			user: this.username, 
			menu: this.menu,
			contacts: this.array_contacts,
			contactGroup: this.array_contacts_group,
			totalPage: this.totalPage, 
			currentPage: this.currentPage,
			template: this.array_template
		});

	},
	rendering_ajax: function () {
		console.log('=========================');
		console.log('getContacts - layout rendering ajax');
		console.log('=========================');
		
		this.res.send({
			contacts: this.array_contacts,
			totalPage: this.totalPage, 
			currentPage: this.currentPage,
			template: this.array_template,
			totalPage: this.totalPage, 
			currentPage: this.currentPage
		});
	}
};

router.use(auth);

router.get('/', function(req, res){
  	res.render('layout-new-sms-step1', { user: username, menu: {main: 'newsms', sub: ''} });
});

router.get('/ajax', function(req, res){
  	var query = req.query;

  	console.log(query);


	persist.connect(function(err, conn){
		if (err) { next(err); res.send({ user: username,  menu: {main: 'newsms', sub: ''} }); return; }
		
		var sql_insert_task = 'insert all ' +
					'into tb_wsms_temptask (taskid, contactid, taskname, type, schtype, ISGLOBALSCH, originalFileName, ValidateFileName, Status, remarks, createuser, createdate, updateuser, updatedate) ' +
					'values (seq_wsms_temptask.nextval, seq_wsms_temptask.nextval, \'' + query.taskName + '\', ' + query.smsType + ', 2, 1,\'task1\',\'task1\', 0,\'Lorem ipsum dolor sit amet\', 1, \'10-Oct-14\', 1, \'10-Oct-14\') ' +
					'into tb_wsms_task (taskid, contactid, taskname, type, schtype, ISGLOBALSCH, status, createuser, createdate, updateuser, updatedate) ' +
					'values (seq_wsms_task.nextval, seq_wsms_task.nextval, \'' + query.taskName + '\', ' + query.smsType + ', 2, 1, 1, 1, \'10-Oct-14\', 1, \'10-Oct-14\') ' +
					'select * from dual';

		console.log(sql_insert_task);
		
		// run a query
		conn.runSqlAll(sql_insert_task, [], function(err, results) {
			
			console.log(err);
			console.log(results);

			if(err) { return; }
		});
	});
});

router.get('/simple', function(req, res){

	var page = 1;
	// var contacts = [['Aida', '852987654321'], ['Amy', '852987654321'], ['Barry', '852987654321'], ['Bonnie', '852987654321'], ['Cherry', '852987654321'], ['Doris', '852987654321'], ['Ellen', '852987654321'], ['Herry', '852987654321'], ['Ian', '852987654321'], ['Jerry', '852987654321']];
  	var sql_contacts = 'select * from (select ROWNUM rn, t.* from (select name, mobile from tb_wsms_phonebook) t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
	var sql_contacts_count = 'select count(*) count from tb_wsms_phonebook';
	var sql_contacts_group = 'select name from tb_wsms_phonebook_group where status = 1';
	var sql_template = 'select * from (select ROWNUM rn, t.* from (select name, content from tb_wsms_template) t) where rn >= 1 + (4 * (' + page + '- 1)) and rn <= 4 * ' + page;
	// var sql_template_count = 'select count(*) count from (select name, content from tb_wsms_template)';

	persist.connect(function(err, conn){
		if (err) { next(err); res.render('layout-new-sms-simple', { user: username,  menu: menu }); return; }

		var getContact = new getContacts(err, conn, res, username, menu, sql_contacts, sql_contacts_count, sql_contacts_group, sql_template, '', 1, 'normal');
		getContact.init();
  		// res.render('layout-new-sms-simple', { contacts: contacts, user: username,  menu: menu });
  	});
});

router.get('/ajax/simple', function(req, res){
	var query = req.query, page, contactGroup;
	console.log("=================================");
	console.log(query);
	// console.log(query.page);
	console.log("=================================");

	if (typeof query.page === 'undefined')
		page = 1;
	else 
		page = query.page;

	if (typeof query.group === 'undefined')
		contactGroup = 'All Group';
	else 
		contactGroup = query.group;

	if (query.group == '')
		var sql_contacts = 'select tb_wsms_phonebook.name, tb_wsms_phonebook.mobile from tb_wsms_phonebook where mobile like \'' + query.searchItem + '\' or name like \'' + query.searchItem + '\'';

	if (query.searchItem == '')
		var sql_contacts = 'select * from (select ROWNUM rn, t.* from (SELECT tb_wsms_phonebook.name, tb_wsms_phonebook.mobile FROM tb_wsms_phonebook ' +
						'INNER JOIN tb_wsms_phonebook_group_item ON tb_wsms_phonebook.pbid = tb_wsms_phonebook_group_item.pbid ' +
						'INNER JOIN tb_wsms_phonebook_group ON tb_wsms_phonebook_group_item.pbgroupid = tb_wsms_phonebook_group.pbgroupid AND tb_wsms_phonebook_group.name = \'' + contactGroup + '\') t) where rn >= 1 + (10 * (' + page + ' - 1)) and rn <= 10 * ' + page;
	
	console.log(query.searchItem);
	console.log(sql_contacts);

	var sql_contacts_count = 'select count(*) count from (' +
								'SELECT tb_wsms_phonebook.name, tb_wsms_phonebook.mobile FROM tb_wsms_phonebook ' +
								'INNER JOIN tb_wsms_phonebook_group_item ON tb_wsms_phonebook.pbid = tb_wsms_phonebook_group_item.pbid ' +
								'INNER JOIN tb_wsms_phonebook_group ON tb_wsms_phonebook_group_item.pbgroupid = tb_wsms_phonebook_group.pbgroupid AND tb_wsms_phonebook_group.name = \'' + contactGroup + '\')';

	persist.connect(function(err, conn){
		if (err) { next(err); res.send({ user: username }); return; }
		
		var getContact = new getContacts(err, conn, res, username, menu, sql_contacts, sql_contacts_count, '', '', '', page, 'ajax');
		getContact.init();
	});

});

router.get('/ajax/simple/template', function(req, res){
	var query = req.query, page;

	console.log("=================================");
	console.log(query);
	console.log("=================================");

	if (typeof query.page === 'undefined')
		page = 1;
	else 
		page = query.page;

	var sql_template = 'select * from (select ROWNUM rn, t.* from (select name, content from tb_wsms_template) t) where rn >= 1 + (4 * (' + page + '- 1)) and rn <= 4 * ' + page;

	console.log(sql_template);

	var sql_template_count = 'select count(*) count from (select name, content from tb_wsms_template)';

	persist.connect(function(err, conn){
		if (err) { next(err); res.send({ user: username }); return; }
		
		var getContact = new getContacts(err, conn, res, username, menu, '', '', '', sql_template, sql_template_count, page, 'ajax');
		getContact.init();
	});

});

router.get('/excel', function(req, res){
  	res.render('layout-new-sms-excel', { title: 'Excel SMS', user: username,  menu: {main: 'newsms', sub: 'excel'} });
});

router.get('/excel/with-schedule', function(req, res){
  	res.render('layout-new-sms-excel', { title: 'Excel SMS', user: username,  menu: {main: 'newsms', sub: 'excel'} });
});

router.get('/merger', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username,  menu: {main: 'newsms', sub: 'merger'} });
});

router.get('/merger/with-schedule', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username,  menu: {main: 'newsms', sub: 'merger'} });
});

router.get('/merger/preview', function(req, res){
  	res.render('layout-new-sms-merger', { title: 'Merger SMS', user: username, menu: {main: 'newsms', sub: 'merger'} });
});

router.get('/confirm', function(req, res){
  	res.render('layout-new-sms-confirm', { title: 'Simple SMS', user: username,  menu: {main: 'newsms', sub: 'confirm'} });
});

module.exports = router;