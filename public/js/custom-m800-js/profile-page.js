var pw = 'string123';

$(document).ready(function(){	
	//validate the password - current
	$('#profile-password').bootstrapValidator({
		container: 'popover',
		fields: {
			oldPassword: {
				validators: {
					callback: {
						message:' ',
						callback: function(value, validator){
							var inputPW = value; //get the inputted pw
							return (pw == inputPW );
						}
					}
				}
			},
			newPassword: {
				validators: {
					stringLength: {
						min: 8
					}/* ,
					regexp: {
                        //regexp:  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
					}, */
					
				}
			},
			confirmPassword: {
				validators: {
					stringLength: {
						min: 8
					},
					different: {
						field: '#newPassword'
					},
					callback: {
						callback: function (value, validator){
							var newPassword = $('#newPassword').val();
							
							return (newPassword == value);
						}
					}
				}
			}
		}
	})
	.on('error.field.bv', '#oldPassword', function(e,data){
		//enable the popover
		$('#oldPassword').popover('show');
		$('#oldPassword').popover({
			html: true,
			placement: 'right',
			template: '<div class="popover redPopover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
		});
	})
	.on('error.field.bv', '#newPassword', function(e,data){
		//enable the popover
		$('#newPassword').popover('show');
		$('#newPassword').popover({
			html: true,
			placement: 'right',
			template: '<div class="popover bluePopover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
		});
	})
	.on('error.field.bv', '#confirmPassword', function(e,data){
		//enable the popover
		$('#confirmPassword').popover('show');
		$('#confirmPassword').popover({
			html: true,
			placement: 'right',
			template: '<div class="popover redPopover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
		});
	})
	.on('success.field.bv', '#oldPassword', function(e,data){
		$('#oldPassword').popover('hide');
	})
	.on('success.field.bv', '#newPassword', function(e,data){
		$('#newPassword').popover('hide');
	})
	.on('success.field.bv', '#confirmPassword', function(e,data){
		$('#confirmPassword').popover('hide');
	});
}); //end of document.ready