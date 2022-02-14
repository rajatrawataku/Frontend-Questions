function defineIntervals() {
	let timerMap = {};
	let intervalIds = 0;

	function setInterval(func, wait) {
		let id = intervalIds++;

		function callTimer() {
			timerMap[id] = setTimeout(() => {
				Promise.resolve(1).then(() => {
					func.call(this);
				});

				if (timerMap[id]) {
					callTimer();
				}
			}, wait);
		}

		callTimer.call(this);

		return id;
	}

	function clearInterval(id) {
		clearTimeout(timerMap[id]);
		delete timerMap[id];
	}

	return {
		clearInterval,
		setInterval
	};
}

const timerObject = defineIntervals();
window.setInterval = timerObject.setInterval;
windnow.clearInterval = timerObject.clearInterval;
