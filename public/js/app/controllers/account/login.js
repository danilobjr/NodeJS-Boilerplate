'use strict';

$(function () {
	$('form[name=loginForm]').validate({
		rules: {
		    email: {
		        required: true,
		        email: true
		    },
		    password: {
		        required: true
		    }
		},
		messages: {
			email: {
				required: 'Type your email',
				email: 'Enter a valid email address'
			},
			password: 'Type your password'
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
