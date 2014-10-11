$(document).ready(function(){
	if(window.location.href.indexOf("merger") > -1) {
		$('h1').css('margin-bottom','0');
	    $('h5.subTitle').css('display','block');
		$('li#circle-step2-grey, li#circle-step3-lightGrey, span#dots-3').css('display','initial');
		$('li#circle-step2-lightGrey').css('display','none');
		$('span#dots-1').css('color','#555');
	}
	
	if(window.location.href.indexOf("merger/with-schedule") > -1) {
		$('.schedule-div').removeClass('hidden');
		$('.dropdowns-div').css('padding-bottom', '30px');
	}
	
	if(window.location.href.indexOf("merger/preview") > -1) {
		$('li#circle-step2-grey, li#circle-step3-grey, span#dots-3').css('display','initial');
		$('li#circle-step2-lightGrey, li#circle-step3-lightGrey').css('display','none');
		$('span#dots-1, span#dots-2').css('color','#555');
		$('.dropdowns-div').css('padding-bottom', '30px');
		$('.dropdowns-div, .smsContent').addClass('hidden');
		$('#mergerSmsPreview, div.pagination-div').removeClass('hidden');
	}
});