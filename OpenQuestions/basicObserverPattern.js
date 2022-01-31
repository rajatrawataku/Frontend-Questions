class Subscribers {
	subscribers = [];
	count = 0;
	constructor() {
		this.subscribers = [];
		this.count = 0;
	}

	getCount = () => {
		return this.count;
	};

	addSubscriber = subsriber => {
		this.subscribers.push(subsriber);
	};

	removeSubscriber = subsriber => {
		const subsriberIndex = this.subscribers.findIndex(value => value === subsriber);
		if (subsriberIndex !== -1) {
			this.subscribers.splice(subsriberIndex, 1);
		}
	};

	getSubscriber = index => {
		return this.subscribers[index];
	};

	notifySubscribers = data => {
		this.subscribers.forEach(subscriber => {
			subscriber.notify(data);
		});
	};
}

class Publisher {
	subscribers = null;

	constructor() {
		this.subscribers = new Subscribers();
	}

	addSubscriber = subscriber => {
		this.subscribers.addSubscriber(subscriber);
	};

	removeSubscriber = subscriber => {
		this.subscribers.removeSubscriber(subscriber);
	};

	update = data => {
		this.subscribers.notifySubscribers(data);
	};
}

const publisher1 = new Publisher();
