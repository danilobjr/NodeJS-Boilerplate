'use strict';

module.exports.createUsers = function (User, gravatar) {
	var gates = new User({
		fullName: 'Bill Gates',
		email: 'gates@email.com',
		password: 'billgates',
		country: 'USA',
		occupation: 'Technology Advisor',
		company: 'Microsoft',
		avatar: gravatar.url('gates@email.com', { d: 'mm' })
	});

	var jobs = new User({
		fullName: 'Steve Jobs',
		email: 'jobs@email.com',
		password: 'stevejobs',
		country: 'USA',
		occupation: 'Ex-CEO',
		company: 'Apple Inc.',
		avatar: gravatar.url('jobs@email.com', { d: 'mm' })
	});

	var wayne = new User({
		fullName: 'Bruce Wayne',
		email: 'wayne@email.com',
		password: 'brucewayne',
		country: 'USA',
		occupation: 'CEO',
		company: 'Wayne Enterprises',
		avatar: gravatar.url('wayne@email.com', { d: 'mm' })
	});

	return [gates, jobs, wayne];
};