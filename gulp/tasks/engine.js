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

const Utils = require('../util/utils');
const createBundler = require('../util/create-bundler');
const Path = require('path');

const Source = require('vinyl-source-stream');
const Gulp = require('gulp');
const Buffer = require('vinyl-buffer');
const Composer = require('gulp-uglify/composer');
const Uglify = require('uglify-es');
const Minify = Composer(Uglify, console);
const Sourcemaps = require('gulp-sourcemaps');
const EventStream = require('event-stream');
const Chalk = require('chalk');
const HandleErrors = require('../util/handleErrors');
const Optimizejs = require('gulp-optimize-js');

var jsbSkipModules = [
    '../../cocos2d/core/CCGame',
    '../../cocos2d/core/CCDrawingPrimitives.js',
    '../../cocos2d/core/textures/CCTexture2D',
    '../../cocos2d/core/sprites/CCSpriteFrame',
    '../../cocos2d/core/event-manager/CCTouch.js',
    '../../cocos2d/core/event-manager/CCEventListener.js',
    '../../cocos2d/core/event-manager/CCEventManager.js',
    '../../cocos2d/core/load-pipeline/audio-downloader',
    '../../cocos2d/core/physics/platform/CCPhysicsDebugDraw.js',
    '../../cocos2d/core/physics/platform/CCPhysicsUtils.js',
    '../../cocos2d/core/physics/platform/CCPhysicsContactListner.js',
    '../../cocos2d/core/physics/platform/CCPhysicsAABBQueryCallback.js',
    '../../cocos2d/core/physics/platform/CCPhysicsRayCastCallback.js',
    '../../cocos2d/core/platform/CCInputManager.js',
    '../../cocos2d/core/platform/CCVisibleRect.js',
    '../../cocos2d/core/camera/CCSGCameraNode.js',
    '../../cocos2d/core/label/CCSGLabel.js',
    '../../cocos2d/core/label/CCSGLabelCanvasRenderCmd.js',
    '../../cocos2d/core/label/CCSGLabelWebGLRenderCmd.js',
    '../../cocos2d/core/videoplayer/CCSGVideoPlayer.js',
    '../../cocos2d/core/webview/CCSGWebView.js',
    '../../cocos2d/core/editbox/CCSGEditBox.js',
    '../../cocos2d/core/graphics/graphics-node.js',
    '../../cocos2d/core/graphics/graphics-webgl-cmd.js',
    '../../cocos2d/core/graphics/graphics-canvas-cmd.js',
    '../../cocos2d/core/graphics/earcut.js',
    '../../cocos2d/core/graphics/helper.js',
    '../../cocos2d/actions/index.js',
    '../../cocos2d/audio/CCAudio',
    '../../cocos2d/shape-nodes/CCDrawNode.js',
    '../../cocos2d/clipping-nodes/CCClippingNode.js',
    '../../cocos2d/clipping-nodes/CCClippingNodeCanvasRenderCmd.js',
    '../../cocos2d/clipping-nodes/CCClippingNodeWebGLRenderCmd.js',
    '../../cocos2d/particle/CCSGParticleSystem.js',
    '../../cocos2d/particle/CCSGParticleSystemCanvasRenderCmd.js',
    '../../cocos2d/particle/CCSGParticleSystemWebGLRenderCmd.js',
    '../../cocos2d/tilemap/CCSGTMXTiledMap.js',
    '../../cocos2d/tilemap/CCTMXXMLParser.js',
    '../../cocos2d/tilemap/CCSGTMXObjectGroup.js',
    '../../cocos2d/tilemap/CCSGTMXObject.js',
    '../../cocos2d/tilemap/CCSGTMXLayer.js',
    '../../cocos2d/tilemap/CCTMXLayerCanvasRenderCmd.js',
    '../../cocos2d/tilemap/CCTMXLayerWebGLRenderCmd.js',
    '../../cocos2d/motion-streak/CCSGMotionStreak.js',
    '../../cocos2d/motion-streak/CCSGMotionStreakWebGLRenderCmd.js',
    '../../cocos2d/render-texture/CCRenderTexture.js',
    '../../cocos2d/render-texture/CCRenderTextureCanvasRenderCmd.js',
    '../../cocos2d/render-texture/CCRenderTextureWebGLRenderCmd.js',
    '../../extensions/spine/SGSkeletonTexture',
    '../../extensions/spine/SGSkeleton',
    '../../extensions/spine/SGSkeletonAnimation',
    '../../extensions/spine/SGSkeletonCanvasRenderCmd',
    '../../extensions/spine/SGSkeletonWebGLRenderCmd',
    '../../extensions/spine/lib/spine',
    '../../extensions/dragonbones/lib/dragonBones',
    '../../extensions/dragonbones/CCFactory',
    '../../extensions/dragonbones/CCSlot',
    '../../extensions/dragonbones/CCTextureData',
    '../../extensions/dragonbones/CCArmatureDisplay',
    '../../external/box2d/box2d.js',
    '../../external/chipmunk/chipmunk.js',
];

exports.buildCocosJs = function (sourceFile, outputFile, excludes, opt_macroFlags, callback) {
    if (typeof opt_macroFlags === 'function') {
        callback = opt_macroFlags;
        opt_macroFlags = null;
    }

    var outDir = Path.dirname(outputFile);
    var outFile = Path.basename(outputFile);
    var bundler = createBundler(sourceFile);

    excludes && excludes.forEach(function (file) {
        bundler.ignore(file);
    });

    var uglifyOption = Utils.getUglifyOptions('build', Object.assign({ debug: true }, opt_macroFlags));

    bundler = bundler.bundle();
    bundler = bundler.pipe(Source(outFile));
    bundler = bundler.pipe(Buffer());
    bundler = bundler.pipe(Sourcemaps.init({loadMaps: true}));
    bundler = bundler.pipe(Minify(uglifyOption));
    bundler = bundler.pipe(Optimizejs({
        sourceMap: false
    }));
    bundler = bundler.pipe(Sourcemaps.write('./', {
        sourceRoot: './',
        includeContent: true,
        addComment: true
    }));
    bundler = bundler.pipe(Gulp.dest(outDir));
    return bundler.on('end', callback);
};

exports.buildCocosJsMin = function (sourceFile, outputFile, excludes, opt_macroFlags, callback, createMap) {
    if (typeof opt_macroFlags === 'function') {
        callback = opt_macroFlags;
        opt_macroFlags = null;
    }

    var outDir = Path.dirname(outputFile);
    var outFile = Path.basename(outputFile);
    var bundler = createBundler(sourceFile);

    excludes && excludes.forEach(function (file) {
        bundler.ignore(file);
    });

    var uglifyOption = Utils.getUglifyOptions('build', opt_macroFlags);

    var Size = null;
    try {
        Size = require('gulp-size');
    } catch (error) {
        Size = null;
    }

    if (Size) {
        var rawSize = Size({ gzip: false, pretty: false, showTotal: false, showFiles: false });
        var zippedSize = Size({ gzip: true, pretty: false, showTotal: false, showFiles: false });
    }

    bundler = bundler.bundle();
    bundler = bundler.pipe(Source(outFile));
    bundler = bundler.pipe(Buffer());
    if (createMap) {
        console.error('Can not use sourcemap with optimize-js');
        bundler = bundler.pipe(Sourcemaps.init({loadMaps: true}));
    }
    bundler = bundler.pipe(Minify(uglifyOption));
    bundler = bundler.pipe(Optimizejs({
        sourceMap: false
    }));

    if (Size) {
        bundler = bundler.pipe(rawSize);
        bundler = bundler.pipe(zippedSize);
        bundler = bundler.pipe(EventStream.through(null, function () {
            var raw = rawSize.size;
            var zipped = zippedSize.size;
            var percent = ((zipped / raw) * 100).toFixed(2);
            console.log(`Size of ${outputFile}: minimized: ${Chalk.cyan(raw)}B zipped: ${Chalk.cyan(zipped)}B, compression ratio: ${percent}%`);
            this.emit('end');
        }));
    }
    if (createMap) {
        bundler = bundler.pipe(Sourcemaps.write('./', {
            sourceRoot: './',
            includeContent: true,
            addComment: true
        }));
    }
    bundler = bundler.pipe(Gulp.dest(outDir));
    return bundler.on('end', callback);
};

exports.buildPreview = function (sourceFile, outputFile, callback) {
    var outFile = Path.basename(outputFile);
    var outDir = Path.dirname(outputFile);

    var bundler = createBundler(sourceFile);
    bundler.bundle()
        .on('error', HandleErrors.handler)
        .pipe(HandleErrors())
        .pipe(Source(outFile))
        .pipe(Buffer())
        .pipe(Sourcemaps.init({loadMaps: true}))
        .pipe(Minify(Utils.getUglifyOptions('preview')))
        .pipe(Optimizejs({
            sourceMap: false
        }))
        .pipe(Sourcemaps.write('./', {
            sourceRoot: '../',
            includeContent: false,
            addComment: true
        }))
        .pipe(Gulp.dest(outDir))
        .on('end', callback);
};

exports.buildJsbPreview = function (sourceFile, outputFile, excludes, callback) {
    var FixJavaScriptCore = require('../util/fix-jsb-javascriptcore');

    var outFile = Path.basename(outputFile);
    var outDir = Path.dirname(outputFile);

    excludes = excludes.concat(jsbSkipModules);

    var bundler = createBundler(sourceFile);
    excludes.forEach(function (module) {
        bundler.ignore(require.resolve(module));
    });
    bundler.bundle()
        .on('error', HandleErrors.handler)
        .pipe(HandleErrors())
        .pipe(Source(outFile))
        .pipe(Buffer())
        .pipe(FixJavaScriptCore())
        .pipe(Minify(Utils.getUglifyOptions('preview', { jsb: true })))
        .pipe(Optimizejs({
            sourceMap: false
        }))
        .pipe(Gulp.dest(outDir))
        .on('end', callback);
};

exports.buildJsb = function (sourceFile, outputFile, excludes, opt_macroFlags, callback) {
    if (typeof opt_macroFlags === 'function') {
        callback = opt_macroFlags;
        opt_macroFlags = null;
    }

    var FixJavaScriptCore = require('../util/fix-jsb-javascriptcore');

    var outFile = Path.basename(outputFile);
    var outDir = Path.dirname(outputFile);

    excludes = excludes.concat(jsbSkipModules);

    var bundler = createBundler(sourceFile);
    excludes.forEach(function (module) {
        bundler.ignore(require.resolve(module));
    });
    bundler.bundle()
        .on('error', HandleErrors.handler)
        .pipe(HandleErrors())
        .pipe(Source(outFile))
        .pipe(Buffer())
        .pipe(FixJavaScriptCore())
        .pipe(Minify(Utils.getUglifyOptions('build', Object.assign({ jsb: true, debug: true }, opt_macroFlags))))
        .pipe(Optimizejs({
            sourceMap: false
        }))
        .pipe(Gulp.dest(outDir))
        .on('end', callback);
};

exports.buildJsbMin = function (sourceFile, outputFile, excludes, opt_macroFlags, callback) {
    if (typeof opt_macroFlags === 'function') {
        callback = opt_macroFlags;
        opt_macroFlags = null;
    }

    var FixJavaScriptCore = require('../util/fix-jsb-javascriptcore');

    var outFile = Path.basename(outputFile);
    var outDir = Path.dirname(outputFile);

    excludes = excludes.concat(jsbSkipModules);

    var bundler = createBundler(sourceFile);
    excludes.forEach(function (module) {
        bundler.ignore(require.resolve(module));
    });
    bundler.bundle()
        .on('error', HandleErrors.handler)
        .pipe(HandleErrors())
        .pipe(Source(outFile))
        .pipe(Buffer())
        .pipe(FixJavaScriptCore())
        .pipe(Minify(Utils.getUglifyOptions('build', Object.assign({ jsb: true }, opt_macroFlags))))
        .pipe(Optimizejs({
            sourceMap: false
        }))
        .pipe(Gulp.dest(outDir))
        .on('end', callback);
};

exports.jsbSkipModules = jsbSkipModules;
