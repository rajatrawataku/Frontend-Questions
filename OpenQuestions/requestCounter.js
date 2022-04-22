function fetchData(urls) {
	let reqCounter = 0;
	let resCounter = 0;
	let urlLen = urls.length;

	const outputData = [];

	return new Promise((resolve, reject) => {
		const fireRequest = index => {
			fetch(urls[index])
				.then(res => res.json())
				.then(responseHandler(index, resolve), responseHandler(index, reject));
		};

		const responseHandler = (index, func) => data => {
			outputData[index] = data;
			resCounter++;

			if (resCounter >= urlLen) {
				func(outputData);
			}

			if (reqCounter < urlLen - 1) {
				fireRequest(reqCounter++);
			}
		};

		fireRequest(reqCounter++); // 0
		fireRequest(reqCounter++); // 1
		fireRequest(reqCounter++); // 2
	});
}
