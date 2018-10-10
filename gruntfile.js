module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.initConfig({
        uglify: {
          my_target: {
            files: {
                'bin/js/wes.graphs.js':['bin/working/js/*.js'] 
            }
          }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        watch: {
            options: { livereload: true },
            scripts: {
                files: ['bin/working/js/*.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['bin/working/sass/*.scss'],
                tasks: ['compass:dev']
            },
            html: {
                files: ['bin/working/html/*.php'],
                tasks: ['htmlmin']
            }
        }
    }) //initconfig
    grunt.registerTask('default', 'watch');
} // exports