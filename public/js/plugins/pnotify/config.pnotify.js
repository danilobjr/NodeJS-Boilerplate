'use strict';

$(function () {
	PNotify.prototype.options.styling = 'bootstrap3';

	var stackBottomright = { dir1: 'up', dir2: 'left', push: 'top' };

	PNotify.customConfig = { 
		stack: {
			class: 'stack-bottomright',
			position: stackBottomright
		}
	};

	// namespaces

	$.notification = {};
});