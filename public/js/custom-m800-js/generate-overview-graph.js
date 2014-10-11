// var rate = [
// 	[gd(2014, 2, 28), successRate(498,1028)], [gd(2014, 3, 1), successRate(702,1372)], [gd(2014, 3, 2), successRate(1873,2095)], [gd(2014, 3, 3), successRate(1781,1781)], [gd(2014, 3, 4), successRate(1774,1926)], [gd(2014, 3, 5), successRate(2209,2393)], [gd(2014, 3, 6), successRate(2612,2612)]
// ];
// var totalsms = [
// 	[gd(2014, 2, 28), 1028], [gd(2014, 3, 1), 1372], [gd(2014, 3, 2), 2095], [gd(2014, 3, 3), 1781], [gd(2014, 3, 4), 1926], [gd(2014, 3, 5), 2396], [gd(2014, 3, 6), 2612]
// ];
// var successSMS = [
// 	[gd(2014, 2, 28), 498], [gd(2014, 3, 1), 702], [gd(2014, 3, 2), 1873], [gd(2014, 3, 3), 1781], [gd(2014, 3, 4), 1774], [gd(2014, 3, 5), 2209], [gd(2014, 3, 6), 2612]
// ];
var plot; 

// var totalSMSMonth = [
// 	[gd(2014, 5), 1926], [gd(2014, 6), 1926], [gd(2014, 7), 2396], [gd(2014, 8), 2612]
// 	];
// var successSMSMonth = [
// 	[gd(2014, 5), 1774], [gd(2014, 6), 900], [gd(2014, 7), 2209], [gd(2014, 8), 2612]
// 	];
// var rateMonth = [
// 	[gd(2014, 5), successRate(1774,1926)], [gd(2014, 6), successRate(900,1926)], [gd(2014, 7), successRate(2209,2396)], [gd(2014, 8), successRate(2612,2612)]
// 	];



var dataset = [
	{ 
		label: "Total SMS sent", 
		data: totalSMS,
		yaxis: 2,
		color: "#ffd93f",
		bars: {
			show: true,
			align: "right",
			barWidth: 24*60*60*300,
			lineWidth: 0,
			order: 1,
			fillColor: "#ffd93f"
		}
	},{ 
		label: "Success SMS", 
		data: successSMS,
		yaxis: 2,
		color: "#6c915a",
		bars: {
			show: true,
			align: "left",
			barWidth: 24*60*60*300,
			lineWidth: 1,
			order: 1,
			fillColor: "#6c915a"
		}
	},{ 
	  label: "Success Rate", 
	  data: rate,
	  xaxis: 1,
	  color: "#e13b4c",
	  lines: {
		show: true,
		align: "left"
	  },
	  points: {
		radius: 3,
		fill: true,
		fillColor: "#e13b4c",
		show: true,
		symbol: "circle"
	  },
	}
];

var options = {
	xaxis: {
		mode: "time",
		timeformat: "%d %b",
		autoscaleMargin: 0.02,
		minTickSize: 1,
		tickSize: [1, 'day'],
		tickColor: "#000",
		tickLength: 0,
		color: "#000",
		axisLabel: "Date",
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		font: {
			color: "#999"
		}
	},
	yaxes: [{
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		tickColor: "#eee",
		ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
		max: 100,
		font: {
			color: "#999"
		}
	},{
		show: false
	}
  ],
	legend: {
		noColumns: 1,
		position: "ne",
		margin: 20,
	},
	grid: {
		hoverable: true,
		borderWidth: 1,
		borderColor: "#eee"
	},
	colors: ["#FF0000", "#0022FF"]
};

function showTooltip(x, y, contents, z) {
	$('<div id="flot-tooltip">' + contents + '</div>').css( {
		position: 'absolute',
		display: 'none',
		top: y - 50,
		left: x,
		padding: '5px',
		border: '1px solid #eee',
		color: '#fff',
		'background-color': '#333',
		opacity: 0.80,
		'border-color': z,
		'-moz-border-radius': '5px',
		'-webkit-border-radius': '5px',
		'-khtml-border-radius': '5px',
		'border-radius': '5px'
	}).appendTo("body").fadeIn(200);
}

var previousPoint = null;
var previousPointLabel = null;

$("#vol-graph").bind("plothover", function (event, pos, item) {
	if (item) {
		if ((previousPoint != item.dataIndex) || (previousLabel != item.series.label)) {
			previousPoint = item.dataIndex;
			previousLabel = item.series.label;

			$("#flot-tooltip").remove();

			console.log(totalSMS);
			console.log(item.dataIndex);

			showTooltip(item.pageX, item.pageY,
				"<b>Sent </b>" + totalSMS[item.dataIndex][1] + "<br/><b>Fail</b> " + failSMS[item.dataIndex][1]); 
		}
	} else {
		$("#flot-tooltip").remove();
		previousPoint = null;
	}
});

$(document).ready(function(){
	dispMode = 'day';
	$('.displayMode').click(function(){
		dispMode = $('.displayMode.active').children().attr('value');
		contact = $('.contactPicker').find('option:selected').val();
		view = $('.vol-dist-rec-div').find('a.active').text(); 
		if (dispMode === 'month'){

			var filter = {
					 		contact: contact,
					 		view: view,
					 		dispMode: dispMode
			 			};
			 console.log(filter);
			 
			$.ajax({
		 		type: "GET",
		 		url: "/overview/ajax/monthly",
		 		data: filter,
		 		dataType: "json",
		 		success: function(data){

		 			if (view === "Volume") {

						var totalSMSMonth = data['totalSMSMonth'];
						var successSMSMonth = data['successSMSMonth'];
						var rateMonth = data['rateMonth'];
						totalSMS = data['totalSMSMonth'];
						failSMS = data['failSMSMonth'];

						console.log(data);

						// console.log(totalSMSMonth);
						// console.log(successSMSMonth);
						// console.log(rateMonth);

						plot = $.plot($("#vol-graph"), [{
							label: "Total SMS sent", 
							data: totalSMSMonth,
							yaxis: 2,
							color: "#ffd93f",
							bars: {
								show: true,
								align: "right",
								barWidth:  12 * 24 * 60 * 60 * 1000,
								lineWidth: 0,
								order: 1,
								fillColor: "#ffd93f"
							}
						},{ 
							label: "Success SMS", 
							data: successSMSMonth,
							yaxis: 2,
							color: "#6c915a",
							bars: {
								show: true,
								align: "left",
								barWidth:  12 * 24 * 60 * 60 * 1000,
								lineWidth: 0,
								order: 1,
								fillColor: "#6c915a"
							}
						}, { 
							  label: "Success Rate", 
							  data: rateMonth,
							  xaxis: 1,
							  color: "#e13b4c",
							  lines: {
								show: true,
								align: "left"
							  },
							  points: {
								radius: 3,
								fill: true,
								fillColor: "#e13b4c",
								show: true,
								symbol: "circle"
							  },
							}], {
						xaxis: {
							mode: "time",
							timeformat: "%b",
							autoscaleMargin: 0.02,
							minTickSize: [1, dispMode],
							tickColor: "#000",
							tickLength: 1,
							color: "#000",
							axisLabel: "Month",
							axisLabelFontSizePixels: 12,
							axisLabelFontFamily: 'Verdana, Arial',
							font: {
								color: "#999"
							}
						},
						yaxes: [{
							axisLabelUseCanvas: true,
							axisLabelFontSizePixels: 12,
							axisLabelFontFamily: 'Verdana, Arial',
							tickColor: "#eee",
							//autoscaleMargin: 0.02,
							ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
							font: {
								color: "#999"
							}
						},{
							show: false
						}
						],
						legend: {
							noColumns: 1,
							position: "ne",
							margin: 20,
						},
						grid: {
							hoverable: true,
							borderWidth: 1,
							borderColor: "#eee"
						},
						colors: ["#FF0000", "#0022FF"]
						}); 
						$("div.lastXdaysPicker").children('button').attr("disabled", "disabled");
						$("input#dateRangePickerfrom, input#dateRangePickerto").addClass('disabled');
		 			}
		 		}
		 	})




		}else {
			// console.log(dataset);
			plot = $.plot($("#vol-graph"), dataset, options); 
			$("div.lastXdaysPicker").children('button').removeAttr("disabled");
			$("input#dateRangePickerfrom, input#dateRangePickerto").removeClass('disabled');
		}
	});
	// console.log(dataset);
	plot = $.plot($("#vol-graph"), dataset, options); 
});
 function gd(year, month) {
	//console.log(new Date(year, month - 1, day).getTime());
 	return new Date(year, month-1);
 }
function successRate(success,total){
	return Math.round((success/total)*100);
}