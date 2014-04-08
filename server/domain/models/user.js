'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var oAuthTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * Schema
*/

var UserSchema = new Schema({
	name: String,
	email: String,
	// grupo: {
	// 	type: String,
	// 	default: 'Usuário'
	// },
	hashPassword: String,
	oAuth: String,
	salt: String,
	github: {},
	twitter: {},
	facebook: {},
	google: {}
});

/**
 * Virtuals
*/

UserSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

// basic info to identify a authenticated user 
UserSchema
	.virtual('userInfo')
	.get(function () {
		return {
			name: this.name,
			grupo: this.grupo,
			oAuth: this.oAuth
		};
	});

/*
 * Validations
*/

// validate required email
UserSchema
	.path('email')
	.validate(function (email) {
		// do not validate, if authentication is done by oauth strategies
		if(oAuthTypes.indexOf(this.oAuth) !== -1) return true;
		return email.length;
	}, 'Email cannot be empty');

// validate required password
UserSchema
	.path('hashPassword')
	.validate(function (hashPassword) {
		// do not validate, if authentication is done by oauth strategies
		if(oAuthTypes.indexOf(this.oAuth) !== -1) return true;
		return hashPassword.length;
	}, 'Password cannot be empty');

// validate existing email
UserSchema
	.path('email')
	.validate(function (value, respond) {
		var self = this;
		this.constructor.findOne({ email: value }, function (err, user) {
			if (err) { throw err; }

			if (user) {
				if (self.id === user.id) { 
					return respond(true);
				} else {
					return respond(false);
				}
			}

			respond(true);
		});
	}, 'Email is already in use');

var valueExist = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
	.pre('save', function (next) {
		if (!this.isNew) return next();

		if (!valueExist(this.hashPassword) && oAuthTypes.indexOf(this.oAuth) === -1) {
			next(new Error('Invalid password'));
		} else {
			next();
		}
	});

/**
 * Methods
 */
 UserSchema.methods = {
	/**
	 * authenticate - check if encrypted password is same in database record
	 *
	 * @param {String} password
	 * @return {Boolean}
	 * @api public
	 */
  	authenticate: function(password) {
    	return this.encryptPassword(password) === this.hashPassword;
  	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
  	makeSalt: function() {
    	return crypto.randomBytes(16).toString('base64');
  	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
 };

 module.exports = mongoose.model('User', UserSchema);