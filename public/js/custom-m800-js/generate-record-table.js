// var contentData = [['18','10 / 0/ 0 / 0','07/10/2014'],['17','10 / 0 / 0 / 0','07/10/2014'],['1','10 / 0 / 0 / 0','07/10/2014'],['10','10 / 0 / 0 / 0','07/10/2014'],['5','10 / 0 / 0 / 0','07/10/2014'],['13','10 / 0 / 0 / 0','07/10/2014'],['7','10 / 0 / 0 / 0','07/10/2014']];
// var contentData = record;
var recordDetail = [['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'],  ['glyphicon-remove-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'],  ['glyphicon-remove-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'],  ['glyphicon-remove-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'],  ['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'],  ['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'], ['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'], ['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'delivered-img.png'], ['glyphicon-remove-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'failed-img.png'], ['glyphicon-ok-sign','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'failed-img.png']];

$(document).ready(function(){

	//default display mode of table - daily
	var view = 'day';
	var viewMode = '';
	// generateRecordTable(contentData);
	if (view === 'day'){
		generateRecordTable(contentData);
	}
	$('.displayMode').click(function(){
		viewMode = $(this).children().attr('value');
		switch (viewMode){
			case 'month': 	
				$('.recordsItems').remove();
				monthlyViewer();
				break;
			case 'day': generateRecordTable(contentData); break;
			default: generateRecordTable(contentData);
		}
	});
	if(window.location.href.indexOf("record-detail") > -1) {
       generateRecordsDetail(recordDetail);
    }
});

//generate the records table
function generateRecordTable(contentData){
	var arrContent = contentData;
	var content = '';
	var taskName = '',
	    totalSuccessReply = '',
		lastSent = '';

	for(i=0; i<arrContent.length;i++){
		taskName = arrContent[i][0];
		totalSuccessReply = arrContent[i][1];
		lastSent = arrContent[i][2];
		//console.log(taskName + " - " + totalSuccessReply + " - " + lastSent);
		content = content + '<div class="row record-row recordsItems"><a href="/overview/record-detail"><div class="col-xs-2"><span class="record-item pull-left">' + taskName +'</span></div><div class="col-xs-5 col-xs-offset-1"><span class="record-item pull-left">'+ totalSuccessReply +'</span></div><div class="col-xs-3 col-xs-offset-1"><span class="record-item pull-left">' + lastSent + '</span></div></a></div>';
	}
	$('.pagination-div').before(content);
}

//generate the record-detail page
function generateRecordsDetail(recordDetail) {
	var recordDetails = recordDetail;
	var content = '',
		schedule = '',
		sender = '',
		recipient = '',
		noOfSMS = '',
		smsText = '',
		create = '',
		status = '';
	
	//add and concatenate the values inside a string content to be appended later
	for (i=0; i < recordDetails.length; i++){
		schedule = recordDetails[i][0];
		sender = recordDetails[i][1];
		recipient = recordDetails[i][2];
		noOfSMS = recordDetails[i][3];
		smsText = recordDetails[i][4];
		create = recordDetails[i][5];
		status = recordDetails[i][6];
		
		content = content + '<div class="row detail-row"><div class="col-xs-1"><span class="detail-schedule glyphicon ' + schedule + '"></span></div><div class="col-xs-1 senderCol"><span class="detail-item">' + sender +'</span></div><div class="col-xs-1"><span class="detail-item">' + recipient +'</span></div><div class="col-xs-2 noSMScol"><span class="detail-item">' + noOfSMS + '</span></div><div class="col-xs-3"><span class="detail-item">' + smsText.substr(0,50) +'...</span></div><div class="col-xs-2 createTimecol"><span class="detail-item">' + create + '</span></div><div class=""><img src="/img/' + status + '" alt = "' + status + '" title = "' + status +'" class="img-responsive"/></div></div>';
	}
	$('.pagination-div').before(content);
}