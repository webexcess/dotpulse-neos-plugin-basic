let setPushState = () => {
	// jscs:disable maximumLineLength
	console.info('Your browser can\'t handle push state. Time to download a new one: https://www.browser-update.org/update.html');
	return false;
	// jscs:enable maximumLineLength
};
let getPushState = setPushState;

if (typeof history.pushState === 'function') {
	setPushState = options => {
		let url = location.pathname;
		if (!options) {
			options = {};
		}
		if (!options.url) {
			options.url = url;
		}
		if (typeof options.hash === 'string') {
			options.url += '#' + options.hash;
		} else {
			options.hash = null;
		}
		if (!options.data) {
			options.data = null;
		}
		if (options.title) {
			document.title = options.title;
		} else {
			options.title = null;
		}
		history.pushState(options.data, options.title, options.url);
		return options;
	};

	getPushState = () => {
		let hash = location.hash.substr(1);
		let state = history.state;
		let data = {
			url : location.pathname,
			title: document.title,
			state: state ? state : null,
			hash: hash ? hash : null
		};
		return data;
	};
}

export {setPushState, getPushState}
