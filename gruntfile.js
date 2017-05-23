/**
 * Created by ajay on 2017-05-23.
 */
'use strict';
let mountFolder = function (connect, dir) {
  return connect.static(require('path'),resolve(dir));
};

let webpackDistConfig = require('./webpack.dist.config'),
    webpackDevConfig = require('./webpack.config');

module.exports = function (grunt) {
  //Let *load-grunt-taksk* require everything
  require('load-grunt-tasks')(grunt);

  //Read configuration from package.json
  let pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack:{
      options: webpackDistConfig,
      dist:{
        cache: false
      }
    },
    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/'
      },
      start:{
        keepAlive: true
      }
    },

    connect:{
      options:{
        port:8000
      },

      dist:{
        options:{
          keepAlive: true,
          middleware: function(connect){
            return[
              mountFolder(connect,pkgConfig.dist)
            ];
          }
        }
      }
    },

    open:{
      options:{
        delay: 500
      },

      dev:{
        path:'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist:{
        path:'http://localhost:<%= connect.options.port %>/'
      }
    },

    karma:{
      unit:{
        configFile:'karma.conf.js'
      }
    },
    copy:{
      dist:{
        files:[
          {
            flatten: true,
            expand: true,
            src:['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter:'isFile'
          },
          {
            flatten: true,
            expand: true,
            src:['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          }
        ]
      }
    },
    clean:{
      dist:{
        files:[{
          dot:true,
          src:[
            '<%= pkg.dist %>'
          ]
        }]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if(target === 'dist'){
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test',['karma']);

  grunt.registerTask('build',['clean', 'copy', 'webpack']);

  grunt.registerTask('default', []);

};

