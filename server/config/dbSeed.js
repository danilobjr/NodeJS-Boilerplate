'use strict';

var createUsers = function (User) {
	var gates = new User({
		fullName: 'Bill Gates',
		email: 'gates@email.com',
		password: 'billgates',
		country: 'USA',
		occupation: 'Technology Advisor',
		company: 'Microsoft',
		avatar: '/img/bill-gates.png'
	});

	var jobs = new User({
		fullName: 'Steve Jobs',
		email: 'jobs@email.com',
		password: 'stevejobs',
		country: 'USA',
		occupation: 'Ex-CEO',
		company: 'Apple Inc.',
		avatar: '/img/steve-jobs.png'
	});

	var wayne = new User({
		fullName: 'Bruce Wayne',
		email: 'wayne@email.com',
		password: 'brucewayne',
		country: 'USA',
		occupation: 'CEO',
		company: 'Wayne Enterprises',
		avatar: '/img/bruce-wayne.png'
	});

	return [gates, jobs, wayne];
};

module.exports.insertModels = function (User) {
	var users = createUsers(User);

	User.find({}).remove(function () {
		User.create(users, function (error) {
			if (error) { console.log(error); }
			console.log('# Users created');
		});
	});
};
