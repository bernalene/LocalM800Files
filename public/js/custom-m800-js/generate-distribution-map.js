//define the points where the markers should appear
// var markers = [
// 	  {latLng: [41.90, 12.45], name: 'Vatican City', submitted:'280', success: '185'},
// 	  {latLng: [43.73, 7.41], name: 'Monaco', submitted:'280', success: '185'},
// 	  {latLng: [-0.52, 166.93], name: 'Nauru', submitted:'230', success: '230'},
// 	  {latLng: [-8.51, 179.21], name: 'Tuvalu', submitted:'1000', success: '1000'},
// 	  {latLng: [43.93, 12.46], name: 'San Marino', submitted:'280', success: '185'},
// 	  {latLng: [47.14, 9.52], name: 'Liechtenstein', submitted:'500', success: '480'},
// 	  {latLng: [7.11, 171.06], name: 'Marshall Islands', submitted:'280', success: '185'},
// 	  {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis', submitted:'100', success: '100'},
// 	  {latLng: [3.2, 73.22], name: 'Maldives', submitted:'150', success: '150'},
// 	  {latLng: [35.88, 14.5], name: 'Malta', submitted:'280', success: '280'},
// 	  {latLng: [12.05, -61.75], name: 'Grenada', submitted:'200', success: '180'},
// 	  {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines', submitted:'280', success: '185'}
//     ];
var map;
console.log(markers);
//============to generate the image for the tooltip of the map==================
function getXY(){
	$('circle').each(function(){
		var xAxis = $(this).attr('cx');
		var yAxis =$(this).attr('cy');
		xAxis = xAxis - 9;
		yAxis = yAxis - 28;
		var dataIndex = $(this).attr('data-index');
		
		$(this).after('<svg width="18" height="28" xmlns="http://www.w3.org/2000/svg" x="'+ xAxis +'" y="'+ yAxis +'" class="newPoints" id="marker-'+dataIndex+'" data-index="'+dataIndex+'" onmouseover="generateNewInfo('+dataIndex+')" onmouseout="displayNoneElement('+dataIndex+')"><g><image stroke="null" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAdCAYAAACnmDyCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUU3QTM3NTQ0NjkxMUU0QTgwM0ExOUEyNjFBMjNFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUU3QTM3NjQ0NjkxMUU0QTgwM0ExOUEyNjFBMjNFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1RTdBMzczNDQ2OTExRTRBODAzQTE5QTI2MUEyM0U4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1RTdBMzc0NDQ2OTExRTRBODAzQTE5QTI2MUEyM0U4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rvwm4gAAA+xJREFUeNqcVVtsVEUY/mfObXe7uzasAiHVYIQYlJgaY4D4wEON8VF50QeNiSUlgcZLfGhEjCEhwfIiCbG8aJpoCF4i1Qdj4yVCFGmwhepScFOgla3dW7u3c7bnOjPOHLqnpd1dql+ye2bOmfPN/3//989B0ADTb70bUiTlCcTYs5jSrYxSoK43ST1v2LGtsYcGT1gr30HLJxO9ffK6ePw9yXYOkaoBtFoFtmACIwSQJAOKhACHQuAxemSuMHf48e8+91YRXX/jnfaYqo7QQvFhbzYL1KhBQ0gS4HAIIBxKVXV956M/nSkHRH/0vBnaEI3N0Ewu4f6TBeARtARCgDRVpDufM2sdO37/0cKP3bcREoo2QPNzCXdmNiAhjMECH+vE868en7M6kRjbDmCEElFJHtgevQdQ8pX9HfcqWtqdSgOzbmtY4y9XPBfKnvs9v37G94cNqvbielV7RsMSyGhREYzB8TzIOFaH3EbhecqFrZPYvEKcgCaN8lO9qcsjLqP+fRXhwU+379jZGW0/jxHmFJyMr+VRgYLQHow9sosaRpD+AhU7mD37/hoLSAQcPn4heWGEb9KzXC6MfMl2YUTIFpFvHZQLMWOZXzfT+boE38jR6B3rgaEtmNj2LHMDO4DGgw5jyW1GpMXaHNweD+aiKC7QWWzazjmElnwZ4T55pC3e2YxoW8cDnUhVg7lI3yTkF1y0zLMgS0t+kxW4Pxo/Pdb1XGwlSbK3L5aIxU9TfUnTxeL8LF8oZCY2b9rMp75ut9tBUzetj0Qyt7pfPwDh8FmkKIAVZbfkugM0m28j8yWfRHiLF4Fe0ktX/JxSXXs+Ui27G9c7RjiXR4kiEZDWtXNijRvQBlIs8/7TfUMKGNxvWcf8uOvSub2yuJGxzJMPYqVb+CJwLi8Aq1SB8l8jCCqLEsjZ9knfBuLvy5mb40ySynSpCe4Kh29qUlIeLmbHA6IP/06Rouf0wX+AaKN5x+n7JDNNAiKBX+dzpzCW6FqiEiXnaQmRTwUOrw9euzZaMxg5xtaQnRCZl/zY4amJ2ioigfPFwvuiCVtFtWhAGNfL/Xf03PJJz9WLFZ3R/lZRiWhKntv/9o0/y02JBH4r5Y+KoBpF5VeK+NocXflsFdG+a6OVsucdpGy1b8RpWXDtg4duJCt3JRL4Kp8+zqOqkGU5CvPxs6ryQzF3vNE7DYmOTF21c47dXacRaRr8SM3a1t4T6Ul7zUQCH9xKDXGiSRGVqBI34ORgZupMs/VNib7Ipem0abwkOrzKtZm2ay9/O5eh8H+wUQ3B6JNPDw137h7iX5CWa+VWD7OOBRf10qsWISjv2C2J/hVgAI16ND1+mirNAAAAAElFTkSuQmCC" id="svg_1" height="38.0625" width="16.6875" y="-4.75" x="0.625"/></g></svg>');
	});
}

$(document).ready(function(){
	// setTimeout(function(){

	// }, 1000);
	$('#distribution-map').vectorMap({
	//=======set the styles of the map============
	map: 'world_en',
	color: '#e6e6e6',
	hoverColor: '#ded4c8',
	backgroundColor: '#fff',
	normalizeFunction: 'polynomial',
    markerStyle: {
      initial: {
        fill: '#e13b4c',
        stroke: '#e13b4c'
      }
    },
	markerDefaults: {
		fill: '#e13b4c',
		stroke: '#e13b4c',
		r: 2
	},
    markers: markers,
	series: {
		markers: [{
			fill: '#e13b4c'
		}]
	},
	onMarkerLabelShow : function(event, label, index){
		generateInformation(event, label, index)
	}
  });
	getXY();
	$('circle').css('display','none');
	//==============to reposition the markers on zoom in and zoom out==================
	$('.jvectormap-zoomin').click(function(){
		$('.newPoints').remove();
		getXY();
	});
	$('.jvectormap-zoomout').click(function(){
		$('.newPoints').remove();
		getXY();
	});
	
	//=============to reposition the markers on mouse drag====================
	var isDragging = false;
	$("#distribution-map")
		.mousedown(function(){
			$(window).mousemove(function() {
				isDragging = true;
				$(window).unbind("mousemove");
			});
		})
		.mouseup(function(){
			var wasDragging = isDragging;
			isDragging = false;
			$(window).unbind("mousemove");
			if (!wasDragging) {
				$('.newPoints').remove();
				getXY();
			}
		});
}); //end of document.ready

//=============to generate the tooltip of the new marker ======================
function generateNewInfo(index){
	var countryName = markers[index].name;
	var submittedMsg = markers[index].submitted;
	var successMsg = markers[index].success;
	var markerIndex = '#marker-'+index;
	event.preventDefault();
	var htmlMarkup = '<span class="regionName"><strong>' + countryName + '</strong></span><span class="submitmsg">Submitted Message <span class="pull-right">' + submittedMsg + '</span></span><span class="successmsg">Success<span class="pull-right">' + successMsg + '</span></span><span class="glyphicon glyphicon-play"></span>';
	$("div.jvectormap-label").html(htmlMarkup);
	$("div.jvectormap-label").css({
		display: 'block'
	});
	
	//to change the color of the marker into blue
	$(markerIndex).children().children('image').attr('xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MDFCNTBFNjQ1MzkxMUU0OEMyQ0M2NTRCRUVDRDIwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MDFCNTBFNzQ1MzkxMUU0OEMyQ0M2NTRCRUVDRDIwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwMUI1MEU0NDUzOTExRTQ4QzJDQzY1NEJFRUNEMjA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwMUI1MEU1NDUzOTExRTQ4QzJDQzY1NEJFRUNEMjA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+He8tXgAABaFJREFUeNqsVwtMU2cU/ntvSx+8SgGLIKCTDTe1PhJHtjm3LIsxzmyJWeLMdJmvzeyBuumMMZtxmQvLZiaZaHxPM0QEVIYCRcWkPnDGVCoOpQ+g0JaWvm7be9t7+7h3/+0iWbmUFuZJbpr/cc53zv+f8/2nPJCkbNn9Pe/FefMFFEnSrZcawi0XapPS48VbkOcXgMM1F6fKcnKXCVKEnyIIUoaiCKBpBoQjNPylO0Lh0BECx1u/Xr/apvu7K3mAuvY78vzCohNpEvE7EpEQpImFQMDnx+yhQmHg9ZPAx34EedXjwdasfGXu8LjhFBRNB9cf6lbc1lsifW4/4wwyjCOJT+cimOau/kjTA/3yxUuXjx2BWJIKmu89Kp+Sk1WZK00H8EjARAQeGTDa3WDQ5vpi87tvVQ1bTLEALfcfLy0qmKrMy84EDJi89A45gcFse3v1q7Ovs+Oomz8fr05LzchozJGmxTXOekgESBCggoBh4rtQlCsFfIGg+VBju4QdR29Osahsa54sQ4SiaMxm1pDH6wM6oxn0mobCkUhYgyAoIxSJ55dOL+TPmCYHYmFKjA6fj4JZhfKUgJ8oh8MK3kefbeWvK9/umzsjXwR4vBjjBmhY/UTv9bqc792/eUNVf6KKZtfWlO9Ayt5cuiQrJ7dRMbMoIz83i+OY8l4XqXukSeWdunLjOYVirqFYnh2zyePxAmWH2j1g6JlZsW2ze6zjqKxvlcoLCg2L55TIRKMiUff0QgdNxUh6prQkZVSORy/LbAWEz7sqnvFodb+/DGNoetWQ28dZSxWJAIqgJQgPQbMRhFtvNqhk6O5SJcoas0GrwgiSM49GbTIyJBwJ4xGamxUhSAdN1SepRABnfvslCKPg6odCgI7QBIJ7fX1kMMTZkJ6WBlau2yxMBLBp284UsVDAmcchhVBUoA8xD/QP+ikuwPQCOVCUvbYkEUDp7NmvZ6dLOFnkxQkQIAgTcuC7bzy+AGWBSR7LS7Cis6fk1e6vbpTGM16jVGVCijmfnZEaM0+SJMBwwlJz+FcccdltgAr4j2B4IGaTIFowU7JemKPov9jx8I3Pd+0ZqcLteyvQa509S4pmlvTnyTJlowvU5sRAJBQ6rLl7618uOtigLJm/YIFu1rRcjpdBSMt2Dw5cXiKM8sADBBYjD0EWyNIl/Cx4NPxRKc4eT0dnN9D39Zd+9cEKbXT15P59hj1Vv1tDeVl5o3k/RcAHBTlS9uNDsEVP5+IJRVHA6nRj0Hv9CNmp76iYgB//0ekLjHuhrOHxjLNistohCLn39IEKegSAFaNBW+fw4uMyZSKJwEQZtDmAD3NXP50bAfh20xqry4M3e/2BSQPYXS5gd2NX9pVvtHMAghQJ7EOWXTY3Pinj7HvRZ7JB/vLthBwGOACsHPphdxfkIB0VCk0YwIfjwDTs1DaeOdb93/kYAM1ftxmP27XFbMcmZJy9N/2ABcBH5stbystMXIBoy3L8YNug02uhgslHgUNa6DXbLB3XWq6NXuMAXDl3JkJ4sE/MDixp77VGEyBw34a6YwfphACsnD9e1ZpsFOzZs97fam1qG2t9TIDLZ09FcBiFKUEUbOZo4bsNs2bDpdNH6aQBWDld+VPLoB3TsbweT1yYB3YbVu3VC+fa4u2JC9DeWEdjTsdai9MzZnWzVWuAmeN1u9Yq68/SkyqeUsVCXv19rUrrwDn9aKfRyhz6s/3mSwtf5o1nY9wGtOehmhkaMK63uGKjYN9b2IgBp832cbf63v/pNAGAXRyovfv4iMbsGvH+do+RqWxoOyoSSxLqJ2yhKTIAoJc7dEOOMJs18B8OeKQ3hgd0T7aTAT94ZvKHqnPj3T4r0/bgCbO/pmlDsnposhthx6zJKX7+Q4t12H2jqWFjj0bNgGctB2qb5+07WTtvIjr/CDAA03Ud4jfzQq4AAAAASUVORK5CYII=');

}
//to be called on mouseout
function displayNoneElement(index){
	$("div.jvectormap-label").css({
		display: 'none'
	});
	var markerIndex = '#marker-'+index;
	// to change the color of the marker into red
	$(markerIndex).children().children('image').attr('xlink:href','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAdCAYAAACnmDyCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUU3QTM3NTQ0NjkxMUU0QTgwM0ExOUEyNjFBMjNFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUU3QTM3NjQ0NjkxMUU0QTgwM0ExOUEyNjFBMjNFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1RTdBMzczNDQ2OTExRTRBODAzQTE5QTI2MUEyM0U4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1RTdBMzc0NDQ2OTExRTRBODAzQTE5QTI2MUEyM0U4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Rvwm4gAAA+xJREFUeNqcVVtsVEUY/mfObXe7uzasAiHVYIQYlJgaY4D4wEON8VF50QeNiSUlgcZLfGhEjCEhwfIiCbG8aJpoCF4i1Qdj4yVCFGmwhepScFOgla3dW7u3c7bnOjPOHLqnpd1dql+ye2bOmfPN/3//989B0ADTb70bUiTlCcTYs5jSrYxSoK43ST1v2LGtsYcGT1gr30HLJxO9ffK6ePw9yXYOkaoBtFoFtmACIwSQJAOKhACHQuAxemSuMHf48e8+91YRXX/jnfaYqo7QQvFhbzYL1KhBQ0gS4HAIIBxKVXV956M/nSkHRH/0vBnaEI3N0Ewu4f6TBeARtARCgDRVpDufM2sdO37/0cKP3bcREoo2QPNzCXdmNiAhjMECH+vE868en7M6kRjbDmCEElFJHtgevQdQ8pX9HfcqWtqdSgOzbmtY4y9XPBfKnvs9v37G94cNqvbielV7RsMSyGhREYzB8TzIOFaH3EbhecqFrZPYvEKcgCaN8lO9qcsjLqP+fRXhwU+379jZGW0/jxHmFJyMr+VRgYLQHow9sosaRpD+AhU7mD37/hoLSAQcPn4heWGEb9KzXC6MfMl2YUTIFpFvHZQLMWOZXzfT+boE38jR6B3rgaEtmNj2LHMDO4DGgw5jyW1GpMXaHNweD+aiKC7QWWzazjmElnwZ4T55pC3e2YxoW8cDnUhVg7lI3yTkF1y0zLMgS0t+kxW4Pxo/Pdb1XGwlSbK3L5aIxU9TfUnTxeL8LF8oZCY2b9rMp75ut9tBUzetj0Qyt7pfPwDh8FmkKIAVZbfkugM0m28j8yWfRHiLF4Fe0ktX/JxSXXs+Ui27G9c7RjiXR4kiEZDWtXNijRvQBlIs8/7TfUMKGNxvWcf8uOvSub2yuJGxzJMPYqVb+CJwLi8Aq1SB8l8jCCqLEsjZ9knfBuLvy5mb40ySynSpCe4Kh29qUlIeLmbHA6IP/06Rouf0wX+AaKN5x+n7JDNNAiKBX+dzpzCW6FqiEiXnaQmRTwUOrw9euzZaMxg5xtaQnRCZl/zY4amJ2ioigfPFwvuiCVtFtWhAGNfL/Xf03PJJz9WLFZ3R/lZRiWhKntv/9o0/y02JBH4r5Y+KoBpF5VeK+NocXflsFdG+a6OVsucdpGy1b8RpWXDtg4duJCt3JRL4Kp8+zqOqkGU5CvPxs6ryQzF3vNE7DYmOTF21c47dXacRaRr8SM3a1t4T6Ul7zUQCH9xKDXGiSRGVqBI34ORgZupMs/VNib7Ipem0abwkOrzKtZm2ay9/O5eh8H+wUQ3B6JNPDw137h7iX5CWa+VWD7OOBRf10qsWISjv2C2J/hVgAI16ND1+mirNAAAAAElFTkSuQmCC');
}