function animate({ timing, duration, draw }) {
	const startTime = performance.now();
	requestAnimationFrame(function innerAnimate(currTime) {
		const timeFraction = (currTime - startTime) / duration;
		if (timeFraction > 1) {
			timeFraction = 1;
		}

		let progress = timing(timeFraction);
		draw(progress);

		if (timeFraction < 1) {
			requestAnimationFrame(innerAnimate);
		}
	});
}

const ball = document.querySelector('.ball');
const field = document.querySelector('.field');

const finalTopValue = field.clientHeight - ball.clientHeight;

function bounce(timeFraction) {
	for (let a = 0, b = 1; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
		}
	}
}

function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	};
}

function quad(timeFraction) {
	return Math.pow(timeFraction, 2);
}

animate({
	timing: makeEaseOut(bounce),
	draw: progress => {
		ball.style.top = `${progress * finalTopValue}px`;
	},
	duration: 5000
});

animate({
	timing: makeEaseOut(quad),
	draw: progress => {
		ball.style.left = `${progress * 100}px`;
	},
	duration: 5000
});
