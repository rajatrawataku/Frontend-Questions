const templates = {};

document.querySelectorAll("[data-component='showList']").forEach(template => {
	templates[template.dataset.id] = template;
});

const node = document.querySelector('.ctn');

document.querySelector('button').addEventListener('click', event => {
	let divNode = null;
	let listNode = null;
    let mql = window.matchMedia('(max-width: 600px)');
	if (mql.matches) {
		divNode = templates['popoverList'].content.children[0].cloneNode(true);
		listNode = templates['actualList'].content.children[0].cloneNode(true);
		divNode.appendChild(listNode);
	} else {
		divNode = templates['inPage'].content.children[0].cloneNode(true);
		listNode = templates['actualList'].content.children[0].cloneNode(true);
		divNode.appendChild(listNode);
	}
	node.appendChild(divNode);
});
