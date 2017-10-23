module.exports = grunt => {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015']}]]
                 },
                src: ['src/**/*.js', '!src/resources/*.js'],
                dest: 'public/app.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            combine: {
                files: {
                  'public/styles/main.css': ['!src/styles/**/*.min.css', 'src/styles/**/*.css']
                }
            }
        }          
    });

    grunt.registerTask('default', ['browserify', 'cssmin']);
};