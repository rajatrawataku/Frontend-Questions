startLoading();

function startLoading() {
	const progressEle = document.getElementsByClassName('progress-bar')[0];
	const computedStyles = getComputedStyle(progressEle);
	const width = parseFloat(computedStyles.getPropertyValue('--width'));
	if (width < 100) {
		progressEle.style.setProperty('--width', width + 0.1);
		requestAnimationFrame(startLoading);
	}
}
