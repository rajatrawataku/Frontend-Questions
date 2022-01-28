let cacheMap = new Map();

function cloneDeep(data) {
	const inputValueType = typeof data;

	if (inputValueType === 'object' && data !== null) {
		if (data instanceof Number) {
			return new Number(data);
		} else if (data instanceof String) {
			return new String(data);
		} else if (data instanceof Boolean) {
			return new Boolean(data);
		} else if (data instanceof BigInt) {
			return new BigInt(data);
		} else if (data instanceof Symbol) {
			return Symbol(data);
		}

		if (cacheMap.has(data)) {
			return cacheMap.get(data);
		}

		let clonedData = {};

		if (Array.isArray(data)) {
			clonedData = [];
		} else {
			clonedData = {};
		}

		cacheMap.set(data, clonedData);

		const allKeys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];

		for (let key of allKeys) {
			const newData = data[key];
			clonedData[key] = cloneDeep(newData);
		}

		return clonedData;
	} else {
		return data;
	}
}
