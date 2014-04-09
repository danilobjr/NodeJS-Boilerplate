'use strict';

var passport = require('passport');

module.exports.loginPage = function (req, res) {
	res.render('account/login', { message: req.flash('login') });
};

module.exports.login = passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});

module.exports.logout = function (req, res) {
	req.logout();
	res.redirect('/login');
};