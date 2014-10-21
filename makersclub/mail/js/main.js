var defaultEmail = "john.appleseed@mac.com",
	currentPersonElement,
	smallLogoIsVisible,
	emailObject,
	loadMembers = function() {
		reloadMembers();
	}
	reloadMembers = function() {
		var lastScrollHeight = $(document).scrollTop();
		var data = {
			'protocol': 'getPeople'
		}
		$.ajax({
			method: "GET",
			url: "main.php",
			data: data,
			success: function(data) {
				$("#people .person").each(function() {
					$(this).remove();
				});
				var obj = $.parseJSON(data);
				emailObject = obj;
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
		var newPerson = $('<input>').addClass('person').insertAfter("#add");
		newPerson.mouseenter(function() {
			showMemberUI(this);
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
		hideMemberUI();
	},
	sendMessage = function() {
		var message = $("#compose textarea").val();
		var data = {
			'protocol': 'sendMessage',
			'message': message,
			'people': emailObject,
			'subject': $("input#subject").val(),
			'name': $("input#name").val()
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
	showMemberUI = function(personElement) {
		$("#options").addClass('show')
					.css('top', $(personElement).offset().top-$(personElement).parent().offset().top+9+"px");
		currentPersonElement = personElement;
	},
	hideMemberUI = function() {
		$("#options").removeClass('show');
	},
	pushNotification = function(message) {

	},
	didScroll = function() {
		if ($(document).scrollTop() > $("header").height()+20 && !smallLogoIsVisible) {
			$("#logo-small").addClass("visible");
			smallLogoIsVisible = true;
		} else if ($(document).scrollTop() <= $("header").height()+20 && smallLogoIsVisible) {
			$("#logo-small").removeClass("visible");
			smallLogoIsVisible = false;
		}
	}
$(document).ready(function(){
	loadMembers();
	$(document).scroll(function() {
		didScroll();
	});
	$("#add").click(function(){
		addPerson();
	});
	$(".person").mouseenter(function() {
		showMemberUI(this);
	});
	$("#people").mouseleave(function() {
		hideMemberUI();
	});
	$("#options .delete").click(function() {
		removePerson();
	});
});