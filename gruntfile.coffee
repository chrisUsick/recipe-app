module.exports = (grunt) ->
	grunt.initConfig(
		typescript: 
			base:
				src: ["src/**/*.ts", "typings/**/*.ts"]
				dest: "./build"
				options:
					module: "amd"
					cwd: "./build"
					target: "es5"
					sourceMap: "true"
					# sourceRoot:
					# basePath: "./"
					# watch:true
		jade:
			# html:
			# 	files:
			# 		'build/': ['jade/*.jade']
			# 	options:
			# 		client:false
			# client:
			# 	files: 
			# 		'build'
			options:
				pretty:true
			compile:
				expand:true
				cwd:'jade'
				src:['**/*.jade', '!**/_*.jade']
				dest:'build/'
				ext:'.html'
			template:
        options:
          client: true
          namespace: "jade"
          # amd:true
        expand: true
        cwd: 'jade'
        src: ['_*.jade']
        dest: 'build/'
        ext: '.js'
		watch:
			scripts:
				files: ['./**/*.ts', './**/*.jade']
				tasks: ['typescript', 'jade']
			options:
				spawn:false

	)

	grunt.loadNpmTasks 'grunt-typescript'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.registerTask 'default', ['jade', 'typescript', 'watch']
	grunt.registerTask 'build', ['jade', 'typescript']
	# grunt.registerTask 'default', ['typescript:server', 'typescript:client', 'typescript:commonAMD', 'typescript:common','watch']