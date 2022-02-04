class Middleware {
	funcStore = [];
	req = null;

	use(func) {
		this.funcStore.push(func);
	}

	start(req) {
		this.req = req;
		this.next();
	}

	next = err => {
		const toExecute = this.funcStore.shift();

		try {
			if (toExecute.length === 2) {
				if (!err) {
					toExecute(this.req, this.next);
				} else {
					this.next(err);
				}s
			} else {
				toExecute(err, this.req, this.next);
			}
		} catch (e) {
			this.next(e);
		}
	};
}
