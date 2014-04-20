'use strict';

module.exports.index = function (req, res) {
	res.render('home/index', { 
		title: 'Welcome to Node.js Boilerplate!', 
		message: {
			description: 'Welcome, ' + req.user.firstName + '! This is a notification example. ' + 
				'You can change your password at any time. Check your profile details.'
		} 
	});
};