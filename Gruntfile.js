'use strict';

module.exports = function (grunt) {
	// define configuration to all tasks
	grunt.initConfig({

		// show errors in js files
		jshint: {
			options: {
				jshintrc: true,
				reporter: require('jshint-stylish')
			},
			server: ['server/**/*.js']
		},

		// run mocha tests
		mochaTest: {
			options: {
				require: 'should',
				recursive: true,
				//reporter: 'spec',
				bail: true,
			},
			src: ['test/**/*.js']
		}
	});

	// load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	// run 'grunt serve' on console to open app in browser
	grunt.registerTask('serve', function () {
		grunt.task.run([
			'jshint:server',
			'mochaTest'
		]);
	});

	// define tasks
	grunt.registerTask('default', ['serve']);
};