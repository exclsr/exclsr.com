// Good Parts:
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// Public:
// TODO: Come up with an API that makes sense, instead
// of a random hack.
var Timeline = function(legendElement) {

	var hoursShown = 20;
	var totalSeconds = undefined;
	var legendElementWidth = undefined;
	var secondsWidth = undefined; // A second is 'this many' pixels wide

	var updateModel = function (hours) {
		totalSeconds = 60 * 60 * hours;

		legendElementWidth = legendElement.width();
		secondsWidth = legendElementWidth / totalSeconds;
	};

	var getTimelineX = function(date) {
		var secondsPerHour = 60 * 60;
		var secondsPerMinute = 60;
		var secondsPerDay = 24 * secondsPerHour;

		var startDate = new Date();
		//console.log(startDate);

		var secondsToday = date.getHours() * secondsPerHour 
			+ date.getMinutes() * secondsPerMinute
			+ date.getSeconds();
		// Hack to work for tomorrow.
		if (startDate.getDate() !== date.getDate()) {
			secondsToday += secondsPerDay;			
		}

		// Add a day to our offset, so the timeline always shows the last day.
		secondsToday += secondsPerDay;

		var offset = -(secondsToday * secondsWidth);
		return Math.floor(offset);
	};

	// Whatever ... useless for now.
	updateModel(hoursShown); 

	return {
		getPositionFor: function(date) {
			return getTimelineX(date);
		},
		getMarkersElement: function() {
			return $('#markers');
		},
		setHoursShown: function(hours) {
			updateModel(hours);
		},
		legendWidth: legendElementWidth,
		secondsWidthInPixels: secondsWidth,
		hours: hoursShown
	};
};


// jQuery:
$(document).ready(function() {

// Typical engine loop
var engineSpeed = 1000; // lower is faster.
var runEngine = function() {		
	setInterval(function() { update(); }, engineSpeed);
};		

// The static, boring things.
var $clock = $('#clock');
var timeline = new Timeline($('#legend'));

var legendWidth = timeline.legendWidth;
var legendCenterX = legendWidth/2;

var $arrow = $('#arrow')
$arrow.css('left', legendCenterX - $arrow.width()/2);
var centerX = ($arrow.offset().left + $arrow.width()/2);


// Timeline.
var secondsWidthInPixels = timeline.secondsWidthInPixels; 
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
	hourDiv.width((legendWidth / timeline.hours) - borderThickness);
	hourDiv.html('<div class="hourLabel">' + i%24 + '</div>');

	$('#hours').append(hourDiv);
}

// Center the label text in between each 'hour div'
$('.hourLabel').each(function() {
	// The '1' is a magic number.
	$(this).css('left', -$(this).width()/2);
});

var nowMarkerPosition = undefined;

var update = function() {	
	var now = new Date();
	$clock.html(now.toLocaleTimeString());

	nowMarkerPosition = timeline.getPositionFor(now);
	$('#hours').css('margin-left', Math.floor(nowMarkerPosition + centerX));
	timeline.getMarkersElement().css('margin-left', Math.floor(nowMarkerPosition + centerX));
};

// Main:
runEngine();
update(); 

});