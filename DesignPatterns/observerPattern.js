class Observable {
	constructor() {
		this.observers = [];
	}

	subscribe = observer => {
		this.observers.push(observer);
	};

	unsusbcribe = observer => {
		this.observers = this.observers.filter(tempObserver => tempObserver !== observer);
	};

	notify = data => {
		this.observers.forEach(observer => observer(data));
	};
}

function logger(data) {
	console.log(`Logged this data ${data}`);
}

function toastifty(data) {
	console.log(`Toastify this data ${data}`);
}

const obsersable = new Observable();
obsersable.subscribe(logger);
obsersable.subscribe(toastifty);

let subject = Object.create(obsersable);

subject.name = 'Rajat Rawat';
subject.notify(subject.name);

/**
 * Pros - separation of concerns is maintained
 * Single Responsibility principle is maintained
 */