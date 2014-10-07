var defaultPersonValue = "john.appleseed@mac.com",
	addPerson = function(addElement) {
		var newPerson = $('<input>').addClass('person').attr('value', "");
		$("#people").append(newPerson).append(addElement);
		newPerson.focus();
	},
	removePerson = function(person) {

	},
	showCross = function(personElement) {

	},
	hideCross = function(personElement) {

	}
$(document).ready(function(){
	$("#add").click(function(){
		addPerson(this);
	});
});