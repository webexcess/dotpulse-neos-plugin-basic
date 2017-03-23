let $dropdownOpen = false;
let openClass = 'dropdown-open';

function closeDropdown() {
	if ($dropdownOpen) {
		$dropdownOpen.removeClass(openClass);
	}
	$dropdownOpen = false;
}

function toggleDropdown(event) {
	event.preventDefault();
	event.stopPropagation();
	let $parent = $(this).parent();
	let isOpen = $parent.hasClass(openClass);
	closeDropdown();
	if (!isOpen) {
		$parent.addClass(openClass);
	}
	$dropdownOpen = isOpen ? false : $parent;
}

$(document.documentElement).on('click', '.dropdown-toggle', toggleDropdown).on('click', closeDropdown);
