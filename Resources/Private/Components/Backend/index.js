// Import to local collection
// import * as backendFunc from 'Dotpulse.Basic/Resources/Private/Components/Backend';

// Import not all functions
// import { NeosEvents } from 'Dotpulse.Basic/Resources/Private/Components/Backend';


export function NeosEvents(events, callback) {
	// http://neos.readthedocs.io/en/stable/ExtendingNeos/InteractionWithTheNeosBackend.html
	let count = 0;
	if (typeof events === 'string') {
		events = events.replace(/\s/g, '').split(',');
	}

	if (Array.isArray(events) && typeof callback === 'function') {
		count = events.length;
		events.forEach(nameOfEvent => {
			document.addEventListener('Neos.' + nameOfEvent, callback, false);
		});
	}

	return count + ' Neos Event' + (count === 1 ? '' : 's') + ' added.';
}

let selector = '#neos-context-bar>.neos-right';
export let ButtonContextBar = {
	add: options => {
		if (options.className && options.icon && options.title) {
			function addButton() {
				let element = document.querySelector(selector);
				let button = document.createElement('button');
				button.className = 'neos-button ' + options.className;
				button.setAttribute('type', 'button');
				button.setAttribute('title', options.title);
				button.innerHTML = '<i class="' + options.icon + '"></i>';
				element.insertBefore(button, element.firstChild);
			}

			if (document.getElementById('neos-context-bar')) {
				addButton();
			} else {
				NeosEvents('ContentModuleLoaded', addButton);
			}
		}
	},
	remove: className => {
		if (typeof className === 'string') {
			let parent = document.querySelector(selector);
			let button = document.querySelector(selector + '>.' + className);
			if (button) {
				parent.removeChild(button);
			}
		}
	}
};

function getBackendLanguageCode(code) {
	try {
		code = Em.I18n.translations.Dotpulse_Basic.Language.Code;
	} catch (error) {} finally {
		return (typeof code === 'string') ? code : false;
	}
}

NeosEvents('ContentModuleLoaded', () => {
	document.documentElement.setAttribute('data-lang', getBackendLanguageCode('de'));
});
