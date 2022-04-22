const carouselNode = document.getElementsByClassName('carousel-ctn')[0];
document.querySelectorAll('.arrow').forEach(node => {
	console.log('hey');
	node.addEventListener('click', () => {
		console.log('hey');
		if (node.classList.contains('back')) {
			carouselNode.scrollBy(-130 * 3, 0);
		} else {
			console.log('he y');
			carouselNode.scrollBy(130 * 3, 0);
		}
	});
});
