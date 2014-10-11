/**
 * ToolBox - http://www.smartdrop.com.hk
 * Copyright (C) SmartDrop Ltd
 *
 * == BEGIN LICENSE ==
 *
 * Note: Removal of this header is a breach of license.
 *
 * Licensed under the terms of any of the following licenses at your choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 * Created: 2014/09/15
 *
 * ========== /routes/tasks.js ==========
 */
var models = require("../models");
var persist = require('persist');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req, res, next){
	persist.connect(function(err, conn){
		if (err) { next(err); return; }
		
		// run a query
		// conn.runSqlAll('select * from tb_testing', [], function(err, results) {
			// if(err) { return; }

			// res.render('tasks', {
				// title: 'Tasks',
				// data: (results != null) ? results[0] : {}
			// });
		// });
		
		// via model
		var queries = { testing: models.Testing.all };
		conn.chain(queries, function(err, results) {
			console.log(err);
			console.log(results);
			
			if(err) { next(err); return; }
			
			res.render('tasks', {
				title: 'Testing',
				data: (results != null) ? results.testing[0] : {}
			});
		});
	});
});

module.exports = router;