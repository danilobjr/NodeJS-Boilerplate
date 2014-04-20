'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	moment = require('moment');

var oAuthTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * Schema
*/

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	country: String,
	occupation: String,
	company: String,
	hashPassword: String,
	salt: String,
	signinDate: {
		type: Date,
		default: Date.now
	},
	avatar: String,
	oAuth: String,
	github: {},
	twitter: {},
	facebook: {},
	google: {}
});


/**
 * Local Helper Methods
 */

var valueExist = function(value) {
  return value && value.length;
};

/**
 * Virtuals
*/

UserSchema
	.virtual('fullName')
	.set(function (fullName) {
		if (valueExist(fullName)) {
			var nameArray = fullName.split(' ');			
			this.firstName = nameArray.splice(0, 1).toString();
			if (nameArray.length) {
				this.lastName = nameArray.join(' ');
			}
		}
	})
	.get(function () {
		return this.firstName + ((this.lastName) ? ' ' + this.lastName : '');
	});

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
	.virtual('info')
	.get(function () {
		var info = {
			_id: this._id,
			firstName: this.firstName,
			fullName: this.firstName + ((this.lastName != undefined) ? ' ' + this.lastName : ''),
			email: this.email,
			signinDate: {
				day: moment(this.signinDate).format('DD'),
				monthNumber: moment(this.signinDate).format('MM'),
				monthName: moment(this.signinDate).format('MMM'),
				year: moment(this.signinDate).format('YYYY')
			},
			avatar: this.avatar,
		};

		if (this.lastName) {
			info.lastName = this.lastName;
		}

		if (this.country) {
			info.country = this.country;
		}

		if (this.occupation) {
			info.occupation = this.occupation;
		}

		if (this.company) {
			info.company = this.company;
		}

		if (this.oAuth) {
			info.oAuth = this.oAuth;
		}

		return info;
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

// validate required password
UserSchema
	.path('hashPassword')
	.validate(function (hashPassword) {
		// do not validate, if authentication is done by oauth strategies
		if(oAuthTypes.indexOf(this.oAuth) !== -1) return true;
		return hashPassword.length;
	}, 'Password cannot be empty');


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