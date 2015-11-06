module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            files: [{
                expand: true,
                cwd: 'app/css/',
                src: ['importer.scss'],
                dest: '.tmp/public/css/',
                ext: '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};