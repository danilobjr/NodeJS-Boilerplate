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

module.exports.changePassword = function (data, objects, callback) {
	var userData = data,
		User = objects.User;

	User.findById(userData._id, function (errorFind, userFound) {
		if (errorFind) { return callback(errorFind); }

		// if user was not found, redirect to logout, cause session is over
		if (!userFound) {
			var done = false;
			var message = 'User not found';
			return callback(null, userFound, message, done);
		}

		if (userFound.authenticate(userData.oldPassword)) {

			userFound.password = userData.newPassword;

			userFound.save(function (errorSave, userSaved, numberAffected) {
				if (errorSave) { return callback(errorSave); }

				var done = false,
					message = '';

				if (numberAffected) {
					done = true;
					message = 'Password changed';
				} else {
					message = 'Password could not change. Try later';
				}

				callback(null, userSaved, message, done);
			});
		} else {
			var done = false;
			var message = 'This is not your current password';
			callback(null, userFound, message, done);
		}
	});
};

module.exports.deleteUser = function (userId, objects, callback) {
	var User = objects.User;

	User.findById(userId, function (errorFind, user) {
		if (errorFind) { return callback(errorFind); }

		if (!user) { 
			var message = 'User not found';
			var done = false;
			return callback(null, user, message, done); 
		}

		user.remove(function (errorRemove, userRemoved) {
			if (errorRemove) { return callback(errorRemove); }

			var message = 'User removed';
			var done = true;
			callback(null, userRemoved, message, done);
		});
	});
};