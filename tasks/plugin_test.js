/*
 * grunt-plugin-test
 * https://github.com/hzyzhenyu/grunt-plugin-test
 *
 * Copyright (c) 2016 waltvu
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('plugin_test', 'buddha bless no bug', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who:'buddha',
      commetSymbol:'//'
    });

    var testRegexMap={
      'buddha':/buddha buddha/,
      'alpaca':/alpaca alpaca/
    };
    var who=options.who,
        commetSymbol=options.commetSymbol,

    commentFilePathMap={
      'buddha':'asserts/buddha.txt',
      'alpaca':'asserts/alpaca.txt'
    },
        commentFilePath=path.join(__dirname,commentFilePathMap[who]),
        commentContent=grunt.file.read(commentFilePath),
     lineCommentArr=commentContent.split(grunt.util.normalizelf('\n'));

    

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        
        var originalFileContent=grunt.file.read(filepath);
        if(testRegexMap[who].test(originalFileContent))
        {
          return;
        }


        grunt.log.writeln(commentContent);
        grunt.log.writeln('-----------------------------------');
        grunt.log.writeln(originalFileContent);
        grunt.log.writeln('===================================');
        grunt.log.writeln(filepath);
        grunt.log.writeln('                                   ');
        grunt.log.writeln('                                   ');
        grunt.log.writeln('                                   ');
        var newFileContent=commentContent+grunt.util.normalizelf('\n')+originalFileContent;
        grunt.file.write(filepath,newFileContent);
      });


      // Write the destination file.
     // grunt.file.write(f.dest, src);

      // Print a success message.
    //  grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
