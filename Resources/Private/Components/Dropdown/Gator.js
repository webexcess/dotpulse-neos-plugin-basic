let dropdownOpen = false;
let openClass = 'dropdown-open';

function closeDropdown() {
	if (dropdownOpen) {
		dropdownOpen.classList.remove(openClass);
	}
	dropdownOpen = false;
}

$$(document).on('click', '.dropdown-toggle', function(event) {
	event.preventDefault();
	event.stopPropagation();
	let parent = this.parentElement;
	let isOpen = parent.classList.contains(openClass);
	closeDropdown();
	if (!isOpen) {
		parent.classList.add(openClass);
	}
	dropdownOpen = isOpen ? false : parent;
});

$$(document).on('click', closeDropdown);
