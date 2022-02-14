function flattenArray(arr, depth = 1) {
	if (depth === 0) {
		return arr;
	}

	let newArray = [];

	for (let i = 0; i < arr.length; i++) {
		const data = arr[i];

		if (data !== undefined) {
			if (Array.isArray(data)) {
				newArray.push(...flattenArray(data, depth - 1));
			} else {
				newArray.push(data);
			}
		}
	}

	return newArray;
}
