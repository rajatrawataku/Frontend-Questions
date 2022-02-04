function curry(fn) {
	return function curried(...args) {
		const expectedLength = fn.length;

		const complete = args.length >= expectedLength && args.slice(0, expectedLength).indexOf(curry.placeholder) !== -1;
		if (complete) {
			return fn.apply(this, args);
		} else {
			return function (...newArgs) {
				const finalArgs = [];
				let i = 0;
				let j = 0;

				while (i < args.length && j < newArgs.length) {
					if (args[i] === curry.placeholder) {
						i++;
						j++;
						finalArgs.push(newArgs[j]);
					} else {
						finalArgs.push(args[i]);
						i++;
					}
				}

				while (i < args.length) {
					finalArgs.push(args[i]);
					i++;
				}

				while (j < newArgs.length) {
					finalArgs.push(newArgs[j]);
					j++;
				}

                return curried(...finalArgs);
			};
		}
	};
}

curry.placeholder = Symbol();
