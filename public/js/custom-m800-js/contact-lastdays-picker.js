$(document).ready(function(){
	$('.contactPicker').selectpicker();
	$('.lastXdaysPicker').selectpicker();

  $('.contactPicker, .lastXdaysPicker').change(function(){
  	console.log("clicked filter");
   	lastXdaysFilterPicker();
  });

});

