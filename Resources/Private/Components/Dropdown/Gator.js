let $$ = Gator;
let dropdownOpen = false;
let openClass = 'dropdown-open';
let html = document.documentElement;

function closeDropdown() {
	if (dropdownOpen) {
		dropdownOpen.classList.remove(openClass);
	}
	dropdownOpen = false;
}

function toggleDropdown(event) {
	event.preventDefault();
	event.stopPropagation();
	let parent = this.parentElement;
	let isOpen = parent.classList.contains(openClass);
	closeDropdown();
	if (!isOpen) {
		parent.classList.add(openClass);
	}
	dropdownOpen = isOpen ? false : parent;
}

$$(html).on('click', '.dropdown-toggle', toggleDropdown);
$$(html).on('click', closeDropdown);
