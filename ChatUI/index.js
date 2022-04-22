const chat_URL = 'https://my-json-server.typicode.com/codebuds-fk/chat/chats';

async function ApiCaller(url) {
	const response = await fetch(url);
	const responseData = await response.json();
	return responseData;
}

class ChatUI {
	data_store = {};
	templates = {};
	nodes = {};
	pages = {
		chat_list: true,
		single_chat: false
	};
	filtered_chat = null;
	searchInputChangeHandler = null;
	selectedChatData = null;

	constructor() {
		document.querySelectorAll("[data-component-for='chat-list']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.nodes['chat-list-page'] = document.querySelector("[data-component='chat-list-content']");
		this.getChatData().then(() => {
			this.render();
		});
		this.searchInputChangeHandler = this.debouncedHandler(this.filterList, 500);
		document.getElementById('search-filter').addEventListener('keyup', this.searchInputChangeHandler);
	}

	filterList = event => {
		const inputText = event.target.value;
		if (inputText.trim().length === 0) {
			this.filtered_chat = this.data_store.chat_list;
		} else {
			this.filtered_chat = this.data_store['chat_list'].filter(chatData => {
				const { orderId, title } = chatData;
				if (orderId.search(inputText) !== -1 || title.search(inputText) !== -1) {
					return true;
				}
				return false;
			});
		}

		this.render();
	};

	debouncedHandler = (func, delay) => {
		let timeOutId = null;

		return function (event) {
			if (timeOutId) {
				clearTimeout(timeOutId);
			}
			timeOutId = setTimeout(() => {
				func(event);
			}, delay);
		};
	};

	getChatData = async () => {
		const response = await ApiCaller(chat_URL);
		this.data_store['chat_list'] = response;
	};

	getTemplateNode = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	setTextData = (text, node) => {
		node.appendChild(document.createTextNode(text));
	};

	nodeSetStyleAttr = (node, styleObj) => {
		Object.keys(styleObj).forEach(key => {
			node.style[key] = styleObj[key];
		});
	};

	getForammatedDate = timeStamp => {
		const date = new Date(timeStamp);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	handleChatSelection = chatId => () => {
		this.pages.single_chat = true;
		this.selectedChatData = this.data_store.chat_list.filter(chatData => chatData.id === chatId)[0];
		if (this.selectedChatData) {
			document.getElementsByClassName('single-chat-list-age')[0].classList.add('visible');
		}
		this.render();
	};

	createChatList = chatList => {
		if (chatList.length === 0) {
			return null;
		}

		const divWrapper = this.templates['div-content'].content.children[0].cloneNode(true);
		chatList.forEach(productData => {
			const { imageURL, latestMessageTimestamp, orderId, title, id } = productData;
			const imageNode = this.getTemplateNode('image-content');
			imageNode.src = imageURL;

			const titleNode = this.getTemplateNode('text-content');
			this.setTextData(title, titleNode);
			const orderIdNode = this.getTemplateNode('text-content');
			this.setTextData(orderId, orderIdNode);

			const dateNode = this.getTemplateNode('text-content');
			dateNode.classList.add('date-content');
			this.setTextData(this.getForammatedDate(latestMessageTimestamp), dateNode);

			const chatWrapper = this.templates['div-content'].content.children[0].cloneNode(true);
			chatWrapper.classList.add('chat-wrapper');
			if (id === (this.selectedChatData && this.selectedChatData.id)) {
				chatWrapper.classList.add('selected');
			} else {
				chatWrapper.classList.remove('selected');
			}

			const dataWrapper = this.templates['div-content'].content.children[0].cloneNode(true);
			dataWrapper.classList.add('data-wrapper');

			dataWrapper.appendChild(titleNode);
			dataWrapper.appendChild(orderIdNode);

			chatWrapper.appendChild(imageNode);
			chatWrapper.appendChild(dataWrapper);
			chatWrapper.appendChild(dateNode);
			chatWrapper.addEventListener('click', this.handleChatSelection(id));

			divWrapper.appendChild(chatWrapper);
		});

		return divWrapper;
	};

	render() {
		const filtered_list = this.filtered_chat || this.data_store.chat_list;
		const chatNodeData = this.createChatList(filtered_list);
		const { chat_list } = this.pages;

		if (chat_list) {
			this.nodes['chat-list-page'].innerHTML = '';
			if (chatNodeData) {
				this.nodes['chat-list-page'].appendChild(chatNodeData);
			}
		}

		if (this.selectedChatData) {
			new SingleChatList(this.selectedChatData);
		}
	}
}

class SingleChatList {
	chatData = null;
	defaultStrings = {
		emptyChat: 'Send a message to start chatting'
	};
	nodes = {};
	templates = {};

	constructor(chatData) {
		this.chatData = chatData;
		document.querySelectorAll("[data-component-for='chat-list']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.nodes['single-chat-list'] = document.getElementsByClassName('single-chat-list-age')[0];
		this.render();
	}

	getTemplateNode = templateId => {
		return this.templates[templateId].content.children[0].cloneNode(true);
	};

	setTextData = (text, node) => {
		node.appendChild(document.createTextNode(text));
	};

	getForammatedDate = timeStamp => {
		const date = new Date(timeStamp);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	getMessageNode = messageData => {
		const { message, sender, timestamp } = messageData;

		const chatNode = this.getTemplateNode('div-content');
		chatNode.classList.add('chat-box');

		if (sender === 'BOT') {
			chatNode.classList.add('bot-chat-box');
		} else {
			chatNode.classList.add('self-chat-box');
		}

		const messageNode = this.getTemplateNode('text-content');
		this.setTextData(message, messageNode);
		messageNode.classList.add('chat-text');

		const timeNode = this.getTemplateNode('text-content');
		this.setTextData(this.getForammatedDate(timestamp), timeNode);
		timeNode.classList.add('chat-time');

		chatNode.appendChild(messageNode);
		chatNode.appendChild(timeNode);

		const ctnNode = this.getTemplateNode('div-content');
		if (sender === 'BOT') {
			ctnNode.classList.add('left');
		} else {
			ctnNode.classList.add('right');
		}

		ctnNode.appendChild(chatNode);
		return ctnNode;
	};

	createMessageList = () => {
		const { title, imageURL, messageList } = this.chatData;
		const mainCtnNode = this.getTemplateNode('div-content');
		mainCtnNode.classList.add('main-ctn');

		const headerTitleNode = this.getTemplateNode('text-content');
		this.setTextData(title, headerTitleNode);
		headerTitleNode.classList.add('header-title');

		const headerImage = this.getTemplateNode('image-content');
		headerImage.src = imageURL;
		headerImage.classList.add('header-image');

		const headerCtnNode = this.getTemplateNode('div-content');
		headerCtnNode.classList.add('header-ctn');

		headerCtnNode.appendChild(headerImage);
		headerCtnNode.appendChild(headerTitleNode);

		const messageCtn = this.getTemplateNode('div-content');
		messageCtn.classList.add('message-ctn');

		if (messageList.length > 0) {
			messageList.forEach(message => {
				messageCtn.appendChild(this.getMessageNode(message));
			});
		} else {
			const emptyTextNode = this.getTemplateNode('text-content');
			this.setTextData(this.defaultStrings.emptyChat, emptyTextNode);
			messageCtn.classList.add('center-aligned');
			messageCtn.appendChild(emptyTextNode);
		}

		mainCtnNode.appendChild(headerCtnNode);
		mainCtnNode.appendChild(messageCtn);

		const sendChatCtn = this.getTemplateNode('send-wrapper');
		mainCtnNode.appendChild(sendChatCtn);
		return mainCtnNode;
	};

	render() {
		const getMessageData = this.createMessageList();
		this.nodes['single-chat-list'].innerHTML = '';
		this.nodes['single-chat-list'].appendChild(getMessageData);
	}
}

const chatUiInstance = new ChatUI();
