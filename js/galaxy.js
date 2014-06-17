/*
 * The Galaxy project
 * v 1.0
 *
 * @author: Slavomir Vojacek
 * @updated: June 17, 2014
 *
 * This software is published under the GNU GENERAL PUBLIC LICENSE.
 * For details visit http://opensource.org/licenses/GPL-2.0
 */

/*
 * Configuration
 */
var minOpacity = 25;
var maxOpacity = 85;

var numberOfTinyStars = 120;
var stepTinyStars = 12;

var numberOfMediumStars = 30;
var stepMediumStars = 3;

var numberOfLargeStars = 10;
var stepLargeStars = 1;

var backgroundMove = false;
var backgroundMoveContainer = $(".hero");

/*
 * Dependencies
 */
var starsContainerHeight = $("#stars-container").height();
var starsContainerWidth = $("#stars-container").width();

var starsTinyContainer = $("#stars-tiny");
var starsMediumContainer = $("#stars-medium");
var starsLargeContainer = $("#stars-large");

/*
 * Generates random style definition for
 * a single star element
 */
function generateRandomStyle() {
	var minLeft = -400;
	var maxLeft = starsContainerWidth + 400;
	var minTop = -400;
	var maxTop = starsContainerHeight + 400;

	var randomLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
	var randomTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
	var randomOpacity = Math.floor(Math.random() * (maxOpacity - minOpacity + 1)) + minOpacity;

	return "left: " + randomLeft + "px; top: " + randomTop + "px; opacity: " + randomOpacity / 100 + ";";
}

/*
 * Generates stars and randomly positions
 * them within their dedicated containers
 */
function generateStars(type) {
	var number = numberOfTinyStars;
	var where = starsTinyContainer;

	if (type === "medium") {
		number = numberOfMediumStars;
		where = starsMediumContainer;
	} else if (type === "large") {
		number = numberOfLargeStars;
		where = starsLargeContainer;
	}

	for (var i = 0; i < number; i++) {
		where.append('<span class="star" style="' + generateRandomStyle() + '"></span>');
	}
}

/*
 * Moves the different star containers
 */
function moveStars(type, tempX, tempY) {
	var step = stepTinyStars;
	var where = starsTinyContainer;

	if (type === "medium") {
		step = stepMediumStars;
		where = starsMediumContainer;
	} else if (type === "large") {
		step = stepLargeStars;
		where = starsLargeContainer;
	}

	var positionTop = Math.floor(tempY / step);
	var positionLeft = Math.floor(tempX / step);

	where.css("top", -positionTop + "px");
	where.css("left", -positionLeft + "px");
}

/*
 * Moves the background image
 */
function moveBg(tempX, tempY) {
	var offsetTop = Math.floor(tempY / 15);
	var offsetLeft = Math.floor(tempX / 15);

	backgroundMoveContainer.css("background-position-y", -offsetTop + "px");
	backgroundMoveContainer.css("background-position-x", -offsetLeft + "px");
}

$(document).ready(function() {	
	/*
	 * This generates randomly positioned stars
	 */
	generateStars("tiny");
	generateStars("medium");
	generateStars("large");

	if (backgroundMove) {
		backgroundMoveContainer.css("background-size", "130%");
	}

	/*
	 * This is what happens on mouse move
	 */
	var tempX = 0;
	var tempY = 0;
	var IE = document.all ? true : false;

	if (!IE) {
		document.captureEvents(Event.MOUSEMOVE);
	}

	document.onmousemove = getMouseXY;

	function getMouseXY(e)
	{
		if (IE)
		{
			tempX = event.clientX + document.body.scrollLeft
			tempY = event.clientY + document.body.scrollTop
		}
		else
		{
			tempX = e.pageX
			tempY = e.pageY
		}
		if (tempX < 0) {
			tempX = 0;
		}
		if (tempY < 0) {
			tempY = 0;
		}

		moveStars("tiny", tempX, tempY);
		moveStars("medium", tempX, tempY);
		moveStars("large", tempX, tempY);
		
		if (backgroundMove) {
			moveBg(tempX, tempY);
		}
	}
});