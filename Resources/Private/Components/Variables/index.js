(() => {
	// Avoid 'console' errors in browsers that lack a console.
	const noop = () => {};
	const methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	const console = (window.console = window.console || {});
	methods.forEach(method => {
		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	});
})();

const doc = document;
const html = doc.documentElement;
html.className = html.className.replace(new RegExp('\\bno-js\\b', 'g'), 'js').replace(/\s\s*/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');

const dataVersion = html.getAttribute('data-version') || 0; // Version of assets (string)
const getProtokoll = 'https:' == doc.location.protocol ? 'https' : 'http'; // Active Protocol
const language = html.lang || 'de'; // Language of the document (string)
const isLive = new RegExp('\\blive\\b').test(html.className);

function lastVisitedNode(node) {
	try {
		if (typeof node == 'undefined') {
			node = doc.body.getAttribute('data-neos-node') ||  false;
		}
		if (typeof node == 'string') {
			sessionStorage.setItem('TYPO3.Neos.lastVisitedNode', node);
		}
	} catch (error) {}
};

function NeosEvents() {
	return 'No Neos Events added';
};

const onReady = {
	body: () => {
		window.body = document.body;
	}
};

function onReadyRun() {
	for (let key in onReady) {
		if (!onReady.hasOwnProperty(key)) {
			continue;
		}
		let func = onReady[key];
		if (typeof func === 'function') {
			func.call(); // Run function
		}
	}
};

function deepExtend() {
	let object = {};
	let source;
	let property;
	let args = [].splice.call(arguments, 0);

	while (args.length > 0) {
		source = args.splice(0, 1)[0];
		if (toString.call(source) == '[object Object]') {
			for (property in source) {
				if (source.hasOwnProperty(property)) {
					if (toString.call(source[property]) == '[object Object]') {
						object[property] = deepExtend(object[property] || {}, source[property]);
					} else {
						object[property] = source[property];
					}
				}
			}
		}
	}
	return object;
}

function setPath(options) {
	if (typeof options !== 'object') {
		options = {};
	}

	let opt = {
		base: options.base || '/_Resources/Static/Packages',
		theme: options.theme || 'Dotpulse.Theme',
		assets: options.assets || 'Assets/',
		scripts: options.scripts || 'Scripts/',
		styles: options.styles || 'Styles/'
	};

	let path = {
		base: opt.base + '/'
	};
	path.theme = path.base + opt.theme + '/';
	path.assets = path.theme + opt.assets;
	path.scripts = path.theme + opt.scripts;
	path.styles = path.theme + opt.styles;

	return path;
}

function makeGlobal(variables = ['html','dataVersion','getProtokoll','language','isLive','lastVisitedNode','NeosEvents','deepExtend','onReady','onReadyRun']) {
	variables.forEach(key => {
		window[key] = this[key];
	});
}

export { html, dataVersion, getProtokoll, language, isLive, lastVisitedNode, NeosEvents, deepExtend, onReady, onReadyRun, setPath, makeGlobal }
