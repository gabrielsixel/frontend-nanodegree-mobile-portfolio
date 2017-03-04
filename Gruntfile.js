/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');


module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);


  // Grunt configuration
  grunt.initConfig({
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'src-index.html': 'src/index.html',
          'src-project-2048.html': 'src/project-2048.html',    // 'destination': 'source'
          'src-project-mobile.html': 'src/project-mobile.html',    // 'destination': 'source'
          'src-project-webperf.html': 'src/project-webperf.html',
          'views/src-pizza.html' : 'src/views/pizza.html'    // 'destination': 'source'
          }
      }
    },
     imagemin: {
       dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/img',                   // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img'                  // Destination path prefix
        },
        {
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/views/images',              // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'views/images'               // Destination path prefix
        }]
      }
     },
     cssmin: {
       options: {
        keepSpecialComments: 0
       },
       target: {
         files: [{
           expand: true,
           cwd: 'src/css',
           src: ['*.css', '!*.min.css'],
           dest: 'css',
           ext: '.min.css'
         },
         {
           expand: true,
           cwd: 'src/views/css',
           src: ['*.css', '!*.min.css'],
           dest: 'views/css',
           ext: '.min.css'
         }],
       }
    },
    uglify: {
      target: {
        files: [{
          'js/perfmatters.min.js': 'src/js/perfmatters.js',
          'js/analytics.min.js': 'src/js/analytics.js'
        },
        {
          'views/js/main.min.js': 'src/views/js/main.js'
        }]
      }
    },
    assets_inline: {
     all: {
       options: {
         cssDir: "/css",
         assetsDir: "/img",
         inlineImg: true
       },
       files: {
         'index.html': 'src-index.html',
         'project-2048.html': 'src-project-2048.html',    // 'destination': 'source'
         'project-mobile.html': 'src-project-mobile.html',    // 'destination': 'source'
         'project-webperf.html': 'src-project-webperf.html',
         'views/pizza.html' : 'views/src-pizza.html'    // 'destination': 'source'
       },
     },
   },
  });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8080;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // HTML Minifier
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Compress images
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // CSS Minifier
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // JS Uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //Inline all assets
  grunt.loadNpmTasks('grunt-assets-inline');

  // Register default tasks
  grunt.registerTask('default', ['uglify', 'imagemin', 'cssmin', 'htmlmin', 'pagespeed', 'assets_inline']);
};
