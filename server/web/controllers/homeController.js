'use strict';

module.exports.index = function (req, res) {
	res.render('home/index', { title: 'Node.js Boilerplate' });
};