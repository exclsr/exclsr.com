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
var centerX = ($arrow.offset().left + $arrow.width()/2);


// Timeline.
// Let's show six hours.
var daysShown = 6;
var totalSeconds = 60 * 60 * daysShown;
// A second is 'this many' pixels wide
var secondsWidthInPixels = legendWidth / totalSeconds;
var dayInSeconds = 24 * 60 * 60;

// Total width of 3 days
var $hours = $('#hours');
var dayCount = 3;
$hours.width(dayCount * dayInSeconds * secondsWidthInPixels); 
$('#markers').width(dayCount * dayInSeconds * secondsWidthInPixels);

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

var getTimelinePosition = function(date) {

	var secondsPerHour = 60 * 60;
	var secondsPerMinute = 60;
	var secondsPerDay = 24 * secondsPerHour;

	var secondsToday = date.getHours() * secondsPerHour 
		+ date.getMinutes() * secondsPerMinute
		+ date.getSeconds();
	// Add a day to our offset, so the timeline always shows the last day.
	// TODO: Think of a better way to do this.
	secondsToday += secondsPerDay;

	var offset = -(secondsToday * secondsWidthInPixels);
	return Math.floor(offset);
};

var nowMarkerPosition = undefined;

var update = function() {	
	var now = new Date();
	$clock.html(now.toLocaleTimeString());

	nowMarkerPosition = getTimelinePosition(now);
	$('#hours').css('margin-left', Math.floor(nowMarkerPosition + centerX));
	$('#markers').css('margin-left', Math.floor(nowMarkerPosition + centerX));
};

// Main:
runEngine();
update(); 

// Add a marker at the current time.
var now = new Date();
var mark = new Date(now.getYear(), now.getMonth(), now.getDay(), 10,0,0,0);

var offset = getTimelinePosition(now);
var timelineNow = -offset;

$marker = $('<div class="marker"></div>');
$marker.css('margin-left', timelineNow);
$marker.hide();
$('#markers').append($marker);
$marker.css('margin-left', '-=' + $marker.width()/2);
$marker.show();

});