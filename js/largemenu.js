var openMenu = function(ref) {
	if (!$('.largeMenu#'+ ref).hasClass('visible') && $('.largeMenu.visible').length == 0) {
		$('.largeMenu#'+ ref).addClass('visible');
	} else if (!$('.largeMenu#'+ ref).hasClass('visible')) {
		$('.largeMenu.visible').removeClass('visible');
		setTimeout(function() {
			$('.largeMenu#'+ ref).addClass('visible');
		}, 300);
	} else {
		$('.largeMenu.visible').removeClass('visible');
	}
}
$.fn.initMenu = function(menuObject) {
	for (var key in menuObject) {
		var largeMenu = $('<div></div>').addClass('largeMenu').attr('id', key).insertAfter($(this))
			largeMenuWrapper = $('<div></div>').addClass('largeMenuWrapper').appendTo(largeMenu);
		for (var i=0;i<menuObject[key].length;i++) {
			var largeMenuGroup = $('<div></div>').addClass('largeMenuGroup').appendTo(largeMenuWrapper);
			$('<h3></h3>').append(menuObject[key][i]['groupTitle']).appendTo(largeMenuGroup);
			for (var j=0;j<menuObject[key][i]['linkArray'].length;j++) {
				if (j%3 == 0) {
					var newLinkSpan = $('<span></span>').appendTo(largeMenuGroup);
				}
				$('<a></a>').append(menuObject[key][i]['linkArray'][j]['title'])
							.attr('href', menuObject[key][i]['linkArray'][j]['link'])
							.appendTo(newLinkSpan);
			}
		}
	}
};
$(document).ready(function() {
	$('nav span').click(function() {
		openMenu($(this).attr('ref'));
	});
});