// complete the implementation
class PriorityQueue {
	priorityStore = [NaN];
	currentLength = 1;

	/**
	 * @param {(a: any, b: any) => -1 | 0 | 1} compare -
	 * compare function, similar to parameter of Array.prototype.sort
	 */
	constructor(compare) {
		this.compare = compare;
	}

	/**
	 * return {number} amount of items
	 */
	size() {
		return this.currentLength - 1;
	}

	/**
	 * returns the head element
	 */
	peek() {
		if (this.currentLength === 1) {
			return undefined;
		} else {
			return this.priorityStore[1];
		}
	}

	/**
	 * @param {any} element - new element to add
	 */
	add(element) {
		this.priorityStore[this.currentLength] = element;
		this.currentLength += 1;
		this.heapifyUp();
	}

	/**
	 * remove the head element
	 * @return {any} the head element
	 */
	poll() {
		if (this.currentLength === 1) {
			return undefined;
		}

		const firstElement = this.peek();
		const lastElement = this.priorityStore[this.currentLength - 1];
		this.priorityStore[1] = lastElement;
		this.currentLength = this.currentLength - 1;

		this.heapifyDown();
		return firstElement;
	}

	getData(idx) {
		return this.priorityStore[idx];
	}

	heapifyUp() {
		let currCounter = this.currentLength - 1;
		let parentCounter = Math.floor(currCounter / 2);

		while (parentCounter > 0 && this.compare(this.getData(parentCounter), this.getData(currCounter)) > 0) {
			this.swap(currCounter, parentCounter);
			currCounter = parentCounter;
			parentCounter = Math.floor(currCounter / 2);
		}
	}

	swap(i, j) {
		[this.priorityStore[j], this.priorityStore[i]] = [this.priorityStore[i], this.priorityStore[j]];
	}

	heapifyDown() {
		let currCounter = 1;

		let leftNode = 2 * currCounter;
		let rightNode = 2 * currCounter + 1;
		let isLeftNodeDefined = leftNode < this.currentLength;
		let isRightNodeDefined = rightNode < this.currentLength;

		while (isLeftNodeDefined || isRightNodeDefined) {
			const leftData = this.getData(leftNode);
			const rightData = this.getData(rightNode);
			const currCounterData = this.getData(currCounter);

			if (isLeftNodeDefined && isRightNodeDefined) {
				if (this.compare(currCounterData, leftData) > 0 && this.compare(currCounterData, rightData) > 0) {
					if (this.compare(leftData, rightData) > 0) {
						this.swap(currCounter, rightNode);
						currCounter = rightNode;
					} else {
						this.swap(currCounter, leftNode);
						currCounter = leftNode;
					}
				} else if (this.compare(currCounterData, leftData) > 0) {
					this.swap(currCounter, leftNode);
					currCounter = leftNode;
				} else if (this.compare(currCounterData, rightData) > 0) {
					this.swap(currCounter, rightNode);
					currCounter = rightNode;
				} else {
					break;
				}
			} else if (isLeftNodeDefined) {
				if (this.compare(currCounterData, leftData) > 0) {
					this.swap(currCounter, leftNode);
					currCounter = leftNode;
				} else {
					break;
				}
			} else {
				if (this.compare(currCounterData, rightData) > 0) {
					this.swap(currCounter, rightNode);
					currCounter = rightNode;
				} else {
					break;
				}
			}

			leftNode = 2 * currCounter;
			rightNode = 2 * currCounter + 1;
			isLeftNodeDefined = leftNode < this.currentLength;
			isRightNodeDefined = rightNode < this.currentLength;
		}
	}
}
