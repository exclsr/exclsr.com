$(document).ready(function() {
	var $body = $("body");
	
	var onFooterLoad = function() {
		var $navLinks = $("#footer a");	
		var path = window.location.pathname;
	
		$navLinks.each(function() {
			var el = $(this);			
			if (el.attr('href') === path) {
				el.addClass("active");
			}
		});
	};

	$.get("/assets/inc/header/", function(data) {
		$body.prepend(data);
	});

	$.get("/assets/inc/footer/", function(data) {
		$body.append(data);
		onFooterLoad();
	});
});