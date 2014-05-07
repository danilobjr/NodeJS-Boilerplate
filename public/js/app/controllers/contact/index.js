'use strict';

$(function () {
	$('form[name=contactForm]').validate({
		rules: {
			name: {
		        required: true
		    },
		    email: {
		        required: true,
		        email: true
		    },
		    message: {
		        required: true
		    }
		},
		messages: {
			name: 'Type your name',
			email: {
				required: 'Type your email',
				email: 'Type a valid email'
			},
			message: 'Type your message'
		},
		highlight: function(element) {
		    $(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
		    $(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
		    if(element.parent('.input-group').length) {
		        error.insertAfter(element.parent());
		    } else {
		        error.insertAfter(element);
		    }
		}
	});
});
