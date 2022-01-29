const LOADER_STATUS_MAPPER = {
	NOT_STARTED: 'Load Data',
	PENDING: 'Loading Data',
	COMPLETED: 'Load Completed!'
};

class ProgressButton {
	state = {
		loaderStatus: 'NOT_STARTED',
		currentCounter: 0
	};
	node = null;
	templates = {};

	constructor(node) {
		this.node = node;
		document.querySelectorAll('[data-component-for="ProgressButton"]').forEach(template => {
			this.templates[template.dataset.id] = template;
		});

		this.shouldAddorDeleteEventListener(this.node, 'click', this.startLoader, true);
		this.render();
	}

	shouldAddorDeleteEventListener = (node, eventType, eventHandler, shouldAdd) => {
		if (shouldAdd) {
			node.addEventListener(eventType, eventHandler);
		} else {
			node.removeEventListener(eventType, eventHandlers);
		}
	};

	getNoteForTemplate = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	addInnerText = (node, text) => {
		node.appendChild(document.createTextNode(text));
	};

	startLoader = () => {
		this.state.loaderStatus = 'PENDING';
		this.incrementLoader();
	};

	incrementLoader = () => {
		this.state.currentCounter++;
		if (this.state.currentCounter === 100) {
			this.state.loaderStatus = 'COMPLETED';
		} else {
			setTimeout(() => {
				this.incrementLoader();
			}, 100);
		}
		this.render();
	};

	render() {
		this.node.innerHTML = '';

		const { currentCounter, loaderStatus } = this.state;
		const finalLoadingText = LOADER_STATUS_MAPPER[loaderStatus];

		const loadingTextNode = this.getNoteForTemplate('loadingText');
		this.addInnerText(loadingTextNode, finalLoadingText);

		const loaderBarCtn = this.getNoteForTemplate('loaderBar');
		loaderBarCtn.style.width = `${currentCounter}%`;

		if (loaderStatus === 'PENDING') {
			const loadingPercetageNode = this.getNoteForTemplate('loading-pecentage');
			this.addInnerText(loadingPercetageNode, `${currentCounter}%`);

			loaderBarCtn.appendChild(loadingPercetageNode);
		}

		this.node.appendChild(loadingTextNode);
		this.node.appendChild(loaderBarCtn);
	}
}

document.querySelectorAll("[data-component='ProgressButton']").forEach(node => new ProgressButton(node));
