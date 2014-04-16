'use strict';

module.exports.createUser = function (data, objects, callback) {
	var User = objects.User,
		gravatar = objects.gravatar;

	var newUser = new User({
		email: data.email
	});

	newUser.avatar = gravatar.url(newUser.email, { d: 'mm' });
	newUser.fullName = data.fullName;
	newUser.password = data.password;

	if (data.country) {
		newUser.country = data.country;
	}

	if (data.occupation) {
		newUser.occupation = data.occupation;
	}

	if (data.company) {
		newUser.company = data.company;
	}

	callback(newUser);
};

module.exports.saveUser = function (user, callback) {
	user.save(function (saveError, userSaved, numberAffected) {
		var message = '',
			done = false;

		if (saveError) { 
			return callback(saveError);
		}

		if (numberAffected) {
			message = 'User saved';
			done = true;
			callback(null, userSaved, message, done);
		} else {
			message = 'User not saved';
			callback(null, null, message, done);
		}
	});	
};