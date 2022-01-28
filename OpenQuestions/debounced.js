function debouncedFunction(delay, callbackHandler) {
	timerId = null;
	return function () {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			callbackHandler.call(this, ...arguments);
			timerId = null;
		}, delay);
	};
}
