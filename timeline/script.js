// Good Parts:
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// jQuery:
$(document).ready(function() {

// Typical engine loop
var engineSpeed = 1000; // lower is faster.
var runEngine = function() {		
	setInterval(function() { update(); }, engineSpeed);
};		

// The static, boring things.
var $clock = $('#clock');

var legendWidth = $('#legend').width();
var legendCenterX = $('#legend').width()/2;

var $arrow = $('#arrow')
$arrow.css('left', legendCenterX - $arrow.width()/2);
var arrowOffset = $arrow.offset();


// Timeline.
// Let's show six hours.
var daysShown = 6;
var totalSeconds = 60 * 60 * daysShown;
// A second is 'this many' pixels wide
var secondsWidthInPixels = legendWidth / totalSeconds;
var dayInSeconds = 24 * 60 * 60;

// Total width of 2 days
var $hours = $('#hours');
var dayCount = 2;
$hours.width(dayCount * dayInSeconds * secondsWidthInPixels); 

// Add an 'hour div' for each hour in our timeline
var borderThickness = 2;
var hourDiv = undefined; 
for (var i=0; i < dayCount * 24; i++) {
	hourDiv = $('<div/>');
	hourDiv.addClass('hour');
	hourDiv.width((legendWidth / daysShown) - borderThickness);
	hourDiv.html('<div class="hourLabel">' + i%24 + '</div>');

	$('#hours').append(hourDiv);
}

// Center the label text in between each 'hour div'
$('.hourLabel').each(function() {
	// The '1' is a magic number.
	$(this).css('left', -$(this).width()/2 - 1);
});

var update = function() {	
	var now = new Date();
	$clock.html(now.toLocaleTimeString());

	var secondsPerHour = 60 * 60;
	var secondsPerMinute = 60;

	var secondsToday = now.getHours() * secondsPerHour 
		+ now.getMinutes() * secondsPerMinute
		+ now.getSeconds();

	var offset = -secondsWidthInPixels * secondsToday + arrowOffset.left;
	$('#hours').css('margin-left', Math.floor(offset));
}

// Main:
runEngine();
update(); 

});