'use strict';

module.exports.insertModels = function (User) {	
	var addUsers = function () {
		var gates = new User({
			email: 'gates@email.com'
		});

		gates.fullName = 'Bill Gates';
		gates.password = 'billgates';

		var jobs = new User({
			email: 'jobs@email.com'
		});

		jobs.fullName = 'Steve Jobs';
		jobs.password = 'stevejobs';

		var musk = new User({
			email: 'musk@email.com'
		});

		musk.fullName = 'Elon Musk';
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
};
