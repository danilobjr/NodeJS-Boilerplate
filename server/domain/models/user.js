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
	name: {
		first: String,
		last: String
	},
	email: String,
	// grupo: {
	// 	type: String,
	// 	default: 'Usuário'
	// },
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
 * Virtuals
*/

UserSchema
	.virtual('fullName')
	.set(function (fullName) {
		var array = fullName.split(' ');
		this.name.first = array.splice(0, 1).toString();
		this.name.last = array.join(' ');
		this._fullName = this.name.first + ' ' + this.name.last;
	})
	.get(function () {
		return this.name.first + ' ' + this.name.last;
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
		return {
			_id: this._id,
			name: this.name,
			fullName: this.name.first + ' ' + this.name.last,
			email: this.email,
			//grupo: this.grupo,
			country: this.country,
			occupation: this.occupation,
			company: this.company,
			signinDate: {
				day: moment(this.signinDate).format('DD'),
				monthNumber: moment(this.signinDate).format('MM'),
				monthName: moment(this.signinDate).format('MMM'),
				year: moment(this.signinDate).format('YYYY')
			},
			avatar: this.avatar,
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

mongoose.model('User', UserSchema);