const personObject = {
	name: 'Rajat Rawat',
	age: 25
};

const proxyPersonObject = new Proxy(personObject, {
	get: (obj, prop) => {
		console.log(`${prop} propery is getting accessed`);
		if (!obj[prop]) {
			console.log(`${prop} propery does not exist on ${obj}`);
		} else {
			return Reflect.get(obj, prop);
		}
	},
	set: (obj, prop, value) => {
		switch (prop) {
			case 'name': {
				if (typeof value === 'string' && value.length > 0) {
					Reflect.set(obj, prop, value);
				} else {
					console.log(`${prop} should take a string value with length > 0`);
				}
				break;
			}
			case 'age': {
				if (typeof value === 'number' && value > 0) {
					Reflect.set(obj, prop, value);
				} else {
					console.log(`${prop} should take a number value with value > 0`);
				}
				break;
			}
		}
	}
});

proxyPersonObject.age = 12;
console.log(proxyPersonObject.age);

/**
 * If you want to optimize on performance then don't overuse proxy pattern. It will hamper perf. of your application. 
 */