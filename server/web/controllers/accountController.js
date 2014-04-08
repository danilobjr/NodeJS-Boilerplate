'use strict';

var passport = require('passport');

module.exports.login = function (req, res) {
	res.render('account/login');
};

module.exports.signin = passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});

module.exports.logout = function (req, res) {
	req.logout();
	res.redirect('/login');
};