module.exports = function( grunt ) {

  var mode = grunt.option( 'mode' ) || 'dev';

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');


  if ( mode == 'prod' ) {

    grunt.log.subhead( 'Running Grunt in `Production` mode' );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  } else {

    grunt.log.subhead( 'Running Grunt in `Development` mode' );

  }

    grunt.initConfig({

    // compass dev does expanded else compressed
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          outputStyle: ( mode == 'dev' ) ? 'expanded' : 'compressed',
          force: true
        }
      }
    },
    //minify main.js
    uglify: {
      dist: {
        files: {
          'assets/js/main.js': [ 'assets/js/main.js' ]
        }
      },
    },

    // concatenation
    concat: {
        options: {
            separator: '\n'
        },
        dist: {
            src: [
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/gsap/src/minified/TimelineMax.min.js',
                'bower_components/gsap/src/minified/TweenMax.min.js',
                'bower_components/jquery.transit/jquery.transit.js',
                'bower_components/gsap/src/minified/jquery.gasp.min.js',
                'bower_components/stickyjs/stickyjs.js',
                'bower_components/ScrollMagic/js/jquery.scrollmagic.js',
                'assets/js/src/plugins/*.js',
                'assets/js/src/core/Global.js',
                'assets/js/src/classes/*.js',
                'assets/js/src/main.dev.js'
            ],
            dest: 'assets/js/main.js'
        }
    },


    // watch our project for changes
    watch: {
      compass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: [ 'compass' ]
      },
      js: {
        files: [
          'assets/js/src/plugins/*.js',
          'assets/js/src/classes/*.js',
          'assets/js/src/main.dev.js'
        ],
        tasks: ['concat']
      }
    },

  });

  // register task default task
  grunt.registerTask( 'default', function() {

    // some tasks we only want to run in production mode
    if ( mode == 'prod' ) {

      grunt.task.run([
        'compass',
        'concat',
        'uglify'
      ]);

    } else {

       grunt.task.run([
        'compass',
        'concat',
        'watch'
      ]);

    }

  });

};