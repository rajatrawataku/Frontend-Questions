/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
	let lastArg = null;
	let waiting = false;
	const { leading, trailing } = option;

	return function (...args) {
		if (leading === false && trailing === false) {
			return;
		} else if (leading === true && trailing === true) {
			if (!waiting) {
				waiting = true;
				func.apply(this, args);
				const timerFunction = () => {
					setTimeout(() => {
						waiting = false;
						if (lastArg) {
							func.apply(this, lastArg);
							waiting = true;
							lastArg = null;
							timerFunction();
						}
					}, wait);
				};
				timerFunction();
			} else {
				lastArg = args;
			}
		} else if (leading === true && trailing === false) {
			if (!waiting) {
				waiting = true;
				func.apply(this, args);
				const timerFunction = () => {
					setTimeout(() => {
						waiting = false;
					}, wait);
				};
				timerFunction();
			}
		} else {
			if (!waiting) {
				waiting = true;
				const timerFunction = () => {
					setTimeout(() => {
						waiting = false;
						if (lastArg) {
							func.apply(this, lastArg);
							waiting = true;
							lastArg = null;
							timerFunction();
						}
					}, wait);
				};
				timerFunction();
			} else {
				lastArg = args;
			}
		}
	};
}
