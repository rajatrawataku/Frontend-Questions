class MemoryGame {
	node = null;
	templates = {};
	isBlinking = false;
	cellCount = 0;
	currScore = 0;
	maxScore = 0;
	blinkCounter = 1;
	currBlinkSequence = [];
	cellClickCounter = -1;
	cellDataStore = [];
	maxScoreNode = null;
	currScoreNode = null;

	constructor(node) {
		this.node = node;
		this.cellCount = Number(node.dataset.count);

		document.querySelectorAll("[data-component-for='memory-game']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});

		this.createNodes();
		this.render();
	}

	updateScore = () => {};

	resetGame = () => {
		this.blinkCounter = 0;
		this.isBlinking = false;
		this.currScore = 0;
		this.currBlinkSequence = [];
		this.cellClickCounter = -1;
	};

	forwardGame = () => {
		this.blinkCounter++;
		this.currScore++;
		this.isBlinking = false;
		this.currBlinkSequence = [];
		this.cellClickCounter = -1;
		this.startBlinking();
	};

	generateRandomNumber = () => {
		return Math.floor(Math.random() * (this.cellCount - 1));
	};

	blinkCell = idx => {
		this.cellDataStore[idx].classList.add('blink');
		setTimeout(() => {
			this.cellDataStore[idx].classList.remove('blink');
		}, 500);
	};

	startBlinking = () => {
		if (!this.isBlinking) {
			this.isBlinking = true;
			this.currBlinkSequence = [];

			let tempBlinkCounter = 0;

			function blinkHelper() {
				setTimeout(() => {
					tempBlinkCounter++;
					const randomIdx = this.generateRandomNumber();
					this.blinkCell(randomIdx);
					this.currBlinkSequence.push(randomIdx);

					if (tempBlinkCounter < this.blinkCounter) {
						blinkHelper();
					} else {
						this.isBlinking = false;
					}
				}, 1000);
			}

			blinkHelper();
		}
	};

	cellClickHandler = event => {
		if (!this.isBlinking) {
			const targetIdx = event.target.datset.idx;
			this.cellClickCounter++;

			if (this.currBlinkSequence[this.cellClickCounter] === targetIdx) {
				if (this.cellClickCounter === this.currBlinkSequence.length - 1) {
					this.forwardGame();
				}
			} else {
				this.resetGame();
			}
		} else {
			this.cellClickCounter = -1;
		}
	};

	getNodeFromTemplate = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	createNodes = () => {
		for (let i = 0; i < this.cellCount; i++) {
			const node = this.getNodeFromTemplate('cell');
			node.dataset.idx = i;
			this.cellDataStore.push(node);
		}
	};

	render() {
		this.node.innerHTML = '';
		this.node.append(...this.cellDataStore);
	}
}
