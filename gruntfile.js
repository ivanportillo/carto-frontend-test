module.exports = grunt => {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        browserify: {
            dist: {
                src: ['src/**/*.js'],
                dest: 'public/app.js'
            }
        }
    });
};