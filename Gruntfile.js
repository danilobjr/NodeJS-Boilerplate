'use strict';

module.exports = function (grunt) {
	// define configuration to all tasks
	grunt.initConfig({
		// show errors in js files
		jshint: {
			options: {
				reporter: require('jshint-stylish')
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
			server: {
				options: {
					jshintrc: '.jshintrc',
					ignores: [
						'server/config/email.js'
					]
				},
				src: ['server.js','server/**/*.js']
			}
		},
		// express app
		express: {
			options: {
				port: process.env.PORT || 3000
				// delay: 500
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

		// clean files from folder
		clean: {
			build: ['.tmp', 'build']
		},
		// copy files and folders to 'build' directory
		copy: {
			build: {
				files: [{
					src: ['server.js', 'package.json', 'server/**'],
					dest: 'build/'
				},
				{
					src: ['public/fonts/**'],
					dest: 'build/'
				},
				// {
				// 	src: ['public/img/**'],
				// 	dest: 'build/'
				// },
				{
					src: ['public/js/data/countries.json'],
					dest: 'build/'
				}]
			}
			// server: {
			// 	src: ['server.js', 'package.json', 'server/**'],
			// 	dest: 'build/'
			// },
			// client: {
			// 	src: ['public/img/**'],
			// 	dest: 'build/'
			// }
		},
		// Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
		useminPrepare: {
			options: {
				root: 'public',
				dest: 'build/public'
			},
			html: [
				'server/web/views/layout.{ejs,jade}',
				'server/web/views/account/layout.{ejs,jade}'
			]
		},
		usemin: {
			options: {
				assetsDest: ['build/public']
			},
			html: [
				'build/server/web/views/{layout,error}.{ejs,jade}',
				'build/server/web/views/account/layout.{ejs,jade}'
			]
		},
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: 'public/img',
					src: ['**/*.{png,jpeg,jpg,gif}'],
					dest: 'build/public/img/'
				}]
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-mocha-test');

	// run 'grunt serve' on console to open app in browser
	grunt.registerTask('server', [
		'jshint',
		'express:dev',
		'open:dev',
		'watch'
	]);

	// run 'grunt test' on console to run the unit tests
	grunt.registerTask('test', [
		'jshint',
		'mochaTest'
	]);

	// run 'grunt build' on console to generate your build in '/build' directory
	grunt.registerTask('build', [
		'jshint',
		'mochaTest',
		'clean:build',
		'useminPrepare',
		'copy:build',
		'concat',
		'cssmin',
		'uglify',
		'imagemin',
		'usemin'
	]);

	// define tasks
	grunt.registerTask('default', ['server']);
};
