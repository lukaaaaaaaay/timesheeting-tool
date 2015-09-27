module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            files: [{
                expand: true,
                cwd: 'app/assets/styles/',
                src: ['importer.scss'],
                dest: '.tmp/public/assets/styles/',
                ext: '.css'
            }]
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-sass');
};