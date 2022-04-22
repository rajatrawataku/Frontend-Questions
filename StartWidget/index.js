/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

class Star {
	constructor(el, count, callback) {
		this.node = el;
		this.count = count;
		this.callback = callback;
		this.templates = {};
		this.selectedRating = 0;

		document.querySelectorAll("[data-component-for='star']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.addEventListener();
		this.render();
	}

	addEventListener = () => {
		this.node.addEventListener('click', event => {
			const selectedRating = event.target.dataset.value;
			this.selectedRating = selectedRating;
			this.render();
		});
	};

	getTemplateNode = nodeID => {
		return this.templates[nodeID].content.children[0].cloneNode(true);
	};

	render() {
		this.node.innerHTML = '';
		const { count, selectedRating } = this;
		const startNodes = [];
		for (let i = 0; i < count; i++) {
			const node = this.getTemplateNode('star-icon');
			node.dataset.value = i + 1;
			if (i + 1 <= selectedRating) {
				node.classList.add('fa-star');
			} else {
				node.classList.add('fa-star-o');
			}
			startNodes.push(node);
		}

		this.node.append(...startNodes);
	}
}

new Star(document.getElementById('star'), 5);
