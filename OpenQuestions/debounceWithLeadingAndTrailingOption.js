function debounce(func, wait, option = { leading: false, trailing: false }) {
	let timerId = null;
	const { leading, trailing } = option;
	return function () {
		if (leading === false && trailing === false) {
			return;
		} else if (leading === false && trailing === true) {
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				func.call(this, ...arguments);
				timerId = null;
			}, wait);
		} else if (leading === true && trailing === false) {
			if (timerId === null) {
				func.call(this, ...arguments);
				timerId = setTimeout(() => {
					timerId = null;
				}, wait);
			} else {
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					timerId = null;
				}, wait);
			}
		} else if (leading === true && trailing === true) {
			if (timerId === null) {
				func.call(this, ...arguments);
				timerId = clearTimeout(() => {
					timerId = null;
				});
			} else {
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					func.call(this, ...arguments);
					timerId = null;
				}, wait);
			}
		}
	};
}
