function clearAllTimeouts() {
	const _setTimeout = window.setTimeout;
	const _clearTimeout = window.clearTimeout;
	const timerCache = new Set();

	window.setTimeout = function (callback, wait) {
		const timerId = _setTimeout(() => {
			callback();
			timerCache.delete(timerId);
		}, wait);
		timerCache.add(timerId);
		return timerId;
	};

	window.clearTimeout = function (timerId) {
		_clearTimeout(timerId);
		timerCache.delete(timerId);
	};

	window.clearAllTimeouts = function () {
		for (const timerId of timerCache) {
			_clearTimeout(timerId);
		}
		timerCache.clear();
	};
}
