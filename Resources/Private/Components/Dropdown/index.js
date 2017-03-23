let dropdownOpen = false;
let openClass = 'dropdown-open';

function closeDropdown() {
	console.log('closeDropdown');
	if (dropdownOpen) {
		$(dropdownOpen).removeClass(openClass);
	}
	dropdownOpen = false;
}

$$(document).on('click', '.dropdown-toggle', event => {
	event.preventDefault();
	event.stopPropagation();
	let parent = event.target.parentElement;
	let open = !$(parent).hasClass(openClass);
	closeDropdown();
	$(parent).toggleClass(openClass, open);
	dropdownOpen = open ? parent : false;
});

$$(document).on('click', closeDropdown);
