class ColorSpotter {
	node = null;
	size = null;
	currentScore = 0;
	templates = {};
	currentScoreNode = null;

	constructor(node) {
		this.node = node;
		this.defaultSize = node.dataset.size;
		this.size = this.defaultSize;
		document.querySelectorAll("[data-component-for='color-spotter']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.currentScoreNode = document.querySelector('.current-score');

		this.node.addEventListener('click', this.onCellClickHandler);
		this.render();
	}

	getRandomColors = () => {
		var ratio = 0.618033988749895;

		var hue = (Math.random() + ratio) % 1;
		var saturation = Math.round(Math.random() * 100) % 85;
		var lightness = Math.round(Math.random() * 100) % 85;

		var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
		var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

		return {
			color,
			oddColor
		};
	};

	getRandomIdxKey = () => {
		const i = Math.floor(Math.random() * (this.size - 1));
		const j = Math.floor(Math.random() * (this.size - 1));
		return `${i}_${j}`;
	};

	onCellClickHandler = event => {
		if (event.target.dataset.isOddColorCell === 'true') {
			this.currentScore++;
			this.size++;
		} else {
			this.currentScore = 0;
			this.size = this.defaultSize;
			this.node.classList.add('shake');

			setTimeout(() => {
				this.node.classList.remove('shake');
			}, 1000);
		}

		this.render();
	};

	getNodeFromTemplate = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	render() {
		this.node.innerHTML = '';

		const bodyNode = this.getNodeFromTemplate('body');
		const oddIdxKey = this.getRandomIdxKey();
		const { color, oddColor } = this.getRandomColors();
		const { currentScore, size } = this;

		this.currentScoreNode.innerHTML = '';
		this.currentScoreNode.append(document.createTextNode(currentScore));

		for (let i = 0; i < size; i++) {
			const rowNode = this.getNodeFromTemplate('row');
			for (let j = 0; j < size; j++) {
				const cellNode = this.getNodeFromTemplate('cell');
				const cellKey = `${i}_${j}`;

				if (cellKey === oddIdxKey) {
					cellNode.dataset.isOddColorCell = true;
					cellNode.style.backgroundColor = oddColor;
				} else {
					cellNode.style.backgroundColor = color;
				}
				rowNode.append(cellNode);
			}
			bodyNode.append(rowNode);
		}

		this.node.append(bodyNode);
	}
}

document.querySelectorAll("[data-component='color-spotter']").forEach(node => new ColorSpotter(node));
