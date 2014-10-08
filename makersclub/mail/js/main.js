var defaultPersonValue = "john.appleseed@mac.com",
	currentPersonElement,
	loadMembers = function() {
		reloadMembers();
	}
	reloadMembers = function() {
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
				}
			}
		});		
	},
	addPerson = function(email, id) {
		var newPerson = $('<input>').addClass('person');
		$(newPerson).insertBefore("#add");
		newPerson.mouseenter(function() {
			showCross(this);
		}).blur(function() {
			if (!$(this).attr('ref')) {
				//Is new person, add to mySQL
				console.log("add person");
				var data = {
					'protocol': 'addPerson',
					'email': $(this).val()
				}
				$.ajax({
					method: "GET",
					url: "main.php",
					data: data,
					success: function(data) {
						reloadMembers();
					}
				});
			} else {
				//Is old person, update in mySQL
				var data = {
					'protocol': 'updatePerson',
					'id': $(this).attr('ref'),
					'email': $(this).val()
				}				
				$.ajax({
					method: "GET",
					url: "main.php",
					data: data,
					success: function(data) {
						reloadMembers();
					}
				});				
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