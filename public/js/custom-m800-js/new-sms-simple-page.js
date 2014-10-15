$(document).ready(function(){

 	var recipient = [];

 	/* for testing */
	$('#circle-step2-grey').on('click', function(e){
		$('.select2-search-choice>div').each(function(index, element){

			recipient.push($(element).text());
			
		});

		var schedule = $('.schedulePicker .selectpicker .selected a').attr("data-normalized-text");

		var recipients = recipient.join(" ; ");

		var content = $('#smsMessage textarea').val();
		
		console.log(recipients);
		console.log(schedule);
		console.log(content);

	});

	/* get Add From Contacts data */
	$('#simpleAddFrom a[data-target="#fromContacts"]').on('click', function(e){

		var filter = {
			searchItem: '',
	 		group: 'All Group',
	 		page: 1
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.contactsItem').remove();
	 			var contacts = data['contacts'];
	 			var content = '';

	 			for(i = 0; i < contacts.length; i++){
	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 		}
	 	});
	});

	/* from contacts - select group */
	$('.groupPicker').change(function(){

		var filter = {
			searchItem: '',
	 		group: $('.groupPicker .filter-option').text(),
	 		page: 1
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.contactsItem').remove();
	 			var contacts = data['contacts'];
	 			var content = '';

	 			for(i = 0; i < contacts.length; i++){
	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 		}
	 	});
	});

	/* from contacts - click paginations */
	$(document).on('click', '#fromContacts .pagination a', function(){
		var pgRequest = $(this).text();
		var currentPage = $('#fromContacts .pagination a.current-pg').text();
		var totalPage = $('#fromContacts .pagination li:last').prev().find('a').text();

		pgRequest = checkPgRequest(pgRequest, currentPage, totalPage);

		var filter = {
			searchItem: '',
	 		group: $('.groupPicker .filter-option').text(),
	 		page: pgRequest
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.contactsItem').remove();
	 			var contacts = data['contacts'];
	 			var content = '';

	 			for(i = 0; i < contacts.length; i++){
	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 		}
	 	});
	});

	/* from contacts - go to page */
	$(document).on('click', '#fromContacts #goButton', function(){
		var goToPage = parseInt($('#fromContacts input[name="goToPageInput"]').val());

		if (isNaN(goToPage))
			goToPage = 0;

		var filter = {
			searchItem: '',
	 		group: $('.groupPicker .filter-option').text(),
	 		page: goToPage
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.contactsItem').remove();
	 			var contacts = data['contacts'];
	 			var content = '';

	 			for(i = 0; i < contacts.length; i++){
	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 		}
	 	});
	});
	
	/* From Contacts - search bar */
	$(document).on('click', '#fromContacts .modal-searchbar button', function(){

		var filter = {
	 		searchItem: $('.modal-searchbar input[placeholder="Search Contact"]').val(),
	 		group: '',
	 		page: 1
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.contactsItem').remove();
	 			var contacts = data['contacts'];
	 			var content = '';

	 			for(i = 0; i < contacts.length; i++){
	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 		}
	 	});

	});
	
	/* get Use Template data */
	$('#useTemplate').on('click', function(e){
		var filter = {
	 		searchItem: '',
	 		page: 1
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple/template",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.templates-row').remove();
	 			var templateContent = data['template'];

	 			for(i = 0; i < templateContent.length; i++){
	 				$('.templates-div').append('<div onclick="useTemplateClick(this);" class="templates-row"><span class="template-title">' + templateContent[i][0] + '</span><p class="template-item">' + templateContent[i][0].substr(0, 50) + '...</p></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 4));
	 		}
	 	});
	});

	/*Use Template - Click Pagination */
	$(document).on('click', '#use-template .pagination a', function(){
		var pgRequest = $(this).text();
		var currentPage = $('#use-template .pagination a.current-pg').text();
		var totalPage = $('#use-template .pagination li:last').prev().find('a').text();
		
		pgRequest = checkPgRequest(pgRequest, currentPage, totalPage);

		var filter = {
			searchItem: '',
	 		page: pgRequest
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple/template",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.templates-row').remove();
	 			var templateContent = data['template'];

	 			for(i = 0; i < templateContent.length; i++){
	 				$('.templates-div').append('<div onclick="useTemplateClick(this);" class="templates-row"><span class="template-title">' + templateContent[i][0] + '</span><p class="template-item">' + templateContent[i][0].substr(0, 50) + '...</p></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 4));
	 		}
	 	});

	});
	
	/* Use Template - Go to page funtion */
	$(document).on('click', '#use-template #goButton', function(){
		var goToPage = parseInt($('#use-template input[name="goToPageInput"]').val());

		if (isNaN(goToPage))
			goToPage = 0;

		var filter = {
			searchItem: '',
	 		page: goToPage
	 	};

	 	console.log(filter);

	 	$.ajax({
	 		type: "GET",
	 		url: "/new/ajax/simple/template",
	 		data: filter,
	 		dataType: "json",
	 		success: function(data){

	 			console.log(data);

	 			$('.templates-row').remove();
	 			var templateContent = data['template'];

	 			for(i = 0; i < templateContent.length; i++){
	 				$('.templates-div').append('<div onclick="useTemplateClick(this);" class="templates-row"><span class="template-title">' + templateContent[i][0] + '</span><p class="template-item">' + templateContent[i][0].substr(0, 50) + '...</p></div>');
				}

				$('.pagination-div').empty();
				generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 4));
	 		}
	 	});
	});

	$(document).on('click', '#use-template .searchbar button', function(){
		// var filter = {
	 // 		searchItem: $('.modal-searchbar input[placeholder="Search Contact"]').val(),
	 // 		group: '',
	 // 		page: 1
	 // 	};

	 // 	console.log(filter);

	 // 	$.ajax({
	 // 		type: "GET",
	 // 		url: "/new/ajax/simple",
	 // 		data: filter,
	 // 		dataType: "json",
	 // 		success: function(data){

	 // 			console.log(data);

	 // 			$('.contactsItem').remove();
	 // 			var contacts = data['contacts'];
	 // 			var content = '';

	 // 			for(i = 0; i < contacts.length; i++){
	 // 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
		// 		}

		// 		$('.pagination-div').empty();
		// 		generatePagination(data['totalPage'], data['currentPage'], Math.round((data['totalPage'] - 1) * 10));
	 // 		}
	 // 	});

	});

	// $('#newSMS-content').find('#simpleAddFrom a').on('click',function(){
	// 	if ($(this).attr('data-target') === "#fromContacts") {
	// 		var filter = {
	// 	 		simpleAddFrom: $(this).attr('data-target')
	// 	 	};

	// 	 	console.log(filter);
		 	
	// 	 	$.ajax({
	// 	 		type: "GET",
	// 	 		url: "/new/ajax/simple",
	// 	 		data: filter,
	// 	 		dataType: "json",
	// 	 		success: function(data){

	// 	 			console.log(data);

	// 	 			$('.contactsItem').remove();
	// 	 			var contacts = data['contacts'];
	// 	 			var content = '';

	// 	 			for(i=0; i<contacts.length;i++){
	// 	 				$('.contacts-list').append('<div class="row contactsItem"><label class="cotrol-label check-group"><div class="custom-checkbox"></div><input type="checkbox" name="longGroupName" value="check" class="sr-only pull-left reset-margin col-xs-1"></label><span class="col-xs-3">' + contacts[i][0] + '</span><span class="col-xs-5 col-xs-offset-3">' + contacts[i][1] + '</span></div>');
	// 				}
	// 	 		}
	// 	 	});
	// 	 }

	// 	if ($(this).attr('data-target') === "#import-excel")
	// 		alert("hi");

	// });
});

function checkPgRequest(pgRequest, currentPage, totalPage) {

	if (pgRequest === '◀' && currentPage != 1)
		pgRequest = parseInt(currentPage) - 1;
	
	if (pgRequest === '▶' && currentPage != totalPage)
		pgRequest = parseInt(currentPage) + 1;

	if (pgRequest === '◀' && currentPage == 1)
		pgRequest = 1;

	if (pgRequest === '▶' && currentPage == totalPage)
		pgRequest = totalPage;

	return pgRequest;
}

