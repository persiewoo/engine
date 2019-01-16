/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

dragonBones.CCTextureAtlasData = cc.Class({
    name: 'dragonBones.CCTextureAtlasData',
    extends: dragonBones.TextureAtlasData,
    texture : null,

    statics : {
        toString : function() {
            return "[class dragonBones.CCTextureAtlasData]";
        }
    },

    _onClear : function() {
        dragonBones.TextureAtlasData.prototype._onClear.call(this);
        this.texture = null;
    },

    generateTextureData : function() {
        return dragonBones.BaseObject.borrowObject(dragonBones.CCTextureData);
    }
});

dragonBones.CCTextureData = cc.Class({
    name: 'dragonBones.CCTextureData',
    extends: dragonBones.TextureData,
    texture: null,

    statics : {
        toString : function() {
            return "[class dragonBones.CCTextureData]";
        }
    },

    _onClear : function() {
        dragonBones.TextureData.prototype._onClear.call(this);
        if (this.texture) {
            this.texture.dispose();
            this.texture = null;
        }
    }
});
