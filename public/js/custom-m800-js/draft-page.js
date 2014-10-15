var draftTableContent = [['If task name incomplete and is not something that is related to the task', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'], ['Top up notification', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'], ['If task name incomplete and is not something that is related to the task', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'], ['If task name incomplete and is not something that is related to the task', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'],['If task name incomplete and is not something that is related to the task', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'], ['If task name incomplete and is not something that is related to the task', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'],['No Subject _202', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm'],['No Subject _203', '2,000', '2,000', 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'June 6th 2014 5:53:04 pm']];

var flag = false; //to trap the double execution of the document.ready()

$(document).ready(function(){
	if (!flag) {
		generateDraftTable();
		flag = true;
	}
	//append the task name to the modal pop-up
	$('.deleteDraft').click(function(){
		var textsms = $(this).data('content');
		$('.taskNameDeleted').empty();
		$('.taskNameDeleted').append(textsms);
	});
}); //end of document.ready

//generate the drafts table
function generateDraftTable() {
	var content = '',
		taskname = '',
		recipient = '',
		noSMS = '',
		textSMS = '',
		lastupdate = '', 
		createtime = '',
		trashHtml = '',
		editHtml = '';
		
		for (i=0; i<draftTableContent.length; i++){
			taskname = draftTableContent[i][0];
			if (taskname.length > 22) {
				taskname = taskname.substr(0,22) + '...';
			}
			recipient =  draftTableContent[i][1];
			noSMS =  draftTableContent[i][2];
			textSMS =  draftTableContent[i][3];
			if (textSMS.length > 50) {
				textSMS = textSMS.substr(0,50) + '...';
			}
			lastupdate =  draftTableContent[i][4];
			createtime =  draftTableContent[i][5];
			
			editHtml = '<a href="/draft/edit"><span class="glyphicon glyphicon-pencil btn-pale-blue"></span></a>';
			trashHtml = '<a href="" data-target="#draft" data-toggle="modal" data-content="' + draftTableContent[i][0] + '" class="deleteDraft"><img src="/img/trash-can.png" alt = "Delete" title = "trash-can.png" class="img-responsive"/></a>';
			
			content = content + '<div class="row detail-row"><div class="detail-item col-xs-2 taskname">'+ taskname +'</div><div class="detail-item col-xs-1 recipient">'+ recipient +'</div><div class="detail-item col-xs-2 noSMS">'+ noSMS +'</div><div class="detail-item col-xs-2 content">'+ textSMS +'</div><div class="detail-item col-xs-2 timedate">'+ lastupdate +'</div><div class="detail-item col-xs-2 timedate createtime">'+ createtime +'</div><div class="detail-item col-xs-2 deleteEdit"><div class="row"><div class="col-xs-6 editLink">'+ editHtml +'</div><div class="col-xs-6 trashcan">'+ trashHtml +'</div></div></div></div>';
		}
	$('.recordsTable').append(content);
}