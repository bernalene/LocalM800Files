//for use of all SMS content page
var outboxContent = [['When creating a moment from a string, we first check if the string matches known', 'Simple SMS', 'ok', '2,000', '2,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['Top up notification', 'Excel SMS', 'not', '2,000', '2,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['When creating a moment from a string, we first check if the string matches known', 'Merger SMS', 'not', '50,000', '50,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['When creating a moment from a string, we first check if the string matches known', 'Simple SMS', 'not', '50,000', '50,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['When creating a moment from a string, we first check if the string matches known', 'Excel SMS', 'ok', '60,000', '60,000', 'June 6th 2014 5:53:04 pm', 'sending'],['When creating a moment from a string, we first check if the string matches known', 'Merger SMS', 'ok', '60,000', '60,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['No Subject _202', 'Simple SMS', 'ok', '100,000', '100,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['No Subject _203', 'Excel SMS', 'ok', '100,000', '100,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['No Subject_204', 'Merger SMS', 'not', '100,000', '100,000', 'June 6th 2014 5:53:04 pm', 'sending'], ['No Subject _205', 'Simple SMS', 'ok', '100,000', '100,000', 'June 6th 2014 5:53:04 pm', 'sending']];

//for use of all SMS outbox detail page
var outboxDetail = [['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'],  ['not','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'], ['not','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'],  ['not','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'],  ['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'],  ['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'], ['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'], ['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'sending'], ['not','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'failed'], ['ok','50010000908','85298765432','1','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.', 'June 6th 2014 5:53:04 pm', 'failed']];

//for use of all SMS sent page
var sentContent = [['When creating a moment from a string, we first check if the string matches known','Simple SMS', 'ok', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Excel SMS', 'not', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Merger SMS', 'not', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Simple SMS', 'not', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Excel SMS', 'ok', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Merger SMS', 'ok', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent'], ['Top up notification','Simple SMS', 'ok', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'sent']];


//for use in the all SMS scheduled page
var scheduledContent = [['When creating a moment from a string, we first check if the string matches known','Simple SMS', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'pause'], ['Top up notification','Excel SMS', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'pause'], ['Top up notification','Merger SMS', '50,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'scheduling'], ['Top up notification','Simple SMS', '50,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'scheduling'], ['Top up notification','Excel SMS',  '60,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'cancel'], ['Top up notification','Merger SMS', '2,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'cancel'], ['Top up notification','Simple SMS',  '100,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'cancel'], ['Top up notification','Simple SMS',  '100,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'cancel'], ['Top up notification','Simple SMS',  '100,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'cancel'],['Top up notification','Simple SMS',  '100,000', '2,000 / 1,500 / 300 / 200', 'June 6th 2014 5:54:04 pm', 'June 6th 2014 5:54:04 pm', 'finish']];

//for use in the allSMS scheduledDetail page
var scheduledContentDetail = [['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm'],['Monday 18:01:02', 'Hong Kong', '50010020908', '852789456123', '1', 'When creating a moment from a string, we first check if the string matches known', 'June 6th 2014 5:53:04 pm']];

$(document).ready(function(){
	var flag = false; 
	
	if(window.location.href.indexOf("outbox") > -1) {
       generateOutboxContentTable(outboxContent);
    }
	
	if(window.location.href.indexOf("/detail") > -1) {
       generateOutboxDetailContent(outboxDetail);
    }
	
	if(window.location.href.indexOf("sent") > -1) {
       generateSentTableContent(sentContent);
    }
	
	if(window.location.href.indexOf("/scheduled/detail") > -1) {
       generateScheduledDetailContent(scheduledContentDetail);
	   flag = true;
    }
	if(window.location.href.indexOf("scheduled") > -1 && !flag) {
       generateScheduledContent(scheduledContent);
    }
	
	//check to display the calendar if the URL contains with-calendar
	if (window.location.href.indexOf("/scheduled/with-calendar") > -1 && !flag) {
		$('#with-calendar').removeClass('hidden');
	}
});

//generate the outbox content table
function generateOutboxContentTable(outboxContent){
	var arrOutbox = outboxContent;
	var taskname='',
		type='',
		schedule='',
		recipient='',
		noSMS='',
		createTime='',
		status='',
		imgpath='',
		content='';
		
		for (i=0; i<arrOutbox.length; i++){
			taskname=arrOutbox[i][0];
			type=arrOutbox[i][1];
			schedule=arrOutbox[i][2];
			recipient=arrOutbox[i][3];
			noSMS=arrOutbox[i][4];
			createTime=arrOutbox[i][5];
			status=arrOutbox[i][6];
			
			//to concatenate the string if text is lengthy
			if (taskname.length > 22) {
				taskname = taskname.substr(0,22) + "..."
			}
			
			//to display the appropriate icon based on the schedule stat
			if (schedule =='ok'){
				schedule = 'glyphicon-ok-sign';
			}else if (schedule == 'not'){
				schedule = 'glyphicon-remove-sign';
			}
			
			//check if status is sending
			if (status == 'sending'){
				imgpath = '<img src="/img/sending-img.png" alt="sending" title="sending" class="img-responsive"/>';
			}
			content = content + '<div class="row detail-row"><a href="detail/"><div class="col-xs-3 task-name detail-item">'+ taskname +'</div><div class="col-xs-2 smstype detail-item">' + type + '</div><div class="col-xs-1 detail-item"><span class="glyphicon '+ schedule +'"></span></div><div class="col-xs-1 recipient detail-item">' + recipient +'</div><div class="col-xs-1 noSMS detail-item">' + noSMS + '</div><div class="col-xs-2 detail-item">' + createTime + '</div><div class="col-xs-2">' + imgpath + '</div></a></div>'
		}
		//append before the pagination div 
		$('#outbox-content').append(content);
}

//generate the detail of the outbox row
function generateOutboxDetailContent(outboxDetail){
	var content = '';
	var smsText = '',
		schedule = '',
		sender = '',
		recipient = '',
		noSMS = '',
		status = '',
		imgpath = '',
		lastSent = '';
		
		for (i=0; i<outboxDetail.length; i++){
			schedule = outboxDetail[i][0];
			sender = outboxDetail[i][1];
			recipient = outboxDetail[i][2];
			noSMS = outboxDetail[i][3];
			smsText = outboxDetail[i][4];
			lastSent = outboxDetail[i][5];
			status = outboxDetail[i][6];
			
			//determine the schedule icon to be displayed - either check or x
			if (schedule == 'ok') {
				schedule = 'glyphicon-ok-sign';
			}else if (schedule == 'not') {
				schedule = 'glyphicon-remove-sign';
			}
			
			//concatenate the content if more than 50 characters
			if (smsText.length > 50){
				smsText = smsText.substr(0,50) + '...';
			}
			
			//cheek the status of the message
			if (status == 'sending'){
				imgpath = '<img src="/img/sending-img.png" alt="sending" title="sending" class="img-responsive"/>';
			}else if (status = 'failed'){
				imgpath = '<img src="/img/failed-img.png" alt="failed" title="Failed" class="img-responsive"/>';
			}
			content = content + '<div class="row detail-row"><div class="col-xs-1"><span class="detail-schedule glyphicon ' + schedule + '"></span></div><div class="col-xs-1 senderCol"><span class="detail-item">' + sender +'</span></div><div class="col-xs-1"><span class="detail-item">' + recipient +'</span></div><div class="col-xs-2 noSMScol"><span class="detail-item">' + noSMS + '</span></div><div class="col-xs-3"><span class="detail-item">' + smsText.substr(0,50) +'...</span></div><div class="col-xs-2 createTimecol"><span class="detail-item">' + lastSent + '</span></div><div>' + imgpath + '</div></div>';
		}
		$('.recordsTable').append(content);
}

function generateSentTableContent(sentContent){
	var content = '',
		taskname = '',
		type='',
		schedule='',
		recipient = '',
		successfail='',
		lastsent='',
		status='',
		imgpath='';
		
		for(i=0; i<sentContent.length;i++){
			taskname = sentContent[i][0];
			type = sentContent[i][1];
			schedule = sentContent[i][2];
			recipient = sentContent[i][3];
			successfail = sentContent[i][4];
			lastsent = sentContent[i][5];
			status = sentContent[i][6];
			
			if (taskname.length > 22){
				taskname = taskname.substr(0,22) + '...';
			}
			
			if (schedule == 'ok'){
				schedule = 'glyphicon-ok-sign';
			}else if (schedule == 'not'){
				schedule = 'glyphicon-remove-sign';
			}
			
			if (status == 'sent'){
				imgpath = '<img src="/img/sent-img.png" alt="sent" title="sent" class="img-responsive"/>';
			}
			content = content + '<tr class="detail-row"><td class="sent-item task-name">' + taskname +'</td><td class="sent-item">' + type +'</td><td><span class="glyphicon ' + schedule +'"></span></td><td class="sent-item">' + recipient +'</td><td class="sent-item">' + successfail +'</td><td class="sent-item last-sent">' + lastsent +'</td><td class="sent-item">'+ imgpath +'</td></tr>';
		}
	$('.sentMainData').append(content);
	$('#sentTable').tablesorter();
}


//generate the content for the all SMS scheduled content
function generateScheduledContent(scheduledContent){
	var content = '',
		taskname = '',
		type='',
		recipient = '',
		successfail='',
		lastsent='',
		createtime='',
		status='',
		statusGroup = '';
		
		for(i=0;i<scheduledContent.length; i++){
			if (scheduledContent[i][0].length > 22){
				taskname = scheduledContent[i][0].substr(0,22) + '...';
			}else {
				taskname = scheduledContent[i][0];
			}
			type = scheduledContent[i][1];
			recipient = scheduledContent[i][2];
			successfail = scheduledContent[i][3];
			lastsent = scheduledContent[i][4];
			createtime = scheduledContent[i][5];
			status = scheduledContent[i][6];
			switch (status) {
				case 'pause': statusGroup = '<div class= "btn-group"><button type="button" class="btn btn-default dropdown-warning dropdown-toggle" data-toggle="dropdown">PAUSE <span class="glyphicon glyphicon-chevron-down pull-right"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Scheduling</a></li><li><a href="#">Cancel</a></li></ul></div>'; 
				break;
				case 'scheduling': statusGroup = '<div class= "btn-group"><button type="button" class="btn btn-default dropdown-success dropdown-toggle" data-toggle="dropdown">SCHEDULING <span class="glyphicon glyphicon-chevron-down pull-right"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Pause</a></li><li><a href="#">Cancel</a></li></ul></div>';
				break;
				case 'cancel': statusGroup = '<img src="/img/cancel-img.png" alt="cancel" title="cancel" class="img-responsive"/>';
				break;
				default: statusGroup = '<img src="/img/finish-img.png" alt="Finish" title="Finish" class="img-responsive"/>';
			}
			
			content = content + '<div class="row detail-row"><div class="col-xs-2 detail-item taskname">' + taskname + '</div><div class="col-xs-1 detail-item smstype">' +type + '</div><div class="col-xs-1 detail-item">' + recipient + '</div><div class="col-xs-2 detail-item successfail">' + successfail + '</div><div class="col-xs-2 detail-item timedate">' + lastsent + '</div><div class="col-xs-2 detail-item timedate">' + createtime + '</div><div class="col-xs-2 statusdrop">' + statusGroup + '</div></div>';
		}
		$('.recordsTableHeader').after(content);
}

function generateScheduledDetailContent(scheduledContentDetail){
	var content = '',
		schedule = '',
		destination='',
		sender = '',
		recipient='',
		noSMS='',
		textSMS='',
		createtime='';
		
		for (i=0;i<scheduledContentDetail.length;i++){
			schedule = scheduledContentDetail[i][0];
			destination = scheduledContentDetail[i][1];
			sender = scheduledContentDetail[i][2];
			recipient = scheduledContentDetail[i][3];
			noSMS = scheduledContentDetail[i][4];
			textSMS = scheduledContentDetail[i][5];
			createtime = scheduledContentDetail[i][6];
			
			if (textSMS.length > 50) {
				textSMS = textSMS.substr(0,50) + '...';
			}
			content = content + '<div class="row detail-row"><div class="col-xs-1 detail-item"> '+ schedule + '</div><div class="col-xs-2 detail-item destination"> '+ destination + '</div><div class="col-xs-1 detail-item"> '+ sender + '</div><div class="col-xs-1 detail-item recipient"> '+ recipient + '</div><div class="col-xs-2 detail-item noSMS"> '+ noSMS + '</div><div class="col-xs-3 detail-item"> '+ textSMS + '</div><div class="col-xs-2 detail-item"> '+ createtime + '</div></div>'
		}
	$('.recordsTable').append(content);
}