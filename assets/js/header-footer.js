$(document).ready(function() {
	var $body = $("body");
	
	var onHeaderReady = function() {
		var $navLinks = $("#header a");	
		var path = window.location.pathname;		
	
		$navLinks.each(function() {
			var el = $(this);			
			if (el.attr('href') === path) {
				el.parent("li").addClass("active");
			}
		});
	};

	$.get("/assets/inc/header/", function(data) {
		$body.prepend(data);
		onHeaderReady();
	});

	$.get("/assets/inc/footer/", function(data) {
		$body.append(data);		
	});
});