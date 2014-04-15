// see config.pnotify.js

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

		data.type = (data.success == true) ? 'success' : 'warning';

		setTimeout(function() {
			$.notification.showNotification(data.description, data.type);
		}, 500);
	}
});