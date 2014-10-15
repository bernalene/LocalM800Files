//contacts data
var contactsList = [['Hannah Abbott', 'Group A', 'M800 Limited', '85298765432'],['Bathsheba Babbing', 'Group A', 'M800 Limited', '85298765432'], ['Ludo Bagman', 'Group A, Group B', 'M800 Limited', '85298765432'], ['Katie Bell', 'Group A, Group B', 'M800 Limited', '85298765432'], ['Cuthbert Binns', 'Group A, Group B', 'M800 Limited', '85298765432'], ['Regulus Arcturus Blackwater', 'Group A', 'M800 Limited', '85298765432'], ['Sirius Black', 'Group A, Group B, Group C', 'M800 Limited', '85298765432'], ['Amelia Bones', 'Group A, Group B, Group C', 'M800 Limited', '85298765432'], ['Susan Bones', 'Group A, Group B, Group C', 'M800 Limited', '85298765432'], ['Terry Boot', 'Group A, Group B, Group C, Group D', 'M800 Limited', '85298765432']];

$(document).ready(function(){
	generateContacts(contactsList);
	$("#contacts").tablesorter({
		headers: {
			'0': {
				sorter: false
			}
		}
	});
	
	$('.editContact').click(function(){
		var contactName = $(this).data('name');
		var mobileNo = $(this).data('mobile');
		var company = $(this).data('company');
		
		$('.input-name').val(contactName);
		$('.input-mobile').val(mobileNo);
		$('.input-company').val(company);
	});
	
	$('#modal-add-contact, #modal-add-new-group').on('show.bs.modal', function(e){
		$('.input-name').val('');
		$('.input-mobile').val('');
		$('.input-company').val('');
	});
	
	$('.edit').click(function(){
		$(this).parent().parent().children('.hidden').removeClass('hidden').addClass('visible');
		$(this).parent().addClass('hidden');
	});
	$('.confirm').click(function(){
		var newGroupname = $(this).parent().children('.input-group-name').val();
		$(this).parent().removeClass('visible').addClass('hidden');
		$(this).parent().parent().children('.init-groupname').removeClass('hidden');
		$(this).parent().parent().children('.init-groupname').children('.group-name').empty();
		$(this).parent().parent().children('.init-groupname').children('.group-name').append(newGroupname);
	});
	$('.tablesorter-header-inner').children().children('.custom-checkbox').click(function () {
		if ($(this).hasClass('checked')){
			$('td.checkbox').children().children('.custom-checkbox').each(function(){
				$('td.checkbox').children().children('.custom-checkbox').addClass('checked');
				$('td.checkbox').children().children('.custom-checkbox').append('<span class="glyphicon glyphicon-ok"></span>');
			});
		}else {
			$('td.checkbox').children().children('.custom-checkbox').each(function(){
				$(this).removeClass('checked');
				$(this).empty('span.glyphicon-ok');
			});
		}
	});

	//set popover option globally
	$('*', 'form').popover({
		html: true,
		placement: 'right',
		trigger: 'manual',
		template: '<div class="popover error-fields" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	});
	
	//add new contact validation
	addNewContactValidation();
	
	//add new group validation
	addNewGroupValidation();

});

//generate the contacts list
function generateContacts(contactsList) {
	var content = '',
		name = '',
		group = '',
		company = '',
		mobile = '',
		checkboxHtml = '',
		pencilIcon = '';
		
		checkboxHtml = '<label class="control-label check-group"><div class="custom-checkbox"><input class="sr-only pull-left reset-margin" type="checkbox" name="ContactName" value="check"/></div></label>';
			
		for (i=0; i<contactsList.length; i++){
			name = contactsList[i][0];
			if(name.length > 22) {
				name = name.substr(0,22) + '..';
			}
			group = contactsList[i][1];
			if (group.length > 25) {
				group = group.substr(0,25) + '..';
			}
			company = contactsList[i][2];
			mobile = contactsList [i][3];
			
			pencilIcon = '<div class="col-xs-6 editLink"><a href="" data-toggle="modal" data-target="#modal-edit-contact" class="editContact" data-name="'+ name +'" data-company="' + company +'" data-mobile="' + mobile +'"><span class="glyphicon glyphicon-pencil btn-pale-blue"></span></a></div>';
			
			content = content + '<tr class="detail-row"><td class="detail-item checkbox">'+ checkboxHtml +'</td><td class="detail-item">'+ name +'</td><td class="detail-item">'+ group +'</td><td class="detail-item">'+ company +'</td><td class="detail-item">'+ mobile +'</td><td class="detail-item">'+ pencilIcon +'</td></tr>';
		}
		$('.contactsList').append(content);
		
}

//validation for Add New Contact
function addNewContactValidation() {
	$('#name', '#addContactForm').popover('hide');
	
	$('#addContactForm').bootstrapValidator({
		container: '#no',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		live: 'enabled',
		fields: {
			name: {
				validators: {
					notEmpty: {}
				}
			}
		}
	}).on('error.field.bv', function(e, data){
		$(e.target).popover('show');
	}).on('success.field.bv', function(e, data){
		$(e.target).popover('hide');
	});
}; 
//end of validation for Add New Contact

//validation for Add New Group
function addNewGroupValidation() {
	$('#name', '#addGroupForm').popover('hide');
	
	$('#addGroupForm').bootstrapValidator({
		container: '#no',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		live: 'enabled',
		fields: {
			name: {
				validators: {
					notEmpty: {}
				}
			}
		}
	}).on('error.field.bv', function(e, data){
		$(e.target).popover('show');
	}).on('success.field.bv', function(e, data){
		$(e.target).popover('hide');
	});
}; 
//end of validation for Add New Contact