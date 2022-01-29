const tableData = [
	{
		empNo: 1243,
		eName: 'Rajat Rawat',
		eDes: 'SoftWare Developer'
	},
	{
		empNo: 123,
		eName: 'Shubham Random',
		eDes: 'Lead Architect'
	},
	{
		empNo: 13,
		eName: 'Shubham Random 2',
		eDes: 'SoftWare Developer 2'
	}
];

const tableHeaderData = ['Employee Number', 'Employee Name', 'Employee Designations'];
const tableDataAccessKeys = ['empNo', 'eName', 'eDes'];

class SimpleTable {
	node = null;
	templates = {};
	state = {};

	constructor(node) {
		this.node = node;
		document.querySelectorAll('[data-component-for="SimpleTable"]').forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.state.tableData = tableData;
		this.state.tableHeaderData = tableHeaderData;
		this.state.tableDataAccessKeys = tableDataAccessKeys;

		this.render();
	}

	getNodeByTemplateId = templateID => {
		return this.templates[templateID].content.children[0].cloneNode(true);
	};

	addTextToNode = (node, text) => {
		node.appendChild(document.createTextNode(text));
	};

	render() {
		const { tableData, tableHeaderData, tableDataAccessKeys } = this.state;
		this.node.innerHTML = '';

		const tableHeadNode = this.getNodeByTemplateId('tableHead');
		const tableBodyNode = this.getNodeByTemplateId('tableBody');
		const tableHeaderRow = this.getNodeByTemplateId('tableRow');

		tableHeaderData.forEach(tableHead => {
			const tableDataNode = this.getNodeByTemplateId('tableData');
			this.addTextToNode(tableDataNode, tableHead);
			tableHeaderRow.appendChild(tableDataNode);
		});

		tableHeadNode.appendChild(tableHeaderRow);

		tableData.forEach(tableRowData => {
			const tableRowNode = this.getNodeByTemplateId('tableRow');

			tableDataAccessKeys.forEach(key => {
				const value = tableRowData[key];
				const tableDataNode = this.getNodeByTemplateId('tableData');
				this.addTextToNode(tableDataNode, value);
				tableRowNode.appendChild(tableDataNode);
			});

			tableBodyNode.appendChild(tableRowNode);
		});

		this.node.appendChild(tableHeadNode);
		this.node.appendChild(tableBodyNode);
	}
}

document.querySelectorAll("[data-component='SimpleTable']").forEach(node => new SimpleTable(node));
