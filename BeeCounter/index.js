class BeeCat {
	node = null;
	currentCounter = 0;
	templates = {};

	constructor(node) {
		this.node = node;
		this.currentCounter = Number(node.dataset.start);
		document.querySelectorAll("[data-template-for='beecat']").forEach(template => {
			this.templates[template.dataset.idValue] = template;
		});
		this.render();
	}

	handleClick = () => {
		this.currentCounter++;
		this.render();
	};

	removeEventListener = () => {
		this.node.removeEventListener('click', this.handleClick);
	};

	addEventListener = () => {
		this.node.addEventListener('click', this.handleClick);
	};

	render() {
		const { currentCounter } = this;
		this.removeEventListener();
		this.node.innerHTML = '';

		const catNode = currentCounter % 5 === 0 && this.templates['cat'].content.cloneNode(true);
		const beeNode = currentCounter % 7 === 0 && this.templates['bee'].content.cloneNode(true);

		if (catNode) {
			this.node.appendChild(catNode);
		}

		if (beeNode) {
			this.node.appendChild(beeNode);
		}

		if (!catNode && !beeNode) {
			this.node.appendChild(
				this.templates['num'].content.cloneNode(true).appendChild(document.createTextNode(currentCounter))
			);
		}

		this.addEventListener();
	}
}

document.querySelectorAll("[data-component='beecat']").forEach(node => {
	new BeeCat(node);
});
