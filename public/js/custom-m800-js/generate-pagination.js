$(document).ready(function(){
	generatePagination(totalPage, currentPage, Math.round((totalPage - 1) * 10));
});

function generatePagination(totalPage, currentPage, totalItem) {

	var n = 1, content, nxt = currentPage, prev = currentPage, firstItem, lastItem;

	nxt++;

	if (currentPage > 1) 
		prev--;

	if (nxt > totalPage)
		nxt--;

	var content = '<ul class="pagination pull-left"><li><a href="#">&#9664;</a></li>';

	while (n <= totalPage) {
		if (n == currentPage)
			content += '<li><a href="#" class = "current-pg">' + n + '</a></li>';
		else 
			content += '<li><a href="#">' + n + '</a></li>';
		n++;
	}

	content += '<li><a href="#">&#9654;</a></li></ul><div class="go-to-div pull-left"><div class="row"><div class="col-xs-6"><span>Go to page</span></div><div class="col-xs-6 inputGoto"><div class="input-group"><input type="text" name="goToPageInput" class="form-control"><span class="input-group-btn"><button type="button" id="goButton" class="btn btn-default">Go</button></span></div></div></div></div>';

	firstItem = 1 + (10 * (currentPage - 1));
	if (currentPage == totalPage)
		lastItem = totalItem;
	else
		lastItem = 10 * currentPage;

	if (totalItem < 10)
		lastItem = totalItem;

	content += '<div class="pagination-text pull-right"><p>' + firstItem + '-' + lastItem + ' of ' + totalItem + ' items</p></div>';

	$('.pagination-div').append(content);

}