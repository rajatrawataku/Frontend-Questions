/**
 * This is a class based singleton example
 */
let instance = null;
let counter = 0;

class Counter {
	constructor() {
		if (instance) {
			throw new Error('cannot create a single instance');
		}
		instance = this;
	}

	getInstance() {
		return this;
	}

	increment() {
		return ++counter;
	}

	decrement() {
		return --counter;
	}

	getCount() {
		return counter;
	}
}

const SingletonCounter = Object.freeze(new Counter());
// Why is this required ? This will make sure that there are no changes made on the returning object or the singelation that is exported

export default SingletonCounter;

/**
 * A basic object which can also act as a singletion
 */

let objectBasedSingletonCounter = {
	getCounter: () => {
		return counter;
	},
	incrementCounter: () => {
		return ++counter;
	},
	decrementCounter: () => {
		return --counter;
	}
};

Object.freeze(objectBasedSingletonCounter);
export { objectBasedSingletonCounter };


/**
 * Advantages - One single source of truth for entire application.
 * Reduce memory usage by the app
 */

/**
 * Disadvantages - Overkill solution, direct mutation on the object can happen which can lead to 
 * unexpected behaviour.
 * Order of execution of statements matter i.e consuming before exceuting or vice-versa can lead to differnt behaviour.
 */