
$(document).ready(function() {

var timeline = new Timeline($("#legend"));

$('#enterButton').click(function() {

});

var addMarker = function(startDate, hourCount, markerClass) {
	var offset = timeline.getPositionFor(startDate);
	var timelineNow = -offset;

	var $marker = $('<div/>');
	$marker.addClass(markerClass || "painKiller");
	$marker.css('margin-left', timelineNow);
	$marker.hide();
	timeline.getMarkersElement().append($marker);

	if (hourCount) {
		var stopOffset = timeline.getPositionFor(startDate.addHours(hourCount));
		var timelineStop = -stopOffset;
		var barWidth = timelineStop - timelineNow;
		console.log(barWidth);
		$marker.width(barWidth);
	}

	$marker.show();
};


// http://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
Date.prototype.addHours= function(h){
    var copiedDate = new Date(this.getTime());
    copiedDate.setTime(this.getTime() + (h*60*60*1000));
    return copiedDate;
};

var now = new Date();
// Add a marker at the current time.
var dayStart = new Date(
		now.getYear(),
		now.getMonth(),
		now.getDate(),
		8,0,0,0);

var dayEnd = new Date(
		now.getYear(),
		now.getMonth(),
		now.getDate() + 1);

var dayLength = dayEnd - dayStart;

var startTime = dayStart.getTime();
var endTime = dayEnd.getTime();
var antibioticsInterval = (endTime - startTime) / 3;

var pain1 = new Date(dayStart.addHours(5));
var pain2 = new Date(pain1.addHours(5));
var pain3 = new Date(pain2.addHours(5));
var pain4 = new Date(pain3.addHours(5));

var anti1 = new Date(startTime + antibioticsInterval);
var anti2 = new Date(startTime + antibioticsInterval * 2);
var anti3 = new Date(startTime + antibioticsInterval * 3);

addMarker(dayStart);
addMarker(pain1, 1);
addMarker(pain2, 1);
addMarker(pain3, 1);
addMarker(pain4, 1);

addMarker(dayStart, 0.225, "antibiotics");
addMarker(anti1, 0.5, "antibiotics");
addMarker(anti2, 0.5, "antibiotics");
addMarker(anti3, 0.5, "antibiotics");
});