var defaultPersonValue = "john.appleseed@mac.com",
	currentPersonElement,
	addPerson = function(addElement) {
		var newPerson = $('<input>').addClass('person').attr('value', "");
		$("#people").append(newPerson).append(addElement);
		newPerson.mouseenter(function() {
			showCross(this);
		}).focus();
	},
	removePerson = function() {
		$(currentPersonElement).remove();
		hideCross();
	},
	showCross = function(personElement) {
		$("#delete").addClass('show')
					.css('top', $(personElement).offset().top-$(personElement).parent().offset().top+13+"px");
		currentPersonElement = personElement;
	},
	hideCross = function() {
		$("#delete").removeClass('show');
	},
	pushNotification = function(message) {

	},
	updateMessage = function(){
		var value = $("textarea").val();
		$("#messagevalue").text( value );
	}
$(document).ready(function(){
	$("#add").click(function(){
		addPerson(this);
	});
	$(".person").mouseenter(function() {
		showCross(this);
	});
	$("#people").mouseleave(function() {
		hideCross();
	});
	$("#delete").click(function() {
		removePerson();
	})
	$("textarea").keyup(function(){
		var value = $(this).val();
		$("#messagevalue").text(value);
	})
});