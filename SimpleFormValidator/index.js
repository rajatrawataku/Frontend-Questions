const formFieldSchema = [
	{
		key: 'name',
		type: 'input',
		subType: 'text',
		required: true,
		minlength: 2,
		maxlength: 65,
		label: 'Name'
	},
	{
		key: 'email',
		type: 'input',
		subType: 'email',
		required: true,
		label: 'Email'
	},
	{
		key: 'country',
		type: 'select',
		required: true,
		label: 'Country',
		options: [
			{
				text: 'India',
				value: 'In'
			},
			{
				text: 'Srilanka',
				value: 'Sr'
			},
			{
				text: 'China',
				value: 'Ch'
			}
		]
	}
];

class SimpleForm {
	formNode = null;
	templates = {};
	state = {};
	formFieldSchema = null;

	constructor(node, formFieldSchema) {
		this.formNode = node;
		formFieldSchema.forEach(formField => {
			this.state[formField.key] = '';
		});

		document.querySelectorAll("[data-component-for='simpleFormComponent'").forEach(template => {
			this.templates[template.dataset.idValue] = template;
		});
		this.formFieldSchema = formFieldSchema;
		this.addEventListener(this.formNode, 'submit', this.addSubmitListener, true);

		this.render();
	}

	getNodeForTemplate = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	setNodeAttributes = (node, attrObj) => {
		Object.keys(attrObj).forEach(key => {
			const value = attrObj[key];
			node.setAttribute(key, value);
		});
	};

	setInnerText = (node, text) => {
		node.appendChild(document.createTextNode(text));
	};

	addSubmitListener = event => {
		event.preventDefault();

		if (this.formNode.checkValidity) {
			alert('form submitted successfully');
			this.render();
		} else {
			this.formNode.reportValidity();
		}
	};

	addEventListener = (node, eventType, eventHandler, shouldAdd) => {
		if (shouldAdd) {
			node.addEventListener(eventType, eventHandler);
		} else {
			node.removeEventListener(eventType, eventHandler);
		}
	};

	getFieldNode = fieldData => {
		const { key, type, subType, required, minLength, maxLength, label, options } = fieldData;

		switch (type) {
			case 'input': {
				const inputNode = this.getNodeForTemplate('input');
				this.setNodeAttributes(inputNode, {
					id: key,
					type: subType,
					required,
					minLength,
					maxLength
				});

				const labelNode = this.getNodeForTemplate('label');
				this.setNodeAttributes(labelNode, { for: key });
				this.setInnerText(labelNode, label);

				labelNode.appendChild(inputNode);
				return labelNode;
			}
			case 'select': {
				const selectNode = this.getNodeForTemplate('select');
				this.setNodeAttributes(selectNode, {
					id: key
				});

				const defaultOptionNode = this.getNodeForTemplate('options');
				this.setNodeAttributes(defaultOptionNode, {
					disabled: true,
					selected: true,
					value: 'Select'
				});
				this.setInnerText(defaultOptionNode, 'Select');
				selectNode.appendChild(defaultOptionNode);

				options.forEach(option => {
					const optionNode = this.getNodeForTemplate('options');
					this.setNodeAttributes(optionNode, {
						value: option.value
					});
					this.setInnerText(optionNode, option.text);
					selectNode.appendChild(optionNode);
				});

				const labelNode = this.getNodeForTemplate('label');
				this.setNodeAttributes(labelNode, { for: key });
				this.setInnerText(labelNode, label);
				labelNode.appendChild(selectNode);
				return labelNode;
			}
			default: {
				return null;
			}
		}
	};

	render() {
		this.formNode.innerHTML = '';

		const allNodes = [];
		this.formFieldSchema.forEach(formField => {
			allNodes.push(this.getFieldNode(formField));
		});

		allNodes.push(this.getNodeForTemplate('button'));

		allNodes.forEach(node => {
			this.formNode.appendChild(node);
		});
	}
}

document.querySelectorAll('[data-component="simpleFormComponent"]').forEach(formNode => {
	console.log('hey');
	new SimpleForm(formNode, formFieldSchema);
});
