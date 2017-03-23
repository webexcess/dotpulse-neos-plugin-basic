let $ = cash;
let $dropdownOpen = false;
let openClass = 'dropdown-open';
let html = document.documentElement;

function closeDropdown() {
	if ($dropdownOpen) {
		$dropdownOpen.removeClass(openClass);
	}
	$dropdownOpen = false;
}

function toggleDropdown(event, element = false) {
	event.preventDefault();
	event.stopPropagation();
	if (!element) {
		element = event.target;
	}
	let $parent = $(element).parent();
	let isOpen = $parent.hasClass(openClass);
	closeDropdown()
	if (!isOpen) {
		$parent.addClass(openClass);
	}
	$dropdownOpen = isOpen ? false : $parent;
	return false;
}

function dropdownEvent(event, element = false) {
	if (!element) {
		element = event.target;
	}
	if (element == html) {
		closeDropdown();
	} else if ($(element).hasClass('dropdown-toggle')) {
		toggleDropdown(event, element);
	} else {
		dropdownEvent(event, element.parentNode)
	}
}

$(html).on('click', dropdownEvent);
