// This is async iterator but there is an easy to way to implement using generator
const range = {
	from: 1,
	to: 5,
	[Symbol.asyncIterator]() {
		return {
			current: this.from,
			end: this.to,
			async next() {
				await new Promise(resolve => {
					setTimeout(() => {
						resolve('random');
					}, 100);
				});

				if (this.current <= this.to) {
					return { value: this.current++, done: false };
				} else {
					return { done: true };
				}
			}
		};
	}
};

async () => {
	for await (let val of range) {
		alert(val);
	}
};
