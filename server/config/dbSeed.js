'use strict';

module.exports.insertModels = function (User) {	
	var addUsers = function () {
		var gates = new User({
			email: 'gates@email.com',
			country: 'USA',
			occupation: 'Technology Advisor',
			company: 'Microsoft',
			avatar: '/img/bill-gates.png'
		});

		gates.fullName = 'Bill Gates';
		gates.password = 'billgates';

		var jobs = new User({
			email: 'jobs@email.com',
			country: 'USA',
			occupation: 'Ex-CEO',
			company: 'Apple Inc.',
			avatar: '/img/steve-jobs.png'
		});

		jobs.fullName = 'Steve Jobs';
		jobs.password = 'stevejobs';

		var wayne = new User({
			email: 'wayne@email.com',
			country: 'USA',
			occupation: 'CEO',
			company: 'Wayne Enterprises',
			avatar: '/img/bruce-wayne.png'
		});

		wayne.fullName = 'Bruce Wayne';
		wayne.password = 'brucewayne';

		var users = [gates, jobs, wayne];

		User.find({}).remove(function () {
			User.create(users, function (error) {
				console.log('# Users created');
			})
		});
	};

	var initSeed = function () {
		addUsers();
	}();
};
