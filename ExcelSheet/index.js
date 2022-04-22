class BaseClass {
	getTemplateNode(nodeId) {
		return this.templates[nodeId].content.children[0].cloneNode(true);
	}

	setTemplatData(node, text) {
		node.appendChild(document.createTextNode(text));
	}
}

class SheetCell extends BaseClass {
	value = '';
	isDisabled = true;
	templates = {};

	constructor(value, i, j, changeDataHandler) {
		super();
		this.value = value;
		document.querySelectorAll("[data-component-for='excel-ceel']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});

		return this.createCell(i, j, changeDataHandler);
	}

	debouncedHandler = (func, delay) => {
		let timeouId = null;

		return event => {
			clearTimeout(timeouId);
			timeouId = setTimeout(() => {
				func(event);
			}, delay);
		};
	};

	createCell = (i, j, changeDataHandler) => {
		const cellNode = this.getTemplateNode('input-field');
		cellNode.value = this.value;

		cellNode.addEventListener('keyup', this.debouncedHandler(changeDataHandler(i, j), 200));
		cellNode.classList.add('table-cell');

		return cellNode;
	};
}

class ExcelSheet extends BaseClass {
	node = null;
	templates = {};
	sheetData = [];
	m = 10;
	n = 10;

	constructor(node) {
		super();
		this.node = node;
		document.querySelectorAll("[data-component-for='excel-sheet']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.initialiseSheet();
		this.addEventListener();
		this.render();
	}

	initialiseSheet = () => {
		for (let i = 0; i < this.m; i++) {
			this.sheetData[i] = [];
			for (let j = 0; j < this.n; j++) {
				this.sheetData[i][j] = '';
			}
		}
	};

	delete = (idx, isRow) => {
		if (isRow) {
			this.sheetData = this.sheetData.slice(0, idx).concat(this.sheetData.slice(idx + 1));
			this.m--;
		} else {
			for (let i = 0; i < this.m; i++) {
				this.sheetData[i] = this.sheetData[i].slice(0, idx).concat(this.sheetData[i].slice(idx + 1));
			}
			this.n--;
		}
		this.render();
	};

	changeDataHandler = (i, j) => event => {
		this.sheetData[i][j] = event.target.value;
	};

	addEventListener = () => {
		this.node.addEventListener('click', event => {
			const dataset = event.target.dataset;
			if (dataset && dataset.id === 'DEL_BTN') {
				const { idx, isRow } = dataset;
				this.delete(Number(idx), isRow === 'true');
			}
		});
	};

	renderTable = () => {
		const tableHeaderRowCtn = this.getTemplateNode('table-row');

		for (let i = 0; i <= this.n; i++) {
			const tableData = this.getTemplateNode('table-head');
			this.setTemplatData(tableData, i);
			if (i !== 0) {
				const delBtn = this.getTemplateNode('delete-btn');
				delBtn.dataset.id = 'DEL_BTN';
				delBtn.dataset.idx = i - 1;
				delBtn.dataset.isRow = false;
				tableData.appendChild(delBtn);
			}

			tableHeaderRowCtn.appendChild(tableData);
		}

		const tableBody = this.getTemplateNode('table-body');

		for (let i = 0; i < this.m; i++) {
			const tableRow = this.getTemplateNode('table-row');

			for (let j = 0; j <= this.n; j++) {
				const tableData = this.getTemplateNode('table-data');

				if (j === 0) {
					const delBtn = this.getTemplateNode('delete-btn');
					delBtn.dataset.id = 'DEL_BTN';
					delBtn.dataset.idx = i;
					delBtn.dataset.isRow = true;
					tableData.appendChild(delBtn);
					this.setTemplatData(tableData, i + 1);
				} else {
					const currData = this.sheetData[i][j - 1];
					const cellNode = new SheetCell(currData, i, j - 1, this.changeDataHandler);
					tableData.appendChild(cellNode);
				}
				tableRow.appendChild(tableData);
			}
			tableBody.appendChild(tableRow);
		}

		this.node.appendChild(tableHeaderRowCtn);
		this.node.appendChild(tableBody);
	};

	render() {
		this.node.innerHTML = '';
		this.renderTable();
	}
}

document.querySelectorAll("[data-component='excel-sheet']").forEach(node => new ExcelSheet(node));
