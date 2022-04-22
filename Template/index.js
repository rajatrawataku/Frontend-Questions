class Template {
	constructor() {}
	getTemplateNode = templateId => {
		this.templates[templateId].content.children[0].cloneNode(true);
	};
	setTemplateText = (node, text) => {
		node.appendChild(document.createTextNode(text));
	};
}
