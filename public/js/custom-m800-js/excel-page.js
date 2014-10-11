$(document).ready(function(){
	if(window.location.href.indexOf("excel") > -1) {
	   $('h1').css('margin-bottom','0');
	   $('h5.subTitle').css('display','block')
       $('li#circle-step2-lightGrey, li#circle-stepCheck-grey, li#circle-step3-lightGrey, li#circle-step3-grey, span#dots-3').css('display','none');
       $('li#circle-step2-grey').css('display','initial');
	   $('span#dots-1').css('color','#555');
	   $('.searchbar > input.form-control').attr('placeholder', 'Search Contact');
    }

	if(window.location.href.indexOf("with-schedule") > -1) {
	   $('#withSched').removeClass('hidden');
	   $('.schedule-div').addClass('hidden');
	   $('#withoutSched').addClass('hidden');
    }
	
	$("#Next").click(function(){
		if(checkUploadedExcel()){
			window.location= window.location.origin + '/new/confirm';
		}
	});
});