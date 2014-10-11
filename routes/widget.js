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
 * ========== /routes/widget.js ==========
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('widget', { title: 'Widget Page' });
});

module.exports = router;
