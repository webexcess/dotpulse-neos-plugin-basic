// Get type of variable

let possibleTypes = 'boolean number string function array date regexp object error symbol'.split(' ');

export default function(variable) {
	let type = (typeof variable).toLowerCase();

	function checkNaN(check = type) {
		return check == 'number' && isNaN(variable);
	}

	if (variable == null || checkNaN()) {
		return String(variable);
	} else if (type === 'object' || type === 'function') {
		let constructorType = variable.constructor.toString().toLowerCase();
		for (let index in possibleTypes) {
			let possibleType = possibleTypes[index];
			if (constructorType.includes(possibleType)) {
				if (checkNaN(possibleType)) {
					return String(variable);
				}
				return possibleType;
			}
		}
		return 'object';
	} else {
		return type;
	}
}
