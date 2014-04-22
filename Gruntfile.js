'use strict';

module.exports = function (grunt) {
	// define configuration to all tasks
	grunt.initConfig({
		// show errors in js files
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				force: true
			},
			client: {
				options: {
					jshintrc: 'public/js/.jshintrc',
					ignores: [
						'public/js/AdminLTE.js', 
						'public/js/plugins/pnotify/confirm.js'
					]
				},
				src: ['public/js/**/*.js']
			},
			server: ['server.js','server/**/*.js']
		},
		// express app
		express: {
			options: {
				port: process.env.PORT || 3000,
				delay: 500
			},
			dev: {
				options: {
					script: 'server.js'
				}
			}
		},
		// open express app on browser
		open: {
			dev: {
				path: 'http://localhost:<%= express.options.port %>'
			}
		},
		// watch for change files and run specific tasks when specific files are added, changed or deleted.
		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			clientJs: {
				options: {
					livereload: true
				},
				files: ['public/**/*.js', 'public/js/.jshintrc'],
				tasks: ['jshint:client']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'server/web/views/**/*.{ejs,jade}',
					'public/js/**/*.js',
					'public/css/**/*.css',
					'public/img/**/*.{png,jpeg,jpg,webp}'
				]
			},
			express: {
				options: {
					livereload: true,
					nospawn: true
				},
				files: [
					'server.js',
					'server/**/*.{js,json}'
				],
				tasks: ['jshint:server', 'express:dev']//, 'wait']
			}
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
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	// run 'grunt serve' on console to open app in browser
	grunt.registerTask('server', function () {
		grunt.task.run([
			'jshint',
			'express:dev',
			'open:dev',
			'watch'
		]);
	});

	// run 'grunt test' on console to run the unit tests
	grunt.registerTask('test', function () {
		grunt.task.run([
			'jshint:server',
			'mochaTest'
		]);
	});

	// define tasks
	grunt.registerTask('default', ['server']);
};