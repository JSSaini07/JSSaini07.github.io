module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    const mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "build/css/main.min.css": ["src/css/*.less", "src/css/fonts.css"]
                }
            }
        },
        uglify: {
            js: {
              files: {
                "build/js/main.min.js": ["src/js/jquery-3.3.1.min.js", "src/js/fontawesome-v5.0.13.min.js", "src/js/main.js"]
              }
            }
        },
        inline: {
            dist: {
              src: 'index-dev.html',
              dest: 'index.html'
            }
        },
        imagemin: {            
            dynamic: {
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()] 
                },
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images'
                }]
            }
        },
        watch: {
            styles: {
                files: ["src/css/*.less", "src/css/fonts.css"],
                tasks: ["less", "inline"],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ["src/js/jquery-3.3.1.min.js", "src/js/fontawesome-v5.0.13.min.js", "src/js/main.js"],
                tasks: ["uglify", "inline"],
                options: {
                    nospawn: true
                }
            },
            inlineAssets: {
                files: ["index-dev.html"],
                tasks: ["inline"],
                options: {
                    nospawn: true
                }
            }
        }
    });
    grunt.registerTask("default", ["less", "uglify","imagemin", "inline", "watch"]);
};