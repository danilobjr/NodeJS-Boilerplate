'use strict';

var email = require('./../../config/email');

module.exports.index = function (req, res) {
	res.render('contact/index');
};

module.exports.sendMessage = function (req, res) {
	var userLogged = req.user;

	var message = {
		toName: userLogged.fullName,
		toEmail: userLogged.email,
		fromName: req.body.name,
		fromEmail: req.body.email,
		subject: 'Node.js Boilerplate - CONTACT',
		html: req.body.message + '<br><br>' + req.body.name + '<br>' + req.body.email
	};

	email.sendMessage(message, function (err, result) {
		var done = false,
			message = '';

		if (err) {
			message = 'An error occurs on send a message. Please, try later';
		} else {
			done = true;
			message = 'Message sent to ' + result[0].email;
		}

		req.flash('contact-success', done);
		req.flash('contact-message', message);

		res.render('contact/index', {
			message: {
				success: req.flash('contact-success'),
				description: req.flash('contact-message')
			}
		});
	});

};
