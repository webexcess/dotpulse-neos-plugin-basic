export default function(url, callback) {
	if (typeof url === 'string') {
		if (url.indexOf('http') !== 0 && url.indexOf('//') !== 0) {
			// File is internal
			if (url.indexOf('/') === -1 && typeof path == 'object' && typeof path.scripts === 'string') {
				url = path.scripts + url;
			}

			if (dataVersion) {
				let query = '?'
				if (url.indexOf(query) !== -1) {
					query = '&';
				}
				url += query + 'v=' + dataVersion;
			}
		}

		let files = document.loadedScript;
		if (!files) {
			document.loadedScript = [];
			files = [];
		} else if (files.indexOf(url) !== -1) {
			// File is already leaded
			return true;
		}

		let script = document.createElement('script');
		if (typeof callback === 'function') {
			script.addEventListener('load', event => {
				callback(url);
			}, false);
		}

		script.type = 'text/javascript';
		script.async = true;
		script.src = url;

		document.head.appendChild(script);
		document.loadedScript[files.length] = url;

		return url;
	}
	return false;
}
