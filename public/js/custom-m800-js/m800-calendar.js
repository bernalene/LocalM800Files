$(document).ready(function(){

	$('#dateRangePickerfrom').daterangepicker({
		singleDatePicker: true,
		format : 'MM/DD/YYYY',
		startDate : moment().format('MM/DD/YYYY'),
		endDate : moment().format('MM/DD/YYYY')
	});

	$('#dateRangePickerto').daterangepicker({
		singleDatePicker: true,
		format : 'MM/DD/YYYY',
		startDate : moment().format('MM/DD/YYYY'),
		endDate : moment().format('MM/DD/YYYY')
	});

	$('#dateRangePickerfrom, #dateRangePickerto').on('blur',function(){
		var calendarFrom = $('#dateRangePickerfrom').data('daterangepicker').container.find('input[name=daterangepicker_end]').val();
 		var calendarTo = $('#dateRangePickerto').data('daterangepicker').container.find('input[name=daterangepicker_end]').val();

 		calendarFrom = moment(calendarFrom);
 		calendarTo = moment(calendarTo);
 		
		if (calendarTo.diff(calendarFrom, 'days') <= 30)
			calendarFilterPicker();
	});
	
	$('.daterangepicker').css('margin-left','0');
	$('.daterangepicker').css('margin-top','5px');
	$('.daterangepicker').css('width','auto');
});
