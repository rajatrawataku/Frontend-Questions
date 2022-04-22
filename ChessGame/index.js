class CheessBoard {
	node = null;
	templates = {};
	rows = 0;
	columns = 0;
	selectedCell = null;
	highlightedCellSet = new Set();
	isFirstRender = true;

	constructor(node) {
		this.node = node;
		document.querySelectorAll("[data-component-for='chess-board']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});

		this.rows = Number(node.dataset.rows);
		this.columns = Number(node.dataset.columns);

		this.node.addEventListener('click', this.onCellClickHandler);
		this.render();
	}

	getNodeFromTemplate = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	onCellClickHandler = event => {
		const { row: rowStr, column: columnStr } = event.target.dataset;
		const row = Number(rowStr);
		const column = Number(columnStr);

		const key = `${row}_${column}`;

		this.selectedCell = key;
		this.highlightedCellSet = new Set();

		// both decrement
		for (let i = row, j = column; i >= 0, j >= 0; i--, j--) {
			const key = `${i}_${j}`;
			this.highlightedCellSet.add(key);
		}

		// both increment
		for (let i = row, j = column; i < this.rows, j < this.columns; i++, j++) {
			const key = `${i}_${j}`;
			this.highlightedCellSet.add(key);
		}

		// one increment and one decrement
		for (let i = row, j = column; i >= 0, j < this.columns; i--, j++) {
			const key = `${i}_${j}`;
			this.highlightedCellSet.add(key);
		}

		// one increment and one decrement
		for (let i = row, j = column; i < this.rows, j >= 0; i++, j--) {
			const key = `${i}_${j}`;
			this.highlightedCellSet.add(key);
		}

		this.render();
	};

	createCellNodes = () => {
		const { rows, columns } = this;
		const rowNodes = [];

		for (let i = 0; i < rows; i++) {
			let isWhite = i % 2 === 0;

			const cellRowNode = this.getNodeFromTemplate('cell-row');
			const cellRowData = [];

			for (let j = 0; j < columns; j++) {
				const cell = this.getNodeFromTemplate('cell-id');
				const key = `${i}_${j}`;
				cell.dataset.key = key;
				cell.dataset.row = i;
				cell.dataset.column = j;

				cell.classList.add(isWhite ? 'white-cell' : 'black-cell');

				cellRowData.push(cell);
				isWhite = !isWhite;
			}

			cellRowNode.append(...cellRowData);

			rowNodes.push(cellRowNode);
		}

		return rowNodes;
	};

	changeHighletedNodes = () => {
		document.querySelectorAll('.cell').forEach(node => {
			node.classList.remove('seleceted-cell');
			if (this.highlightedCellSet.has(node.dataset.key)) {
				node.classList.add('seleceted-cell');
			}
		});
	};

	render() {
		if (this.isFirstRender) {
			this.node.innerHTML = '';
			const rowNodes = this.createCellNodes();
			this.node.append(...rowNodes);
			this.isFirstRender = false;
		} else {
			this.changeHighletedNodes();
		}
	}
}

document.querySelectorAll("[data-component='chess-board']").forEach(node => new CheessBoard(node));
