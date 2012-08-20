$(document).ready(function() {
	var $body = $("body");
	
	var onHeaderLoad = function() {
		var $navLinks = $("#header a");	
		var path = window.location.pathname;
		console.log(path);
	
		$navLinks.each(function() {
			var el = $(this);			
			if (el.attr('href') === path) {
				el.addClass("active");
			}
		});
	};

	$.get("/assets/inc/header/", function(data) {
		$body.prepend(data);
		onHeaderLoad();
	});

	$.get("/assets/inc/footer/", function(data) {
		$body.append(data);		
	});
});