// Good Parts:
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// Public:
var timeline = function() {
	var $hours; 
	var $arrow; 
	var $markers; 

	var hoursShown = 20;
	var totalSeconds;
	var legendWidth;
	var legendCenterX;
	var secondsWidthInPixels; // A second is 'this many' pixels wide
	var centerX;

	var initialize = function (rootElement, hours) {
		$hours = $('#hours');
		$arrow = $('#arrow');
		$markers = $('#markers');

		totalSeconds = 60 * 60 * hours;

		legendWidth = rootElement.width();
		secondsWidthInPixels = legendWidth / totalSeconds;
		legendCenterX = legendWidth/2;

		$arrow.css('left', legendCenterX - $arrow.width()/2);
		centerX = ($arrow.offset().left + $arrow.width()/2);
	};

	var getTimelineX = function(date) {
		var secondsPerMinute = 60;
		var secondsPerHour = 60 * 60;
		var secondsPerDay = 24 * secondsPerHour;

		var startDate = new Date();

		var secondsToday = date.getHours() * secondsPerHour 
			+ date.getMinutes() * secondsPerMinute
			+ date.getSeconds();
		// Hack to work for tomorrow.
		if (startDate.getDate() !== date.getDate()) {
			secondsToday += secondsPerDay;			
		}

		// Add a day to our offset, so the timeline always shows the last day.
		secondsToday += secondsPerDay;

		var offset = -(secondsToday * secondsWidthInPixels);
		return Math.floor(offset);
	};

	var buildTimeline = function() {
		// Total width of 3 days
		var dayCount = 3;
		var dayInSeconds = 24 * 60 * 60;
		
		$hours.width(dayCount * dayInSeconds * secondsWidthInPixels); 
		$markers.width(dayCount * dayInSeconds * secondsWidthInPixels);

		// Add an 'hour div' for each hour in our timeline
		var borderThickness = 2;
		var hourDiv = undefined; 
		for (var i=0; i < dayCount * 24; i++) {
			hourDiv = $('<div/>');
			hourDiv.addClass('hour');
			hourDiv.width((legendWidth / hoursShown) - borderThickness);
			hourDiv.html('<div class="hourLabel">' + i%24 + '</div>');

			$hours.append(hourDiv);			
		}

		// Center the label text in between each 'hour div'
		$('.hourLabel').each(function() {
			$(this).css('left', -$(this).width()/2);
		});
	};


	return {
		init: function(rootElement) {
			initialize(rootElement, hoursShown); 
			buildTimeline();
		},
		getPositionFor: function(date) {
			return getTimelineX(date);
		},
		setPositionFor: function(date) {
			var nowMarkerPosition = getTimelineX(date);
			$hours.css('margin-left', Math.floor(nowMarkerPosition + centerX));
			$markers.css('margin-left', Math.floor(nowMarkerPosition + centerX));
		},
		addMarker: function(startDate, hourCount, markerClass) {
			var offset = getTimelineX(startDate);
			var timelineNow = -offset;

			var $marker = $('<div/>');
			$marker.addClass(markerClass || "marker");
			$marker.css('margin-left', timelineNow);
			$marker.hide();
			$markers.append($marker);

			var stopOffset = getTimelineX(startDate.addHours(hourCount || 0.25));
			var timelineStop = -stopOffset;
			var barWidth = timelineStop - timelineNow;
			$marker.width(barWidth);

			$marker.show();
		}
	};
}();


// jQuery:
$(document).ready(function() {

// Typical engine loop
var engineSpeed = 1000; // lower is faster.
var runEngine = function() {		
	setInterval(function() { update(); }, engineSpeed);
};		

// Things ...
var $clock = $('#clock');
timeline.init($('#legend'));

var update = function() {	
	var now = new Date();
	$clock.html(now.toLocaleTimeString());
	timeline.setPositionFor(now);
};

// Main:
runEngine();
update(); 

});