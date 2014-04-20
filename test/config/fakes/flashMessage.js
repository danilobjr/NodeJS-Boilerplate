'use strict';

module.exports = function (messages) {
	var clear = function () {
		messages = {};
	};

	return function (name, value) {
		if (!name && !value) {
			return { clear: clear };
		}

		if (!value) {
			var returnedValue = messages[name];
			messages[name] = undefined;
			return returnedValue;
		}

		messages[name] = value;
	}
}({});