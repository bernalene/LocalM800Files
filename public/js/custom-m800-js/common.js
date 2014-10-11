$(document).ready(function(){
	if(window.location.href.indexOf("record") > -1) {
       if ($('#downloadbtn').hasClass("hidden")){
			$('#downloadbtn').removeClass("hidden");
	   }
    }
	
	//highlight the appropriate link when in correct page
	$('.vol-dist-rec-div a').each(function(){
		if ($(this).attr('href') === window.location.pathname) {
			$(this).addClass('active');
		}
	});
	
	//highlight the appropriate link when in correct page
	$('.menu-links a').each(function(){
		if(window.location.href.indexOf($(this).attr('href')) > -1) {
		  $(this).parent().addClass('active-link');
		}
	});
	
	var url = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined) {
        q = q.split('&');
        for(var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            url.push(hash[1]);
            url[hash[0]] = hash[1];
        }
	}
	var mode = '';
	var contact = '';
	if (url !== undefined){
		mode = url[0];
		contact = url[1];
	}else {
		mode = 'day';
	}

	switch (mode){
		case 'month': $("div.lastXdaysPicker").children('button').attr("disabled", "disabled");
					  $('#monthlyOpt').parent().addClass('active');
					  $('#dailyOpt').parent().removeClass('active');
					  break;
		default: $("div.lastXdaysPicker").children('button').removeAttr("disabled");
				 $('#dailyOpt').parent().addClass('active');
			     $('#monthlyOpt').parent().removeClass('active');
	}
	
	$('.displayMode').click(function(){
		dispMode = $(this).children().attr('value');
		contact = $('.contactPicker').find('option:selected').val();
		view = $('.vol-dist-rec-div.margin-left-30.margin-right-30').find('a.active').text(); 

		if (dispMode==='month'){
			$("div.lastXdaysPicker").children('button').attr("disabled", "disabled");
		}else {
			$("div.lastXdaysPicker").children('button').removeAttr("disabled");
		}
		//console.log(dispMode);
		/* if (view === 'Record')
			location.href = "?displaymode=" + dispMode + "&contact=" + contact; */
	});
	
	//to display the correct calendar view based on the dropdown
	var weekNames;
	var viewType;
	$('div.schedulePicker').click(function(){
		viewType = $('div.schedulePicker').children().attr('title');
		//console.log(viewType);
		switch (viewType){
			case 'Every Month': calendarMonth();
								$('.show-calendar').removeClass('hidden');
								$('#dateInput').popover('destroy');
								break;
			case 'Every Week': $('.show-calendar').addClass('hidden');
							   $('#dateInput').popover({
									html: true,
									placement: 'bottom',
									template: '<div class="popover week-view" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
									title: "Week",
									content: '<ul class="unstyled"><li>SUN</li><li>MON</li><li>TUE</li><li>WED</li><li>THU</li><li>FRI</li><li>SAT</li></ul>',
									trigger: 'click'
							   });
							   //display the full word for the selected day
								$('#dateInput').on('shown.bs.popover', function() {
									$('.popover-content > ul > li').click(function(){
										removeSelected();
										$(this).addClass('selected-day');
										var weekday = $(this).text();
										var weekday2 = '';
										switch (weekday){
											case 'SUN': weekday2 = 'Sunday'; break;
											case 'MON': weekday2 = 'Monday'; break;
											case 'TUE': weekday2 = 'Tuesday'; break;
											case 'WED': weekday2 = 'Wednesday'; break;
											case 'THU': weekday2 = 'Thursday'; break;
											case 'FRI': weekday2 = 'Friday'; break;
											case 'SAT': weekday2 = 'Saturday'; break;
										}
										$('#dateInput').val(weekday2);
									});
								});
							   break;
			default:  calendarOnDate(); 
					$('div.calendar-date > .table-condensed > thead > tr:nth-child(2)').removeAttr('style');
					 $('.show-calendar').removeClass('hidden');
					 $('#dateInput').popover('destroy');
					
		}
	});
	
	$('#dateInput').click(function(){
		if (viewType==='Every Month'){
			$('.show-calendar').css('display','block');
		}
	});
	//time dropdown
	$('#timeInput').timepicker({
		template: 'dropdown',
		minuteStep: 1,
		showSeconds: false,
		disableMousewheel: true
	});
	
	//for the upload file checking - if xls, over 5000 recipients, etc
	$('#upload-excel-form').bootstrapValidator({
		container: "#messages",
        fields: {
            uploadexcelFile: {
                validators: {
					file: {
						extension: 'xls',
						type: 'application/vnd.ms-excel',
						message: '<strong>Error!</strong> The format is not correct'
					}
                }
            }
        }
    })
	.on('error.field.bv', function(e, data) {
		$('#messages').css('display', 'block');
		$('#messages').css('padding', '10px');
	})
	.on('success.field.bv', function(e, data) {
		displayUploadedExcel(data);
		$('#messages').css('padding', '0');
    }); 
	
	//Event for checked input with custom style
	$('.check-group').on('change', function(e){
		var isChecked = $(this).find('input:checked').length, //get the checkbox's behaviour 
			$customCheckBox = $(this).find('.custom-checkbox'); //get the custom checkbox element convert it into jQuery object
		
		if (isChecked === 1) { //evalauate if the checkbox is being checked
			$customCheckBox.addClass('checked') //add checked class
							.append('<span class="glyphicon glyphicon-ok">'); //add a checked appearance
		} else {
			$customCheckBox.removeClass('checked') //remove checked class
							.find('span').remove(); //remove the checked appearance
		}
	});
	
	//upload excel form error message	
	$('#uploadFileReq > span').popover();
});

function lastXdaysFilterPicker() {
	var dispMode = $(this).children().attr('value');
	var lastxday = $('.lastXdaysPicker').find('option:selected').val();
 	var contact = $('.contactPicker').find('option:selected').val();
 	var view = $('.vol-dist-rec-div.margin-left-30.margin-right-30').find('a.active').text(); 

	// if (view == "Record") {
	// 	location.href = "?displaymode=" + dispMode + "&contact=" + contact + "&lastxday=" + lastxday;
 // 	}

 	//get page number
 	var url = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined) {
        q = q.split('&');
        for(var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            url.push(hash[1]);
            url[hash[0]] = hash[1];
        }
	}

	if (view == "Volume" || view == "Distribution" || view == "Record") {
		var filter = {
	 		lastxday: lastxday,
	 		contact: contact,
	 		view: view,
	 		page: url['page']
	 	};

	 	console.log(filter);
	 	
	 	$.ajax({
	 		type: "GET",
	 		url: "/overview/ajax/lastxdaysfilter",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			if (view == "Volume") {
	 				dataset[2].data = data['rate'];
					dataset[0].data = data['totalSMS'];
					dataset[1].data = data['successSMS'];
					totalSMS = data['totalSMS'];
					failSMS = data['failSMS'];

					console.log(data);

					plot.setData(dataset);
					plot.setupGrid();
					plot.draw();
	 			} else if (view == "Distribution") {
	 				console.log(data);

	 				$('svg').remove();
					$('.jvectormap-zoomin').remove();
					$('.jvectormap-zoomout').remove();
					$('#distribution-map').vectorMap({
						//=======set the styles of the map============
						map: 'world_en',
						color: '#e6e6e6',
						hoverColor: '#ded4c8',
						backgroundColor: '#fff',
						normalizeFunction: 'polynomial',
						markerStyle: {
						  initial: {
						    fill: '#e13b4c',
						    stroke: '#e13b4c'
						  }
						},
						markerDefaults: {
							fill: '#e13b4c',
							stroke: '#e13b4c',
							r: 2
						},
						markers: data.marker,
						series: {
							markers: [{
								fill: '#e13b4c'
							}]
						},
						onMarkerLabelShow : function(event, label, index){
							generateInformation(event, label, index)
						}
					});
					getXY();
	 			} else if (view == "Record") {
	 				console.log(data);
	 				$('.recordsItems').remove();
	 				var record = data['record'];
	 				generateRecordTable(record);
	 				
	 			}
				
	 		}
	 	})
	}
}

function calendarFilterPicker() {
	var contact = $('.contactPicker').find('option:selected').val();
 	var calendarFrom = $('#dateRangePickerfrom').data('daterangepicker').container.find('input[name=daterangepicker_end]').val();
 	var calendarTo = $('#dateRangePickerto').data('daterangepicker').container.find('input[name=daterangepicker_end]').val();
 	var view = $('.vol-dist-rec-div.margin-left-30.margin-right-30').find('a.active').text(); 

 	calendarFrom = moment(calendarFrom, "MM/DD/YYYY").format('DD-MMM-YY');
 	calendarTo = moment(calendarTo, "MM/DD/YYYY").format('DD-MMM-YY');

 	if (view == "Volume" || view == "Distribution" || view == "Record") {

	 	var filter = {
	 		contact: contact,
	 		calendarFrom: calendarFrom,
	 		calendarTo: calendarTo,
	 		view: view
	 	};

	 	console.log(filter);
	 	
	 	$.ajax({
	 		type: "GET",
	 		url: "/overview/ajax/calendarfilter",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			if (view == "Volume") {
				    dataset[2].data = data['rate'];
				    dataset[0].data = data['totalSMS'];
				    dataset[1].data = data['successSMS'];
				    totalSMS = data['totalSMS'];
				    failSMS = data['failSMS'];

				    console.log(data);
				      
				    plot.setData(dataset);
				    plot.setupGrid();
				    plot.draw();
				} else if (view == "Distribution") {
									console.log(data);

	 				$('svg').remove();
					$('.jvectormap-zoomin').remove();
					$('.jvectormap-zoomout').remove();
					$('#distribution-map').vectorMap({
						//=======set the styles of the map============
						map: 'world_en',
						color: '#e6e6e6',
						hoverColor: '#ded4c8',
						backgroundColor: '#fff',
						normalizeFunction: 'polynomial',
						markerStyle: {
						  initial: {
						    fill: '#e13b4c',
						    stroke: '#e13b4c'
						  }
						},
						markerDefaults: {
							fill: '#e13b4c',
							stroke: '#e13b4c',
							r: 2
						},
						markers: data.marker,
						series: {
							markers: [{
								fill: '#e13b4c'
							}]
						},
						onMarkerLabelShow : function(event, label, index){
							generateInformation(event, label, index)
						}
					});
					getXY();
	 			} else if (view == "Record") {
	 				console.log(data);
	 				$('.recordsItems').remove();
	 				var record = data['record'];
	 				generateRecordTable(record);
	 			}
	 		}
	 	})
	}
}


//==============FILE UPLOAD=================//
//to display the file upload dialog box onclick of the import excel file button
function displayUploadedExcel(data) {
	var $fileObj = data.element, //get the file jQuery object
		$formObj = $fileObj.parents('form'), //get the parent form element convert it into a jQuery object
		userAgent = navigator.appVersion, //get the browser user agent
		filename = null; //hold the name of the file
	
	$('#uploadFileReq').addClass('hidden');
	
	//check if browser is IE < 10, if true will get the file name directly from the input value
	if (userAgent.search("MSIE 8.0") > -1 || userAgent.search("MSIE 9.0") > -1) {
		var tempName = $fileObj.val(), //assign the file name value to a temporary variable
			lindex = tempName.lastIndexOf("\\"), //locate the position of the given string
			len = tempName.length; //get the length of the file name
			
		filename = tempName.substr(lindex + 1, len);//assign the trimmed file name
	} else { //otherwise retrieve the file name from the file object
		var _fileObj = $fileObj[0].files[0];
		
		filename = _fileObj.name;
	}
	
	$formObj.find('label').removeClass('btn-pale-red').addClass('btn-pale-blue')
		.find('.upload-label').addClass('hidden')
		.next().removeClass('hidden');
	
	$formObj.find('.uploaded-excel').removeClass('hidden')
		.find('input').val(filename);
};

function showRedUpload(element) {
	$formObj = $(element).parents('form');
	
	$formObj.find('label').removeClass('btn-pale-blue').addClass('btn-pale-red')
		.find('.upload-label').removeClass('hidden')
		.next().addClass('hidden');
	
	$formObj.find('.uploaded-excel').addClass('hidden')
		.find('input').val('');
	
	$formObj.find('#uploadexcelFile').val('');
};

function checkUploadedExcel() {
	if(document.getElementById("uploadexcelFile").value === ""){
		var $uploadFileReq = $('#uploadFileReq');
		
		$uploadFileReq.removeClass('hidden');
		$uploadFileReq.find('span').first().trigger('mouseover');
		
		return false;
	}
	
	return true;
}
//================FUNCTIONS FOR TIME AND DATE=======================//

//to remove the selected class for each li elementFromPoint
function removeSelected(){
	$('.popover-content > ul > li').each (function(){
		$(this).removeClass('selected-day');
	})
}

function calendarMonth(){
	$('#dateInput').daterangepicker({
		singleDatePicker: true,
		format : "MM/DD/YYYY",
		startDate : moment().format('MM/DD/YYYY'),
		endDate : moment().format('MM/DD/YYYY')
	},
	function (start,end){
		var thDate = start.format('D');
		var suffix ='';
		switch (thDate) {
			case '1': case '21': case '31': suffix = 'st'; break;
			case '2': case '22': suffix = 'nd'; break;
			case '3': case '23': suffix = 'rd'; break;
			default: suffix = 'th';
		}
		$('#dateInput').val(thDate + suffix);
	});
	$('.daterangepicker').css('margin-left','0');
	$('.daterangepicker').css('margin-top','5px');
	$('.daterangepicker').css('width','290px');
	$('.daterangepicker > .calendar').css('margin','0');
	$('div.calendar > .calendar-date > .table-condensed > thead > tr:nth-child(2)').css('display', 'none');
}

function calendarOnDate(){
	$('#dateInput').daterangepicker({
		singleDatePicker: true,
		format : "MM/DD/YYYY",
		startDate : moment().format('MM/DD/YYYY'),
		endDate : moment().format('MM/DD/YYYY'),
		locale: {
			customRangeLabel: 'Custom Range',
			daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI','SAT'],
			firstDay: 0
		}
	},
	function (start,end){
		$('#dateInput').val(start.format('MM/DD/YYYY'));
	});
	$('.daterangepicker').css('margin-left','0');
	$('.daterangepicker').css('margin-top','5px');
	$('.daterangepicker').css('width','290px');
	$('.daterangepicker > .calendar').css('margin','0');
}

//format the time dropdown
function formatTimeDropdown() {	
	$('.bootstrap-timepicker-widget.dropdown-menu').css('margin-left','0');
	$('.icon-chevron-up, .icon-chevron-down').addClass('glyphicon');
	$('.icon-chevron-up').addClass('glyphicon-chevron-up');
	$('.icon-chevron-up').removeClass('icon-chevron-up');
	$('.icon-chevron-down').addClass('glyphicon-chevron-down');
	$('.icon-chevron-down').removeClass('icon-chevron-down');
}