'use strict';

module.exports.insertModels = function (User) {	
	var addUsers = function () {
		var gates = new User({
			email: 'gates@email.com',
			occupation: {
				description: 'Technology Advisor',
				company: {
					name: 'Microsoft',
					website: 'http://www.microsoft.com/'
				}
			},
			country: 'USA',
			avatar: '/img/bill-gates.png'
		});

		gates.fullName = 'Bill Gates';
		gates.password = 'billgates';

		var jobs = new User({
			email: 'jobs@email.com',
			occupation: {
				description: 'Ex-CEO',
				company: {
					name: 'Apple Inc.',
					website: 'http://www.apple.com/'
				}
			},
			country: 'USA',
			avatar: '/img/steve-jobs.png'
		});

		jobs.fullName = 'Steve Jobs';
		jobs.password = 'stevejobs';

		var wayne = new User({
			email: 'wayne@email.com',
			occupation: {
				description: 'CEO',
				company: {
					name: 'Wayne Enterprises',
					website: 'http://en.wikipedia.org/wiki/Wayne_Enterprises'
				}
			},
			country: 'USA',
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
