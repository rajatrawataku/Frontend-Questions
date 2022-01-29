const itemsData = [
	{
		item_id: 1,
		item_image: './fruitBowl.jpeg',
		item_name: 'Apple',
		item_price: 2.5
	},
	{
		item_id: 2,
		item_image: './fruitBowl.jpeg',
		item_name: 'Orange',
		item_price: 2.5
	},
	{
		item_id: 3,
		item_image: './fruitBowl.jpeg',
		item_name: 'Watermelon',
		item_price: 2.5
	},
	{
		item_id: 4,
		item_image: './fruitBowl.jpeg',
		item_name: 'Mango',
		item_price: 2.5
	},
	{
		item_id: 5,
		item_image: './fruitBowl.jpeg',
		item_name: 'Strawberry',
		item_price: 2.5
	},
	{
		item_id: 6,
		item_image: './fruitBowl.jpeg',
		item_name: 'Grapes',
		item_price: 2.5
	}
];

class BaseClass {
	getNodeFromTemplateId = tempateId => {
		return this.templates[tempateId].content.children[0].cloneNode(true);
	};

	addTextToNode = (node, text) => {
		node.appendChild(document.createTextNode(text));
	};

	addDeleteEventListener = (node, eventType, handler, shouldAdd) => {
		if (shouldAdd) {
			node.addEventListener(eventType, handler);
		} else {
			node.removeEventListener(eventType, handler);
		}
	};

	setAttributes = (node, attrObj) => {
		Object.keys(attrObj).forEach(key => {
			node.setAttribute(key, attrObj[key]);
		});
	};
}

class Cart extends BaseClass {
	node = null;
	templates = {};
	state = {
		items: new Map()
	};

	constructor(node) {
		super();
		this.node = node;
		document.querySelectorAll("[data-component-for='cart']").forEach(template => {
			this.templates[template.dataset.id] = template;
		});
		this.render();
	}

	addItemToCart = item => {
		const itemData = this.state.items.get(item.item_id);
		if (itemData) {
			itemData.quantity++;
		} else {
			this.state.items.set(item.item_id, { ...item, quantity: 1 });
		}
		this.render();
	};

	removeItemFromCart = event => {
		this.state.items.delete(Number(event.target.dataset.itemId));
		this.render();
	};

	handleCheckout = () => {};

	render() {
		const { items } = this.state;
		this.node.innerHTML = '';
		let totalCost = 0;

		for (const [_key, item] of items) {
			totalCost += item.quantity * item.item_price;
		}

		const tableBodyNode = this.getNodeFromTemplateId('tableBody');

		for (const [_key, item] of items) {
			const tableRowNode = this.getNodeFromTemplateId('tableRow');

			['item_id', 'item_name', 'quantity', 'item_price', 'crossBtn'].forEach(key => {
				const value = item[key];
				const tableDataNode = this.getNodeFromTemplateId('tableData');
				if (key === 'crossBtn') {
					const crossBtnNode = this.getNodeFromTemplateId(key);
					crossBtnNode.dataset.itemId = item.item_id;
					this.addDeleteEventListener(crossBtnNode, 'click', this.removeItemFromCart, true);
					tableDataNode.appendChild(crossBtnNode);
				} else if (key === 'quantity') {
					const quantityNode = this.getNodeFromTemplateId(key);
					this.addTextToNode(quantityNode, value);
					tableDataNode.appendChild(quantityNode);
				} else {
					this.addTextToNode(tableDataNode, value);
				}
				tableRowNode.appendChild(tableDataNode);
			});

			tableBodyNode.appendChild(tableRowNode);
		}

		this.node.appendChild(tableBodyNode);

		const cartSummaryCtnElement = document.getElementsByClassName('cart-summary')[0];
		cartSummaryCtnElement.innerHTML = '';

		const totalPriceNode = this.getNodeFromTemplateId('total-items');
		this.addTextToNode(totalPriceNode, `Total Price ${totalCost} $`);
		cartSummaryCtnElement.appendChild(totalPriceNode);

		const checkoutBtnNode = this.getNodeFromTemplateId('checkout-btn');
		cartSummaryCtnElement.appendChild(checkoutBtnNode);

		this.addDeleteEventListener(checkoutBtnNode, 'click', this.handleCheckout, true);
	}
}

const cartInstance = new Cart(document.querySelector('[data-component="cart"]'));

class ProductCard extends BaseClass {
	templates = {};

	constructor(item, index) {
		super();
		document.querySelectorAll('[data-component-for="product-card"]').forEach(template => {
			this.templates[template.dataset.id] = template;
		});

		return this.getProductCard(item, index);
	}

	getProductCard = (item, index) => {
		const { item_image, item_name, item_price } = item;

		const listItemNode = this.getNodeFromTemplateId('list-item');
		const imageNode = this.getNodeFromTemplateId('image');
		this.setAttributes(imageNode, {
			src: item_image,
			alt: item_name
		});

		listItemNode.appendChild(imageNode);

		const productContentNode = this.getNodeFromTemplateId('product-content-ctn');

		const productNameNode = this.getNodeFromTemplateId('product-name');
		this.addTextToNode(productNameNode, item_name);
		productContentNode.appendChild(productNameNode);

		const productPriceNode = this.getNodeFromTemplateId('product-price');
		this.addTextToNode(productPriceNode, `Price: $${item_price}`);
		productContentNode.appendChild(productPriceNode);

		const addToCarbtn = this.getNodeFromTemplateId('add-to-cart-btn');
		addToCarbtn.dataset.itemIndex = index;
		productContentNode.appendChild(addToCarbtn);

		listItemNode.appendChild(productContentNode);

		return listItemNode;
	};
}

class ShoppingMall extends BaseClass {
	node = null;
	state = {};

	constructor(node) {
		super();
		this.node = node;
		this.state.items = itemsData;
		this.render();
	}

	addItemToCart = event => {
		const itemIndex = event.target.dataset.itemIndex;
		const item = this.state.items[itemIndex];

		cartInstance.addItemToCart(item);
	};

	render() {
		this.node.innerHTML = '';

		this.addDeleteEventListener(
			document.querySelector('[data-component="shopping-mall"]'),
			'click',
			this.addItemToCart,
			true
		);

		const { items } = this.state;

		items.forEach((item, index) => {
			this.node.appendChild(new ProductCard(item, index));
		});
	}
}

document.querySelectorAll('[data-component="shopping-mall"]').forEach(node => {
	new ShoppingMall(node);
});
