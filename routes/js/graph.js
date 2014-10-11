var models = require("../../models");
var persist = require('persist');

module.exports = function(req, res, next) {

	//define the points where the markers should appear
	markers = [
	  {latLng: [41.90, 12.45], name: 'Vatican City', submitted:'280', success: '185'},
	  // {latLng: [43.73, 7.41], name: 'Monaco', submitted:'280', success: '185'},
	  // {latLng: [-0.52, 166.93], name: 'Nauru', submitted:'230', success: '230'},
	  // {latLng: [-8.51, 179.21], name: 'Tuvalu', submitted:'1000', success: '1000'},
	  // {latLng: [43.93, 12.46], name: 'San Marino', submitted:'280', success: '185'},
	  // {latLng: [47.14, 9.52], name: 'Liechtenstein', submitted:'500', success: '480'},
	  // {latLng: [7.11, 171.06], name: 'Marshall Islands', submitted:'280', success: '185'},
	  // {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis', submitted:'100', success: '100'},
	  // {latLng: [3.2, 73.22], name: 'Maldives', submitted:'150', success: '150'},
	  // {latLng: [35.88, 14.5], name: 'Malta', submitted:'280', success: '280'},
	  // {latLng: [12.05, -61.75], name: 'Grenada', submitted:'200', success: '180'},
	  // {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines', submitted:'280', success: '185'}
    ];

	next();
};