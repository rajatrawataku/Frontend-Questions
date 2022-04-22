function Operation(input) {
	return new OperationHandler(input);
}

function OperationHandler(input) {
	this.output = input;
}

OperationHandler.prototype.add = function (value) {
	this.output = this.output + value;
	return this;
};

OperationHandler.prototype.subtract = function (value) {
	this.output = this.output - value;
	return this;
};

OperationHandler.prototype.multiply = function (value) {
	this.output = this.output * value;
	return this;
};

OperationHandler.prototype.divide = function (value) {
	this.output = this.output / value;
	return this;
};

OperationHandler.prototype.toString = function () {
	return this.output;
};

let ops = Operation(1).add(1).multiply(2);

console.log(ops.output);
