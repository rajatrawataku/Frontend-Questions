/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */

class MyLRUStorage {
	capacity = null;
	getTimeStamp = null;
	cacheStoreMap = new Map();
	currentCacheSize = 0;

	constructor(capacity, getTimeStamp) {
		this.capacity = capacity;
		this.getTimeStamp = getTimeStamp;
	}

	internalSetOriginData = (origin, originData) => {
		originData.lastUsed = this.getTimeStamp();
		this.cacheStoreMap.delete(origin);
		this.cacheStoreMap.set(origin, originData);
	};

	performLRUOperation = (newSize, origin, originData) => {
		let tempSize = newSize;
		const expiredOriginStore = [];

		for (const [key, data] of Array.from(this.cacheStoreMap)) {
			if (tempSize <= this.capacity) {
				break;
			}

			if (data.persistent === false) {
				if (key !== origin) {
					tempSize -= data.size;
					expiredOriginStore.push(key);
				}
				continue;
			} else {
				this.internalSetOriginData(key, data);
			}
		}

		if (tempSize <= this.capacity) {
			expiredOriginStore.forEach(origin => {
				this.cacheStoreMap.delete(origin);
			});
			this.internalSetOriginData(origin, originData);
			this.currentCacheSize = tempSize;
			return true;
		} else {
			return false;
		}
	};

	setData = (origin, size) => {
		let newTotalSize = this.currentCacheSize + size;
		let newData = {
			origin,
			size,
			persistent: false
		};

		const cacheStoredata = this.cacheStoreMap.get(origin);
		if (cacheStoredata) {
			newData = { ...cacheStoredata };
			newData.size = size;
			newTotalSize = this.currentCacheSize + size - cacheStoredata.size;
		}

		if (newTotalSize > this.capacity) {
			return this.performLRUOperation(newTotalSize, origin, newData);
		} else {
			this.currentCacheSize = newTotalSize;
			this.internalSetOriginData(origin, newData);
			return true;
		}
	};

	getData = origin => {
		const data = this.cacheStoreMap.get(origin);
		if (data) {
			this.internalSetOriginData(origin, data);
			return data;
		} else {
			return undefined;
		}
	};

	makePersistent = origin => {
		const data = this.cacheStoreMap.get(origin);
		if (data) {
			data.persistent = true;
		}
	};

	clearData = origin => {
		const data = this.cacheStoreMap.get(origin);
		if (data) {
			this.cacheStoreMap.delete(origin);
			this.currentCacheSize -= data.size;
		}
	};
}
