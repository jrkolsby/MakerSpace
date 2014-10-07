var defaultPersonValue = "john.appleseed@mac.com",
	currentPerson,
	addPerson = function(addElement) {
		var newPerson = $('<input>').addClass('person').attr('value', "");
		$("#people").append(newPerson).append(addElement);
		newPerson.focus();
	},
	removePerson = function(person) {

	},
	showCross = function(personElement) {
		$("#delete").addClass('show')
					.css('top', $(personElement).offset().top-$(personElement).parent().offset().top+12+"px");
	},
	hideCross = function() {
		$("#delete").removeClass('show');
	},
	pushNotification = function(message) {

	}
$(document).ready(function(){
	$("#add").click(function(){
		addPerson(this);
	});
	$(".person").mouseenter(function() {
		showCross(this);
	}).mouseout(function() {
		hideCross();
	});
});