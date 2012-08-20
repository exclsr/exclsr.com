$(document).ready(function() {
	var $body = $("body");

	$.get("/assets/inc/header/", function(data) {
		$body.prepend(data);
	});

	$.get("/assets/inc/footer/", function(data) {
		$body.append(data);
	});
});