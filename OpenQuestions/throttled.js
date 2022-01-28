function throttle(func, wait) {
	timerId = null;
	lastArgs = null;

	return function () {
		if (timerId) {
			lastArgs = arguments;
		} else {
			func.call(this, ...arguments);

			timerId = setTimeout(() => {
				if (lastArgs) {
					func.call(this, ...lastArgs);
				}

				lastArgs = null;

				timerId = null;
			}, wait);
		}
	};
}
