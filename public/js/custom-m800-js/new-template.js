$(document).ready(function(){
	var intlSmsCount = 0;
	var chinaSmsCount = 0;
	var limit = 800;
	var intlCharacterLimit = 160;
	var chinaCharacterLimit = 80;

	var onLoadLen = $('#template-content').val().length;

	$('.characters').html(onLoadLen);
	$('.sms-count').html(Math.ceil(onLoadLen/intlCharacterLimit));
	$('.china-sms-ctr').html(Math.ceil(onLoadLen/intlCharacterLimit));

	$('#template-content').keyup(function(){
		var content = $(this);
		var text = $(content).val();
		var txtLen = text.length;
		intlSmsCount = Math.ceil(txtLen/intlCharacterLimit);
		chinaSmsCount = Math.ceil(txtLen/chinaCharacterLimit);
				
		$('.sms-count').html(intlSmsCount);
		$('.china-sms-ctr').html(chinaSmsCount);
		$('.characters').html(txtLen);
	});
});