'use strict';

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports.setup = function (User) {
	// visit 'Sessions' section in http://passportjs.org/guide/configure/

	passport.serializeUser(function(user, done) {
	  	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	  	User.findById(id, '-salt -hashPassword', function(err, user) {
		    done(err, user);
	  	});
	});

	// to configure strategies, visit 'Strategies' section in http://passportjs.org/guide/configure/
	// to know about parameters, visit 'Parameters' section in http://passportjs.org/guide/username-password/
	// and 'Association in Verify Callback' section in http://passportjs.org/guide/authorize/

	passport.use(new LocalStrategy({
	    	usernameField: 'email',
	    	passwordField: 'password',
	    	passReqToCallback: true
	  	},
	  	function(req, email, password, done) {
		    User.findOne({ email: email }, function (err, user) {
		      	if (err) { return done(err); }

		      	if (!user) {
		        	return done(null, false, req.flash('login-message', 'Email and/or password incorrect.'));
		      	}

		      	if (!user.authenticate(password)) {
			        return done(null, false, req.flash('login-message', 'Email and/or password incorrect.'));
		      	}

			    return done(null, user);
		    });
	  	}
	));
};
