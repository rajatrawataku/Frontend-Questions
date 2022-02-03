/**
 * class based prototype pattern
 */

class Dog {
	connstructor(name) {
		this.name = name;
	}

	bark() {
		console.log('bark');
	}
}

const instance1 = new Dog('dacy');
const instance2 = new Dog('laura');

instance1.bark();
instance2.bark();

console.log(instance1.__proto__ === instance2.__proto__);

/**
 * Object based prototype pattern
 */

const dogObject = {
	bark: function () {
		console.log(`${this.name} is barking`);
	},
	fly: function () {
		console.log(`${this.name} is flying`);
	}
};

const laura1 = Object.create(dogObject);
const laura2 = Object.create(dogObject);
console.log(laura1.__proto__ === laura2.__proto__);


/**
 * Main advantage is if some object instances wants to implement common methods. So instead of writing 
 * these methods separately to each object, we use the concept of prototype so that each object can refer the common
 * functionality with the help of prototype. Hence reducing the memory.
 */