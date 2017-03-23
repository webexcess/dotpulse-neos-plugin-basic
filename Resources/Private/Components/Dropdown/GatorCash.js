let $dropdownOpen = false;
let openClass = 'dropdown-open';

function closeDropdown() {
	if ($dropdownOpen) {
		$dropdownOpen.removeClass(openClass);
	}
	$dropdownOpen = false;
}

$$(document).on('click', '.dropdown-toggle', event => {
	event.preventDefault();
	event.stopPropagation();
	let $parent = $(event.target).parent();
	let isOpen = $parent.hasClass(openClass);
	closeDropdown();
	if (!isOpen) {
		$parent.addClass(openClass);
	}
	$dropdownOpen = isOpen ? false : $parent;
});

$$(document).on('click', closeDropdown);
