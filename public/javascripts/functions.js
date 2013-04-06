$(document).ready(function() {

	$("#sign_in").click(function(){
		//$("body").append("<div class='zunaj'></div><div class='znotraj'>TU SO JEBENI ELEMENTI</div>")
		$(document.createElement('div')).addClass("zunaj").appendTo("body").click(function(){ $(this).remove(); $(".znotraj").remove(); });
		$(document.createElement('div')).addClass("znotraj").appendTo("body").load("/html/login.html");

	});
	
	$("#sign_up").click(function(){
		//$("body").append("<div class='zunaj'></div><div class='znotraj'>TU SO JEBENI ELEMENTI</div>")
		$(document.createElement('div')).addClass("zunaj").appendTo("body").click(function(){ $(this).remove(); $(".znotraj").remove(); });
		$(document.createElement('div')).addClass("znotraj").appendTo("body").load("/html/register.html");

	});

	/* KODA ZA DISABLE SELECT TEXTA */
	//$("body").attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');

});