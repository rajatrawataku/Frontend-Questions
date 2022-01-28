class Modal {
	node = null;
	templates = {};
	state = {
		isHidden: true,
		modalContent: {
			textContent: [],
			btnContent: '',
			headerTitle: ''
		}
	};

	constructor(node) {
		this.node = node;
		document.querySelectorAll("[data-template-for='modal']").forEach(template => {
			this.templates[template.dataset.idValue] = template;
		});

		this.state.modalContent.textContent = node.dataset.modalTextContent.split('_');
		this.state.modalContent.btnContent = node.dataset.modalBtnContent;
		this.state.modalContent.headerTitle = node.dataset.modalHeaderTitle;

		this.state.isHidden = node.dataset.modalStateIshidden;

		this.render();
	}

	addClickListener = (node, eventHandler) => {
		node.addEventListener('click', eventHandler);
	};

	removeClickListener = (node, eventHandler) => {
		node.removeEventListener('click', eventHandler);
	};

	openModal = () => {
		this.state.isHidden = false;
		this.render();
	};

	closeModal = () => {
		this.state.isHidden = true;
		this.render();
	};

	getNode = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	render() {
		const {
			isHidden,
			modalContent: { textContent, btnContent, headerTitle }
		} = this.state;

		this.node.innerHTML = '';

		if (isHidden) {
			const intialBtnNode = this.getNode('initiatorBtn');
			this.addClickListener(intialBtnNode, this.openModal);
			this.node.appendChild(intialBtnNode);
			return;
		}

		const modalContainer = this.getNode('container');
		const modalContentContainer = this.getNode('contentContainer');

		const modalActionBtn = this.getNode('button');
		modalActionBtn.appendChild(document.createTextNode(btnContent));

		this.addClickListener(modalActionBtn, this.closeModal);

		const closeBtnNode = this.getNode('closeButton');
		this.addClickListener(closeBtnNode, this.closeModal);

		modalContentContainer.appendChild(closeBtnNode);

		const modalHeaderNode = this.getNode('modalHeader');
		modalHeaderNode.appendChild(document.createTextNode(headerTitle));
		modalContentContainer.appendChild(modalHeaderNode);

		textContent.forEach(text => {
			const textNode = this.getNode('textContent');
			textNode.appendChild(document.createTextNode(text));
			modalContentContainer.appendChild(textNode);
		});

		modalContentContainer.appendChild(modalActionBtn);
		modalContainer.appendChild(modalContentContainer);
		this.node.appendChild(modalContainer);
	}
}

new Modal(document.getElementsByClassName('main-ctn')[0]);
