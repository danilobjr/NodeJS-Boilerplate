'use strict';

module.exports = function (User, email) {
	var sendInstructionsToResetPassword = function (data, callback) {
		User.findOne({ email: data.email }, function (err, user) {
			if (err) {
				return callback(err);
			}

			var done = false,
				message = '';

			if (user) {
				var htmlMessageBody = '<h3>How to Reset Your Password</h3>' +
									'<p>To reset your password, click on the link below and follow the instructions:</p>' +
									'<a href="' + data.urlOrigin + '/reset-password?token=' + user._id + '">Reset my password</a><br><br>' +
									'<p>Node.js Boilerplate Team</p>';

				var emailMessage = {
					toEmail: user.email,
					toName: user.fullName,
					fromName: 'Node.js Boilerplate',
					fromEmail: 'noreply@nodejsboilerplate.com',
					subject: 'Password Reset',
					html: htmlMessageBody
				};

				email.sendMessage(emailMessage, function (err) {
					if (err) { return callback(err); }

					done = true;
					message = 'Password reset instructions sent to ' + user.email + '. If is not there, please wait until 30 minutes';
					callback(null, user, message, done);
				});
			} else {
				message = 'An user with this email address was not found on our records';
				callback(null, null, message, done);
			}
		});
	};

	return {
		sendInstructionsToResetPassword: sendInstructionsToResetPassword
	};
};
