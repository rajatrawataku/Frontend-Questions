function throttle(func, wait) {
	waiting = false;
	lastArgs = null;

	return function (...args) {
		if (!waiting) {
			waiting = true;
			func.apply(this, args);
			const timerFunction = () => {
				setTimeout(() => {
					waiting = false;
					if (lastArgs) {
						waiting = true;
						func.apply(this, args);
						timerFunction();
					}
				}, wait);
			};
			timerFunction();
		} else {
			lastArgs = args;
		}
	};
}
