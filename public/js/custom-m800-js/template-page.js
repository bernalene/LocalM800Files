$(document).ready(function(){
	$('.searchbar').children().attr('placeholder', 'Search Template');
	
	//to get the template name shown on the modal
	$('.deleteTemplate').click(function(){
		var templateName = $(this).data('title');
		$('.templateName').empty();
		$('.templateName').append('"' + templateName + '"');
	});
	
	// to add a border shadow upon hover
	$('div.templates-row')
	.mouseenter(function(){
		$(this).addClass('addShadow');
	})
	.mouseleave(function(){
		$(this).removeClass('addShadow');
	});
	
	//to copy the content of the template to the modal
	$('.editTemplate').click(function(){
		var templateName = $(this).data('title');
		var templateContent = $(this).data('content');
		$('input#template-name').val(templateName);
		$('textarea#template-content').val(templateContent);
		
		//console.log(templateName +  " - " + templateContent);
	});
	
	//count the number of characters in the textarea
	var intlSmsCount = 0;
	var chinaSmsCount = 0;
	var limit = 800;
	var intlCharacterLimit = 160;
	var chinaCharacterLimit = 80;

	var onLoadLen = $('textarea#template-content').val().length;

	$('.characters').html(onLoadLen);
	$('.sms-count').html(Math.ceil(onLoadLen/intlCharacterLimit));
	$('.china-sms-ctr').html(Math.ceil(onLoadLen/intlCharacterLimit));

	$('textarea#template-content').keyup(function(){
		var content = $(this);
		var text = $(content).val();
		var txtLen = text.length;
		intlSmsCount = Math.ceil(txtLen/intlCharacterLimit);
		chinaSmsCount = Math.ceil(txtLen/chinaCharacterLimit);
				
		$('.sms-count').html(intlSmsCount);
		$('.china-sms-ctr').html(chinaSmsCount);
		$('.characters').html(txtLen);
	});
	
	$('#add-template-btn').click(function(){
		$('input#template-name').val('');
		$('textarea#template-content').val('');
	});
}); //end of document.ready