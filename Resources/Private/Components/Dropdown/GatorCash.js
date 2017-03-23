let $ = cash;
let $$ = Gator;
let $dropdownOpen = false;
let openClass = 'dropdown-open';
let html = document.documentElement;

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

$$(html).on('click', '.dropdown-toggle', toggleDropdown);
$$(html).on('click', closeDropdown);
