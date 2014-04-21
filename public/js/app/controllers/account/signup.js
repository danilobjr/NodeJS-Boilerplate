$(function () {
    // countries

    var start = Date.now();
    var countriesPromise = $.getJSON("/js/data/countries.json");
    countriesPromise.done(function (data) {
        var select = $('[name=country]');
        data.forEach(function (country) {
            var option = $('<option>').appendTo(select);
            option.val(country.name);
            option.text(country.name);
        });
        console.log('Countries loaded and appended in ' + (Date.now() - start) + 'ms');
    });

    // form validate

	$('form').validate({
        rules: {
            fullName: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            retypePassword: {
                required: true,
                equalTo: '[name=password]'
            }
        },
        messages: {
            fullName: 'Type your full name',
            email: {
                required: 'Type your email',
                email: 'Enter a valid email address'
            },
            companyWebsite: 'Enter a valid URL',
            password: {
                required: 'Type your password',
                minlength: 'Too short. At least 6 characters',
                maxlength: 'Too long. Maximum 20 characters'
            },
            retypePassword: {
                required: 'Retype your password',
                equalTo: 'Enter the same password as above'
            }
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