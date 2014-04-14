'use strict';

module.exports.index = function (req, res) {
	res.render('home/index', { title: 'Welcome to Node.js Boilerplate!' });
};