'use strict';

module.exports.insertModels = function (User) {	
	var addUsers = function () {
		var gates = new User({
			email: 'gates@email.com',
			avatar: '/img/bill-gates.png'
		});

		gates.fullName = 'Bill Gates';
		gates.password = 'billgates';

		var jobs = new User({
			email: 'jobs@email.com',
			avatar: '/img/steve-jobs.png'
		});

		jobs.fullName = 'Steve Jobs';
		jobs.password = 'stevejobs';

		var musk = new User({
			email: 'wayne@email.com',
			avatar: '/img/bruce-wayne.png'
		});

		musk.fullName = 'Bruce Wayne';
		musk.password = 'brucewayne';

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
};
