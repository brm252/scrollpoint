
module.exports = function (grunt) {
	
	// do 'grunt build' to package source files into a zip and add the artifact to Nexus
	grunt.registerTask("build", ["cssmin", "uglify"]);

	// retrieve package information, version #'s, deploy locations, etc.
	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					// if you want to concat mutliple scripts, do that here.
					"scrollpoint.jquery.min.css": [
						"scrollpoint.jquery.css"
					]
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					// if you want to concat mutliple scripts, do that here.
					"scrollpoint.jquery.min.js": [
						"scrollpoint.jquery.js"
					]
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');;

};
