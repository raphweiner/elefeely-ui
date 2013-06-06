module.exports = function (grunt) {

  grunt.initConfig({

    connect: {
      server: {
        options: { port: "8000",
                   hostname: "localhost",
                   keepalive: true }
      }
    },

    uglify: {
      build: {
        files: {
          'main.js': ['main.js']
        }
      }
    },

    concat: {
      files: {
        'src': ["js/lib/jquery-1.10.1.min.js",
                "js/lib/json3.min.js",
                "js/lib/handlebars.js",
                "js/lib/underscore-min.js",
                "js/lib/backbone-min.js",
                "js/lib/jquery.cookie.js",
                "js/lib/bootstrap.min.js",
                "js/lib/raphael-min.js",
                "js/lib/morris.min.js",
                "js/session.js",
                "js/app.js",
                "js/routers/router.js",
                "js/models/feeling.js",
                "js/models/user.js",
                "js/collections/feelings.js",
                "js/views/app.js",
                "js/views/header.js",
                "js/views/home.js",
                "js/views/footer.js",
                "js/views/graph.js",
                "js/views/settings.js",
                "js/views/signupLogin.js"],

        'dest': 'main.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat', 'uglify']);

  grunt.registerTask('default', ['build']);
};










