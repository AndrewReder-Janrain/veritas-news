'use strict()';

var config= {
	port: 3000
};

module.exports = function(grunt) {

	// Load grunt tasks automatically
	// require('load-grunt-tasks')(grunt);

	// // Time how long tasks take. Can help when optimizing build times
	// require('time-grunt')(grunt);

	// var options = {
	// 	config: {
	// 		src: './grunt/*.js'
	// 	},
	// 	pkg: grunt.file.readJSON('package.json'),
	// 	nodemon: {
	// 		serve: {
	// 			script: 'keystone.js',
	// 			options: {
	// 				ignore: ['node_modules/**']
	// 			}
	// 		}
	// 	}
	// };

	// var configs = require('load-grunt-configs')(grunt, options);

	// Project configuration.
	grunt.initConfig(
	{
		sshconfig: {
	    'digitalOcean': {
	      host: '162.243.63.59',
	      username: 'root',
	      agent: 'areder',
	      agentForward: true
	    }
	  },
	  sshexec: {
	    deploy: {
	      command: [
	          'cd /root/keystone-se-demo'
	          'git pull origin master'
	          'npm install'
	          'touch test.txt'
	          // 'forever stop keystone.js'
	          // 'forever start server.js'
	          // 'forever list'
	        ].join(' && '),
	        options: {
	          config: 'digitalOcean'
          }
	    }
	  }
	});

	// load jshint
	// grunt.registerTask('lint', [
	// 	'jshint'
	// ]);
	grunt.loadNpmTasks('grunt-ssh');
	grunt.registerTask('deploy', [
		'sshexec:deploy'
	]);

	// grunt.registerTask('dev', [
	// 	'sass',
	// 	'watch'
	// ]);


};
