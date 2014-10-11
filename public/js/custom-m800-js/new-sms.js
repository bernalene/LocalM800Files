$(document).ready(function(){
	//to enable the popover for the question mark on hover of the new sms simple page
	$('#question-mark').popover({
		html: true,
		placement: 'right',
		content: '<div class="question-hint"><span><strong>Where is the CSC or CSV?</strong></span><br/><p>The card security code is located on the back of MasterCard, Visa</p></div>',
		template: '<div class="popover CSCSV" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
		trigger: 'hover' 
	});
	if(window.location.href.indexOf("new") > -1) {
		 $('li#circle-stepCheck-grey, li#circle-step3-lightGrey, li#circle-step3-grey, span#dots-3').css('display','none');
	}
	//to check the browser if it is on simple page to display number 2
	if(window.location.href.indexOf("simple") > -1) {
	   $('h1').css('margin-bottom','0');
	   $('h5.subTitle').css('display','block')
       $('li#circle-step2-lightGrey, li#circle-stepCheck-grey, li#circle-step3-lightGrey, li#circle-step3-grey, span#dots-3').css('display','none');
       $('li#circle-step2-grey').css('display','initial');
	   $('span#dots-1').css('color','#555');
	   $('.searchbar > input.form-control').attr('placeholder', 'Search Contact');
    }
		
	//International - China dropdown
	$('.previewPicker').selectpicker();
	
	//Schedule dropdown
	$('.schedulePicker').selectpicker();
	
	//for the text area - sms message
	$('#smsMessage').bootstrapValidator({
		fields: {
			smsMsg: {
				validators: {
					callback: {
						message: '<span class="glyphicon glyphicon-exclamation-sign" id="lengthExceed" data-container="body" data-toggle="popover"></span>',
						callback: function(value, validator){
									var options = $('#smsMsg').val();
									var type = "";
									var limits = 800;
									if ($('.previewPicker').find('li').hasClass('selected')){
										type = $(".previewPicker option:selected" ).text();
										switch (type){
											case 'China': limits = 400;
														   break;
											default:  limits = 800;
										}
									}
							return (options.length <= limits);	
						}
					}
				}
			}
		}
	})
	.on('error.field.bv', function(e, data) {
		$('#smsMessage > .help-block').css('display', 'block');
		$('#smsMessage > .help-block').children('.glyphicon-exclamation-sign').css('display', 'block');
	})
	.on('success.field.bv', function(e, data) {
        createBubbleMsg();
    });
	 
	//to be used for recipients
	var test = [{id: '1', text: '235511311'}, {id: '2', text: '54653031313'}, {id: '3', text: '3221515'}, {id: '4', text: '41561213'}, {id: '5', text: '12313131'}];
	$('#select2form')
		.find('[name="recipientNos"]')
			.select2({
				tokenSeparators: [",", " "],
				tags: test
			})
			.change(function(e){
				$('#select2form').bootstrapValidator('revalidateField', 'recipientNos');
				changeButton();
			})
			.end()
		.bootstrapValidator({
			selector: '#recipients',
			container: 'popover',
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove'
			},
			fields: {
				recipientNos: {
					validators: {
						callback: {
							//use 4 as length for testing purposes
							message: '<span class="glyphicon glyphicon-exclamation-sign" id="numbersExceed" data-container="body" data-toggle="popover"></span>',
							callback: function(value, validator){
								var options = validator.getFieldElements('recipientNos').val(),
									options2 = options.split(',');
									countRecipients(options2.length); //call the function to count the number of recipients already inputted
								return (options2 != null && options2.length >= 1 && options2.length <= 4);
							}
						}
					}
				}
			}
		})
		//to generate the popover tooltip
		.on('error.field.bv', function(e, data) {
			$('.recipientTextArea').find('.help-block').css('display', 'block');
			$('.recipientTextArea').find('.help-block').children('.glyphicon-exclamation-sign').css('display', 'block');
		});
	//for add from contacts modal - to disable the display of modal upon document.ready
	$('#fromContacts').modal('hide');
	$('#import-excel').modal('hide');

	//group dropdown in modal
	$('.groupPicker').selectpicker();
	
	//on hover of the exclamation point - number of recipients exceeds 100,000
	$('#numbersExceed').popover ({
		html: true,
		placement: 'left',
		template: '<div class="popover redPopover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
		content: '<div class="exclamation-error"><p>Error: The number of recipients exceeds maximum of 100,000</p></div>',
		trigger: 'hover' 
	});
	
	//on hover of the exclamation point - number of characters exceeds 100,000
	$('#lengthExceed').popover ({
		html: true,
		placement: 'right',
		template: '<div class="popover redPopover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
		content: '<div class="exclamation-error"><p>Error: The number of <strong>International & China</strong> sms exceeds the maximum of 5.</p></div>',
		trigger: 'hover' 
	});
	
	//for the validator of the file upload
	$('#uploadForm').bootstrapValidator({
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
	})
	.on('success.field.bv', function(e, data) {
        triggerFileUpload ();
    }); 
	
	//to delete the previously stored in the modal everytime it is shown
	$('#import-excel').on('hidden.bs.modal', function (e) {
		showRedUpload();
	});
	$('#use-template').on('hidden.bs.modal', function (e) {
		$('.templates-row').each(function(){
			$(this).removeClass('addShadow');
			$(this).children('.template-title').children('.glyphicon-ok').remove();
		});
	});
	$('#clear-recipients').on('shown.bs.modal', function (e) {
		$('#import-excel').modal('hide');
	});

	$('.smsbox').click(function(){
		var taskName = $('.recipientTextArea').find('input').val();
		if (taskName == "")
			taskName = "No Subject_task#";
		console.log(taskName);

		var filter = {
	 		taskName: taskName
	 	};

	 	console.log(filter);

		$.ajax({
	 		type: "GET",
	 		url: "/new/ajax",
	 		data: filter,
	 		// dataType: "json",
	 		// success: function(data){
	 		// }
	 	})
	});
	
}); //end document.ready

//to change the style of the x-button of the recipient number
function changeButton(){
	$('li.select2-search-choice').children('a').addClass('glyphicon glyphicon-remove-sign').removeClass('select2-search-choice-close');
}

//to display the number of recipients already entered
function countRecipients (ctr){
	$('span.count').html('<strong>' + ctr + '</strong> / 100,000');
	if (ctr<=4){
		$('.glyphicon-exclamation-sign').css("display", "none");
	}
}

//to display the file upload dialog box onclick of the import excel file button
function triggerFileUpload() {
	var inputData = $('#uploadexcelFile').next().find('input#disabledInput').val($('#uploadexcelFile').val());
	$('div#reupload-div, #reupload-div > .row > label, span#rowsCount').removeClass("hidden");
	$('#uploadExcel, #uploadexcelFile').addClass('hidden');
	$('#uploadexcelFile').submit();
}

//display the original upload button when the x button is clicked for a file already selected
function showRedUpload () {
	$('div#reupload-div, #reupload-div > .row > label, span#rowsCount').addClass("hidden");
	$('#uploadExcel, #uploadexcelFile').removeClass('hidden');
}

//click on the templates-row
function useTemplateClick(rowClicked){
	$('.templates-row').each(function(){
		$(this).removeClass('addShadow');
		$(this).children('.template-title').children('.glyphicon-ok').remove();
	});
	$(rowClicked).addClass('addShadow');
	$(rowClicked).children('.template-title').append('<span class="glyphicon glyphicon-ok"></span>');
}

//===create the new div to create the bubble popup===//
function createBubbleMsg() {
	var msgContent = $('#smsMsg');
	var limit = 0; //number of characters per message
	var txt = $(msgContent).val();
	var len = txt.length;
	var newText = "";
	var ctAll = 1;
	
	//determine what is the limit to be set for the input	
	limit = checkLimits();
	
	//check if the limit is already reached to make way for the div to be created
	if (len <= limit){
		newText = txt;
		$('#previewMsg').empty().append('<div class="msgItem"><span class="msgTitle">Message' + ctAll +  '</span><img class="img-responsive" src="/img/preview-msg.png"/><p class="mainMsg">' + newText + '</p></div>');
		
		//to change the content of the SMS count
		$('.validation-msg').html('<strong>International</strong> (160 characters / sms): Total <strong>' + len + '</strong> characters in <strong> ' + ctAll + '</strong> SMS <br/> <strong>China</strong> (80 characters / sms): Total <strong> ' + len + '</strong> characters in <strong> ' + (ctAll*2) + '</strong> SMS ');
	}else {
		var diff= len;
		var htmlOutput = '';
		while (diff > limit) {
			diff = diff-limit;
			if (ctAll == 1){
				newTxt = txt.substr(0, limit);
			}else {
				newTxt = txt.substr((limit*(ctAll-1)), limit);
			}
			htmlOutput = htmlOutput + '<div class="msgItem"><span class="msgTitle">Message ' + ctAll +  '</span><img class="img-responsive" src="/img/preview-msg.png"/><p class="mainMsg">' + newTxt + '</p></div>';			
			ctAll++;
		}
		newTxt = txt.substr((len-diff), limit);
		htmlOutput = htmlOutput + '<div class="msgItem"><span class="msgTitle">Message ' + ctAll +  '</span><img class="img-responsive" src="/img/preview-msg.png"/><p class="mainMsg">' + newTxt + '</p></div>';
		$('#previewMsg').empty().append(htmlOutput);
		
		//to change the content of the SMS count
		$('.validation-msg').html('<strong>International</strong> (160 characters / sms): Total <strong>' + len + '</strong> characters in <strong> ' + ctAll + '</strong> SMS <br/> <strong>China</strong> (80 characters / sms): Total <strong> ' + len + '</strong> characters in <strong> ' + ctAll + '</strong> SMS ');
	}
}

//to determine the limit to use per sms msg
function checkLimits (){
	var type = "";
	var limits = 800;
	if ($('.previewPicker').find('li').hasClass('selected')){
		type = $(".previewPicker option:selected" ).text();
		switch (type){
			case 'China': limits = 80;
						   break;
			default:  limits = 160;
		}
	}
	return limits;
}