$(document).ready(function(){
	if(window.location.href.indexOf("confirm") > -1) {
	   $('h1').css('margin-bottom','0');
	   $('h5.subTitle').css('display','block')
       $('li#circle-step2-lightGrey, li#circle-stepCheck-lightGrey, li#circle-step3-lightGrey, li#circle-step3-grey, span#dots-3').css('display','none');
       $('li#circle-step2-grey, li#circle-stepCheck-grey').css('display','initial');
	   $('span#dots-1, span#dots-2').css('color','#555');
	   $('.searchbar > input.form-control').attr('placeholder', 'Search Contact');
    }
});