'use strict';

// setup fake config
var testConfig = require('./../../../config/testConfig');

// database setup
require(testConfig.rootPath + '/server/config/mongoose').setup(testConfig);

var should = require('should'),
	gravatar = require('gravatar'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	userManager = require('./../../../../server/domain/managers/userManager')(User, gravatar);

describe('userManager', function () {
	var users = require('./../../../config/modelsFactory').createUsers(User, gravatar);

	beforeEach(function (done) {
		User.find({}).remove(function () {
			User.create(users, function (error) {				
				done();
			});
		});
	});

	describe('#createUser', function () {
		it('new user should be a instanceof User', function () {
			var userData = {
				fullName: 'Full Name Jr.',
				email: 'name@email.com',
				password: '123456'
			};

			userManager.createUser(userData, function (newUser) {
				newUser.should.be.an.instanceof(User);
			});
		});

		it('new user should have at least "firstName", "email", "password" and "avatar" properties', function () {
			var userData = {
				fullName: 'Name',
				email: 'name@email.com',
				password: '123456'
			};

			userManager.createUser(userData, function (newUser) {
				newUser.should.have.properties({
					firstName: 'Name',
					email: 'name@email.com',
					password: '123456',
				});

				newUser.should.have.property('avatar');
				newUser.avatar.should.startWith('http://www.gravatar.com/avatar/');
			});
		});
	});

	describe('#saveUser', function () {
		it('should save user without errors', function (done) {
			var newUser = new User({
				fullName: 'Full Name',
				email: 'name@email.com',
				password: '123456',
				avatar: gravatar.url('name@email.com')
			});

			userManager.saveUser(newUser, function methodName(error, userSaved, message, saveOperationDone) {
				if (error) { return done(error); }

				userSaved.should.be.ok;
				message.should.be.exactly('User saved');
				saveOperationDone.should.be.ok;
				done();
			});
		});

		it('should throw an error to try to save a user with a email already in use', function (done) {
			var anotherWayne = new User({
				fullName: 'Another Bruce Wayne',
				email: 'wayne@email.com',
				password: '123456',
				avatar: gravatar.url('wayne@email.com')
			});

			userManager.saveUser(anotherWayne, function (error, userSaved, message, saveOperationDone) {
				error.name.should.be.exactly('ValidationError');
				error.errors.email.message.should.be.exactly('Email is already in use');
				done();
			});
		});

		it('should send a "User not saved" message if none document was affected', function (done) {
			var newUser = new User({
				fullName: 'Full Name',
				email: 'name@email.com',
				password: '123456',
				avatar: gravatar.url('name@email.com')
			});

			newUser.save = function (callback) {
				var error = null,
					user = null,
					numberAffected = 0;

				setTimeout(function () { callback(error, user, numberAffected); }, 0);
			};

			userManager.saveUser(newUser, function (error, userSaved, message, saveOperationDone) {
				if (error) { return done(error); }

				message.should.be.exactly('User not saved');
				saveOperationDone.should.not.be.ok;
				done();
			});
		});
	});

	describe('#changePassword', function () {
		it('should change password without errors', function (done) {
			var user = users[0];

			var data = {
				_id: user._id,
				oldPassword: user.password,
				newPassword: 'aNewPassword123456'
			};

			userManager.changePassword(data, function (error, user, message, changeOperationDone) {
				if (error) { return done(error); }

				user.password.should.be.exactly(data.newPassword);
				message.should.be.exactly('Password changed');
				changeOperationDone.should.be.true;
				done();
			});
		});

		it('should not change if old password not match', function (done) {
			var user = users[0];

			var data = {
				_id: user._id,
				oldPassword: 'wrongOldPassword',
				newPassword: 'aNewPassword123456'
			};

			userManager.changePassword(data, function (error, user, message, changeOperationDone) {
				if (error) { return done(error); }

				message.should.be.exactly('This is not your current password');
				changeOperationDone.should.be.false;
				done();
			});
		});

		it('should send a "User not found" message if the id not exist', function (done) {
			var idString = users[0]._id.toString();
			var nonExistingId = 9 + idString.substring(1);

			var data = {
				_id: nonExistingId
			};

			userManager.changePassword(data, function (error, user, message, changeOperationDone) {
				if (error) { return done(error); }

				message.should.be.exactly('User not found');
				changeOperationDone.should.be.false;
				done();
			});
		});
	});

	describe('#deleteUser', function () {
		it('should delete user without errors', function (done) {
			var userId = users[0]._id;

			userManager.deleteUser(userId, function (error, user, message, deleteOperationDone) {
				if (error) { return done(error); }

				message.should.be.exactly('User removed');
				deleteOperationDone.should.be.true;
				done();
			});
		});

		it('sould not delete a user with a non-exist id', function (done) {
			var idString = users[0]._id.toString();
			var nonExistingId = 9 + idString.substring(1);

			userManager.deleteUser(nonExistingId, function (error, user, message, deleteOperationDone) {
				message.should.be.exactly('User not found');
				deleteOperationDone.should.be.false;
				done();
			});
		});
	});
});