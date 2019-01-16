/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

'use strict';

const Path = require('path');
const gulp = require('gulp');
const Del = require('del');
const Shell = require('gulp-shell');

const Engine = require('./gulp/tasks/engine');
const Test = require('./gulp/tasks/test');
const Watch = require('./gulp/tasks/watch');

/////////////
// engine //
/////////////

gulp.task('build-html5-dev', function (done) {
    Engine.buildCocosJs('./index.js', './bin/cocos2d-js.js', [],  done);
});

gulp.task('build-html5-min', function (done) {
    Engine.buildCocosJsMin('./index.js', './bin/cocos2d-js-min.js', [], done);
});

gulp.task('build-html5-preview',  function (done) {
    Engine.buildPreview('./index.js', './bin/cocos2d-js-for-preview.js', done);
});

gulp.task('build-html5', ['build-html5-preview', 'build-html5-dev', 'build-html5-min']);

gulp.task('build-jsb-dev', function (done) {
    Engine.buildJsb([
        './jsb/index.js',
    ], './bin/jsb_polyfill.dev.js', [], done);
});

gulp.task('build-jsb-min', function (done) {
    Engine.buildJsbMin([
        './jsb/index.js',
    ], './bin/jsb_polyfill.js', [], done);
});

gulp.task('build-jsb-preview',  function (done) {
    Engine.buildJsbPreview([
        './jsb/index.js',
    ], './bin/jsb_polyfill-for-preview.js', [], done);
});

gulp.task('build-jsb', ['build-jsb-preview', 'build-jsb-dev', 'build-jsb-min']);

/////////
// test //
/////////

gulp.task('clean-test', ['clean-test-cases'], function (done) {
    Del([
        './bin/cocos2d-js-extends-for-test.js',
        './bin/cocos2d-js-for-test.js',
    ], done);
});

gulp.task('clean-test-cases', function (done) {
    Del('./bin/test/**/*', done);
});

gulp.task('build-test-cases', ['clean-test-cases'], function (done) {
    Test.buildTestCase('./bin/test/', done);
});

gulp.task('build-test', ['clean-test', 'build-test-cases'], function (done) {
    Test.build('./index.js', './bin/cocos2d-js-for-test.js',
               '../editor/test-utils/engine-extends-entry.js', './bin/cocos2d-js-extends-for-test.js',
               false, done);
});
gulp.task('build-test-sm', ['clean-test', 'build-test-cases'], function (done) {
    Test.build('./index.js', './bin/cocos2d-js-for-test.js',
               '../editor/test-utils/engine-extends-entry.js', './bin/cocos2d-js-extends-for-test.js',
               true, done);
});

gulp.task('unit-runner', ['build-test'], function (done) {
    Test.unit('./bin', [
        './bin/cocos2d-js-for-test.js'
    ], done);
});

gulp.task('test', ['build-test', 'unit-runner'], function (done) {
    Test.test(done);
});

gulp.task('visual-test', ['build-test'], Shell.task([
    'sh ./test/visual-tests/run.sh'
]));

gulp.task('test-no-build', function (done) {
    Test.test(done);
});

////////////
// global //
////////////

// fast build, only for develop
gulp.task('build-dev', ['build-html5-preview', 'build-jsb-preview'], function (done) {
    Del(['./bin/jsb_polyfill.js', './bin/jsb_polyfill.dev.js', './bin/.cache'], done);
});

// only build preview for html5 since it will built by editor
gulp.task('build', ['build-html5-preview', 'build-jsb'], function (done) {
    Del(['./bin/.cache'], done);
});

// default task
gulp.task('default', ['build']);

gulp.task('clean', function (done) {
    Del(Path.join('./bin', '**/*'), done);
});

////////////
// watch //
////////////

gulp.task('watch-preview', function () {
    Watch.preview('./index.js', './bin/cocos2d-js-for-preview.js');
});

gulp.task('watch-jsb-polyfill', function () {
    Watch.jsbPolyfill([
        './jsb/index.js',
    ], './bin/jsb_polyfill.dev.js');
});

gulp.task('watch-dev-files', ['watch-preview', 'watch-jsb-polyfill']);
