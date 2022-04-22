class TrieNode {
	constructor() {
		this.children = new Array(26);
		this.children.fill(null);
		this.isEndOfWord = false;
	}
}

class TrieCreator {
	constructor() {
		this.root = new TrieNode();
	}

	static insert(root, key) {
		function insertHelper(node, key, index) {
			if (index === key.length) {
				node.isEndOfWord = true;
				return;
			}

			const charCode = key[index].charCodeAt(0) - 97;
			const currTrieNode = node[charCode];
			if (currTrieNode) {
				insertHelper(currTrieNode, key, index + 1);
			} else {
				const newTrieNode = new TrieNode();
				node[charCode] = newTrieNode;
				insertHelper(newTrieNode, key, index + 1);
			}
		}

		insertHelper(root, key, 0);
	}

	static search(root, key) {
		function searchHelper(node, key, index) {
			if (index === key.length) {
				return node.isEndOfWord;
			}

			const charCode = key[index].charCodeAt(0) - 97;
			const currNode = node[charCode];

			if (currNode) {
				return searchHelper(currNode, key, index + 1);
			} else {
				return false;
			}
		}

		searchHelper(root, key, 0);
	}
}

/**
 * Time complexity of search O(M) -> M is the lenght of the string key
 * Where as in BSt this will be -> O(M * logN), M length of the string key and N is the no.of keys in the BST
 */
