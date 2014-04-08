'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

var addUsers = function () {
	var gates = new User({
		name: 'Bill Gates',
		email: 'gates@email.com'
	});

	gates.password = 'billgates';

	var jobs = new User({
		name: 'Steve Jobs',
		email: 'jobs@email.com'
	});

	jobs.password = 'stevejobs';

	var musk = new User({
		name: 'Elon Musk',
		email: 'musk@email.com'
	});

	musk.password = 'elonmusk';

	var users = [gates, jobs, musk];

	User.find({}).remove(function () {
		User.create(users, function (error) {
			console.log('# Users created');
		})
	});
};

var initSeed = function () {
	addUsers();
}();