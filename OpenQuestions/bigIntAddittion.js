function bigIntAddittion(num1, num2) {
	let record = [];
	let i = num1.length - 1;
	let j = num2.length - 1;
	let carrry = 0;

	while ((i = 0 || j >= 0 || carrry)) {
		let value1 = i >= 0 ? Number(num1[i]) : 0;
		let value2 = j >= 0 ? Number(num2[j]) : 0;
		let sum = value1 + value2 + carrry;

		record.push(sum % 10);
		carrry = Math.floor(sum / 10);
	}

	return record.reverse().join('');
}

console.log("12","12");
