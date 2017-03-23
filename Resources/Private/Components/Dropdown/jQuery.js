let $dropdownOpen = false;
let openClass = 'dropdown-open';

function closeDropdown() {
	if ($dropdownOpen) {
		$dropdownOpen.removeClass(openClass);
	}
	$dropdownOpen = false;
}

$(document).on('click', '.dropdown-toggle', function(event) {
	event.preventDefault();
	event.stopPropagation();
	let $parent = $(this).parent();
	let isOpen = $parent.hasClass(openClass);
	closeDropdown();
	if (!isOpen) {
		$parent.addClass(openClass);
	}
	$dropdownOpen = isOpen ? false : $parent;
}).on('click', closeDropdown);
