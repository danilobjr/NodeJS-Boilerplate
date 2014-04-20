'use strict';

module.exports = function (User, gravatar) {
	var createUser = function (data, callback) {
		var newUser = new User({
			fullName: data.fullName,
			email: data.email,
			password: data.password,
			avatar: gravatar.url(data.email, { d: 'mm' })
		});

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

	var saveUser = function (user, callback) {
		user.save(function (saveError, userSaved, numberAffected) {
			if (saveError) { 
				return callback(saveError);
			}

			if (numberAffected) {
				var message = 'User saved';
				var done = true;
				callback(null, userSaved, message, done);
			} else {
				var message = 'User not saved';
				var done = false;
				callback(null, null, message, done);
			}
		});
	};

	var changePassword = function (data, callback) {
		// data

		var userData = data;

		// callbacks

		var findCallback = function (errorFind, userFound) {
			if (errorFind) { return callback(errorFind); }

			// if user was not found, redirect to logout, cause session is over
			if (!userFound) {
				var done = false;
				var message = 'User not found';
				return callback(null, userFound, message, done);
			}

			if (userFound.authenticate(userData.oldPassword)) {
				userFound.password = userData.newPassword;
				userFound.save(saveCallback);
			} else {
				var done = false;
				var message = 'This is not your current password';
				callback(null, userFound, message, done);
			}
		};

		var saveCallback = function (errorSave, userSaved, numberAffected) {
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
		};

		// execution

		User.findById(userData._id, findCallback);
	};

	var deleteUser = function (userId, callback) {
		// callbacks

		var findCallback = function (errorFind, user) {
			if (errorFind) { return callback(errorFind); }

			if (!user) { 
				var message = 'User not found';
				var done = false;
				return callback(null, user, message, done); 
			}

			user.remove(removeCallback);
		};

		var removeCallback = function (errorRemove, userRemoved) {
			if (errorRemove) { return callback(errorRemove); }

			var message = 'User removed';
			var done = true;
			callback(null, userRemoved, message, done);
		};

		// execution

		User.findById(userId, findCallback);
	};

	return {
		createUser: createUser,
		saveUser: saveUser,
		changePassword: changePassword,
		deleteUser: deleteUser
	};
};