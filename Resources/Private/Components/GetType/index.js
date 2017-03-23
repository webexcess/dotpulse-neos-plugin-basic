// Get type of variable

let possibleTypes = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ');

export default function(variable) {
	let type = (typeof variable).toLowerCase();

	function checkNaN(check = type) {
		return check == 'number' && isNaN(variable);
	}

	if (variable == null || checkNaN()) {
		return String(variable);
	} else if (type === 'object' || type === 'function') {
		let constructorType = variable.constructor.toString();
		for (let index in possibleTypes) {
			let possibleType = possibleTypes[index];
			if (constructorType.includes(possibleType)) {
				if (checkNaN(possibleType)) {
					return String(variable);
				}
				return possibleType.toLowerCase();;
			}
		}
		return 'object';
	} else {
		return type;
	}
}