// see config.pnotify.js

'use strict';

$(function () {
	$.notification.messageContainer = $('#message');
	
	$.notification.showNotification = function(message, type) {
		new PNotify({
			//title: title,
			text: message,
			type: type,
			addclass: PNotify.customConfig.stack.class,
			stack: PNotify.customConfig.stack.position
		});
	};

	if ($.notification.messageContainer.length) {
		var data = $.notification.messageContainer.data();

		if (data.success !== undefined) {
			data.type = (data.success === true) ? 'success' : 'warning';
		} else {
			data.type = 'info';
		}

		setTimeout(function() {
			$.notification.showNotification(data.description, data.type);
		}, 500);
	}
});