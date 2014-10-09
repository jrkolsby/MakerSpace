var defaultPersonValue = "john.appleseed@mac.com",
	currentPersonElement,
	loadMembers = function() {
		reloadMembers();
	}
	reloadMembers = function() {
		var lastScrollHeight = $(document).scrollTop();
		$("#people .person").each(function() {
			$(this).remove();
		});
		var data = {
			'protocol': 'getPeople'
		}
		$.ajax({
			method: "GET",
			url: "main.php",
			data: data,
			success: function(data) {
				var obj = $.parseJSON(data);
				if (obj.people.length > 0) {
					for (var j = 0; j < obj.people.length; j++) {
						addPerson(obj.people[j].email, obj.people[j].id);
					}
					$(document).scrollTop(lastScrollHeight);
				}
				$("#members h1").html("Members (" + obj.people.length + ")");
			}
		});		
	},
	sqlAddPerson = function(personElement) {
		var data = {
			'protocol': 'addPerson',
			'email': $(personElement).val()
		}
		$.ajax({
			method: "GET",
			url: "main.php",
			data: data,
			success: function(data) {
				reloadMembers();
			}
		});
	},
	sqlUpdatePerson = function(personElement) {
		var data = {
			'protocol': 'updatePerson',
			'id': $(personElement).attr('ref'),
			'email': $(personElement).val()
		}				
		$.ajax({
			method: "GET",
			url: "main.php",
			data: data,
			success: function(data) {
				reloadMembers();
			}
		});		
	},
	addPerson = function(email, id) {
		var newPerson = $('<input>').addClass('person');
		$(newPerson).insertAfter("#add");
		newPerson.mouseenter(function() {
			showCross(this);
		}).blur(function() {
			if (!$(this).attr('ref')) {
				sqlAddPerson(this);
			} else {sqlUpdatePerson(this);}
		}).keyup(function (e) {
   			if (e.keyCode == 13) {
				if (!$(this).attr('ref')) {
					sqlAddPerson(this);
				} else {sqlUpdatePerson(this);}
    		}
		});
		if (id != null) {
			$(newPerson).val(email).attr('ref', id);
		} else {
			$(newPerson).focus().val("");
		}
	},
	removePerson = function() {
		var id = $(currentPersonElement).attr('ref');
		var data = {
			'protocol': 'removePerson',
			'id': id
		};
		$.ajax({
			method: "GET",
			url: "main.php",
			data: data,
			success: function(data) {
				reloadMembers();
			}
		});
		hideCross();
	},
	showCross = function(personElement) {
		$("#delete").addClass('show')
					.css('top', $(personElement).offset().top-$(personElement).parent().offset().top+9+"px");
		currentPersonElement = personElement;
	},
	hideCross = function() {
		$("#delete").removeClass('show');
	},
	pushNotification = function(message) {

	}
$(document).ready(function(){
	loadMembers();
	$("#add").click(function(){
		addPerson();
	});
	$(".person").mouseenter(function() {
		showCross(this);
	});
	$("#people").mouseleave(function() {
		hideCross();
	});
	$("#delete").click(function() {
		removePerson();
	});
});