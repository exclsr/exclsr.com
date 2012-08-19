$(document).ready(function() {

	var randomColor = function() {
		return Math.floor(Math.random() * 256);
	};
		
	var randomColorString = function() {
			var red = randomColor();
			var green = randomColor();
			var blue = randomColor();
			return 'rgb(' + red + ',' + green + ',' + blue + ')';
	};

	var randomTime = function() {
		return Math.floor(250 + Math.random() * 1500);
	};

	var hiddenLetters = '#e, #i, #o';

/* 
	$('#soon').delay(5000).animate({'margin-top': '1em'}, 10000,
		function() {
			$('#text').html('soon.');
		});
*/

	for (i=0; i < 15; i++) {	

		$(hiddenLetters).each(function() {			
			$(this).animate({'color': randomColorString()}, randomTime());
			$(this).animate({'background-color': randomColorString()}, randomTime());
		});					
	}

	$(hiddenLetters).animate({'color': 'white'},1000);
	$(hiddenLetters).animate({'background-color': 'white'},1000);
});