const PLAYER_TYPE = {
	FIRST: 'X',
	SECOND: 'O'
};

const GAME_STATUS = {
	X: 'X won',
	Y: 'Y won',
	PENDING: 'Game is still no'
};

class TicTacToe {
	node = null;
	templates = {};
	board = [];
	currentPlayer = null;
	size = null;
	gameStatus = null;

	constructor(node) {
		this.node = node;
		const size = node.dataset.size;
		this.size = size;
		document.querySelectorAll("[data-template-for='tic-tac-toe']").forEach(template => {
			this.templates[template.dataset.idValue] = template;
		});

		this.intiliaseGame();
		this.render();
	}

	intiliaseGame = () => {
		this.addClickListener();

		const { size } = this;
		for (let i = 0; i < size; i++) {
			this.board[i] = [];
			for (let j = 0; j < size; j++) {
				this.board[i][j] = '-';
			}
		}

		this.currentPlayer = this.node.dataset.player;
		this.gameStatus = null;
	};

	retry = () => {
		this.intiliaseGame();
	};

	changePlayer = () => {
		const currentPlayer = this.currentPlayer;

		if (currentPlayer === PLAYER_TYPE.FIRST) {
			this.currentPlayer = PLAYER_TYPE.SECOND;
		} else {
			this.currentPlayer = PLAYER_TYPE.FIRST;
		}
	};

	play = (xcord, ycord) => {
		this.board[xcord][ycord] = this.currentPlayer;
		this.render();
		const winner = this.analyze();
		if (winner) {
			this.gameStatus = winner;
			this.removeClickListener();
		} else {
			this.changePlayer();
		}
	};

	analyze = () => {
		const { size, board } = this;

		for (let i = 0; i < size; i++) {
			let didSomeOneWon = true;
			for (let j = 0; j < size - 1; j++) {
				if (board[i][j] !== board[i][j + 1] && board[i][j] !== '-') {
					didSomeOneWon = false;
					break;
				}
			}
			if (didSomeOneWon) {
				return board[i][0];
			}
		}

		for (let j = 0; j < size; j++) {
			let didSomeOneWon = true;
			for (let i = 0; i < size - 1; i++) {
				if (board[i][j] !== board[i + 1][j] && board[i][j] !== '-') {
					didSomeOneWon = false;
					break;
				}
			}
			if (didSomeOneWon) {
				return board[0][j];
			}
		}

		let didSomeOneWon = true;
		for (let i = 0; i < size - 1; i++) {
			if (board[i][i] !== board[i + 1][i + 1] && board[i][i] !== '-') {
				didSomeOneWon = false;
				break;
			}
		}

		if (didSomeOneWon) {
			return board[0][0];
		}

		didSomeOneWon = true;
		for (let i = size - 1, j = 0; i > 0, j < size; i--, j++) {
			if (board[i][j] !== board[i - 1][j + 1] && board[i][j]) {
				didSomeOneWon = false;
				break;
			}
		}

		if (didSomeOneWon) {
			return board[size - 1][0];
		}

		return null;
	};

	getTemplateNode = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	handleCellClick = event => {
		const { xcord, ycord } = event.target.dataset;
		this.play(xcord, ycord);
	};

	addClickListener = () => {
		this.node.addEventListener('click', this.handleCellClick);
		document.querySelectorAll("[data-btn-for='tic-tac-toe'][data-action='retry']").forEach(node => {
			node.addEventListener('click', this.retry);
		});
	};

	removeClickListener = () => {
		this.node.removeEventListener('click', this.handleCellClick);
	};

	render = () => {
		this.node.innerHTML = '';

		const { size } = this;
		for (let i = 0; i < size; i++) {
			let rowNode = this.getTemplateNode('tableRow');
			for (let j = 0; j < size; j++) {
				const cell = this.getTemplateNode('tableCell');
				const cellData = this.board[i][j];
				cell.appendChild(document.createTextNode(cellData));
				cell.dataset.xcord = i;
				cell.dataset.ycord = j;
				rowNode.appendChild(cell);
			}
			this.node.appendChild(rowNode);
		}
	};
}

document.querySelectorAll("[data-component='tic-tac-toe']").forEach(node => new TicTacToe(node));
