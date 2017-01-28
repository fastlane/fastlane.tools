module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', 'src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n © Copyright <%= grunt.template.today("yyyy") %> Google, Inc. Open source licenses: https://fabric.io/licenses/javascript \n*/\n'
      },
      build: {
        files: {
          'assets/js/main.min.js': 'src/js/main.js'
        }
      }
    },

    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'assets/css/style.css': 'src/css/style.less'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'assets/css/style.min.css': 'assets/css/style.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['src/**/*.css', 'src/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'uglify']
      },
      options: {
        livereload: {
          host: 'localhost',
          port: 8080
        }
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);

};
