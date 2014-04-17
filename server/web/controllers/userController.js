'use strict';

module.exports.profile = function (req, res) {
	res.render('user/profile', {
		message: {
			success: req.flash('profile-success'),
			description: req.flash('profile-description')
		}
	});
};