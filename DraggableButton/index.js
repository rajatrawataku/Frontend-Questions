class Draggable {
	node = null;
	state = {
		x: '50%',
		y: '50%'
	};

	constructor(node) {
		this.node = node;
		this.node.addEventListener('dragstart', this.dragStartHandler);
		this.node.addEventListener('dragend', this.drageEndHandler);
		this.node.addEventListener('drag', this.throttledDragging(this.dragElement));
		this.render();
	}

	dragStartHandler = event => {
		this.node.style.backgroundColor = 'grey';
	};

	dragElement = event => {
		this.state = {
			x: event.x,
			y: event.y
		};
		this.render();
	};

	throttledDragging = callBack => {
		let timerId = null;
		let lastArg = null;

		return event => {
			if (timerId) {
				lastArg = event;
			} else {
				callBack(event);
				timerId = setTimeout(() => {
					if (lastArg) {
						callBack(lastArg);
					}
					timerId = null;
					lastArg = null;
				}, 100);
			}
		};
	};

	drageEndHandler = event => {
		this.node.style.backgroundColor = 'skyBlue';
		// this.dragElement(event);
	};

	render() {
		const { x, y } = this.state;
		this.node.style.top = y;
		this.node.style.left = x;
	}
}

document.querySelectorAll("[data-component='Draggable']").forEach(node => new Draggable(node));
