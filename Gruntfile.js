'use strict';

module.exports = function (grunt) {
	// define configuration to all tasks
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: true,
				reporter: require('jshint-stylish')
			},
			server: ['server/**/*.js']
		},
	});

	// load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('serve', function () {
		grunt.task.run(['jshint:server']);
	});

	// define tasks
	grunt.registerTask('default', ['serve']);
};