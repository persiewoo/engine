(function (cc, ccui, ccs, cp) {

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

cc._tmp.PrototypeCCNode = function () {

    var _p = _ccsg.Node.prototype;

    cc.defineGetterSetter(_p, "x", _p.getPositionX, _p.setPositionX);
    cc.defineGetterSetter(_p, "y", _p.getPositionY, _p.setPositionY);
    cc.defineGetterSetter(_p, "width", _p._getWidth, _p._setWidth);
    cc.defineGetterSetter(_p, "height", _p._getHeight, _p._setHeight);
    cc.defineGetterSetter(_p, "anchorX", _p._getAnchorX, _p._setAnchorX);
    cc.defineGetterSetter(_p, "anchorY", _p._getAnchorY, _p._setAnchorY);
    cc.defineGetterSetter(_p, "skewX", _p.getSkewX, _p.setSkewX);
    cc.defineGetterSetter(_p, "skewY", _p.getSkewY, _p.setSkewY);
    cc.defineGetterSetter(_p, "zIndex", _p.getLocalZOrder, _p.setLocalZOrder);
    cc.defineGetterSetter(_p, "vertexZ", _p.getVertexZ, _p.setVertexZ);
    cc.defineGetterSetter(_p, "rotation", _p.getRotation, _p.setRotation);
    cc.defineGetterSetter(_p, "rotationX", _p.getRotationX, _p.setRotationX);
    cc.defineGetterSetter(_p, "rotationY", _p.getRotationY, _p.setRotationY);
    cc.defineGetterSetter(_p, "scale", _p.getScale, _p.setScale);
    cc.defineGetterSetter(_p, "scaleX", _p.getScaleX, _p.setScaleX);
    cc.defineGetterSetter(_p, "scaleY", _p.getScaleY, _p.setScaleY);
    cc.defineGetterSetter(_p, "children", _p.getChildren);
    cc.defineGetterSetter(_p, "childrenCount", _p.getChildrenCount);
    cc.defineGetterSetter(_p, "parent", _p.getParent, _p.setParent);
    cc.defineGetterSetter(_p, "visible", _p.isVisible, _p.setVisible);
    cc.defineGetterSetter(_p, "running", _p.isRunning);
    cc.defineGetterSetter(_p, "ignoreAnchor", _p.isIgnoreAnchorPointForPosition, _p.setIgnoreAnchorPointForPosition);
    cc.defineGetterSetter(_p, "actionManager", _p.getActionManager, _p.setActionManager);
    cc.defineGetterSetter(_p, "scheduler", _p.getScheduler, _p.setScheduler);
    //cc.defineGetterSetter(_p, "boundingBox", _p.getBoundingBox);
    cc.defineGetterSetter(_p, "shaderProgram", _p.getShaderProgram, _p.setShaderProgram);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB);
    cc.defineGetterSetter(_p, "cascadeOpacity", _p.isCascadeOpacityEnabled, _p.setCascadeOpacityEnabled);
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    cc.defineGetterSetter(_p, "cascadeColor", _p.isCascadeColorEnabled, _p.setCascadeColorEnabled);
};
/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/*
 * XXX: Yes, nodes might have a sort problem once every 15 days if the game runs at 60 FPS and each frame sprites are reordered.
 */
cc.s_globalOrderOfArrival = 1;

/**
 * <p>ccsg.Node is the root class of all node. Anything that gets drawn or contains things that get drawn is a ccsg.Node.<br/>
 * The most popular ccsg.Nodes are: ccsg.Scene, cc.Layer, _ccsg.Sprite, cc.Menu.</p>
 *
 * <p>The main features of a ccsg.Node are: <br/>
 * - They can contain other ccsg.Node nodes (addChild, getChildByTag, removeChild, etc) <br/>
 * - They can schedule periodic callback (schedule, unschedule, etc) <br/>
 * - They can execute actions (runAction, stopAction, etc) <br/></p>
 *
 * <p>Some ccsg.Node nodes provide extra functionality for them or their children.</p>
 *
 * <p>Subclassing a ccsg.Node usually means (one/all) of: <br/>
 * - overriding constructor function "ctor" to initialize resources and schedule callbacks<br/>
 * - create callbacks to handle the advancement of time<br/></p>
 *
 * <p>Features of ccsg.Node: <br/>
 * - position  <br/>
 * - scale (x, y) <br/>
 * - rotation (in degrees, clockwise)<br/>
 * - anchor point<br/>
 * - size <br/>
 * - color <br/>
 * - opacity <br/>
 * - visible<br/>
 * - z-order<br/>
 * - WebGL z position<br/></P>
 *
 * <p> Default values: <br/>
 * - rotation: 0 <br/>
 * - position: (x=0,y=0) <br/>
 * - scale: (x=1,y=1) <br/>
 * - contentSize: (x=0,y=0)<br/>
 * - anchorPoint: (x=0,y=0)<br/>
 * - color: (r=255,g=255,b=255)<br/>
 * - opacity: 255</p>
 *
 * <p> Limitations:<br/>
 * - A ccsg.Node is a "void" object. It doesn't have a texture <br/></P>
 *
 * <p>Order in transformations with grid disabled <br/>
 * -# The node will be translated (position)  <br/>
 * -# The node will be rotated (rotation)<br/>
 * -# The node will be scaled (scale)  <br/>
 *
 * <p>Order in transformations with grid enabled<br/>
 * -# The node will be translated (position)<br/>
 * -# The node will be rotated (rotation) <br/>
 * -# The node will be scaled (scale) <br/>
 * -# The grid will capture the screen <br/>
 * -# The node will be moved according to the camera values (camera) <br/>
 * -# The grid will render the captured screen <br/></P>
 *
 * @class _ccsg.Node
 * @extends cc._Class
 *
 * @property {Number}               x                   - x axis position of node
 * @property {Number}               y                   - y axis position of node
 * @property {Number}               width               - Width of node
 * @property {Number}               height              - Height of node
 * @property {Number}               anchorX             - Anchor point's position on x axis
 * @property {Number}               anchorY             - Anchor point's position on y axis
 * @property {Boolean}              ignoreAnchor        - Indicate whether ignore the anchor point property for positioning
 * @property {Number}               skewX               - Skew x
 * @property {Number}               skewY               - Skew y
 * @property {Number}               zIndex              - Z order in depth which stands for the drawing order
 * @property {Number}               vertexZ             - WebGL Z vertex of this node, z order works OK if all the nodes uses the same openGL Z vertex
 * @property {Number}               rotation            - Rotation of node
 * @property {Number}               rotationX           - Rotation on x axis
 * @property {Number}               rotationY           - Rotation on y axis
 * @property {Number}               scale               - Scale of node
 * @property {Number}               scaleX              - Scale on x axis
 * @property {Number}               scaleY              - Scale on y axis
 * @property {Boolean}              visible             - Indicate whether node is visible or not
 * @property {cc.Color}             color               - Color of node, default value is white: (255, 255, 255)
 * @property {Boolean}              cascadeColor        - Indicate whether node's color value affect its child nodes, default value is false
 * @property {Number}               opacity             - Opacity of node, default value is 255
 * @property {Boolean}              opacityModifyRGB    - Indicate whether opacity affect the color value, default value is false
 * @property {Boolean}              cascadeOpacity      - Indicate whether node's opacity value affect its child nodes, default value is false
 * @property {Array}                children            - <@readonly> All children nodes
 * @property {Number}               childrenCount       - <@readonly> Number of children
 * @property {_ccsg.Node}           parent              - Parent node
 * @property {Boolean}              running             - <@readonly> Indicate whether node is running or not
 * @property {Number}               tag                 - Tag of node
 * @property {Number}               arrivalOrder        - The arrival order, indicates which children is added previously
 * @property {cc.ActionManager}     actionManager       - The CCActionManager object that is used by all actions.
 * @property {cc.GLProgram}         shaderProgram       - The shader program currently used for this node
 * @property {Number}               glServerState       - The state of OpenGL server side
 * @property {cc.Scheduler}         scheduler           - cc.Scheduler used to schedule all "updates" and timers
 */
_ccsg.Node = cc.Class({
    name: 'ccsg.Node',

    properties: {
        _running: false,

        _localZOrder: 0,    ///< Local order (relative to its siblings) used to sort the node
        _globalZOrder: 0,   ///< Global order used to sort the node
        _arrivalOrder: 0,
        _reorderChildDirty: false,
        _vertexZ: 0.0,
        _customZ: undefined,

        _rotationX: 0,
        _rotationY: 0.0,
        _scaleX: 1.0,
        _scaleY: 1.0,
        _position: cc.p(0, 0),

        _skewX: 0.0,
        _skewY: 0.0,
        _children: [],
        _visible: true,
        _anchorPoint: cc.p(0, 0),
        _contentSize: cc.size(0, 0),
        _parent: null,

        // "whole screen" objects. like Scenes and Layers, should set _ignoreAnchorPointForPosition to true
        _ignoreAnchorPointForPosition: false,
        tag: cc.macro.NODE_TAG_INVALID,

        _showNode: false,
        _name: '',                     ///<a string label, an user defined string to identify this node

        _realOpacity: 255,
        _realColor: cc.Color.WHITE,
        _cascadeColorEnabled: false,
        _cascadeOpacityEnabled: false,
        _isTransitionFinished: false,

        _actionManager: null,
        _scheduler: null,
        _renderCmd: null
    },

    ctor: function() {
        this.__instanceId = cc.ClassManager.getNewInstanceId();
        this._renderCmd = this._createRenderCmd();
    },

    /**
     * Initializes the instance of ccsg.Node
     * @function
     * @returns {boolean} Whether the initialization was successful.
     */
    init: function () {
        return true;
    },

    /**
     * <p>Properties configuration function </br>
     * All properties in attrs will be set to the node, </br>
     * when the setter of the node is available, </br>
     * the property will be set via setter function.</br>
     * </p>
     * @function
     * @param {Object} attrs Properties to be set to node
     */
    attr: function (attrs) {
        for (var key in attrs) {
            this[key] = attrs[key];
        }
    },

    /**
     * <p>Returns the skew degrees in X </br>
     * The X skew angle of the node in degrees.  <br/>
     * This angle describes the shear distortion in the X direction.<br/>
     * Thus, it is the angle between the Y axis and the left edge of the shape </br>
     * The default skewX angle is 0. Positive values distort the node in a CW direction.</br>
     * </p>
     * @function
     * @return {Number} The X skew angle of the node in degrees.
     */
    getSkewX: function () {
        return this._skewX;
    },

    /**
     * <p>
     * Changes the X skew angle of the node in degrees.                                                    <br/>
     * <br/>
     * This angle describes the shear distortion in the X direction.                                       <br/>
     * Thus, it is the angle between the Y axis and the left edge of the shape                             <br/>
     * The default skewX angle is 0. Positive values distort the node in a CW direction.
     * </p>
     * @function
     * @param {Number} newSkewX The X skew angle of the node in degrees.
     */
    setSkewX: function (newSkewX) {
        this._skewX = newSkewX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns the skew degrees in Y               <br/>
     * The Y skew angle of the node in degrees.                            <br/>
     * This angle describes the shear distortion in the Y direction.       <br/>
     * Thus, it is the angle between the X axis and the bottom edge of the shape       <br/>
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.    <br/>
     * </p>
     * @function
     * @return {Number} The Y skew angle of the node in degrees.
     */
    getSkewY: function () {
        return this._skewY;
    },

    /**
     * <p>
     * Changes the Y skew angle of the node in degrees.                                                        <br/>
     *                                                                                                         <br/>
     * This angle describes the shear distortion in the Y direction.                                           <br/>
     * Thus, it is the angle between the X axis and the bottom edge of the shape                               <br/>
     * The default skewY angle is 0. Positive values distort the node in a CCW direction.                      <br/>
     * </p>
     * @function
     * @param {Number} newSkewY  The Y skew angle of the node in degrees.
     */
    setSkewY: function (newSkewY) {
        this._skewY = newSkewY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p> LocalZOrder is the 'key' used to sort the node relative to its siblings.                                    <br/>
     *                                                                                                                 <br/>
     * The Node's parent will sort all its children based ont the LocalZOrder value.                                   <br/>
     * If two nodes have the same LocalZOrder, then the node that was added first to the children's array              <br/>
     * will be in front of the other node in the array.                                                                <br/>
     * <br/>
     * Also, the Scene Graph is traversed using the "In-Order" tree traversal algorithm ( http://en.wikipedia.org/wiki/Tree_traversal#In-order )
     * <br/>
     * And Nodes that have LocalZOder values smaller than 0 are the "left" subtree                                                 <br/>
     * While Nodes with LocalZOder greater than 0 are the "right" subtree.    </p>
     * @function
     * @param {Number} localZOrder
     */
    setLocalZOrder: function (localZOrder) {
        if (this._parent)
            this._parent.reorderChild(this, localZOrder);
        else
            this._localZOrder = localZOrder;
        cc.eventManager._setDirtyForNode(this);
    },

    //Helper function used by `setLocalZOrder`. Don't use it unless you know what you are doing.
    _setLocalZOrder: function (localZOrder) {
        this._localZOrder = localZOrder;
    },

    /**
     * Returns the local Z order of this node.
     * @function
     * @returns {Number} The local (relative to its siblings) Z order.
     */
    getLocalZOrder: function () {
        return this._localZOrder;
    },

    /**
     * Returns z order of this node
     * @function
     * @return {Number}
     * @deprecated since 3.0, please use getLocalZOrder instead
     */
    getZOrder: function () {
        cc.logID(1600);
        return this.getLocalZOrder();
    },

    /**
     * <p>
     *     Sets the Z order which stands for the drawing order, and reorder this node in its parent's children array.     <br/>
     *                                                                                                                    <br/>
     *      The Z order of node is relative to its "brothers": children of the same parent.                               <br/>
     *      It's nothing to do with OpenGL's z vertex. This one only affects the draw order of nodes in cocos2d.          <br/>
     *      The larger number it is, the later this node will be drawn in each message loop.                              <br/>
     *      Please refer to setVertexZ(float) for the difference.
     * </p>
     * @function
     * @param {Number} z Z order of this node.
     * @deprecated since 3.0, please use setLocalZOrder instead
     */
    setZOrder: function (z) {
        cc.logID(1601);
        this.setLocalZOrder(z);
    },

    /**
     * <p>Defines the oder in which the nodes are renderer.                                                                               <br/>
     * Nodes that have a Global Z Order lower, are renderer first.                                                                        <br/>
     *                                                                                                                                    <br/>
     * In case two or more nodes have the same Global Z Order, the oder is not guaranteed.                                                <br/>
     * The only exception if the Nodes have a Global Z Order == 0. In that case, the Scene Graph order is used.                           <br/>
     *                                                                                                                                    <br/>
     * By default, all nodes have a Global Z Order = 0. That means that by default, the Scene Graph order is used to render the nodes.    <br/>
     *                                                                                                                                    <br/>
     * Global Z Order is useful when you need to render nodes in an order different than the Scene Graph order.                           <br/>
     *                                                                                                                                    <br/>
     * Limitations: Global Z Order can't be used used by Nodes that have SpriteBatchNode as one of their ancestors.                       <br/>
     * And if ClippingNode is one of the ancestors, then "global Z order" will be relative to the ClippingNode.   </p>
     * @function
     * @param {Number} globalZOrder
     */
    setGlobalZOrder: function (globalZOrder) {
        if (this._globalZOrder !== globalZOrder) {
            this._globalZOrder = globalZOrder;
            cc.eventManager._setDirtyForNode(this);
        }
    },

    /**
     * Return the Node's Global Z Order.
     * @function
     * @returns {number} The node's global Z order
     */
    getGlobalZOrder: function () {
        return this._globalZOrder;
    },

    /**
     * Returns WebGL Z vertex of this node.
     * @function
     * @return {Number} WebGL Z vertex of this node
     */
    getVertexZ: function () {
        return this._vertexZ;
    },

    /**
     * <p>
     *     Sets the real WebGL Z vertex.                                                                          <br/>
     *                                                                                                            <br/>
     *      Differences between openGL Z vertex and cocos2d Z order:                                              <br/>
     *      - WebGL Z modifies the Z vertex, and not the Z order in the relation between parent-children         <br/>
     *      - WebGL Z might require to set 2D projection                                                         <br/>
     *      - cocos2d Z order works OK if all the nodes uses the same WebGL Z vertex. eg: vertexZ = 0            <br/>
     *                                                                                                            <br/>
     *      @warning Use it at your own risk since it might break the cocos2d parent-children z order
     * </p>
     * @function
     * @param {Number} Var
     */
    setVertexZ: function (Var) {
        this._customZ = this._vertexZ = Var;
    },

    /**
     * Returns the rotation (angle) of the node in degrees. 0 is the default rotation angle. Positive values rotate node clockwise.
     * @function
     * @return {Number} The rotation of the node in degrees.
     */
    getRotation: function () {
        if (this._rotationX !== this._rotationY)
            cc.logID(1602);
        return this._rotationX;
    },

    /**
     * <p>
     *     Sets the rotation (angle) of the node in degrees.                                             <br/>
     *                                                                                                   <br/>
     *      0 is the default rotation angle.                                                             <br/>
     *      Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @function
     * @param {Number} newRotation The rotation of the node in degrees.
     */
    setRotation: function (newRotation) {
        this._rotationX = this._rotationY = newRotation;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the X axis rotation (angle) which represent a horizontal rotational skew of the node in degrees. <br/>
     * 0 is the default rotation angle. Positive values rotate node clockwise<br/>
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The X rotation in degrees.
     */
    getRotationX: function () {
        return this._rotationX;
    },

    /**
     * <p>
     *     Sets the X rotation (angle) of the node in degrees which performs a horizontal rotational skew.        <br/>
     *     (support only in WebGL rendering mode)                                                                 <br/>
     *     0 is the default rotation angle.                                                                       <br/>
     *     Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @param {Number} rotationX The X rotation in degrees which performs a horizontal rotational skew.
     */
    setRotationX: function (rotationX) {
        this._rotationX = rotationX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the Y axis rotation (angle) which represent a vertical rotational skew of the node in degrees. <br/>
     * 0 is the default rotation angle. Positive values rotate node clockwise<br/>
     * (support only in WebGL rendering mode)
     * @function
     * @return {Number} The Y rotation in degrees.
     */
    getRotationY: function () {
        return this._rotationY;
    },

    /**
     * <p>
     *    Sets the Y rotation (angle) of the node in degrees which performs a vertical rotational skew.         <br/>
     *    (support only in WebGL rendering mode)                                                                <br/>
     *    0 is the default rotation angle.                                                                      <br/>
     *    Positive values rotate node clockwise, and negative values for anti-clockwise.
     * </p>
     * @param rotationY The Y rotation in degrees.
     */
    setRotationY: function (rotationY) {
        this._rotationY = rotationY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor of the node.
     * @warning: Assertion will fail when _scaleX != _scaleY.
     * @function
     * @return {Number} The scale factor
     */
    getScale: function () {
        if (this._scaleX !== this._scaleY)
            cc.logID(1603);
        return this._scaleX;
    },

    /**
     * Sets the scale factor of the node. 1.0 is the default scale factor. This function can modify the X and Y scale at the same time.
     * @function
     * @param {Number} scale or scaleX value
     * @param {Number} [scaleY=]
     */
    setScale: function (scale, scaleY) {
        this._scaleX = scale;
        this._scaleY = (scaleY || scaleY === 0) ? scaleY : scale;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor on X axis of this node
     * @function
     * @return {Number} The scale factor on X axis.
     */
    getScaleX: function () {
        return this._scaleX;
    },

    /**
     * <p>
     *     Changes the scale factor on X axis of this node                                   <br/>
     *     The default value is 1.0 if you haven't changed it before
     * </p>
     * @function
     * @param {Number} newScaleX The scale factor on X axis.
     */
    setScaleX: function (newScaleX) {
        this._scaleX = newScaleX;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the scale factor on Y axis of this node
     * @function
     * @return {Number} The scale factor on Y axis.
     */
    getScaleY: function () {
        return this._scaleY;
    },

    /**
     * <p>
     *     Changes the scale factor on Y axis of this node                                            <br/>
     *     The Default value is 1.0 if you haven't changed it before.
     * </p>
     * @function
     * @param {Number} newScaleY The scale factor on Y axis.
     */
    setScaleY: function (newScaleY) {
        this._scaleY = newScaleY;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>
     *     Changes the position (x,y) of the node in cocos2d coordinates.<br/>
     *     The original point (0,0) is at the left-bottom corner of screen.<br/>
     *     Usually we use cc.p(x,y) to compose CCPoint object.<br/>
     *     and Passing two numbers (x,y) is more efficient than passing CCPoint object.
     * </p>
     * @function
     * @param {cc.Vec2|Number} newPosOrxValue The position (x,y) of the node in coordinates or the X coordinate for position
     * @param {Number} [yValue] Y coordinate for position
     * @example
     *    var size = cc.winSize;
     *    node.setPosition(size.width/2, size.height/2);
     */
    setPosition: function (newPosOrxValue, yValue) {
        var locPosition = this._position;
        if (yValue === undefined) {
            if(locPosition.x === newPosOrxValue.x && locPosition.y === newPosOrxValue.y)
                return;
            locPosition.x = newPosOrxValue.x;
            locPosition.y = newPosOrxValue.y;
        } else {
            if(locPosition.x === newPosOrxValue && locPosition.y === yValue)
                return;
            locPosition.x = newPosOrxValue;
            locPosition.y = yValue;
        }
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns a copy of the position (x,y) of the node in cocos2d coordinates. (0,0) is the left-bottom corner.</p>
     * @function
     * @return {cc.Vec2} The position (x,y) of the node in OpenGL coordinates
     */
    getPosition: function () {
        return cc.p(this._position);
    },

    /**
     * <p>Returns the x axis position of the node in cocos2d coordinates.</p>
     * @function
     * @return {Number}
     */
    getPositionX: function () {
        return this._position.x;
    },

    /**
     * <p>Sets the x axis position of the node in cocos2d coordinates.</p>
     * @function
     * @param {Number} x The new position in x axis
     */
    setPositionX: function (x) {
        this._position.x = x;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * <p>Returns the y axis position of the node in cocos2d coordinates.</p>
     * @function
     * @return {Number}
     */
    getPositionY: function () {
        return  this._position.y;
    },

    /**
     * <p>Sets the y axis position of the node in cocos2d coordinates.</p>
     * @function
     * @param {Number} y The new position in y axis
     */
    setPositionY: function (y) {
        this._position.y = y;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /**
     * Returns the amount of children.
     * @function
     * @return {Number} The amount of children.
     */
    getChildrenCount: function () {
        return this._children.length;
    },

    /**
     * Returns an array of all children  <br/>
     * Composing a "tree" structure is a very important feature of CCNode
     * @function
     * @return {Array} An array of children
     * @example
     *  //This sample code traverses all children nodes, and set their position to (0,0)
     *  var allChildren = parent.getChildren();
     *  for(var i = 0; i< allChildren.length; i++) {
     *      allChildren[i].setPosition(0,0);
     *  }
     */
    getChildren: function () {
        return this._children;
    },

    /**
     * Returns if the node is visible
     * @function
     * @see _ccsg.Node#setVisible
     * @return {Boolean} true if the node is visible, false if the node is hidden.
     */
    isVisible: function () {
        return this._visible;
    },

    /**
     * Sets whether the node is visible <br/>
     * The default value is true
     * @function
     * @param {Boolean} visible Pass true to make the node visible, false to hide the node.
     */
    setVisible: function (visible) {
        if (this._visible !== visible) {
            this._visible = visible;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
            cc.renderer.childrenOrderDirty = true;
        }
    },

    /**
     *  <p>Returns a copy of the anchor point.<br/>
     *  Anchor point is the point around which all transformations and positioning manipulations take place.<br/>
     *  It's like a pin in the node where it is "attached" to its parent. <br/>
     *  The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner. <br/>
     *  But you can use values higher than (1,1) and lower than (0,0) too.  <br/>
     *  The default anchor point is (0.5,0.5), so it starts at the center of the node. <br/></p>
     * @function
     * @return {cc.Vec2}  The anchor point of node.
     */
    getAnchorPoint: function () {
        return cc.p(this._anchorPoint);
    },

    /**
     * <p>
     *     Sets the anchor point in percent.                                                                                              <br/>
     *                                                                                                                                    <br/>
     *     anchor point is the point around which all transformations and positioning manipulations take place.                            <br/>
     *     It's like a pin in the node where it is "attached" to its parent.                                                              <br/>
     *     The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.     <br/>
     *     But you can use values higher than (1,1) and lower than (0,0) too.                                                             <br/>
     *     The default anchor point is (0.5,0.5), so it starts at the center of the node.
     * </p>
     * @function
     * @param {cc.Vec2|Number} point The anchor point of node or The x axis anchor of node.
     * @param {Number} [y] The y axis anchor of node.
     */
    setAnchorPoint: function (point, y) {
        var locAnchorPoint = this._anchorPoint;
        if (y === undefined) {
            if ((point.x === locAnchorPoint.x) && (point.y === locAnchorPoint.y))
                return;
            locAnchorPoint.x = point.x;
            locAnchorPoint.y = point.y;
        } else {
            if ((point === locAnchorPoint.x) && (y === locAnchorPoint.y))
                return;
            locAnchorPoint.x = point;
            locAnchorPoint.y = y;
        }
        this._renderCmd._updateAnchorPointInPoint();
    },

    _getAnchorX: function () {
        return this._anchorPoint.x;
    },
    _setAnchorX: function (x) {
        if (this._anchorPoint.x === x) return;
        this._anchorPoint.x = x;
        this._renderCmd._updateAnchorPointInPoint();
    },
    _getAnchorY: function () {
        return this._anchorPoint.y;
    },
    _setAnchorY: function (y) {
        if (this._anchorPoint.y === y) return;
        this._anchorPoint.y = y;
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * Returns a copy of the anchor point in absolute pixels.  <br/>
     * you can only read it. If you wish to modify it, use setAnchorPoint
     * @see _ccsg.Node#getAnchorPoint
     * @function
     * @return {cc.Vec2} The anchor point in absolute pixels.
     */
    getAnchorPointInPoints: function () {
        return this._renderCmd.getAnchorPointInPoints();
    },

    _getWidth: function () {
        return this._contentSize.width;
    },
    _setWidth: function (width) {
        this._contentSize.width = width;
        this._renderCmd._updateAnchorPointInPoint();
    },
    _getHeight: function () {
        return this._contentSize.height;
    },
    _setHeight: function (height) {
        this._contentSize.height = height;
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * <p>Returns a copy the untransformed size of the node. <br/>
     * The contentSize remains the same no matter the node is scaled or rotated.<br/>
     * All nodes has a size. Layer and Scene has the same size of the screen by default. <br/></p>
     * @function
     * @return {Size} The untransformed size of the node.
     */
    getContentSize: function () {
        return cc.size(this._contentSize);
    },

    /**
     * <p>
     *     Sets the untransformed size of the node.                                             <br/>
     *                                                                                          <br/>
     *     The contentSize remains the same no matter the node is scaled or rotated.            <br/>
     *     All nodes has a size. Layer and Scene has the same size of the screen.
     * </p>
     * @function
     * @param {cc.Size|Number} size The untransformed size of the node or The untransformed size's width of the node.
     * @param {Number} [height] The untransformed size's height of the node.
     */
    setContentSize: function (size, height) {
        var locContentSize = this._contentSize;
        if (height === undefined) {
            if ((size.width === locContentSize.width) && (size.height === locContentSize.height))
                return;
            locContentSize.width = size.width;
            locContentSize.height = size.height;
        } else {
            if ((size === locContentSize.width) && (height === locContentSize.height))
                return;
            locContentSize.width = size;
            locContentSize.height = height;
        }
        this._renderCmd._updateAnchorPointInPoint();
    },

    /**
     * <p>
     *     Returns whether or not the node accepts event callbacks.                                     <br/>
     *     Running means the node accept event callbacks like onEnter(), onExit(), update()
     * </p>
     * @function
     * @return {Boolean} Whether or not the node is running.
     */
    isRunning: function () {
        return this._running;
    },

    /**
     * Returns a reference to the parent node
     * @function
     * @return {_ccsg.Node} A reference to the parent node
     */
    getParent: function () {
        return this._parent;
    },

    /**
     * Sets the parent node
     * @param {_ccsg.Node} parent A reference to the parent node
     */
    setParent: function (parent) {
        this._parent = parent;
        var dirtyFlags = _ccsg.Node._dirtyFlags;
        this._renderCmd.setDirtyFlag(dirtyFlags.transformDirty | dirtyFlags.opacityDirty);
    },

    /**
     * Returns whether the anchor point will be ignored when you position this node.<br/>
     * When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.
     * @function
     * @see _ccsg.Node#ignoreAnchorPointForPosition
     * @return {Boolean} true if the anchor point will be ignored when you position this node.
     */
    isIgnoreAnchorPointForPosition: function () {
        return this._ignoreAnchorPointForPosition;
    },

    /**
     * <p>
     *     Sets whether the anchor point will be ignored when you position this node.                              <br/>
     *     When anchor point ignored, position will be calculated based on the origin point (0, 0) in parent's coordinates.  <br/>
     *     This is an internal method, only used by CCLayer and CCScene. Don't call it outside framework.        <br/>
     *     The default value is false, while in CCLayer and CCScene are true
     * </p>
     * @function
     * @param {Boolean} newValue true if anchor point will be ignored when you position this node
     */
    setIgnoreAnchorPointForPosition: function (newValue) {
        if (newValue !== this._ignoreAnchorPointForPosition) {
            this._ignoreAnchorPointForPosition = newValue;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        }
    },

    /**
     * Returns a tag that is used to identify the node easily.
     * @function
     * @return {Number} An integer that identifies the node.
     * @example
     *  //You can set tags to node then identify them easily.
     * // set tags
     * node1.setTag(TAG_PLAYER);
     * node2.setTag(TAG_MONSTER);
     * node3.setTag(TAG_BOSS);
     * parent.addChild(node1);
     * parent.addChild(node2);
     * parent.addChild(node3);
     * // identify by tags
     * var allChildren = parent.getChildren();
     * for(var i = 0; i < allChildren.length; i++){
     *     switch(node.getTag()) {
     *         case TAG_PLAYER:
     *             break;
     *         case TAG_MONSTER:
     *             break;
     *         case TAG_BOSS:
     *             break;
     *     }
     * }
     */
    getTag: function () {
        return this.tag;
    },

    /**
     * Changes the tag that is used to identify the node easily. <br/>
     * Please refer to getTag for the sample code.
     * @function
     * @see _ccsg.Node#getTag
     * @param {Number} tag A integer that identifies the node.
     */
    setTag: function (tag) {
        this.tag = tag;
    },

    /**
     * Changes the name that is used to identify the node easily.
     * @function
     * @param {String} name
     */
    setName: function(name){
         this._name = name;
    },

    /**
     * Returns a string that is used to identify the node.
     * @function
     * @returns {string} A string that identifies the node.
     */
    getName: function(){
        return this._name;
    },

    /**
     * <p>
     *     Update the arrival order.                             <br/>
     *                                                                                                              <br/>
     *     A node which called addChild subsequently will take a larger arrival order,                              <br/>
     *     If two children have the same Z order, the child with larger arrival order will be drawn later.
     * </p>
     * @function
     * @warning This method is used internally for zOrder sorting, don't call this method manually
     */
    updateOrderOfArrival: function () {
        this._arrivalOrder = ++cc.s_globalOrderOfArrival;
    },

    /**
     * <p>Returns the CCActionManager object that is used by all actions.<br/>
     * (IMPORTANT: If you set a new cc.ActionManager, then previously created actions are going to be removed.)</p>
     * @function
     * @see _ccsg.Node#setActionManager
     * @return {cc.ActionManager} A CCActionManager object.
     */
    getActionManager: function () {
        return this._actionManager || cc.director.getActionManager();
    },

    /**
     * <p>Sets the cc.ActionManager object that is used by all actions. </p>
     * @function
     * @warning If you set a new CCActionManager, then previously created actions will be removed.
     * @param {cc.ActionManager} actionManager A CCActionManager object that is used by all actions.
     */
    setActionManager: function (actionManager) {
        if (this._actionManager !== actionManager) {
            this.stopAllActions();
            this._actionManager = actionManager;
        }
    },

    /**
     * <p>
     *   Returns the cc.Scheduler object used to schedule all "updates" and timers.
     * </p>
     * @function
     * @return {cc.Scheduler} A CCScheduler object.
     */
    getScheduler: function () {
        return this._scheduler || cc.director.getScheduler();
    },

    /**
     * <p>
     *   Sets a CCScheduler object that is used to schedule all "updates" and timers.           <br/>
     *   IMPORTANT: If you set a new cc.Scheduler, then previously created timers/update are going to be removed.
     * </p>
     * @function
     * @warning If you set a new CCScheduler, then previously created timers/update are going to be removed.
     * @param scheduler A cc.Scheduler object that is used to schedule all "update" and timers.
     */
    setScheduler: function (scheduler) {
        if (this._scheduler !== scheduler) {
            this.unscheduleAllCallbacks();
            this._scheduler = scheduler;
        }
    },

    /**
     * Returns a "local" axis aligned bounding box of the node. <br/>
     * @deprecated since v3.0, please use getBoundingBox instead
     * @return {Rect}
     */
    boundingBox: function(){
        cc.logID(1608);
        return this.getBoundingBox();
    },

    /**
     * Returns a "local" axis aligned bounding box of the node. <br/>
     * The returned box is relative only to its parent.
     * @function
     * @return {Rect} The calculated bounding box of the node
     */
    getBoundingBox: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        return cc._rectApplyAffineTransformIn(rect, this.getNodeToParentTransform());
    },

    /**
     * Stops all running actions and schedulers
     * @function
     */
    cleanup: function () {
        // actions
        this.stopAllActions();
        this.unscheduleAllCallbacks();

        // event
        cc.eventManager.removeListeners(this);
    },

    // composition: GET
    /**
     * Returns a child from the container given its tag
     * @function
     * @param {Number} aTag An identifier to find the child node.
     * @return {_ccsg.Node} a CCNode object whose tag equals to the input parameter
     */
    getChildByTag: function (aTag) {
        var __children = this._children;
        if (__children !== null) {
            for (var i = 0; i < __children.length; i++) {
                var node = __children[i];
                if (node && node.tag === aTag)
                    return node;
            }
        }
        return null;
    },

    /**
     * Returns a child from the container given its name
     * @function
     * @param {String} name A name to find the child node.
     * @return {_ccsg.Node} a CCNode object whose name equals to the input parameter
     */
    getChildByName: function (name) {
        if (!name) {
            cc.log("Invalid name");
            return null;
        }

        var locChildren = this._children;
        for (var i = 0, len = locChildren.length; i < len; i++) {
            if (locChildren[i]._name === name)
                return locChildren[i];
        }
        return null;
    },

    // composition: ADD

    /** <p>"add" logic MUST only be in this method <br/> </p>
     *
     * <p>If the child is added to a 'running' node, then 'onEnter' and 'onEnterTransitionDidFinish' will be called immediately.</p>
     * @function
     * @param {_ccsg.Node} child  A child node
     * @param {Number} [localZOrder=]  Z order for drawing priority. Please refer to setZOrder(int)
     * @param {Number|String} [tag=]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */
    addChild: function (child, localZOrder, tag) {
        localZOrder = localZOrder === undefined ? child._localZOrder : localZOrder;
        var name, setTag = false;
        if (tag === undefined) {
            name = child._name;
        } else if (typeof tag === 'string') {
            name = tag;
            tag = undefined;
        } else if (typeof tag === 'number') {
            setTag = true;
            name = "";
        }

        cc.assertID(child, 1606);
        cc.assertID(child._parent === null, 1605);

        this._addChildHelper(child, localZOrder, tag, name, setTag);
    },

    _addChildHelper: function(child, localZOrder, tag, name, setTag){
        if(!this._children)
            this._children = [];

        this._insertChild(child, localZOrder);
        if(setTag)
            child.setTag(tag);
        else
            child.setName(name);

        child.setParent(this);
        child.updateOrderOfArrival();

        if (this._running) {
            child.performRecursive(_ccsg.Node.performType.onEnter);
            // prevent onEnterTransitionDidFinish to be called twice when a node is added in onEnter
            if (this._isTransitionFinished)
                child.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish);
        }
        child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
        if (this._cascadeColorEnabled)
            child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty);
        if (this._cascadeOpacityEnabled)
            child._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    // composition: REMOVE
    /**
     * Remove itself from its parent node. If cleanup is true, then also remove all actions and callbacks. <br/>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * If the node orphan, then nothing happens.
     * @function
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     * @see _ccsg.Node#removeFromParentAndCleanup
     */
    removeFromParent: function (cleanup) {
        if (this._parent) {
            if (cleanup === undefined)
                cleanup = true;
            this._parent.removeChild(this, cleanup);
        }
    },

    /**
     * Removes this node itself from its parent node.  <br/>
     * If the node orphan, then nothing happens.
     * @deprecated since v3.0, please use removeFromParent() instead
     * @param {Boolean} [cleanup=true] true if all actions and callbacks on this node should be removed, false otherwise.
     */
    removeFromParentAndCleanup: function (cleanup) {
        cc.logID(1607);
        this.removeFromParent(cleanup);
    },

    /** <p>Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter. </p>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * <p> "remove" logic MUST only be on this method  <br/>
     * If a class wants to extend the 'removeChild' behavior it only needs <br/>
     * to override this method </p>
     * @function
     * @param {_ccsg.Node} child  The child node which will be removed.
     * @param {Boolean} [cleanup=true]  true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     */
    removeChild: function (child, cleanup) {
        // explicit nil handling
        if (this._children.length === 0)
            return;

        if (cleanup === undefined)
            cleanup = true;
        if (this._children.indexOf(child) > -1)
            this._detachChild(child, cleanup);

        //this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.visibleDirty);
        cc.renderer.childrenOrderDirty = true;
    },

    /**
     * Removes a child from the container by tag value. It will also cleanup all running actions depending on the cleanup parameter.
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * @function
     * @param {Number} tag An integer number that identifies a child node
     * @param {Boolean} [cleanup=true] true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     * @see _ccsg.Node#removeChildByTag
     */
    removeChildByTag: function (tag, cleanup) {
        if (tag === cc.macro.NODE_TAG_INVALID)
            cc.logID(1609);

        var child = this.getChildByTag(tag);
        if (!child)
            cc.logID(1610, tag);
        else
            this.removeChild(child, cleanup);
    },

    /**
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter.
     * @param {Boolean} [cleanup=true]
     */
    removeAllChildrenWithCleanup: function (cleanup) {
        this.removeAllChildren(cleanup);
    },

    /**
     * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter. <br/>
     * If the cleanup parameter is not passed, it will force a cleanup. <br/>
     * @function
     * @param {Boolean} [cleanup=true] true if all running actions on all children nodes should be cleanup, false otherwise.
     */
    removeAllChildren: function (cleanup) {
        // not using detachChild improves speed here
        var __children = this._children;
        if (__children !== null) {
            if (cleanup === undefined)
                cleanup = true;
            for (var i = 0; i < __children.length; i++) {
                var node = __children[i];
                if (node) {
                    if (this._running) {
                        node.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart);
                        node.performRecursive(_ccsg.Node.performType.onExit);
                    }

                    // If you don't do cleanup, the node's actions will not get removed and the
                    if (cleanup)
                        node.performRecursive(_ccsg.Node.performType.cleanup);

                    // set parent nil at the end
                    node.parent = null;
                    node._renderCmd.detachFromParent();
                }
            }
            this._children.length = 0;
            cc.renderer.childrenOrderDirty = true;
        }
    },

    _detachChild: function (child, doCleanup) {
        // IMPORTANT:
        //  -1st do onExit
        //  -2nd cleanup
        if (this._running) {
            child.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart);
            child.performRecursive(_ccsg.Node.performType.onExit);
        }

        // If you don't do cleanup, the child's actions will not get removed and the
        if (doCleanup)
            child.performRecursive(_ccsg.Node.performType.cleanup);

        // set parent nil at the end
        child.parent = null;
        child._renderCmd.detachFromParent();
        cc.js.array.remove(this._children, child);
    },

    _insertChild: function (child, z) {
        cc.renderer.childrenOrderDirty = this._reorderChildDirty = true;
        this._children.push(child);
        child._setLocalZOrder(z);
    },

    setNodeDirty: function () {
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
    },

    /** Reorders a child according to a new z value. <br/>
     * The child MUST be already added.
     * @function
     * @param {_ccsg.Node} child An already added child node. It MUST be already added.
     * @param {Number} zOrder Z order for drawing priority. Please refer to setZOrder(int)
     */
    reorderChild: function (child, zOrder) {
        cc.assertID(child, 1617);
        if (this._children.indexOf(child) === -1) {
            cc.logID(1635);
            return;
        }
        if (zOrder === child.zIndex) {
            return;
        }
        cc.renderer.childrenOrderDirty = this._reorderChildDirty = true;
        child.updateOrderOfArrival();
        child._setLocalZOrder(zOrder);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.orderDirty);
    },

    /**
     * <p>
     *     Sorts the children array once before drawing, instead of every time when a child is added or reordered.    <br/>
     *     This approach can improves the performance massively.
     * </p>
     * @function
     * @note Don't call this manually unless a child added needs to be removed in the same frame
     */
    sortAllChildren: function () {
        if (this._reorderChildDirty) {
            var _children = this._children;

            // insertion sort
            var len = _children.length, i, j, tmp;
            for (i = 1; i < len; i++) {
                tmp = _children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but mutatedIndex is smaller
                while (j >= 0) {
                    if (tmp._localZOrder < _children[j]._localZOrder) {
                        _children[j + 1] = _children[j];
                    } else if (tmp._localZOrder === _children[j]._localZOrder && tmp._arrivalOrder < _children[j]._arrivalOrder) {
                        _children[j + 1] = _children[j];
                    } else {
                        break;
                    }
                    j--;
                }
                _children[j + 1] = tmp;
            }

            //don't need to check children recursively, that's done in visit of each child
            this._reorderChildDirty = false;
        }
    },

    /**
     * Render function using the canvas 2d context or WebGL context, internal usage only, please do not call this function
     * @function
     * @param {CanvasRenderingContext2D | WebGLRenderingContext} ctx The render context
     */
    draw: function (ctx) {
        // override me
        // Only use- this function to draw your staff.
        // DON'T draw your stuff outside this method
    },

    // Internal use only, do not call it by yourself,
    transformAncestors: function () {
        if (this._parent !== null) {
            this._parent.transformAncestors();
            this._parent.transform();
        }
    },

    //scene management
    /**
     * <p>
     *     Event callback that is invoked every time when CCNode enters the 'stage'.                                   <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition starts.        <br/>
     *     During onEnter you can't access a "sister/brother" node.                                                    <br/>
     *     If you override onEnter, you must call its parent's onEnter function with this._super().
     * </p>
     * @function
     */
    onEnter: function () {
        this._isTransitionFinished = false;
        this._running = true;//should be running before resumeSchedule
        this.resume();
    },

    performRecursive: function (callbackType) {
        var nodeCallbackType = _ccsg.Node.performType;
        if (callbackType >= nodeCallbackType.max) {
            return;
        }

        var index = 0;
        var children, child, curr, i, len;
        var stack = _ccsg.Node._performStacks[_ccsg.Node._performing];
        if (!stack) {
            stack = [];
            _ccsg.Node._performStacks.push(stack);
        }
        stack.length = 0;
        _ccsg.Node._performing++;
        curr = stack[0] = this;
        while (curr) {
            // Walk through children
            children = curr._children;
            if (children && children.length > 0) {
                for (i = 0, len = children.length; i < len; ++i) {
                    child = children[i];
                    stack.push(child);
                }
            }

            index++;
            curr = stack[index];
        }
        // Perform actual action
        switch (callbackType) {
        case nodeCallbackType.onEnter:
            for (i = stack.length - 1; i >= 0; --i) {
                curr = stack[i];
                stack[i] = null;
                if (!curr) continue;
                curr.onEnter();
            }
            break;
        case nodeCallbackType.onExit:
            for (i = stack.length - 1; i >= 0; --i) {
                curr = stack[i];
                stack[i] = null;
                if (!curr) continue;
                curr.onExit();
            }
            break;
        case nodeCallbackType.onEnterTransitionDidFinish:
            for (i = stack.length - 1; i >= 0; --i) {
                curr = stack[i];
                stack[i] = null;
                if (!curr) continue;
                curr.onEnterTransitionDidFinish();
            }
            break;
        case nodeCallbackType.cleanup:
            for (i = stack.length - 1; i >= 0; --i) {
                curr = stack[i];
                stack[i] = null;
                if (!curr) continue;
                curr.cleanup();
            }
            break;
        case nodeCallbackType.onExitTransitionDidStart:
            for (i = stack.length - 1; i >= 0; --i) {
                curr = stack[i];
                stack[i] = null;
                if (!curr) continue;
                curr.onExitTransitionDidStart();
            }
            break;
        }
        
        _ccsg.Node._performing--;
    },

    /**
     * <p>
     *     Event callback that is invoked when the CCNode enters in the 'stage'.                                                        <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition finishes.                       <br/>
     *     If you override onEnterTransitionDidFinish, you shall call its parent's onEnterTransitionDidFinish with this._super()
     * </p>
     * @function
     */
    onEnterTransitionDidFinish: function () {
        this._isTransitionFinished = true;
    },

    /**
     * <p>callback that is called every time the ccsg.Node leaves the 'stage'.  <br/>
     * If the ccsg.Node leaves the 'stage' with a transition, this callback is called when the transition starts. <br/>
     * If you override onExitTransitionDidStart, you shall call its parent's onExitTransitionDidStart with this._super()</p>
     * @function
     */
    onExitTransitionDidStart: function () {
    },

    /**
     * <p>
     * callback that is called every time the ccsg.Node leaves the 'stage'.                                         <br/>
     * If the ccsg.Node leaves the 'stage' with a transition, this callback is called when the transition finishes. <br/>
     * During onExit you can't access a sibling node.                                                             <br/>
     * If you override onExit, you shall call its parent's onExit with this._super().
     * </p>
     * @function
     */
    onExit: function () {
        this._running = false;
        this.pause();
    },

    // actions
    /**
     * Executes an action, and returns the action that is executed.<br/>
     * The node becomes the action's target. Refer to cc.Action's getTarget()
     * @function
     * @warning Starting from v0.8 actions don't retain their target anymore.
     * @param {cc.Action} action
     * @return {cc.Action} An Action pointer
     */
    runAction: function (action) {
        cc.assertID(action, 1618);

        this.actionManager && this.actionManager.addAction(action, this, !this._running);
        return action;
    },

    /**
     * Stops and removes all actions from the running action list .
     * @function
     */
    stopAllActions: function () {
        this.actionManager && this.actionManager.removeAllActionsFromTarget(this);
    },

    /**
     * Stops and removes an action from the running action list.
     * @function
     * @param {cc.Action} action An action object to be removed.
     */
    stopAction: function (action) {
        this.actionManager && this.actionManager.removeAction(action);
    },

    /**
     * Removes an action from the running action list by its tag.
     * @function
     * @param {Number} tag A tag that indicates the action to be removed.
     */
    stopActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.logID(1612);
            return;
        }
        this.actionManager && this.actionManager.removeActionByTag(tag, this);
    },

    /**
     * Returns an action from the running action list by its tag.
     * @function
     * @see _ccsg.Node#getTag and _ccsg.Node#setTag
     * @param {Number} tag
     * @return {cc.Action} The action object with the given tag.
     */
    getActionByTag: function (tag) {
        if (tag === cc.Action.TAG_INVALID) {
            cc.logID(1613);
            return null;
        }
        return this.actionManager ? this.actionManager.getActionByTag(tag, this) : null;
    },

    /** <p>Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).<br/>
     *    Composable actions are counted as 1 action. Example:<br/>
     *    If you are running 1 Sequence of 7 actions, it will return 1. <br/>
     *    If you are running 7 Sequences of 2 actions, it will return 7.</p>
     * @function
     * @return {Number} The number of actions that are running plus the ones that are schedule to run
     */
    getNumberOfRunningActions: function () {
        return this.actionManager ? this.actionManager.getNumberOfRunningActionsInTarget(this) : 0;
    },

    // _ccsg.Node - Callbacks
    // timers
    /**
     * <p>schedules the "update" method.                                                                           <br/>
     * It will use the order number 0. This method will be called every frame.                                  <br/>
     * Scheduled methods with a lower order value will be called before the ones that have a higher order value.<br/>
     * Only one "update" method could be scheduled per node.</p>
     * @function
     */
    scheduleUpdate: function () {
        this.scheduleUpdateWithPriority(0);
    },

    /**
     * <p>
     * schedules the "update" callback function with a custom priority.
     * This callback function will be called every frame.<br/>
     * Scheduled callback functions with a lower priority will be called before the ones that have a higher value.<br/>
     * Only one "update" callback function could be scheduled per node (You can't have 2 'update' callback functions).<br/>
     * </p>
     * @function
     * @param {Number} priority
     */
    scheduleUpdateWithPriority: function (priority) {
        this.scheduler.scheduleUpdate(this, priority, !this._running);
    },

    /**
     * Unschedules the "update" method.
     * @function
     * @see _ccsg.Node#scheduleUpdate
     */
    unscheduleUpdate: function () {
        this.scheduler.unscheduleUpdate(this);
    },

    /**
     * <p>Schedules a custom selector.         <br/>
     * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.</p>
     * @function
     * @param {function} callback A function wrapped as a selector
     * @param {Number} interval  Tick interval in seconds. 0 means tick every frame. If interval = 0, it's recommended to use scheduleUpdate() instead.
     * @param {Number} repeat    The selector will be executed (repeat + 1) times, you can use kCCRepeatForever for tick infinitely.
     * @param {Number} delay     The amount of time that the first tick will wait before execution.
     * @param {String} key The only string identifying the callback
     */
    schedule: function (callback, interval, repeat, delay, key) {
        var len = arguments.length;
        if (typeof callback === "function") {
            //callback, interval, repeat, delay, key
            if (len === 1) {
                //callback
                interval = 0;
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
                key = this.__instanceId;
            } else if (len === 2) {
                if (typeof interval === "number") {
                    //callback, interval
                    repeat = cc.macro.REPEAT_FOREVER;
                    delay = 0;
                    key = this.__instanceId;
                } else {
                    //callback, key
                    key = interval;
                    interval = 0;
                    repeat = cc.macro.REPEAT_FOREVER;
                    delay = 0;
                }
            } else if (len === 3) {
                if (typeof repeat === "string") {
                    //callback, interval, key
                    key = repeat;
                    repeat = cc.macro.REPEAT_FOREVER;
                } else {
                    //callback, interval, repeat
                    key = this.__instanceId;
                }
                delay = 0;
            } else if (len === 4) {
                key = this.__instanceId;
            }
        } else {
            //selector
            //selector, interval
            //selector, interval, repeat, delay
            if (len === 1) {
                interval = 0;
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
            } else if (len === 2) {
                repeat = cc.macro.REPEAT_FOREVER;
                delay = 0;
            }
        }

        cc.assertID(callback, 1619);
        cc.assertID(interval >= 0, 1620);

        interval = interval || 0;
        repeat = isNaN(repeat) ? cc.macro.REPEAT_FOREVER : repeat;
        delay = delay || 0;

        this.scheduler.schedule(callback, this, interval, repeat, delay, !this._running, key);
    },

    /**
     * Schedules a callback function that runs only once, with a delay of 0 or larger
     * @function
     * @see _ccsg.Node#schedule
     * @param {function} callback  A function wrapped as a selector
     * @param {Number} delay  The amount of time that the first tick will wait before execution.
     * @param {String} key The only string identifying the callback
     */
    scheduleOnce: function (callback, delay, key) {
        //selector, delay
        //callback, delay, key
        if (key === undefined)
            key = this.__instanceId;
        this.schedule(callback, 0, 0, delay, key);
    },

    /**
     * unschedules a custom callback function.
     * @function
     * @see _ccsg.Node#schedule
     * @param {function} callback_fn  A function wrapped as a selector
     */
    unschedule: function (callback_fn) {
        //key
        //selector
        if (!callback_fn)
            return;

        this.scheduler.unschedule(callback_fn, this);
    },

    /**
     * <p>unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.<br/>
     * Actions are not affected by this method.</p>
     * @function
     */
    unscheduleAllCallbacks: function () {
        this.scheduler.unscheduleAllForTarget(this);
    },

    /**
     * Resumes all scheduled selectors and actions.<br/>
     * This method is called internally by onEnter
     * @function
     * @deprecated since v3.0, please use resume() instead
     */
    resumeSchedulerAndActions: function () {
        cc.logID(1614);
        this.resume();
    },

    /**
     * <p>Resumes all scheduled selectors and actions.<br/>
     * This method is called internally by onEnter</p>
     */
    resume: function () {
        this.scheduler.resumeTarget(this);
        this.actionManager && this.actionManager.resumeTarget(this);
        cc.eventManager.resumeTarget(this);
    },

    /**
     * <p>Pauses all scheduled selectors and actions.<br/>
     * This method is called internally by onExit</p>
     * @deprecated since v3.0, please use pause instead
     * @function
     */
    pauseSchedulerAndActions: function () {
        cc.logID(1615);
        this.pause();
    },

    /**
     * <p>Pauses all scheduled selectors and actions.<br/>
     * This method is called internally by onExit</p>
     * @function
     */
    pause: function () {
        this.scheduler.pauseTarget(this);
        this.actionManager && this.actionManager.pauseTarget(this);
        cc.eventManager.pauseTarget(this);
    },

    /**
     * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.<br/>
     * The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getParentToNodeTransform: function () {
        return this._renderCmd.getParentToNodeTransform();
    },

    /**
     * @function
     * @deprecated since v3.0, please use getParentToNodeTransform instead
     */
    parentToNodeTransform: function () {
        return this.getParentToNodeTransform();
    },

    /**
     * Returns the world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getNodeToWorldTransform: function () {
        var t = this.getNodeToParentTransform();
        for (var p = this._parent; p !== null; p = p.parent)
            t = cc.affineTransformConcat(t, p.getNodeToParentTransform());
        return t;
    },

    /**
     * @function
     * @deprecated since v3.0, please use getNodeToWorldTransform instead
     */
    nodeToWorldTransform: function () {
        return this.getNodeToWorldTransform();
    },

    /**
     * Returns the inverse world affine transform matrix. The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform}
     */
    getWorldToNodeTransform: function () {
        return cc.affineTransformInvert(this.getNodeToWorldTransform());
    },

    /**
     * @function
     * @deprecated since v3.0, please use getWorldToNodeTransform instead
     */
    worldToNodeTransform: function () {
        return this.getWorldToNodeTransform();
    },

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.
     * @function
     * @param {cc.Vec2} worldPoint
     * @return {cc.Vec2}
     */
    convertToNodeSpace: function (worldPoint) {
        return cc.pointApplyAffineTransform(worldPoint, this.getWorldToNodeTransform());
    },

    /**
     * Converts a Point to world space coordinates. The result is in Points.
     * @function
     * @param {cc.Vec2} nodePoint
     * @return {cc.Vec2}
     */
    convertToWorldSpace: function (nodePoint) {
        nodePoint = nodePoint || cc.v2(0, 0);
        return cc.pointApplyAffineTransform(nodePoint, this.getNodeToWorldTransform());
    },

    /**
     * Converts a Point to node (local) space coordinates. The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {cc.Vec2} worldPoint
     * @return {cc.Vec2}
     */
    convertToNodeSpaceAR: function (worldPoint) {
        return cc.pSub(this.convertToNodeSpace(worldPoint), this._renderCmd.getAnchorPointInPoints());
    },

    /**
     * Converts a local Point to world space coordinates.The result is in Points.<br/>
     * treating the returned/received node point as anchor relative.
     * @function
     * @param {cc.Vec2} nodePoint
     * @return {cc.Vec2}
     */
    convertToWorldSpaceAR: function (nodePoint) {
        nodePoint = nodePoint || cc.v2(0, 0);
        var pt = cc.pAdd(nodePoint, this._renderCmd.getAnchorPointInPoints());
        return this.convertToWorldSpace(pt);
    },

    _convertToWindowSpace: function (nodePoint) {
        var worldPoint = this.convertToWorldSpace(nodePoint);
        return cc.director.convertToUI(worldPoint);
    },

    /** convenience methods which take a cc.Touch instead of cc.Vec2
     * @function
     * @param {cc.Touch} touch The touch object
     * @return {cc.Vec2}
     */
    convertTouchToNodeSpace: function (touch) {
        var point = touch.getLocation();
        return this.convertToNodeSpace(point);
    },

    /**
     * converts a cc.Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
     * @function
     * @param {cc.Touch} touch The touch object
     * @return {cc.Vec2}
     */
    convertTouchToNodeSpaceAR: function (touch) {
        var point = cc.director.convertToGL(touch.getLocation());
        return this.convertToNodeSpaceAR(point);
    },

    /**
     * <p>
     * Calls children's updateTransform() method recursively.                                        <br/>
     *                                                                                               <br/>
     * This method is moved from CCSprite, so it's no longer specific to CCSprite.                   <br/>
     * As the result, you apply CCSpriteBatchNode's optimization on your customed CCNode.            <br/>
     * e.g., batchNode->addChild(myCustomNode), while you can only addChild(sprite) before.
     * </p>
     * @function
     */
    updateTransform: function () {
        var children = this._children, node;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (node)
                node.updateTransform();
        }
    },

    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see _ccsg.Node#release
     */
    retain: function () {
    },
    /**
     * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
     * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
     * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
     * You will need to retain an object if you created an engine object and haven't added it into the scene graph during the same frame.<br/>
     * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
     * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
     * The retain function can increase a reference count for the native object to avoid it being released,<br/>
     * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
     * retain and release function call should be paired in developer's game code.</p>
     * @function
     * @see _ccsg.Node#retain
     */
    release: function () {
    },

    /**
     * Recursive method that visit its children and draw them
     * @function
     * @param {_ccsg.Node.RenderCmd} parentCmd
     */
    visit: function (parent) {
        var cmd = this._renderCmd, parentCmd = parent ? parent._renderCmd : null;

        // quick return if not visible
        if (!this._visible) {
            cmd._propagateFlagsDown(parentCmd);
            return;
        }

        var renderer = cc.renderer;
        cmd.visit(parentCmd);

        var i, children = this._children, len = children.length, child;
        if (len > 0) {
            if (this._reorderChildDirty) {
                this.sortAllChildren();
            }
            // draw children zOrder < 0
            for (i = 0; i < len; i++) {
                child = children[i];
                if (child._localZOrder < 0) {
                    child.visit(this);
                }
                else {
                    break;
                }
            }

            renderer.pushRenderCommand(cmd);
            for (; i < len; i++) {
                children[i].visit(this);
            }
        } else {
            renderer.pushRenderCommand(cmd);
        }
        cmd._dirtyFlag = 0;
    },

    /**
     * Performs view-matrix transformation based on position, scale, rotation and other attributes.
     * @function
     * @param {_ccsg.Node.RenderCmd} parentCmd parent's render command
     * @param {boolean} recursive whether call its children's transform
     */
    transform: function(parentCmd, recursive){
        this._renderCmd.transform(parentCmd, recursive);
    },

    /**
     * <p>Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.</p>
     * @function
     * @return {cc.AffineTransform}
     * @deprecated since v3.0, please use getNodeToParentTransform instead
     */
    nodeToParentTransform: function(){
        return this.getNodeToParentTransform();
    },

    /**
     * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
     * The matrix is in Pixels.
     * @function
     * @return {cc.AffineTransform} The affine transform object
     */
    getNodeToParentTransform: function(ancestor){
        var t = this._renderCmd.getNodeToParentTransform();
        if(ancestor){
            var T = {a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx, ty: t.ty};
            for(var p = this._parent;  p != null && p != ancestor ; p = p.getParent()){
                cc.affineTransformConcatIn(T, p.getNodeToParentTransform());
            }
            return T;
        }else{
            return t;
        }
    },

    getNodeToParentAffineTransform: function(ancestor){
        return this.getNodeToParentTransform(ancestor);
    },

    /**
     * Return the shader program currently used for this node
     * @function
     * @return {cc.GLProgram} The shader program currently used for this node
     */
    getShaderProgram: function () {
        return this._renderCmd.getShaderProgram();
    },

    /**
     * <p>
     *     Sets the shader program for this node
     *
     *     Since v2.0, each rendering node must set its shader program.
     *     It should be set in initialize phase.
     * </p>
     * @function
     * @param {cc.GLProgram} newShaderProgram The shader program which fetches from CCShaderCache.
     * @example
     * node.setGLProgram(cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLOR));
     */
    setShaderProgram: function (newShaderProgram) {
        this._renderCmd.setShaderProgram(newShaderProgram);
    },

    /**
     * Returns the state of OpenGL server side.
     * @function
     * @return {Number} The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    getGLServerState: function () {
        return 0;
    },

    /**
     * Sets the state of OpenGL server side.
     * @function
     * @param {Number} state The state of OpenGL server side.
     * @deprecated since v3.0, no need anymore
     */
    setGLServerState: function (state) {
    },

    /**
     * Returns a "world" axis aligned bounding box of the node.
     * @function
     * @return {Rect}
     */
    getBoundingBoxToWorld: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = this.getNodeToWorldTransform();
        cc._rectApplyAffineTransformIn(rect, trans);

        //query child's BoundingBox
        if (!this._children)
            return rect;

        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)
                    rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    },

    _getBoundingBoxToCurrentNode: function (parentTransform) {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = (parentTransform === undefined) ? this.getNodeToParentTransform() : cc.affineTransformConcat(this.getNodeToParentTransform(), parentTransform);
        cc._rectApplyAffineTransformIn(rect, trans);

        //query child's BoundingBox
        if (!this._children)
            return rect;

        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)
                    rect = cc.rectUnion(rect, childRect);
            }
        }
        return rect;
    },

    /**
     * Returns the opacity of Node
     * @function
     * @returns {number} opacity
     */
    getOpacity: function () {
        return this._realOpacity;
    },

    /**
     * Returns the displayed opacity of Node,
     * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
     * @function
     * @returns {number} displayed opacity
     */
    getDisplayedOpacity: function () {
        return this._renderCmd.getDisplayedOpacity();
    },

    /**
     * Sets the opacity of Node
     * @function
     * @param {Number} opacity
     */
    setOpacity: function (opacity) {
        this._realOpacity = opacity;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty);
    },

    /**
     * Update displayed opacity
     * @function
     * @param {Number} parentOpacity
     */
    updateDisplayedOpacity: function (parentOpacity) {
        //TODO  this API shouldn't be public.
        this._renderCmd._updateDisplayOpacity(parentOpacity);
    },

    /**
     * Returns whether node's opacity value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    isCascadeOpacityEnabled: function () {
        return this._cascadeOpacityEnabled;
    },

    /**
     * Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
     * @function
     * @param {boolean} cascadeOpacityEnabled
     */
    setCascadeOpacityEnabled: function (cascadeOpacityEnabled) {
        if (this._cascadeOpacityEnabled === cascadeOpacityEnabled)
            return;
        this._cascadeOpacityEnabled = cascadeOpacityEnabled;
        this._renderCmd.setCascadeOpacityEnabledDirty();
    },

    /**
     * Returns the color of Node
     * @function
     * @returns {cc.Color}
     */
    getColor: function () {
        var locRealColor = this._realColor;
        return cc.color(locRealColor.r, locRealColor.g, locRealColor.b, locRealColor.a);
    },

    /**
     * Returns the displayed color of Node,
     * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
     * @function
     * @returns {cc.Color}
     */
    getDisplayedColor: function () {
        return this._renderCmd.getDisplayedColor();
    },

    /**
     * <p>Sets the color of Node.<br/>
     * When color doesn't include opacity value like cc.color(128,128,128), this function only change the color. <br/>
     * When color include opacity like cc.color(128,128,128,100), then this function will change the color and the opacity.</p>
     * @function
     * @param {cc.Color} color The new color given
     */
    setColor: function (color) {
        var locRealColor = this._realColor;
        locRealColor.r = color.r;
        locRealColor.g = color.g;
        locRealColor.b = color.b;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty);
    },

    /**
     * Update the displayed color of Node
     * @function
     * @param {cc.Color} parentColor
     */
    updateDisplayedColor: function (parentColor) {
        //TODO  this API shouldn't be public.
        this._renderCmd._updateDisplayColor(parentColor);
    },

    /**
     * Returns whether node's color value affect its child nodes.
     * @function
     * @returns {boolean}
     */
    isCascadeColorEnabled: function () {
        return this._cascadeColorEnabled;
    },

    /**
     * Enable or disable cascade color, if cascade enabled, child nodes' opacity will be the cascade value of parent color and its own color.
     * @param {boolean} cascadeColorEnabled
     */
    setCascadeColorEnabled: function (cascadeColorEnabled) {
        if (this._cascadeColorEnabled === cascadeColorEnabled)
            return;
        this._cascadeColorEnabled = cascadeColorEnabled;
        this._renderCmd.setCascadeColorEnabledDirty();
    },

    /**
     * Set whether color should be changed with the opacity value,
     * useless in ccsg.Node, but this function is override in some class to have such behavior.
     * @function
     * @param {Boolean} opacityValue
     */
    setOpacityModifyRGB: function (opacityValue) {
    },

    /**
     * Get whether color should be changed with the opacity value
     * @function
     * @return {Boolean}
     */
    isOpacityModifyRGB: function () {
        return false;
    },

    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.Node.CanvasRenderCmd(this);
        else
            return new _ccsg.Node.WebGLRenderCmd(this);
    }
});

_ccsg.Node.extend = cc._Class.extend;

// to support calling this._super in sub class
_ccsg.Node.prototype.ctor = _ccsg.Node;

_ccsg.Node.performType = {
    onEnter: 1,
    onExit: 2,
    cleanup: 3,
    onEnterTransitionDidFinish: 4,
    onExitTransitionDidStart: 5,
    max: 6
};
_ccsg.Node._performStacks = [[]];
_ccsg.Node._performing = 0;

cc.assertID(typeof cc._tmp.PrototypeCCNode === 'function', 3200, "BaseNodesPropertyDefine.js");
cc._tmp.PrototypeCCNode();
delete cc._tmp.PrototypeCCNode;

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

//---------------------- Customer render cmd --------------------
cc.CustomRenderCmd = function (target, func) {
    this._needDraw = true;
    this._target = target;
    this._callback = func;
};
cc.CustomRenderCmd.prototype.rendering = function (ctx, scaleX, scaleY) {
    if (!this._callback)
        return;
    this._callback.call(this._target, ctx, scaleX, scaleY);
};

var dirtyFlags = _ccsg.Node._dirtyFlags = {
    transformDirty: 1 << 0,
    visibleDirty:   1 << 1,
    colorDirty:     1 << 2,
    opacityDirty:   1 << 3,
    cacheDirty:     1 << 4,
    orderDirty:     1 << 5,
    textDirty:      1 << 6,
    gradientDirty:  1 << 7,
    textureDirty:   1 << 8,
    contentDirty:   1 << 9,
    COUNT: 9
};
cc.js.get(dirtyFlags, 'all', function () {
    var count = dirtyFlags.COUNT;
    return (1 << count) - 1;
}, false);
_ccsg.Node._requestDirtyFlag = function (key) {
    cc.assertID(!dirtyFlags[key], 1622, key);

    var count = dirtyFlags.COUNT;
    var value = 1 << count;
    dirtyFlags[key] = value;
    dirtyFlags.COUNT++;
    return value;
};

var ONE_DEGREE = Math.PI / 180;

function transformChildTree (root) {
    var index = 1;
    var children, child, curr, parentCmd, i, len;
    var stack = _ccsg.Node._performStacks[_ccsg.Node._performing];
    if (!stack) {
        stack = [];
        _ccsg.Node._performStacks.push(stack);
    }
    stack.length = 0;
    _ccsg.Node._performing++;
    stack[0] = root;
    while (index) {
        index--;
        curr = stack[index];
        // Avoid memory leak
        stack[index] = null;
        if (!curr) continue;
        children = curr._children;
        if (children && children.length > 0) {
            parentCmd = curr._renderCmd;
            for (i = 0, len = children.length; i < len; ++i) {
                child = children[i];
                stack[index] = child;
                index++;
                child._renderCmd.transform(parentCmd);
            }
        }
    }
    _ccsg.Node._performing--;
}

//-------------------------Base -------------------------
_ccsg.Node.RenderCmd = function (renderable) {
    this._node = renderable;
    this._anchorPointInPoints = new cc.Vec2(0, 0);

    this._needDraw = false;
    this._dirtyFlag = 1;
    this._curLevel = -1;

    this._displayedColor = new cc.Color(255, 255, 255, 255);
    this._displayedOpacity = 255;
    this._cascadeColorEnabledDirty = false;
    this._cascadeOpacityEnabledDirty = false;

    this._transform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    this._worldTransform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    this._inverse = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    this._transformUpdated = false;
    
    cc.renderer.pushDirtyNode(this);
};

_ccsg.Node.RenderCmd.prototype = {
    constructor: _ccsg.Node.RenderCmd,

    _ctor: _ccsg.Node.RenderCmd,

    getAnchorPointInPoints: function(){
        return cc.p(this._anchorPointInPoints);
    },

    getDisplayedColor: function(){
        var tmpColor = this._displayedColor;
        return cc.color(tmpColor.r, tmpColor.g, tmpColor.b, tmpColor.a);
    },

    getDisplayedOpacity: function(){
        return this._displayedOpacity;
    },

    setCascadeColorEnabledDirty: function(){
        this._cascadeColorEnabledDirty = true;
        this.setDirtyFlag(dirtyFlags.colorDirty);
    },

    setCascadeOpacityEnabledDirty:function(){
        this._cascadeOpacityEnabledDirty = true;
        this.setDirtyFlag(dirtyFlags.opacityDirty);
    },

    getParentToNodeTransform: function(){
        if (this._dirtyFlag & dirtyFlags.transformDirty) {
            cc.affineTransformInvertOut(this.getNodeToParentTransform(), this._inverse);
        }
        return this._inverse;
    },

    detachFromParent: function(){},

    _updateAnchorPointInPoint: function() {
        var locAPP = this._anchorPointInPoints, locSize = this._node._contentSize, locAnchorPoint = this._node._anchorPoint;
        locAPP.x = locSize.width * locAnchorPoint.x;
        locAPP.y = locSize.height * locAnchorPoint.y;
        this.setDirtyFlag(dirtyFlags.transformDirty);
    },

    setDirtyFlag: function(dirtyFlag){
        if (this._dirtyFlag === 0 && dirtyFlag !== 0)
            cc.renderer.pushDirtyNode(this);
        this._dirtyFlag |= dirtyFlag;
    },

    getParentRenderCmd: function(){
        if(this._node && this._node._parent && this._node._parent._renderCmd)
            return this._node._parent._renderCmd;
        return null;
    },

    transform: function (parentCmd, recursive) {
        var node = this._node,
            pt = parentCmd ? parentCmd._worldTransform : null,
            t = this._transform,
            wt = this._worldTransform;         //get the world transform

        if (!this._transformUpdated) {
            var hasRotation = node._rotationX || node._rotationY;
            var hasSkew = node._skewX || node._skewY;
            var sx = node._scaleX, sy = node._scaleY;
            var appX = this._anchorPointInPoints.x, appY = this._anchorPointInPoints.y;
            var a = 1, b = 0, c = 0, d = 1;
            if (hasRotation || hasSkew) {
                // position
                t.tx = node._position.x;
                t.ty = node._position.y;

                // rotation
                if (hasRotation) {
                    var rotationRadiansX = node._rotationX * ONE_DEGREE;
                    c = Math.sin(rotationRadiansX);
                    d = Math.cos(rotationRadiansX);
                    if (node._rotationY === node._rotationX) {
                        a = d;
                        b = -c;
                    }
                    else {
                        var rotationRadiansY = node._rotationY * ONE_DEGREE;
                        a = Math.cos(rotationRadiansY);
                        b = -Math.sin(rotationRadiansY);
                    }
                }

                // scale
                t.a = a *= sx;
                t.b = b *= sx;
                t.c = c *= sy;
                t.d = d *= sy;

                // skew
                if (hasSkew) {
                    var skx = Math.tan(node._skewX * ONE_DEGREE);
                    var sky = Math.tan(node._skewY * ONE_DEGREE);
                    if (skx === Infinity)
                        skx = 99999999;
                    if (sky === Infinity)
                        sky = 99999999;
                    t.a = a + c * sky;
                    t.b = b + d * sky;
                    t.c = c + a * skx;
                    t.d = d + b * skx;
                }

                if (appX || appY) {
                    t.tx -= t.a * appX + t.c * appY;
                    t.ty -= t.b * appX + t.d * appY;
                    // adjust anchorPoint
                    if (node._ignoreAnchorPointForPosition) {
                        t.tx += appX;
                        t.ty += appY;
                    }
                }
            }
            else {
                t.a = sx;
                t.b = 0;
                t.c = 0;
                t.d = sy;
                t.tx = node._position.x;
                t.ty = node._position.y;

                if (appX || appY) {
                    t.tx -= t.a * appX;
                    t.ty -= t.d * appY;
                    // adjust anchorPoint
                    if (node._ignoreAnchorPointForPosition) {
                        t.tx += appX;
                        t.ty += appY;
                    }
                }
            }
        }

        // update world transform
        if (pt) {
            wt.a  = t.a  * pt.a + t.b  * pt.c;
            wt.b  = t.a  * pt.b + t.b  * pt.d;
            wt.c  = t.c  * pt.a + t.d  * pt.c;
            wt.d  = t.c  * pt.b + t.d  * pt.d;
            wt.tx = t.tx * pt.a + t.ty * pt.c + pt.tx;
            wt.ty = t.tx * pt.b + t.ty * pt.d + pt.ty;
        } else {
            wt.a = t.a;
            wt.b = t.b;
            wt.c = t.c;
            wt.d = t.d;
            wt.tx = t.tx;
            wt.ty = t.ty;
        }

        if (this._currentRegion) {
            this._updateCurrentRegions();
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble);
        }

        if (recursive) {
            transformChildTree(node);
        }
    },

    getNodeToParentTransform: function () {
        if (this._dirtyFlag & dirtyFlags.transformDirty) {
            this.transform();
        }
        return this._transform;
    },

    setNodeToParentTransform: function(transform) {
        if (transform) {
            // use specified transform
            this._transform = transform;
            this._transformUpdated = true;
        } else {
            // not use the specified transform
            this._transformUpdated = false;
        }
        this.setDirtyFlag(dirtyFlags.transformDirty);
    },

    _propagateFlagsDown: function(parentCmd) {
        //return;
        var locFlag = this._dirtyFlag;
        var parentNode = parentCmd ? parentCmd._node : null;

        //  There is a possibility:
        //    The parent element changed color, child element not change
        //    This will cause the parent element changed color
        //    But while the child element does not enter the circulation
        //    Here will be reset state in last
        //    In order the child elements get the parent state
        if(parentNode && parentNode._cascadeColorEnabled && (parentCmd._dirtyFlag & dirtyFlags.colorDirty))
            locFlag |= dirtyFlags.colorDirty;

        if(parentNode && parentNode._cascadeOpacityEnabled && (parentCmd._dirtyFlag & dirtyFlags.opacityDirty))
            locFlag |= dirtyFlags.opacityDirty;

        if(parentCmd && (parentCmd._dirtyFlag & dirtyFlags.transformDirty))
            locFlag |= dirtyFlags.transformDirty;

        this._dirtyFlag = locFlag;
    },

    visit: function (parentCmd) {
        var node = this._node, renderer = cc.renderer;

        parentCmd = parentCmd || this.getParentRenderCmd();
        if (parentCmd) {
            this._curLevel = parentCmd._curLevel + 1;
        }
        this._propagateFlagsDown(parentCmd);

        if (isNaN(node._customZ)) {
            node._vertexZ = renderer.assignedZ;
            renderer.assignedZ += renderer.assignedZStep;
        }

        this._syncStatus(parentCmd);
    },

    _updateDisplayColor: function (parentColor) {
        var node = this._node;
        var locDispColor = this._displayedColor, locRealColor = node._realColor;
        var i, len, selChildren, item;
        this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
        if (this._cascadeColorEnabledDirty && !node._cascadeColorEnabled) {
            locDispColor.r = locRealColor.r;
            locDispColor.g = locRealColor.g;
            locDispColor.b = locRealColor.b;
            var whiteColor = new cc.Color(255, 255, 255, 255);
            selChildren = node._children;
            for (i = 0, len = selChildren.length; i < len; i++) {
                item = selChildren[i];
                if (item && item._renderCmd)
                    item._renderCmd._updateDisplayColor(whiteColor);
            }
            this._cascadeColorEnabledDirty = false;
        } else {
            if (parentColor === undefined) {
                var locParent = node._parent;
                if (locParent && locParent._cascadeColorEnabled)
                    parentColor = locParent.getDisplayedColor();
                else
                    parentColor = cc.Color.WHITE;
            }
            locDispColor.r = 0 | (locRealColor.r * parentColor.r / 255.0);
            locDispColor.g = 0 | (locRealColor.g * parentColor.g / 255.0);
            locDispColor.b = 0 | (locRealColor.b * parentColor.b / 255.0);
            if (node._cascadeColorEnabled) {
                selChildren = node._children;
                for (i = 0, len = selChildren.length; i < len; i++) {
                    item = selChildren[i];
                    if (item && item._renderCmd){
                        item._renderCmd._updateDisplayColor(locDispColor);
                        item._renderCmd._updateColor();
                    }
                }
            }
        }
        this._dirtyFlag &= ~dirtyFlags.colorDirty;
    },

    _updateDisplayOpacity: function (parentOpacity) {
        var node = this._node;
        var i, len, selChildren, item;
        this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
        if (this._cascadeOpacityEnabledDirty && !node._cascadeOpacityEnabled) {
            this._displayedOpacity = node._realOpacity;
            selChildren = node._children;
            for (i = 0, len = selChildren.length; i < len; i++) {
                item = selChildren[i];
                if (item && item._renderCmd)
                    item._renderCmd._updateDisplayOpacity(255);
            }
            this._cascadeOpacityEnabledDirty = false;
        } else {
            if (parentOpacity === undefined) {
                var locParent = node._parent;
                parentOpacity = 255;
                if (locParent && locParent._cascadeOpacityEnabled)
                    parentOpacity = locParent.getDisplayedOpacity();
            }
            this._displayedOpacity = node._realOpacity * parentOpacity / 255.0;
            if (node._cascadeOpacityEnabled) {
                selChildren = node._children;
                for (i = 0, len = selChildren.length; i < len; i++) {
                    item = selChildren[i];
                    if (item && item._renderCmd){
                        item._renderCmd._updateDisplayOpacity(this._displayedOpacity);
                        item._renderCmd._updateColor();
                    }
                }
            }
        }
        this._dirtyFlag &= ~dirtyFlags.opacityDirty;
    },

    _syncDisplayColor : function (parentColor) {
        var node = this._node, locDispColor = this._displayedColor, locRealColor = node._realColor;
        if (parentColor === undefined) {
            var locParent = node._parent;
            if (locParent && locParent._cascadeColorEnabled)
                parentColor = locParent.getDisplayedColor();
            else
                parentColor = cc.Color.WHITE;
        }
        locDispColor.r = 0 | (locRealColor.r * parentColor.r / 255.0);
        locDispColor.g = 0 | (locRealColor.g * parentColor.g / 255.0);
        locDispColor.b = 0 | (locRealColor.b * parentColor.b / 255.0);
    },

    _syncDisplayOpacity : function (parentOpacity) {
        var node = this._node;
        if (parentOpacity === undefined) {
            var locParent = node._parent;
            parentOpacity = 255;
            if (locParent && locParent._cascadeOpacityEnabled)
                parentOpacity = locParent.getDisplayedOpacity();
        }
        this._displayedOpacity = node._realOpacity * parentOpacity / 255.0;
    },

    _updateColor: function(){},

    updateStatus: function () {
        var locFlag = this._dirtyFlag;
        var colorDirty = locFlag & dirtyFlags.colorDirty,
            opacityDirty = locFlag & dirtyFlags.opacityDirty;

        if (locFlag & dirtyFlags.contentDirty) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._dirtyFlag &= ~dirtyFlags.contentDirty;
        }

        if (colorDirty)
            this._updateDisplayColor();

        if (opacityDirty)
            this._updateDisplayOpacity();

        if (colorDirty || opacityDirty)
            this._updateColor();

        if (locFlag & dirtyFlags.transformDirty) {
            //update the transform
            this.transform(this.getParentRenderCmd(), true);
            this._dirtyFlag &= ~dirtyFlags.transformDirty;
        }
    },

    _syncStatus: function (parentCmd) {
        //  In the visit logic does not restore the _dirtyFlag
        //  Because child elements need parent's _dirtyFlag to change himself
        var locFlag = this._dirtyFlag;

        var colorDirty = locFlag & dirtyFlags.colorDirty,
            opacityDirty = locFlag & dirtyFlags.opacityDirty;

        if (colorDirty)
            //update the color
            this._syncDisplayColor();

        if (opacityDirty)
            //update the opacity
            this._syncDisplayOpacity();

        if (colorDirty || opacityDirty)
            this._updateColor();

        if (locFlag & dirtyFlags.transformDirty)
            //update the transform
            this.transform(parentCmd);
    }
};

_ccsg.Node.RenderCmd.prototype.originTransform = _ccsg.Node.RenderCmd.prototype.transform;
_ccsg.Node.RenderCmd.prototype.originUpdateStatus = _ccsg.Node.RenderCmd.prototype.updateStatus;
_ccsg.Node.RenderCmd.prototype._originSyncStatus = _ccsg.Node.RenderCmd.prototype._syncStatus;

//-----------------------Canvas ---------------------------

//The _ccsg.Node's render command for Canvas
_ccsg.Node.CanvasRenderCmd = function (renderable) {
    this._ctor(renderable);

    this._currentRegion = new cc.Region();
    this._oldRegion = new cc.Region();
    this._regionFlag = 0;
};

_ccsg.Node.CanvasRenderCmd.RegionStatus = {
    NotDirty: 0,    //the region is not dirty
    Dirty: 1,       //the region is dirty, because of color, opacity or context
    DirtyDouble: 2  //the region is moved, the old and the new one need considered when rendering
};

var proto = _ccsg.Node.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
proto.constructor = _ccsg.Node.CanvasRenderCmd;
proto._rootCtor = _ccsg.Node.CanvasRenderCmd;
proto._notifyRegionStatus = function(status) {
    if (this._needDraw && this._regionFlag < status) {
        this._regionFlag = status;
    }
};

var localBB = new cc.Rect();
proto.getLocalBB = function() {
    var node = this._node;
    localBB.x = localBB.y = 0;
    localBB.width = node._contentSize.width;
    localBB.height = node._contentSize.height;
    return localBB;
};

proto._updateCurrentRegions = function() {
    var temp = this._currentRegion;
    this._currentRegion = this._oldRegion;
    this._oldRegion = temp;
    //hittest will call the transform, and set region flag to DirtyDouble, and the changes need to be considered for rendering
    if(_ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble === this._regionFlag && (!this._currentRegion.isEmpty())) {
        this._oldRegion.union(this._currentRegion);
    }
    this._currentRegion.updateRegion(this.getLocalBB(), this._worldTransform);
};

proto.detachFromParent = function () {
    var selChildren = this._node._children, item;
    for (var i = 0, len = selChildren.length; i < len; i++) {
        item = selChildren[i];
        if (item && item._renderCmd)
            item._renderCmd.detachFromParent();
    }
};

proto.setShaderProgram = function (shaderProgram) {
    //do nothing.
};

proto.getShaderProgram = function () {
    return null;
};

//util functions
_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc = function (blendFunc) {
    if (!blendFunc)
        return "source-over";
    else {
        if (( blendFunc.src === cc.macro.SRC_ALPHA && blendFunc.dst === cc.macro.ONE) || (blendFunc.src === cc.macro.ONE && blendFunc.dst === cc.macro.ONE))
            return "lighter";
        else if (blendFunc.src === cc.macro.ZERO && blendFunc.dst === cc.macro.SRC_ALPHA)
            return "destination-in";
        else if (blendFunc.src === cc.macro.ZERO && blendFunc.dst === cc.macro.ONE_MINUS_SRC_ALPHA)
            return "destination-out";
        else
            return "source-over";
    }
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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
// ------------------------------ The ccsg.Node's render command for WebGL ----------------------------------

_ccsg.Node.WebGLRenderCmd = function (renderable) {
    this._ctor(renderable);
    this._shaderProgram = null;
};

var proto = _ccsg.Node.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
proto.constructor = _ccsg.Node.WebGLRenderCmd;
proto._rootCtor = _ccsg.Node.WebGLRenderCmd;

proto._updateColor = function(){};

proto.setShaderProgram = function (shaderProgram) {
    this._shaderProgram = shaderProgram;
};

proto.getShaderProgram = function () {
    return this._shaderProgram;
};

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

/**
 * <p>ccsg.Scene is a subclass of ccsg.Node that is used only as an abstract concept.</p>
 *  <p>ccsg.Scene and ccsg.Node are almost identical with the difference that ccsg.Scene has it's
 * anchor point (by default) at the center of the screen.</p>
 *
 * <p>For the moment ccsg.Scene has no other logic than that, but in future releases it might have
 * additional logic.</p>
 *
 * <p>It is a good practice to use and ccsg.Scene as the parent of all your nodes.</p>
 * @class
 * @extends _ccsg.Node
 * @example
 * var scene = new _ccsg.Scene();
 */
_ccsg.Scene = _ccsg.Node.extend(/** @lends _ccsg.Scene# */{
    /**
     * Constructor of _ccsg.Scene
     */
    _className:"Scene",
    ctor:function () {
        _ccsg.Node.prototype.ctor.call(this);
        this._ignoreAnchorPointForPosition = true;
        this.setAnchorPoint(0.5, 0.5);
        this.setContentSize(cc.director.getWinSize());
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * cc.configuration is a singleton object which contains some openGL variables
 * @class
 * @name cc.configuration
 * @example
 * var textureSize = cc.configuration.getMaxTextureSize();
 */
cc.configuration = /** @lends cc.configuration# */{
	// Type constants
	/*
	 * ERROR type
	 * @public
	 * @const
	 * @type {Number}
	 */
	ERROR:0,

	/*
	 * STRING type
	 * @public
	 * @const
	 * @type {Number}
	 */
	STRING:1,

	/*
	 * INT type
	 * @public
	 * @const
	 * @type {Number}
	 */
	INT:2,

	/*
	 * DOUBLE type
	 * @public
	 * @const
	 * @type {Number}
	 */
	DOUBLE:3,

	/*
	 * BOOLEAN type
	 * @public
	 * @const
	 * @type {Number}
	 */
	BOOLEAN:4,

    _maxTextureSize:0,
    _maxModelviewStackDepth:0,
    _supportsPVRTC:false,
    _supportsNPOT:false,
    _supportsBGRA8888:false,
    _supportsDiscardFramebuffer:false,
    _supportsShareableVAO:false,
    _maxSamplesAllowed:0,
    _maxTextureUnits:0,
    _GlExtensions:"",
    _valueDict:{},

	_inited: false,

	_init:function () {
		var locValueDict = this._valueDict;
		locValueDict["cocos2d.x.version"] = cc.ENGINE_VERSION;
		locValueDict["cocos2d.x.compiled_with_profiler"] = false;
		locValueDict["cocos2d.x.compiled_with_gl_state_cache"] = cc.macro.ENABLE_GL_STATE_CACHE;
		this._inited = true;
	},

    /**
     * OpenGL Max texture size.
     * @return {Number}
     */
    getMaxTextureSize:function () {
        return this._maxTextureSize;
    },

    /**
     * OpenGL Max Modelview Stack Depth.
     * @return {Number}
     */
    getMaxModelviewStackDepth:function () {
        return this._maxModelviewStackDepth;
    },

    /**
     * returns the maximum texture units
     * @return {Number}
     */
    getMaxTextureUnits:function () {
        return this._maxTextureUnits;
    },

    /**
     * Whether or not the GPU supports NPOT (Non Power Of Two) textures.
     * OpenGL ES 2.0 already supports NPOT (iOS).
     * @return {Boolean}
     */
    supportsNPOT:function () {
        return this._supportsNPOT;
    },

    /**
     * Whether or not PVR Texture Compressed is supported
     * @return {Boolean}
     */
    supportsPVRTC: function () {
        return this._supportsPVRTC;
    },

	/**
	 * Whether or not ETC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsETC: function() {
		return false;
	},

	/**
	 * Whether or not S3TC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsS3TC: function() {
		return false;
	},

	/**
	 * Whether or not ATITC Texture Compressed is supported
	 * @return {Boolean}
	 */
	supportsATITC: function() {
		return false;
	},

    /**
     * Whether or not BGRA8888 textures are supported.
     * @return {Boolean}
     */
    supportsBGRA8888:function () {
        return this._supportsBGRA8888;
    },

    /**
     * Whether or not glDiscardFramebufferEXT is supported
     * @return {Boolean}
     */
    supportsDiscardFramebuffer:function () {
        return this._supportsDiscardFramebuffer;
    },

    /**
     * Whether or not shareable VAOs are supported.
     * @return {Boolean}
     */
    supportsShareableVAO:function () {
        return this._supportsShareableVAO;
    },

    /**
     * returns whether or not an OpenGL is supported
     * @param {String} searchName
     */
    checkForGLExtension:function (searchName) {
        return this._GlExtensions.indexOf(searchName) > -1;
    },

    /**
     * Returns the value of a given key.  If the key is not found, it will return the default value
     * @param {String} key
     * @param {String|Bool|Number|Object} [default_value=null]
     * @returns {String|Bool|Number|Object}
     */
    getValue: function(key, default_value){
	    if(!this._inited)
		    this._init();
        var locValueDict = this._valueDict;
        if(locValueDict[key])
            return locValueDict[key];
        return default_value;
    },

    /**
     * Sets a new key/value pair  in the configuration dictionary
     * @param {string} key
     * @param {String|Bool|Number|Object} value
     */
    setValue: function(key, value){
        this._valueDict[key] = value;
    },

    /**
     * gathers OpenGL / GPU information
     */
    gatherGPUInfo: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return;

	    if(!this._inited)
		    this._init();
        var gl = cc._renderContext;
        var locValueDict = this._valueDict;
        locValueDict["gl.vendor"] = gl.getParameter(gl.VENDOR);
        locValueDict["gl.renderer"] = gl.getParameter(gl.RENDERER);
        locValueDict["gl.version"] = gl.getParameter(gl.VERSION);

        this._GlExtensions = "";
        var extArr = gl.getSupportedExtensions();
        for (var i = 0; i < extArr.length; i++)
            this._GlExtensions += extArr[i] + " ";

        this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        locValueDict["gl.max_texture_size"] = this._maxTextureSize;
        this._maxTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        locValueDict["gl.max_texture_units"] = this._maxTextureUnits;

        this._supportsPVRTC = this.checkForGLExtension("GL_IMG_texture_compression_pvrtc");
        locValueDict["gl.supports_PVRTC"] = this._supportsPVRTC;

        this._supportsNPOT = false; //true;
        locValueDict["gl.supports_NPOT"] = this._supportsNPOT;

        this._supportsBGRA8888 = this.checkForGLExtension("GL_IMG_texture_format_BGRA888");
        locValueDict["gl.supports_BGRA8888"] = this._supportsBGRA8888;

        this._supportsDiscardFramebuffer = this.checkForGLExtension("GL_EXT_discard_framebuffer");
        locValueDict["gl.supports_discard_framebuffer"] = this._supportsDiscardFramebuffer;

        this._supportsShareableVAO = this.checkForGLExtension("vertex_array_object");
        locValueDict["gl.supports_vertex_array_object"] = this._supportsShareableVAO;

        cc.checkGLErrorDebug();
    },

    /**
     * Loads a config file. If the keys are already present, then they are going to be replaced. Otherwise the new keys are added.
     * @param {string} url
     */
    loadConfigFile: function( url){
        if(!this._inited)
            this._init();
        var dict = cc.loader.getRes(url);
        if(!dict) throw new Error("Please load the resource first : " + url);
        cc.assertID(dict, 1101, url);

        var getDatas = dict["data"];
        if(!getDatas){
            cc.logID(1100, url);
            return;
        }

        // Add all keys in the existing dictionary
        for(var selKey in getDatas)
            this._valueDict[selKey] = getDatas[selKey];
    }
};
/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * Canvas of DrawingPrimitive implement version use for canvasMode
 * @class DrawingPrimitiveCanvas
 * @extends cc._Class
 * @param {CanvasRenderingContext2D} renderContext
 */
cc.DrawingPrimitiveCanvas = cc._Class.extend(/** @lends cc.DrawingPrimitiveCanvas# */{
    _cacheArray:[],

    /**
     * Constructor of cc.DrawingPrimitiveCanvas
     * @param {cc.CanvasContextWrapper} renderContext
     */
    ctor:function (renderContext) {
        this._renderContext = renderContext;
    },

    /**
     * draws a point given x and y coordinate measured in points
     * @override
     * @param {cc.Vec2} point
     * @param {Number} size
     */
    drawPoint:function (point, size) {
        if (!size) {
            size = 1;
        }
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        var newPoint = cc.p(point.x  * locScaleX, point.y * locScaleY);
        var ctx = this._renderContext.getContext();
        ctx.beginPath();
        ctx.arc(newPoint.x, -newPoint.y, size * locScaleX, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    /**
     * draws an array of points.
     * @override
     * @param {Array} points point of array
     * @param {Number} numberOfPoints
     * @param {Number} size
     */
    drawPoints:function (points, numberOfPoints, size) {
        if (points == null)
            return;

        if (!size) {
            size = 1;
        }
        var locContext = this._renderContext.getContext(),locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();

        locContext.beginPath();
        for (var i = 0, len = points.length; i < len; i++)
            locContext.arc(points[i].x * locScaleX, -points[i].y * locScaleY, size * locScaleX, 0, Math.PI * 2, false);
        locContext.closePath();
        locContext.fill();
    },

    /**
     * draws a line given the origin and destination point measured in points
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawLine:function (origin, destination) {
        var locContext = this._renderContext.getContext(), locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        locContext.moveTo(origin.x * locScaleX, -origin.y * locScaleY);
        locContext.lineTo(destination.x * locScaleX, -destination.y * locScaleY);
        locContext.closePath();
        locContext.stroke();
    },

    /**
     * draws a rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawRect:function (origin, destination) {
        //todo need optimize for performance
        this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
        this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
        this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
        this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y));
    },

    /**
     * draws a solid rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     * @param {cc.Color} color
     */
    drawSolidRect:function (origin, destination, color) {
        var vertices = [
            origin,
            cc.p(destination.x, origin.y),
            destination,
            cc.p(origin.x, destination.y)
        ];

        this.drawSolidPoly(vertices, 4, color);
    },

    /**
     * draws a polygon given a pointer to cc.Vec2 coordinates and the number of vertices measured in points.
     * @override
     * @param {Array} vertices a pointer to cc.Vec2 coordinates
     * @param {Number} numOfVertices the number of vertices measured in points
     * @param {Boolean} closePolygon The polygon can be closed or open
     * @param {Boolean} [fill=] The polygon can be closed or open and optionally filled with current color
     */
    drawPoly:function (vertices, numOfVertices, closePolygon, fill) {
        fill = fill || false;

        if (vertices == null)
            return;

        if (vertices.length < 3)
            throw new Error("Polygon's point must greater than 2");

        var firstPoint = vertices[0], locContext = this._renderContext.getContext();
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        locContext.moveTo(firstPoint.x * locScaleX, -firstPoint.y * locScaleY);
        for (var i = 1, len = vertices.length; i < len; i++)
            locContext.lineTo(vertices[i].x * locScaleX, -vertices[i].y * locScaleY);

        if (closePolygon)
            locContext.closePath();

        if (fill)
            locContext.fill();
        else
            locContext.stroke();
    },

    /**
     * draws a solid polygon given a pointer to CGPoint coordinates, the number of vertices measured in points, and a color.
     * @param {Array} polygons
     * @param {Number} numberOfPoints
     * @param {cc.Color} color
     */
    drawSolidPoly:function (polygons, numberOfPoints, color) {
        this.setDrawColor(color.r, color.g, color.b, color.a);
        this.drawPoly(polygons, numberOfPoints, true, true);
    },

    /**
     * draws a circle given the center, radius and number of segments.
     * @override
     * @param {cc.Vec2} center center of circle
     * @param {Number} radius
     * @param {Number} angle angle in radians
     * @param {Number} segments
     * @param {Boolean} [drawLineToCenter=]
     */
    drawCircle: function (center, radius, angle, segments, drawLineToCenter) {
        drawLineToCenter = drawLineToCenter || false;
        var locContext = this._renderContext.getContext();
        var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
        locContext.beginPath();
        var endAngle = angle - Math.PI * 2;
        locContext.arc(0 | (center.x * locScaleX), 0 | -(center.y * locScaleY), radius * locScaleX, -angle, -endAngle, false);
        if (drawLineToCenter) {
            locContext.lineTo(0 | (center.x * locScaleX), 0 | -(center.y * locScaleY));
        }
        locContext.stroke();
    },

    /**
     * draws a quad bezier path
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawQuadBezier:function (origin, control, destination, segments) {
        //this is OpenGL Algorithm
        var vertices = this._cacheArray;
        vertices.length =0;

        var t = 0.0;
        for (var i = 0; i < segments; i++) {
            var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
            var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
            vertices.push(cc.p(x, y));
            t += 1.0 / segments;
        }
        vertices.push(cc.p(destination.x, destination.y));

        this.drawPoly(vertices, segments + 1, false, false);
    },

    /**
     * draws a cubic bezier path
     * @override
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control1
     * @param {cc.Vec2} control2
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawCubicBezier:function (origin, control1, control2, destination, segments) {
        //this is OpenGL Algorithm
        var vertices = this._cacheArray;
        vertices.length =0;

        var t = 0;
        for (var i = 0; i < segments; i++) {
            var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
            var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
            vertices.push(cc.p(x , y ));
            t += 1.0 / segments;
        }
        vertices.push(cc.p(destination.x , destination.y));

        this.drawPoly(vertices, segments + 1, false, false);
    },

    /**
     * draw a CatmullRom curve
     * @override
     * @param {Array} points
     * @param {Number} segments
     */
    drawCatmullRom:function (points, segments) {
        this.drawCardinalSpline(points, 0.5, segments);
    },

    /**
     * draw a cardinal spline path
     * @override
     * @param {Array} config
     * @param {Number} tension
     * @param {Number} segments
     */
    drawCardinalSpline:function (config, tension, segments) {
        //lazy_init();
        cc._renderContext.setStrokeStyle("rgba(255,255,255,1)");
        var points = this._cacheArray;
        points.length = 0;
        var p, lt;
        var deltaT = 1.0 / config.length;

        for (var i = 0; i < segments + 1; i++) {
            var dt = i / segments;

            // border
            if (dt === 1) {
                p = config.length - 1;
                lt = 1;
            } else {
                p = 0 | (dt / deltaT);
                lt = (dt - deltaT * p) / deltaT;
            }

            // Interpolate
            var newPos = cc.cardinalSplineAt(
                cc.getControlPointAt(config, p - 1),
                cc.getControlPointAt(config, p - 0),
                cc.getControlPointAt(config, p + 1),
                cc.getControlPointAt(config, p + 2),
                tension, lt);
            points.push(newPos);
        }
        this.drawPoly(points, segments + 1, false, false);
    },

    /**
     * draw an image
     * @override
     * @param {HTMLImageElement|HTMLCanvasElement} image
     * @param {cc.Vec2} sourcePoint
     * @param {Size} sourceSize
     * @param {cc.Vec2} destPoint
     * @param {Size} destSize
     */
    drawImage:function (image, sourcePoint, sourceSize, destPoint, destSize) {
        var len = arguments.length;
        var ctx = this._renderContext.getContext();
        switch (len) {
            case 2:
                var height = image.height;
                ctx.drawImage(image, sourcePoint.x, -(sourcePoint.y + height));
                break;
            case 3:
                ctx.drawImage(image, sourcePoint.x, -(sourcePoint.y + sourceSize.height), sourceSize.width, sourceSize.height);
                break;
            case 5:
                ctx.drawImage(image, sourcePoint.x, sourcePoint.y, sourceSize.width, sourceSize.height, destPoint.x, -(destPoint.y + destSize.height),
                    destSize.width, destSize.height);
                break;
            default:
                throw new Error("Argument must be non-nil");
                break;
        }
    },

    /**
     * draw a star
     * @param {cc.CanvasContextWrapper} ctx canvas context
     * @param {Number} radius
     * @param {cc.Color} color
     */
    drawStar:function (ctx, radius, color) {
        var wrapper = ctx || this._renderContext;
        var context = wrapper.getContext();
        radius *= cc.view.getScaleX();
        var colorStr = "rgba(" + (0 | color.r) + "," + (0 | color.g) + "," + (0 | color.b);
        wrapper.setFillStyle(colorStr + ",1)");
        //context.fillStyle = colorStr + ",1)";
        var subRadius = radius / 10;

        context.beginPath();
        context.moveTo(-radius, radius);
        context.lineTo(0, subRadius);
        context.lineTo(radius, radius);
        context.lineTo(subRadius, 0);
        context.lineTo(radius, -radius);
        context.lineTo(0, -subRadius);
        context.lineTo(-radius, -radius);
        context.lineTo(-subRadius, 0);
        context.lineTo(-radius, radius);
        context.closePath();
        context.fill();

        var rg = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
        rg.addColorStop(0, colorStr + ", 1)");
        rg.addColorStop(0.3, colorStr + ", 0.8)");
        rg.addColorStop(1.0, colorStr + ", 0.0)");
        wrapper.setFillStyle(rg);
        //context.fillStyle = g1;
        context.beginPath();
        var startAngle_1 = 0;
        var endAngle_1 = cc.macro.PI2;
        context.arc(0, 0, radius - subRadius, startAngle_1, endAngle_1, false);
        context.closePath();
        context.fill();
    },

    /**
     * draw a color ball
     * @param {cc.CanvasContextWrapper} ctx canvas context
     * @param {Number} radius
     * @param {cc.Color} color
     */
    drawColorBall:function (ctx, radius, color) {
        var wrapper = ctx || this._renderContext;
        var context = wrapper.getContext();
        radius *= cc.view.getScaleX();
        var colorStr = "rgba(" +(0|color.r) + "," + (0|color.g) + "," + (0|color.b);
        var subRadius = radius / 10;

        var g1 = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
        g1.addColorStop(0, colorStr + ", 1)");
        g1.addColorStop(0.3, colorStr + ", 0.8)");
        g1.addColorStop(0.6, colorStr + ", 0.4)");
        g1.addColorStop(1.0, colorStr + ", 0.0)");
        wrapper.setFillStyle(g1);
        //context.fillStyle = g1;
        context.beginPath();
        var startAngle_1 = 0;
        var endAngle_1 = cc.macro.PI2;
        context.arc(0, 0, radius, startAngle_1, endAngle_1, false);
        context.closePath();
        context.fill();
    },

    /**
     * fill text
     * @param {String} strText
     * @param {Number} x
     * @param {Number} y
     */
    fillText:function (strText, x, y) {
        this._renderContext.getContext().fillText(strText, x, -y);
    },

    /**
     * set the drawing color with 4 unsigned bytes
     * @param {Number} r red value (0 to 255)
     * @param {Number} g green value (0 to 255)
     * @param {Number} b blue value (0 to 255)
     * @param {Number} a Alpha value (0 to 255)
     */
    setDrawColor:function (r, g, b, a) {
        this._renderContext.setFillStyle("rgba(" + r + "," + g + "," + b + "," + a / 255 + ")");
        this._renderContext.setStrokeStyle("rgba(" + r + "," + g + "," + b + "," + a / 255 + ")");
    },

    /**
     * set the point size in points. Default 1.
     * @param {Number} pointSize
     */
    setPointSize:function (pointSize) {
    },

    /**
     * set the line width. Default 1.
     * @param {Number} width
     */
    setLineWidth:function (width) {
        this._renderContext.getContext().lineWidth = width * cc.view.getScaleX();
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

var macro = cc.macro;

/**
 * Canvas of DrawingPrimitive implement version use for WebGlMode
 * @class
 * @extends cc._Class
 */
cc.DrawingPrimitiveWebGL = cc._Class.extend(/** @lends cc.DrawingPrimitiveWebGL# */{

    _initialized:false,
    _shader: null,
    _colorLocation: "u_color",
    _pointSizeLocation: "u_pointSize",
    _pointSize:-1,
    /**
     * contructor of cc.DrawingPrimitiveWebGL
     * @param ctx rendercontext
     */
    ctor:function (ctx) {
        if (ctx == null)
            ctx = cc._renderContext;

        if (!ctx instanceof  WebGLRenderingContext)
            throw new Error("Can't initialise DrawingPrimitiveWebGL. context need is WebGLRenderingContext");

        this._renderContext = ctx;
        this._colorArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    },

    lazy_init:function () {
        var _t = this;
        if (!_t._initialized) {
            //
            // Position and 1 color passed as a uniform (to similate glColor4ub )
            //
            _t._shader = cc.shaderCache.programForKey(macro.SHADER_POSITION_UCOLOR);
            _t._shader._addUniformLocation(_t._colorLocation);
            _t._shader._addUniformLocation(_t._pointSizeLocation);

            _t._initialized = true;
        }
    },

    /**
     * initlialize context
     */
    drawInit:function () {
        this._initialized = false;
    },

    /**
     * draws a point given x and y coordinate measured in points
     * @param {cc.Vec2} point
     */
    drawPoint:function (point) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
        this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([point.x, point.y]), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.POINTS, 0, 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws an array of points.
     * @param {Array} points point of array
     * @param {Number} numberOfPoints
     */
    drawPoints:function (points, numberOfPoints) {
        if (!points || points.length === 0)
            return;

        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
        this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(points), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.POINTS, 0, points.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    _pointsToTypeArray:function (points) {
        var typeArr = new Float32Array(points.length * 2);
        for (var i = 0; i < points.length; i++) {
            typeArr[i * 2] = points[i].x;
            typeArr[i * 2 + 1] = points[i].y;
        }
        return typeArr;
    },

    /**
     * draws a line given the origin and destination point measured in points
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawLine:function (origin, destination) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray([origin, destination]), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINES, 0, 2);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     */
    drawRect:function (origin, destination) {
        this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
        this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
        this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
        this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y));
    },

    /**
     * draws a solid rectangle given the origin and destination point measured in points.
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} destination
     * @param {cc.Color} color
     */
    drawSolidRect:function (origin, destination, color) {
        var vertices = [
            origin,
            cc.p(destination.x, origin.y),
            destination,
            cc.p(origin.x, destination.y)
        ];

        this.drawSolidPoly(vertices, 4, color);
    },

    /**
     * draws a polygon given a pointer to cc.Vec2 coordiantes and the number of vertices measured in points.
     * @param {Array} vertices a pointer to cc.Vec2 coordiantes
     * @param {Number} numOfVertices the number of vertices measured in points
     * @param {Boolean} closePolygon The polygon can be closed or open
     */
    drawPoly:function (vertices, numOfVertices, closePolygon) {
        this.lazy_init();

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(vertices), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        if (closePolygon)
            glContext.drawArrays(glContext.LINE_LOOP, 0, vertices.length);
        else
            glContext.drawArrays(glContext.LINE_STRIP, 0, vertices.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a solid polygon given a pointer to CGPoint coordiantes, the number of vertices measured in points, and a color.
     * @param {Array} poli
     * @param {Number} numberOfPoints
     * @param {cc.Color} color
     */
    drawSolidPoly:function (poli, numberOfPoints, color) {
        this.lazy_init();
        if (color)
            this.setDrawColor(color.r, color.g, color.b, color.a);

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(poli), glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.TRIANGLE_FAN, 0, poli.length);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a circle given the center, radius and number of segments.
     * @param {cc.Vec2} center center of circle
     * @param {Number} radius
     * @param {Number} angle angle in radians
     * @param {Number} segments
     * @param {Boolean} drawLineToCenter
     */
    drawCircle:function (center, radius, angle, segments, drawLineToCenter) {
        this.lazy_init();

        var additionalSegment = 1;
        if (drawLineToCenter)
            additionalSegment++;

        var coef = 2.0 * Math.PI / segments;

        var vertices = new Float32Array((segments + 2) * 2);
        if (!vertices)
            return;

        for (var i = 0; i <= segments; i++) {
            var rads = i * coef;
            var j = radius * Math.cos(rads + angle) + center.x;
            var k = radius * Math.sin(rads + angle) + center.y;

            vertices[i * 2] = j;
            vertices[i * 2 + 1] = k;
        }
        vertices[(segments + 1) * 2] = center.x;
        vertices[(segments + 1) * 2 + 1] = center.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + additionalSegment);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a quad bezier path
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawQuadBezier:function (origin, control, destination, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);

        var t = 0.0;
        for (var i = 0; i < segments; i++) {
            vertices[i * 2] = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
            vertices[i * 2 + 1] = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
            t += 1.0 / segments;
        }
        vertices[segments * 2] = destination.x;
        vertices[segments * 2 + 1] = destination.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);

        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draws a cubic bezier path
     * @param {cc.Vec2} origin
     * @param {cc.Vec2} control1
     * @param {cc.Vec2} control2
     * @param {cc.Vec2} destination
     * @param {Number} segments
     */
    drawCubicBezier:function (origin, control1, control2, destination, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);

        var t = 0;
        for (var i = 0; i < segments; i++) {
            vertices[i * 2] = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
            vertices[i * 2 + 1] = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
            t += 1.0 / segments;
        }
        vertices[segments * 2] = destination.x;
        vertices[segments * 2 + 1] = destination.y;

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * draw a catmull rom line
     * @param {Array} points
     * @param {Number} segments
     */
    drawCatmullRom:function (points, segments) {
        this.drawCardinalSpline(points, 0.5, segments);
    },

    /**
     * draw a cardinal spline path
     * @param {Array} config
     * @param {Number} tension
     * @param {Number} segments
     */
    drawCardinalSpline:function (config, tension, segments) {
        this.lazy_init();

        var vertices = new Float32Array((segments + 1) * 2);
        var p, lt, deltaT = 1.0 / config.length;
        for (var i = 0; i < segments + 1; i++) {
            var dt = i / segments;

            // border
            if (dt === 1) {
                p = config.length - 1;
                lt = 1;
            } else {
                p = 0 | (dt / deltaT);
                lt = (dt - deltaT * p) / deltaT;
            }

            var newPos = cc.cardinalSplineAt(
                cc.getControlPointAt(config, p - 1),
                cc.getControlPointAt(config, p),
                cc.getControlPointAt(config, p + 1),
                cc.getControlPointAt(config, p + 2),
                tension, lt);
            // Interpolate

            vertices[i * 2] = newPos.x;
            vertices[i * 2 + 1] = newPos.y;
        }

        var glContext = this._renderContext;
        this._shader.use();
        this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
        glContext.enableVertexAttribArray(macro.VERTEX_ATTRIB_POSITION);
        this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);

        var pointBuffer = glContext.createBuffer();
        glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
        glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
        glContext.vertexAttribPointer(macro.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
        glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
        glContext.deleteBuffer(pointBuffer);

        cc.incrementGLDraws(1);
    },

    /**
     * set the drawing color with 4 unsigned bytes
     * @param {Number} r red value (0 to 255)
     * @param {Number} g green value (0 to 255)
     * @param {Number} b blue value (0 to 255)
     * @param {Number} a Alpha value (0 to 255)
     */
    setDrawColor:function (r, g, b, a) {
        this._colorArray[0] = r / 255.0;
        this._colorArray[1] = g / 255.0;
        this._colorArray[2] = b / 255.0;
        this._colorArray[3] = a / 255.0;
    },

    /**
     * set the point size in points. Default 1.
     * @param {Number} pointSize
     */
    setPointSize:function (pointSize) {
        this._pointSize = pointSize;
    },

    /**
     * set the line width. Default 1.
     * @param {Number} width
     */
    setLineWidth:function (width) {
        if(this._renderContext.lineWidth)
            this._renderContext.lineWidth(width);
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

cc._tmp.PrototypeSprite = function () {
    var _p = _ccsg.Sprite.prototype;

    // Override properties
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);

    // Extended properties
    /** @expose */
    _p.dirty;
    /** @expose */
    _p.flippedX;
    cc.defineGetterSetter(_p, "flippedX", _p.isFlippedX, _p.setFlippedX);
    /** @expose */
    _p.flippedY;
    cc.defineGetterSetter(_p, "flippedY", _p.isFlippedY, _p.setFlippedY);
    /** @expose */
    _p.offsetX;
    cc.defineGetterSetter(_p, "offsetX", _p._getOffsetX);
    /** @expose */
    _p.offsetY;
    cc.defineGetterSetter(_p, "offsetY", _p._getOffsetY);
    /** @expose */
    _p.atlasIndex;
    /** @expose */
    _p.texture;
    cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
    /** @expose */
    _p.textureRectRotated;
    cc.defineGetterSetter(_p, "textureRectRotated", _p.isTextureRectRotated);
    /** @expose */
    _p.textureAtlas;
    /** @expose */
    _p.batchNode;
    cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
    /** @expose */
    _p.quad;
    cc.defineGetterSetter(_p, "quad", _p.getQuad);

};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

var EventTarget = require("../cocos2d/core/event/event-target");

/**
 * <p>_ccsg.Sprite is a 2d image ( http://en.wikipedia.org/wiki/Sprite_(computer_graphics) )  <br/>
 *
 * _ccsg.Sprite can be created with an image, or with a sub-rectangle of an image.  <br/>
 *
 * If the parent or any of its ancestors is a cc.SpriteBatchNode then the following features/limitations are valid   <br/>
 *    - Features when the parent is a cc.BatchNode: <br/>
 *        - MUCH faster rendering, specially if the cc.SpriteBatchNode has many children. All the children will be drawn in a single batch.  <br/>
 *
 *    - Limitations   <br/>
 *        - Camera is not supported yet (eg: CCOrbitCamera action doesn't work)  <br/>
 *        - GridBase actions are not supported (eg: CCLens, CCRipple, CCTwirl) <br/>
 *        - The Alias/Antialias property belongs to CCSpriteBatchNode, so you can't individually set the aliased property.  <br/>
 *        - The Blending function property belongs to CCSpriteBatchNode, so you can't individually set the blending function property. <br/>
 *        - Parallax scroller is not supported, but can be simulated with a "proxy" sprite.        <br/>
 *
 *  If the parent is an standard ccsg.Node, then _ccsg.Sprite behaves like any other ccsg.Node:      <br/>
 *    - It supports blending functions    <br/>
 *    - It supports aliasing / antialiasing    <br/>
 *    - But the rendering will be slower: 1 draw per children.   <br/>
 *
 * The default anchorPoint in _ccsg.Sprite is (0.5, 0.5). </p>
 * @class
 * @extends _ccsg.Node
 *
 * @param {String|cc.SpriteFrame|HTMLImageElement|cc.Texture2D} fileName  The string which indicates a path to image file, e.g., "scene1/monster.png".
 * @param {Rect} rect  Only the contents inside rect of pszFileName's texture will be applied for this sprite.
 * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
 * @example
 *
 * 1.Create a sprite with image path and rect
 * var sprite1 = new _ccsg.Sprite("res/HelloHTML5World.png");
 * var sprite2 = new _ccsg.Sprite("res/HelloHTML5World.png",cc.rect(0,0,480,320));
 *
 * 2.Create a sprite with a sprite frame
 * var sprite = new _ccsg.Sprite(spriteFrame);
 *
 * 3.Create a sprite with an existing texture contained in a CCTexture2D object
 *      After creation, the rect will be the size of the texture, and the offset will be (0,0).
 * var texture = cc.textureCache.addImage("HelloHTML5World.png");
 * var sprite1 = new _ccsg.Sprite(texture);
 * var sprite2 = new _ccsg.Sprite(texture, cc.rect(0,0,480,320));
 *
 * @property {Boolean}              dirty               - Indicates whether the sprite needs to be updated.
 * @property {Boolean}              flippedX            - Indicates whether or not the sprite is flipped on x axis.
 * @property {Boolean}              flippedY            - Indicates whether or not the sprite is flipped on y axis.
 * @property {Number}               offsetX             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
 * @property {Number}               offsetY             - <@readonly> The offset position on x axis of the sprite in texture. Calculated automatically by editors like Zwoptex.
 * @property {Number}               atlasIndex          - The index used on the TextureAtlas.
 * @property {Texture2D}         texture             - Texture used to render the sprite.
 * @property {Boolean}              textureRectRotated  - <@readonly> Indicate whether the texture rectangle is rotated.
 * @property {cc.TextureAtlas}      textureAtlas        - The weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode.
 * @property {cc.SpriteBatchNode}   batchNode           - The batch node object if this sprite is rendered by cc.SpriteBatchNode.
 * @property {cc.V3F_C4B_T2F_Quad}  quad                - <@readonly> The quad (tex coords, vertex coords and color) information.
 */
_ccsg.Sprite = _ccsg.Node.extend({
    dirty:false,
    atlasIndex:0,
    textureAtlas:null,

    _recursiveDirty:null, //Whether all of the sprite's children needs to be updated
    _shouldBeHidden:false, //should not be drawn because one of the ancestors is not visible
    _transformToBatch:null,

    //
    // Data used when the sprite is self-rendered
    //
    _blendFunc:null, //It's required for CCTextureProtocol inheritance
    _texture:null, //cc.Texture2D object that is used to render the sprite

    //
    // Shared data
    //
    // texture
    _rect:null, //Rectangle of cc.Texture2D
    _rectRotated:false, //Whether the texture is rotated

    // Offset Position (used by Zwoptex)
    _offsetPosition:null, // absolute
    _unflippedOffsetPositionFromCenter:null,

    _opacityModifyRGB:false,

    // image is flipped
    _flippedX:false, //Whether the sprite is flipped horizontally or not.
    _flippedY:false, //Whether the sprite is flipped vertically or not.

    _textureLoaded:false,
    _className:"Sprite",

    ctor: function (fileName, rect, rotated) {
        var self = this;
        _ccsg.Node.prototype.ctor.call(self);
        EventTarget.call(self);

        self._shouldBeHidden = false;
        self._offsetPosition = cc.p(0, 0);
        self._unflippedOffsetPositionFromCenter = cc.p(0, 0);
        self._blendFunc = {src: cc.macro.BLEND_SRC, dst: cc.macro.BLEND_DST};
        self._rect = cc.rect(0, 0, 0, 0);

        self._softInit(fileName, rect, rotated);
    },

    /**
     * Returns whether the texture have been loaded
     * @returns {boolean}
     */
    textureLoaded:function(){
        return this._textureLoaded;
    },

    /**
     * Add a event listener for texture loaded event.
     * @param {Function} callback
     * @param {Object} target
     * @deprecated since 3.1, please use EventTarget instead
     */
    addLoadedEventListener:function(callback, target){
        this.once("load", callback, target);
    },

    /**
     * Returns whether or not the Sprite needs to be updated in the Atlas
     * @return {Boolean} True if the sprite needs to be updated in the Atlas, false otherwise.
     */
    isDirty:function () {
        return this.dirty;
    },

    /**
     * Makes the sprite to be updated in the Atlas.
     * @param {Boolean} bDirty
     */
    setDirty:function (bDirty) {
        this.dirty = bDirty;
    },

    /**
     * Returns whether or not the texture rectangle is rotated.
     * @return {Boolean}
     */
    isTextureRectRotated:function () {
        return this._rectRotated;
    },

    /**
     * Returns the index used on the TextureAtlas.
     * @return {Number}
     */
    getAtlasIndex:function () {
        return this.atlasIndex;
    },

    /**
     * Sets the index used on the TextureAtlas.
     * @warning Don't modify this value unless you know what you are doing
     * @param {Number} atlasIndex
     */
    setAtlasIndex:function (atlasIndex) {
        this.atlasIndex = atlasIndex;
    },

    /**
     * Returns the rect of the _ccsg.Sprite in points
     * @return {Rect}
     */
    getTextureRect:function () {
        return cc.rect(this._rect);
    },

    /**
     * Returns the weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode
     * @return {cc.TextureAtlas}
     */
    getTextureAtlas:function () {
        return this.textureAtlas;
    },

    /**
     * Sets the weak reference of the cc.TextureAtlas when the sprite is rendered using via cc.SpriteBatchNode
     * @param {cc.TextureAtlas} textureAtlas
     */
    setTextureAtlas:function (textureAtlas) {
        this.textureAtlas = textureAtlas;
    },

    /**
     * Returns the offset position of the sprite. Calculated automatically by editors like Zwoptex.
     * @return {cc.Vec2}
     */
    getOffsetPosition:function () {
        return cc.p(this._offsetPosition);
    },

    _getOffsetX: function () {
        return this._offsetPosition.x;
    },
    _getOffsetY: function () {
        return this._offsetPosition.y;
    },

    /**
     * Returns the blend function
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return this._blendFunc;
    },

    /**
     * Initializes a sprite with a SpriteFrame. The texture and rect in SpriteFrame will be applied on this sprite.<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself,
     * @param {cc.SpriteFrame} spriteFrame A CCSpriteFrame object. It should includes a valid texture and a rect
     * @return {Boolean}  true if the sprite is initialized properly, false otherwise.
     */
    initWithSpriteFrame:function (spriteFrame) {
        cc.assertID(spriteFrame, 2606);

        if(!spriteFrame.textureLoaded()){
            //add event listener
            this._textureLoaded = false;
            spriteFrame.once("load", this._renderCmd._spriteFrameLoadedCallback, this._renderCmd);
        }

        //TODO
        var rotated = cc._renderType === cc.game.RENDER_TYPE_CANVAS ? false : spriteFrame._rotated;
        var ret = this.initWithTexture(spriteFrame.getTexture(), spriteFrame.getRect(), rotated);
        this.setSpriteFrame(spriteFrame);

        return ret;
    },

    /**
     * Initializes a sprite with a sprite frame name. <br/>
     * A cc.SpriteFrame will be fetched from the cc.SpriteFrameCache by name.  <br/>
     * If the cc.SpriteFrame doesn't exist it will raise an exception. <br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @param {String} spriteFrameName A key string that can fected a valid cc.SpriteFrame from cc.SpriteFrameCache
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     * @deprecated
     */
    initWithSpriteFrameName:function () {
        cc.warnID(2608);
        return;
    },

    /**
     * Tell the sprite to use batch node render.
     * @param {cc.SpriteBatchNode} batchNode
     */
    useBatchNode:function (batchNode) {
        this.textureAtlas = batchNode.getTextureAtlas(); // weak ref
        this._batchNode = batchNode;
    },

    /**
     * <p>
     *    set the vertex rect.<br/>
     *    It will be called internally by setTextureRect.                           <br/>
     *    Useful if you want to create 2x images from SD images in Retina Display.  <br/>
     *    Do not call it manually. Use setTextureRect instead.  <br/>
     *    (override this method to generate "double scale" sprites)
     * </p>
     * @param {Rect} rect
     */
    setVertexRect:function (rect) {
        var locRect = this._rect;
        locRect.x = rect.x;
        locRect.y = rect.y;
        locRect.width = rect.width;
        locRect.height = rect.height;
    },

    //
    // _ccsg.Node property overloads
    //

    /**
     * Sets whether the sprite should be flipped horizontally or not.
     * @param {Boolean} flippedX true if the sprite should be flipped horizontally, false otherwise.
     */
    setFlippedX:function (flippedX) {
        if (this._flippedX !== flippedX) {
            this._flippedX = flippedX;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true);
        }
    },

    /**
     * Sets whether the sprite should be flipped vertically or not.
     * @param {Boolean} flippedY true if the sprite should be flipped vertically, false otherwise.
     */
    setFlippedY:function (flippedY) {
        if (this._flippedY !== flippedY) {
            this._flippedY = flippedY;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true);
        }
    },

    /**
     * <p>
     * Returns the flag which indicates whether the sprite is flipped horizontally or not.                      <br/>
     *                                                                                                              <br/>
     * It only flips the texture of the sprite, and not the texture of the sprite's children.                       <br/>
     * Also, flipping the texture doesn't alter the anchorPoint.                                                    <br/>
     * If you want to flip the anchorPoint too, and/or to flip the children too use:                                <br/>
     *      sprite.setScaleX(sprite.getScaleX() * -1);  <p/>
     * @return {Boolean} true if the sprite is flipped horizontally, false otherwise.
     */
    isFlippedX:function () {
        return this._flippedX;
    },

    /**
     * <p>
     *     Return the flag which indicates whether the sprite is flipped vertically or not.                         <br/>
     *                                                                                                              <br/>
     *      It only flips the texture of the sprite, and not the texture of the sprite's children.                  <br/>
     *      Also, flipping the texture doesn't alter the anchorPoint.                                               <br/>
     *      If you want to flip the anchorPoint too, and/or to flip the children too use:                           <br/>
     *         sprite.setScaleY(sprite.getScaleY() * -1); <p/>
     * @return {Boolean} true if the sprite is flipped vertically, false otherwise.
     */
    isFlippedY:function () {
        return this._flippedY;
    },

    //
    // RGBA protocol
    //
    /**
     * Sets whether opacity modify color or not.
     * @function
     * @param {Boolean} modify
     */
    setOpacityModifyRGB: function (modify) {
        if (this._opacityModifyRGB !== modify) {
            this._opacityModifyRGB = modify;
            this._renderCmd._setColorDirty();
        }
    },

    /**
     * Returns whether opacity modify color or not.
     * @return {Boolean}
     */
    isOpacityModifyRGB:function () {
        return this._opacityModifyRGB;
    },

    // Animation

    /**
     * Changes the display frame with animation name and index.<br/>
     * The animation name will be get from the CCAnimationCache
     * @param {String} animationName
     * @param {Number} frameIndex
     */
    setDisplayFrameWithAnimationName:function (animationName, frameIndex) {
        cc.assertID(animationName, 2610);

        var cache = cc.spriteFrameAnimationCache.getAnimation(animationName);
        if(!cache){
            cc.logID(2602);
            return;
        }
        var animFrame = cache.getFrames()[frameIndex];
        if(!animFrame){
            cc.logID(2603);
            return;
        }
        this.setSpriteFrame(animFrame.getSpriteFrame());
    },

    // CCTextureProtocol
    /**
     * Returns the texture of the sprite node
     * @returns {Texture2D}
     */
    getTexture:function () {
        return this._texture;
    },

    _softInit: function (fileName, rect, rotated) {
        if (fileName === undefined)
            _ccsg.Sprite.prototype.init.call(this);
        else if (cc.js.isString(fileName)) {
            if (fileName[0] === "#") {
                cc.logID(2728, fileName);
            } else {
                // Init  with filename and rect
                _ccsg.Sprite.prototype.init.call(this, fileName, rect);
            }
        } else if (typeof fileName === "object") {
            if (fileName instanceof cc.Texture2D) {
                // Init  with texture and rect
                this.initWithTexture(fileName, rect, rotated);
            } else if (fileName instanceof cc.SpriteFrame) {
                // Init with a sprite frame
                this.initWithSpriteFrame(fileName);
            } else if ((fileName instanceof HTMLImageElement) || (fileName instanceof HTMLCanvasElement)) {
                // Init with a canvas or image element
                var texture2d = new cc.Texture2D();
                texture2d.initWithElement(fileName);
                texture2d.handleLoadedTexture();
                this.initWithTexture(texture2d);
            }
        }
    },

    /**
     * Returns the quad (tex coords, vertex coords and color) information.
     * @return {cc.V3F_C4B_T2F_Quad|null} Returns a cc.V3F_C4B_T2F_Quad object when render mode is WebGL, returns null when render mode is Canvas.
     */
    getQuad:function () {
        return null;
    },

    /**
     * conforms to cc.TextureProtocol protocol
     * @function
     * @param {Number|cc.BlendFunc} src
     * @param {Number} dst
     */
    setBlendFunc: function (src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst;
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst;
        }
        this._renderCmd.updateBlendFunc(locBlendFunc);
    },

    /**
     * Initializes an empty sprite with nothing init.<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @function
     * @return {Boolean}
     */
    init: function () {
        var _t = this;
        if (arguments.length > 0)
            return _t.initWithFile(arguments[0], arguments[1]);

        _t.dirty = _t._recursiveDirty = false;

        _t._blendFunc.src = cc.macro.BLEND_SRC;
        _t._blendFunc.dst = cc.macro.BLEND_DST;

        _t.texture = null;
        _t._flippedX = _t._flippedY = false;

        // default transform anchor: center
        _t.anchorX = 0.5;
        _t.anchorY = 0.5;

        // zwoptex default values
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;

        // updated in "useSelfRender"
        // Atlas: TexCoords
        _t.setTextureRect(cc.rect(0, 0, 0, 0), false, cc.size(0, 0));
        return true;
    },

    /**
     * <p>
     *     Initializes a sprite with an image filename.<br/>
     *
     *     This method will find pszFilename from local file system, load its content to CCTexture2D,<br/>
     *     then use CCTexture2D to create a sprite.<br/>
     *     After initialization, the rect used will be the size of the image. The offset will be (0,0).<br/>
     *     Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * </p>
     * @param {String} filename The path to an image file in local file system
     * @param {Rect} rect The rectangle assigned the content area from texture.
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    initWithFile:function (filename, rect) {
        cc.assertID(filename, 2609);

        var tex = cc.textureCache.getTextureForKey(filename);
        if (!tex) {
            tex = cc.textureCache.addImage(filename);
            return this.initWithTexture(tex, rect || cc.rect(0, 0, tex._contentSize.width, tex._contentSize.height));
        } else {
            if (!rect) {
                var size = tex.getContentSize();
                rect = cc.rect(0, 0, size.width, size.height);
            }
            return this.initWithTexture(tex, rect);
        }
    },

    /**
     * Initializes a sprite with a texture and a rect in points, optionally rotated.  <br/>
     * After initialization, the rect used will be the size of the texture, and the offset will be (0,0).<br/>
     * Please pass parameters to the constructor to initialize the sprite, do not call this function yourself.
     * @function
     * @param {cc.Texture2D|HTMLImageElement|HTMLCanvasElement} texture A pointer to an existing CCTexture2D object. You can use a CCTexture2D object for many sprites.
     * @param {Rect} [rect] Only the contents inside rect of this texture will be applied for this sprite.
     * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
     * @param {Boolean} [counterclockwise=true] Whether or not the texture rectangle rotation is counterclockwise (texture package is counterclockwise, spine is clockwise).
     * @return {Boolean} true if the sprite is initialized properly, false otherwise.
     */
    initWithTexture: function (texture, rect, rotated, counterclockwise) {
        var _t = this;
        cc.assertID(arguments.length !== 0, 2710);

        rotated = rotated || false;
        texture = this._renderCmd._handleTextureForRotatedTexture(texture, rect, rotated, counterclockwise);

        _t._recursiveDirty = false;
        _t.dirty = false;
        _t._opacityModifyRGB = true;

        _t._blendFunc.src = cc.macro.BLEND_SRC;
        _t._blendFunc.dst = cc.macro.BLEND_DST;

        _t._flippedX = _t._flippedY = false;

        // default transform anchor: center
        _t.setAnchorPoint(0.5, 0.5);

        // zwoptex default values
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;

        var locTextureLoaded = texture.isLoaded();
        _t._textureLoaded = locTextureLoaded;

        if (!locTextureLoaded) {
            _t._rectRotated = rotated;
            if (rect) {
                _t._rect.x = rect.x;
                _t._rect.y = rect.y;
                _t._rect.width = rect.width;
                _t._rect.height = rect.height;
            }
            if(_t.texture)
                _t.texture.off("load", _t._renderCmd._textureLoadedCallback, _t._renderCmd);
            texture.once("load", _t._renderCmd._textureLoadedCallback, _t._renderCmd);
            _t.setTexture(texture);
            return true;
        }

        if (!rect)
            rect = cc.rect(0, 0, texture.width, texture.height);

        this._renderCmd._checkTextureBoundary(texture, rect, rotated);

        _t.setTexture(texture);
        _t.setTextureRect(rect, rotated);
        this.emit("load");
        return true;
    },

    /**
     * Updates the texture rect of the CCSprite in points.
     * @function
     * @param {Rect} rect a rect of texture
     * @param {Boolean} [rotated] Whether or not the texture is rotated
     * @param {Size} [untrimmedSize] The original pixels size of the texture
     * @param {Boolean} [needConvert] contentScaleFactor switch
     */
    setTextureRect: function (rect, rotated, untrimmedSize, needConvert) {
        var _t = this;
        _t._rectRotated = rotated || false;
        _t.setContentSize(untrimmedSize || rect);

        _t.setVertexRect(rect);
        _t._renderCmd._setTextureCoords(rect, needConvert);

        var relativeOffsetX = _t._unflippedOffsetPositionFromCenter.x, relativeOffsetY = _t._unflippedOffsetPositionFromCenter.y;
        if (_t._flippedX)
            relativeOffsetX = -relativeOffsetX;
        if (_t._flippedY)
            relativeOffsetY = -relativeOffsetY;
        var locRect = _t._rect;
        _t._offsetPosition.x = relativeOffsetX + (_t._contentSize.width - locRect.width) / 2;
        _t._offsetPosition.y = relativeOffsetY + (_t._contentSize.height - locRect.height) / 2;
    },

    // Frames
    /**
     * Sets a new sprite frame to the sprite.
     * @function
     * @param {cc.SpriteFrame} newFrame
     */
    setSpriteFrame: function (newFrame) {
        var _t = this;
        cc.assertID(newFrame, 2712);

        this.setNodeDirty(true);

        var frameOffset = newFrame.getOffset();
        _t._unflippedOffsetPositionFromCenter.x = frameOffset.x;
        _t._unflippedOffsetPositionFromCenter.y = frameOffset.y;

        // update rect
        var pNewTexture = newFrame.getTexture();
        var locTextureLoaded = newFrame.textureLoaded();
        if (!locTextureLoaded) {
            _t._textureLoaded = false;
            newFrame.once("load", function (event) {
                var sender = event.currentTarget;
                _t._textureLoaded = true;
                var locNewTexture = sender.getTexture();
                if (locNewTexture !== _t._texture)
                    _t._setTexture(locNewTexture);
                _t.setTextureRect(sender.getRect(), sender.isRotated(), sender.getOriginalSize());
                _t.emit("load");
                _t.setColor(_t._realColor);
            }, _t);
        } else {
            _t._textureLoaded = true;
            // update texture before updating texture rect
            if (pNewTexture !== _t._texture) {
                _t._setTexture(pNewTexture);
                _t.setColor(_t._realColor);
            }
            _t.setTextureRect(newFrame.getRect(), newFrame.isRotated(), newFrame.getOriginalSize());
        }
        this._renderCmd._updateForSetSpriteFrame(pNewTexture);
    },

    /**
     * Sets a new display frame to the sprite.
     * @param {cc.SpriteFrame|String} newFrame
     * @deprecated
     */
    setDisplayFrame: function(newFrame){
        cc.logID(2604);
        this.setSpriteFrame(newFrame);
    },

    /**
     * Returns whether or not a cc.SpriteFrame is being displayed
     * @function
     * @param {cc.SpriteFrame} frame
     * @return {Boolean}
     */
    isFrameDisplayed: function(frame){
        return this._renderCmd.isFrameDisplayed(frame);
    },

    /**
     * Returns the current displayed frame.
     * @deprecated since 3.4, please use getSpriteFrame instead
     * @return {cc.SpriteFrame}
     */
    displayFrame: function () {
        return this.getSpriteFrame();
    },

    /**
     * Returns the current displayed frame.
     * @return {cc.SpriteFrame}
     */
    getSpriteFrame: function () {
        return new cc.SpriteFrame(this._texture,
            this._rect,
            this._rectRotated,
            this._unflippedOffsetPositionFromCenter,
            this._contentSize);
    },

    // CCTextureProtocol
    /**
     * Sets the texture of sprite
     * @function
     * @param {cc.Texture2D|String} texture
     */
    setTexture: function (texture) {
        if(!texture)
            return this._renderCmd._setTexture(null);

        //CCSprite.cpp 327 and 338
        var isFileName = cc.js.isString(texture);

        if(isFileName)
            texture = cc.textureCache.addImage(texture);

        if(texture._textureLoaded){
            this._setTexture(texture, isFileName);
            this.setColor(this._realColor);
            this._textureLoaded = true;
            this.emit("load");
        }else{
            this._renderCmd._setTexture(texture);
            texture.once("load", function (event) {
                this._setTexture(texture, isFileName);
                this.setColor(this._realColor);
                this._textureLoaded = true;
                this.emit("load");
            }, this);
        }
    },

    _setTexture: function(texture, change){
        this._renderCmd._setTexture(texture);
        if(change)
            this._changeRectWithTexture(texture);
    },

    _changeRectWithTexture: function(texture){
        var contentSize = texture._contentSize;
        var rect = cc.rect(
                0, 0,
                contentSize.width, contentSize.height
            );
        this.setTextureRect(rect);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.Sprite.CanvasRenderCmd(this);
        else
            return new _ccsg.Sprite.WebGLRenderCmd(this);
    }
});

cc.js.addon(_ccsg.Sprite.prototype, EventTarget.prototype);


cc.assertID(typeof cc._tmp.PrototypeSprite === 'function', 3200, "SpritesPropertyDefine.js");
cc._tmp.PrototypeSprite();
delete cc._tmp.PrototypeSprite;

// fireball#2856

var spritePro = _ccsg.Sprite.prototype;
Object.defineProperty(spritePro, 'visible', {
    get: _ccsg.Node.prototype.isVisible,
    set: spritePro.setVisible
});

Object.defineProperty(spritePro, 'ignoreAnchor', {
    get: _ccsg.Node.prototype.isIgnoreAnchorPointForPosition,
    set: spritePro.setIgnoreAnchorPointForPosition
});

Object.defineProperty(spritePro, 'opacityModifyRGB', {
    get: spritePro.isOpacityModifyRGB
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

_ccsg.Sprite.CanvasRenderCmd = function (renderable) {
    this._rootCtor(renderable);
    this._needDraw = true;
    this._textureCoord = {
        renderX: 0,                             //the x of texture coordinate for render, when texture tinted, its value doesn't equal x.
        renderY: 0,                             //the y of texture coordinate for render, when texture tinted, its value doesn't equal y.
        x: 0,                                   //the x of texture coordinate for node.
        y: 0,                                   //the y of texture coordinate for node.
        width: 0,
        height: 0,
        validRect: false
    };
    this._blendFuncStr = "source-over";
    this._colorized = false;

    this._textureToRender = null;
};

var proto = _ccsg.Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = _ccsg.Sprite.CanvasRenderCmd;

proto.setDirtyRecursively = function (value) {};

proto._setTexture = function (texture) {
    var node = this._node;
    if (node._texture !== texture) {
        node._textureLoaded = texture ? texture._textureLoaded : false;
        node._texture = texture;
        var texSize = texture._contentSize;
        var rect = cc.rect(0, 0, texSize.width, texSize.height);
        node.setTextureRect(rect);
        this._updateColor();
    }
};

proto._setColorDirty = function () {
    this.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty | _ccsg.Node._dirtyFlags.opacityDirty);
};

proto.isFrameDisplayed = function (frame) {      //TODO there maybe has a bug
    var node = this._node;
    if (frame.getTexture() !== node._texture)
        return false;
    return cc.rectEqualToRect(frame.getRect(), node._rect);
};

proto.updateBlendFunc = function (blendFunc) {
    this._blendFuncStr = _ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(blendFunc);
};

proto._handleTextureForRotatedTexture = function (texture, rect, rotated, counterclockwise) {
    if (rotated && texture.isLoaded()) {
        var tempElement = texture.getHtmlElementObj();
        tempElement = _ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas(tempElement, rect, counterclockwise);
        var tempTexture = new cc.Texture2D();
        tempTexture.initWithElement(tempElement);
        tempTexture.handleLoadedTexture();
        texture = tempTexture;
        rect.x = rect.y = 0;
        this._node._rect = cc.rect(0, 0, rect.width, rect.height);
    }
    return texture;
};

proto._checkTextureBoundary = function (texture, rect, rotated) {
    if (texture && texture.url) {
        var _x = rect.x + rect.width, _y = rect.y + rect.height;
        if (_x > texture.width)
            cc.errorID(3300, texture.url);
        if (_y > texture.height)
            cc.errorID(3400, texture.url);
    }
};

proto.rendering = function (ctx, scaleX, scaleY) {
    var node = this._node;
    var locTextureCoord = this._textureCoord, alpha = (this._displayedOpacity / 255);

    var texture = this._textureToRender || node._texture;

    if ((texture && (locTextureCoord.width === 0 || locTextureCoord.height === 0|| !texture._textureLoaded)) || alpha === 0)
        return;

    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    var locX = node._offsetPosition.x, locHeight = node._rect.height, locWidth = node._rect.width,
        locY = -node._offsetPosition.y - locHeight, image;

    wrapper.setTransform(this._worldTransform, scaleX, scaleY);
    wrapper.setCompositeOperation(this._blendFuncStr);
    wrapper.setGlobalAlpha(alpha);

    if(node._flippedX || node._flippedY)
        wrapper.save();
    if (node._flippedX) {
        locX = -locX - locWidth;
        context.scale(-1, 1);
    }
    if (node._flippedY) {
        locY = node._offsetPosition.y;
        context.scale(1, -1);
    }

    var sx, sy, sw, sh, x, y, w, h;
    if (this._colorized) {
        sx = 0;
        sy = 0;
    }else{
        sx = locTextureCoord.renderX;
        sy = locTextureCoord.renderY;
    }
    sw = locTextureCoord.width;
    sh = locTextureCoord.height;

    x = locX;
    y = locY;
    w = locWidth;
    h = locHeight;

    if (texture&& texture._htmlElementObj) {
        image = texture._htmlElementObj;
        if (texture._pattern !== "") {
            wrapper.setFillStyle(context.createPattern(image, texture._pattern));
            context.fillRect(x, y, w, h);
        } else {
            context.drawImage(image,
                sx, sy, sw, sh,
                x, y, w, h);
        }
    } else {
        var contentSize = node._contentSize;
        if (locTextureCoord.validRect) {
            var curColor = this._displayedColor;
            wrapper.setFillStyle("rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + ",1)");
            context.fillRect(x, y, contentSize.width, contentSize.height);
        }
    }
    if(node._flippedX || node._flippedY)
        wrapper.restore();
    cc.g_NumberOfDraws++;
};

proto._updateColor = function(){
    var node = this._node;

    var texture = node._texture, rect = this._textureCoord;
    var dColor = this._displayedColor;

    if(texture){
        if(dColor.r !== 255 || dColor.g !== 255 || dColor.b !== 255){
            this._textureToRender = texture._generateColorTexture(dColor.r, dColor.g, dColor.b, rect);
            this._colorized = true;
        }else if(texture){
            this._textureToRender = texture;
            this._colorized = false;
        }
    }
};

proto._updateForSetSpriteFrame = function (pNewTexture, textureLoaded){
    this._colorized = false;
    this._textureCoord.renderX = this._textureCoord.x;
    this._textureCoord.renderY = this._textureCoord.y;
    textureLoaded = textureLoaded || pNewTexture._textureLoaded;
    if (textureLoaded) {
        var curColor = this._node.getColor();
        if (curColor.r !== 255 || curColor.g !== 255 || curColor.b !== 255)
            this._updateColor();
    }
};

proto._spriteFrameLoadedCallback = function (event) {
    var node = this._node, spriteFrame = event.currentTarget;
    node.setTextureRect(spriteFrame.getRect(), spriteFrame.isRotated(), spriteFrame.getOriginalSize());

    this._updateColor();
    node.emit("load");
};

proto._textureLoadedCallback = function (event) {
    var node = this._node, sender = event.currentTarget;
    if (node._textureLoaded)
        return;

    node._textureLoaded = true;
    var locRect = node._rect;
    if (!locRect) {
        locRect = cc.rect(0, 0, sender.width, sender.height);
    } else if (cc._rectEqualToZero(locRect)) {
        locRect.width = sender.width;
        locRect.height = sender.height;
    }

    node.texture = sender;
    node.setTextureRect(locRect, node._rectRotated);

    //set the texture's color after the it loaded
    var locColor = this._displayedColor;
    if (locColor.r !== 255 || locColor.g !== 255 || locColor.b !== 255)
        this._updateColor();

    node.emit("load");
};

proto._setTextureCoords = function (rect) {
    var locTextureRect = this._textureCoord;
    locTextureRect.renderX = locTextureRect.x = 0 | rect.x;
    locTextureRect.renderY = locTextureRect.y = 0 | rect.y;
    locTextureRect.width = 0 | rect.width;
    locTextureRect.height = 0 | rect.height;
    locTextureRect.validRect = !(locTextureRect.width === 0 || locTextureRect.height === 0 || locTextureRect.x < 0 || locTextureRect.y < 0);
};

_ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas = function (texture, rect, counterclockwise) {
    if (!texture)
        return null;

    if (!rect)
        return texture;

    counterclockwise = counterclockwise == null? true: counterclockwise;   // texture package is counterclockwise, spine is clockwise

    var nCanvas = document.createElement("canvas");
    nCanvas.width = rect.width;
    nCanvas.height = rect.height;
    var ctx = nCanvas.getContext("2d");
    ctx.translate(nCanvas.width / 2, nCanvas.height / 2);
    if(counterclockwise)
        ctx.rotate(-1.5707963267948966);
    else
        ctx.rotate(1.5707963267948966);
    ctx.drawImage(texture, rect.x, rect.y, rect.height, rect.width, -rect.height / 2, -rect.width / 2, rect.height, rect.width);
    return nCanvas;
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

var macro = cc.macro;

//Sprite's WebGL render command
_ccsg.Sprite.WebGLRenderCmd = function (renderable) {
    this._rootCtor(renderable);
    this._needDraw = true;

    this._vertices = [
        {x: 0, y: 0, u: 0, v: 0}, // tl
        {x: 0, y: 0, u: 0, v: 0}, // bl
        {x: 0, y: 0, u: 0, v: 0}, // tr
        {x: 0, y: 0, u: 0, v: 0}  // br
    ];
    this._dirty = false;
    this._recursiveDirty = false;

    this._shaderProgram = cc.shaderCache.programForKey(macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
};

var proto = _ccsg.Sprite.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = _ccsg.Sprite.WebGLRenderCmd;

proto.updateBlendFunc = function (blendFunc) {};

proto.setDirtyFlag = function(dirtyFlag){
    _ccsg.Node.WebGLRenderCmd.prototype.setDirtyFlag.call(this, dirtyFlag);
    this._dirty = true;
};

proto.setDirtyRecursively = function (value) {
    this._recursiveDirty = value;
    this._dirty = value;
    // recursively set dirty
    var locChildren = this._node._children, child, l = locChildren ? locChildren.length : 0;
    for (var i = 0; i < l; i++) {
        child = locChildren[i];
        (child instanceof _ccsg.Sprite) && child._renderCmd.setDirtyRecursively(value);
    }
};

proto._handleTextureForRotatedTexture = function (texture) {
    return texture;
};

proto.isFrameDisplayed = function (frame) {
    var node = this._node;
    return (cc.rectEqualToRect(frame.getRect(), node._rect) && frame.getTexture().getName() === node._texture.getName()
        && cc.pointEqualToPoint(frame.getOffset(), node._unflippedOffsetPositionFromCenter));
};

proto._updateForSetSpriteFrame = function () {};

proto._spriteFrameLoadedCallback = function (event) {
    var spriteFrame = event.currentTarget;
    this._node.setTextureRect(spriteFrame.getRect(), spriteFrame.isRotated(), spriteFrame.getOriginalSize());
    this._node.emit("load");
};

proto._textureLoadedCallback = function (event) {
    var node = this._node, sender = event.currentTarget;
    if (node._textureLoaded)
        return;

    node._textureLoaded = true;
    var locRect = node._rect;
    if (!locRect) {
        locRect = cc.rect(0, 0, sender.width, sender.height);
    } else if (cc._rectEqualToZero(locRect)) {
        locRect.width = sender.width;
        locRect.height = sender.height;
    }

    node.texture = sender;
    node.setTextureRect(locRect, node._rectRotated);

    node.emit("load");

    // Force refresh the render command list
    cc.renderer.childrenOrderDirty = true;
};

proto._setTextureCoords = function (rect) {
    var node = this._node;

    var tex = node._texture;
    var uvs = this._vertices;
    if (!tex)
        return;

    var atlasWidth = tex.pixelWidth;
    var atlasHeight = tex.pixelHeight;

    var left, right, top, bottom, tempSwap;
    if (node._rectRotated) {
        if (macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (2 * rect.x + 1) / (2 * atlasWidth);
            right = left + (rect.height * 2 - 2) / (2 * atlasWidth);
            top = (2 * rect.y + 1) / (2 * atlasHeight);
            bottom = top + (rect.width * 2 - 2) / (2 * atlasHeight);
        } else {
            left = rect.x / atlasWidth;
            right = (rect.x + rect.height) / atlasWidth;
            top = rect.y / atlasHeight;
            bottom = (rect.y + rect.width) / atlasHeight;
        }

        if (node._flippedX) {
            tempSwap = top;
            top = bottom;
            bottom = tempSwap;
        }

        if (node._flippedY) {
            tempSwap = left;
            left = right;
            right = tempSwap;
        }

        uvs[0].u = right;  // tl
        uvs[0].v = top;    // tl
        uvs[1].u = left;   // bl
        uvs[1].v = top;    // bl
        uvs[2].u = right;  // tr
        uvs[2].v = bottom; // tr
        uvs[3].u = left;   // br
        uvs[3].v = bottom; // br
    } else {
        if (macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (2 * rect.x + 1) / (2 * atlasWidth);
            right = left + (rect.width * 2 - 2) / (2 * atlasWidth);
            top = (2 * rect.y + 1) / (2 * atlasHeight);
            bottom = top + (rect.height * 2 - 2) / (2 * atlasHeight);
        } else {
            left = rect.x / atlasWidth;
            right = (rect.x + rect.width) / atlasWidth;
            top = rect.y / atlasHeight;
            bottom = (rect.y + rect.height) / atlasHeight;
        }

        if (node._flippedX) {
            tempSwap = left;
            left = right;
            right = tempSwap;
        }

        if (node._flippedY) {
            tempSwap = top;
            top = bottom;
            bottom = tempSwap;
        }

        uvs[0].u = left;   // tl
        uvs[0].v = top;    // tl
        uvs[1].u = left;   // bl
        uvs[1].v = bottom; // bl
        uvs[2].u = right;  // tr
        uvs[2].v = top;    // tr
        uvs[3].u = right;  // br
        uvs[3].v = bottom; // br
    }
};

proto._setColorDirty = function () {};

proto._updateBlendFunc = function () {
    // it's possible to have an untextured sprite
    var node = this._node;
    if (!node._texture || !node._texture.hasPremultipliedAlpha()) {
        node._blendFunc.src = macro.SRC_ALPHA;
        node._blendFunc.dst = macro.ONE_MINUS_SRC_ALPHA;
        node.opacityModifyRGB = false;
    } else {
        node._blendFunc.src = macro.BLEND_SRC;
        node._blendFunc.dst = macro.BLEND_DST;
        node.opacityModifyRGB = true;
    }
};

proto._setTexture = function (texture) {
    var node = this._node;

    if(node._texture !== texture){
        node._textureLoaded = texture ? texture._textureLoaded : false;
        node._texture = texture;
        this._updateBlendFunc();

        if (node._textureLoaded) {
            // Force refresh the render command list
            cc.renderer.childrenOrderDirty = true;
        }
    }
};

proto._checkTextureBoundary = function (texture, rect, rotated) {
    if (texture && texture.url) {
        var _x, _y;
        if (rotated) {
            _x = rect.x + rect.height;
            _y = rect.y + rect.width;
        } else {
            _x = rect.x + rect.width;
            _y = rect.y + rect.height;
        }
        if (_x > texture.width) {
            cc.errorID(3300, texture.url);
        }
        if (_y > texture.height) {
            cc.errorID(3400, texture.url);
        }
    }
};

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);

    var node = this._node,
        lx = node._offsetPosition.x, rx = lx + node._rect.width,
        by = node._offsetPosition.y, ty = by + node._rect.height,
        wt = this._worldTransform;

    var vertices = this._vertices;
    vertices[0].x = lx * wt.a + ty * wt.c + wt.tx; // tl
    vertices[0].y = lx * wt.b + ty * wt.d + wt.ty;
    vertices[1].x = lx * wt.a + by * wt.c + wt.tx; // bl
    vertices[1].y = lx * wt.b + by * wt.d + wt.ty;
    vertices[2].x = rx * wt.a + ty * wt.c + wt.tx; // tr
    vertices[2].y = rx * wt.b + ty * wt.d + wt.ty;
    vertices[3].x = rx * wt.a + by * wt.c + wt.tx; // br
    vertices[3].y = rx * wt.b + by * wt.d + wt.ty;
};

proto.needDraw = function () {
    var node = this._node, locTexture = node._texture;
    return (this._needDraw && locTexture);
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset) {
    var node = this._node, locTexture = node._texture;
    if (!(locTexture && locTexture._textureLoaded && node._rect.width && node._rect.height) || !this._displayedOpacity)
        return 0;

    // Fill in vertex data with quad information (4 vertices for sprite)
    var opacity = this._displayedOpacity;
    var color, colorVal = this._displayedColor._val;
    if (node._opacityModifyRGB) {
        var a = opacity / 255,
            r = this._displayedColor.r * a,
            g = this._displayedColor.g * a,
            b = this._displayedColor.b * a;
        color = ((opacity<<24) >>> 0) + (b<<16) + (g<<8) + r;
    }
    else {
        color = ((opacity<<24) >>> 0) + ((colorVal&0xff00)<<8) + ((colorVal&0xff0000)>>8) + (colorVal>>>24);
    }
    var z = node._vertexZ;

    var vertices = this._vertices;
    var i, len = vertices.length, vertex, offset = vertexDataOffset;
    for (i = 0; i < len; ++i) {
        vertex = vertices[i];
        f32buffer[offset] = vertex.x;
        f32buffer[offset + 1] = vertex.y;
        f32buffer[offset + 2] = z;
        ui32buffer[offset + 3] = color;
        f32buffer[offset + 4] = vertex.u;
        f32buffer[offset + 5] = vertex.v;
        offset += 6;
    }

    return len;
};

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

var EventTarget = require("../cocos2d/core/event/event-target");

var dataPool = {
    _pool: {},
    _lengths: [],
    put: function (data) {
        var length = data.length;
        if (!this._pool[length]) {
            this._pool[length] = [data];
            this._lengths.push(length);
            this._lengths.sort();
        }
        else {
            this._pool[length].push(data);
        }
    },
    get: function (length) {
        var id;
        for (var i = 0; i < this._lengths.length; i++) {
            if (this._lengths[i] >= length) {
                id = this._lengths[i];
                break;
            }
        }
        if (id) {
            return this._pool[id].pop();
        }
        else {
            return undefined;
        }
    }
};

var macro = cc.macro,
    webgl,
    vl, vb, vt, vr,
    cornerId = [];

/*
 * <p>
 * A 9-slice sprite for cocos2d UI.                                                                    <br/>
 *                                                                                                     <br/>
 * 9-slice scaling allows you to specify how scaling is applied                                        <br/>
 * to specific areas of a sprite. With 9-slice scaling (3x3 grid),                                     <br/>
 * you can ensure that the sprite does not become distorted when                                       <br/>
 * scaled.                                                                                             <br/>
 * @note: it will refactor in v3.1                                                                    <br/>
 * @see http://yannickloriot.com/library/ios/cccontrolextension/Classes/CCScale9Sprite.html            <br/>
 * </p>
 * @class
 * @extends _ccsg.Node
 *
 * @property {Size}  preferredSize   - The preferred size of the 9-slice sprite
 * @property {Rect}  capInsets       - The cap insets of the 9-slice sprite
 * @property {Number}   insetLeft       - The left inset of the 9-slice sprite
 * @property {Number}   insetTop        - The top inset of the 9-slice sprite
 * @property {Number}   insetRight      - The right inset of the 9-slice sprite
 * @property {Number}   insetBottom     - The bottom inset of the 9-slice sprite
 */
var simpleQuadGenerator = {
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize, isTrimmedContentSize) {
        //build vertices
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            l, b, r, t;
        if (isTrimmedContentSize) {
            l = 0;
            b = 0;
            r = contentSize.width;
            t = contentSize.height;
        } else {
            var originalSize = spriteFrame._originalSize;
            var rect = spriteFrame._rect;
            var offset = spriteFrame._offset;
            var scaleX = contentSize.width / originalSize.width;
            var scaleY = contentSize.height / originalSize.height;
            var trimmLeft = offset.x + (originalSize.width - rect.width) / 2;
            var trimmRight = offset.x - (originalSize.width - rect.width) / 2;
            var trimmedBottom = offset.y + (originalSize.height - rect.height) / 2;
            var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

            l = trimmLeft * scaleX;
            b = trimmedBottom * scaleY;
            r = contentSize.width + trimmRight * scaleX;
            t = contentSize.height + trimmedTop * scaleY;
        }

        if (vertices.length < 8) {
            dataPool.put(vertices);
            vertices = dataPool.get(8) || new Float32Array(8);
            sprite._vertices = vertices;
        }
        // bl, br, tl, tr
        if (webgl) {
            var la = l * wt.a, lb = l * wt.b, ra = r * wt.a, rb = r * wt.b,
                tcx = t * wt.c + wt.tx, tdy = t * wt.d + wt.ty, 
                bcx = b * wt.c + wt.tx, bdy = b * wt.d + wt.ty;
            vertices[0] = la + bcx;
            vertices[1] = lb + bdy;
            vertices[2] = ra + bcx;
            vertices[3] = rb + bdy;
            vertices[4] = la + tcx;
            vertices[5] = lb + tdy;
            vertices[6] = ra + tcx;
            vertices[7] = rb + tdy;
        }
        else {
            vertices[0] = l;
            vertices[1] = b;
            vertices[2] = r;
            vertices[3] = b;
            vertices[4] = l;
            vertices[5] = t;
            vertices[6] = r;
            vertices[7] = t;
        }

        cornerId[0] = 0; // bl
        cornerId[1] = 2; // br
        cornerId[2] = 4; // tl
        cornerId[3] = 6; // tr

        //build uvs
        if (sprite._uvsDirty) {
            this._calculateUVs(sprite, spriteFrame);
        }

        sprite._vertCount = 4;
    },

    _calculateUVs: function (sprite, spriteFrame) {
        var uvs = sprite._uvs;
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        if (uvs.length < 8) {
            dataPool.put(uvs);
            uvs = dataPool.get(8) || new Float32Array(8);
            sprite._uvs = uvs;
        }

        //uv computation should take spritesheet into account.
        var l, b, r, t;
        var texelCorrect = macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;

        if (spriteFrame._rotated) {
            l = (textureRect.x + texelCorrect) / atlasWidth;
            b = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            r = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            t = (textureRect.y + texelCorrect) / atlasHeight;
            uvs[0] = l; uvs[1] = t;
            uvs[2] = l; uvs[3] = b;
            uvs[4] = r; uvs[5] = t;
            uvs[6] = r; uvs[7] = b;
        }
        else {
            l = (textureRect.x + texelCorrect) / atlasWidth;
            b = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            r = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            t = (textureRect.y + texelCorrect) / atlasHeight;
            uvs[0] = l; uvs[1] = b;
            uvs[2] = r; uvs[3] = b;
            uvs[4] = l; uvs[5] = t;
            uvs[6] = r; uvs[7] = t;
        }
    }
};

var scale9QuadGenerator = {
    x: new Array(4),
    y: new Array(4),
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize, insetLeft, insetRight, insetTop, insetBottom) {
        //build vertices
        var vertices = sprite._vertices;
        var wt = sprite._renderCmd._worldTransform;
        var leftWidth, centerWidth, rightWidth;
        var topHeight, centerHeight, bottomHeight;
        var rect = spriteFrame._rect;

        leftWidth = insetLeft;
        rightWidth = insetRight;
        centerWidth = rect.width - leftWidth - rightWidth;
        topHeight = insetTop;
        bottomHeight = insetBottom;
        centerHeight = rect.height - topHeight - bottomHeight;

        var preferSize = contentSize;
        var sizableWidth = preferSize.width - leftWidth - rightWidth;
        var sizableHeight = preferSize.height - topHeight - bottomHeight;
        var xScale = preferSize.width / (leftWidth + rightWidth);
        var yScale = preferSize.height / (topHeight + bottomHeight);
        xScale = xScale > 1 ? 1 : xScale;
        yScale = yScale > 1 ? 1 : yScale;
        sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
        sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
        var x = this.x;
        var y = this.y;
        x[0] = 0;
        x[1] = leftWidth * xScale;
        x[2] = x[1] + sizableWidth;
        x[3] = preferSize.width;
        y[0] = 0;
        y[1] = bottomHeight * yScale;
        y[2] = y[1] + sizableHeight;
        y[3] = preferSize.height;

        if (vertices.length < 32) {
            dataPool.put(vertices);
            vertices = dataPool.get(32) || new Float32Array(32);
            sprite._vertices = vertices;
        }
        var offset = 0, row, col;
        if (webgl) {
            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    vertices[offset] = x[col] * wt.a + y[row] * wt.c + wt.tx;
                    vertices[offset+1] = x[col] * wt.b + y[row] * wt.d + wt.ty;
                    offset += 2;
                }
            }
        }
        else {
            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    vertices[offset] = x[col];
                    vertices[offset+1] = y[row];
                    offset += 2;
                }
            }
        }

        cornerId[0] = 0;  // bl
        cornerId[1] = 6;  // br
        cornerId[2] = 24; // tl
        cornerId[3] = 30; // tr

        //build uvs
        if (sprite._uvsDirty) {
            this._calculateUVs(sprite, spriteFrame, insetLeft, insetRight, insetTop, insetBottom);
        }
    },

    _calculateUVs: function (sprite, spriteFrame, insetLeft, insetRight, insetTop, insetBottom) {
        var uvs = sprite._uvs;
        var rect = spriteFrame._rect;
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;

        //caculate texture coordinate
        var leftWidth, centerWidth, rightWidth;
        var topHeight, centerHeight, bottomHeight;
        var textureRect = spriteFrame._rect;

        leftWidth = insetLeft;
        rightWidth = insetRight;
        centerWidth = rect.width - leftWidth - rightWidth;
        topHeight = insetTop;
        bottomHeight = insetBottom;
        centerHeight = rect.height - topHeight - bottomHeight;

        if (uvs.length < 32) {
            dataPool.put(uvs);
            uvs = dataPool.get(32) || new Float32Array(32);
            sprite._uvs = uvs;
        }

        //uv computation should take spritesheet into account.
        var u = this.x;
        var v = this.y;
        var texelCorrect = macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        var offset = 0, row, col;

        if (spriteFrame._rotated) {
            u[0] = (textureRect.x + texelCorrect) / atlasWidth;
            u[1] = (bottomHeight + textureRect.x) / atlasWidth;
            u[2] = (bottomHeight + centerHeight + textureRect.x) / atlasWidth;
            u[3] = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;

            v[3] = (textureRect.y + texelCorrect) / atlasHeight;
            v[2] = (leftWidth + textureRect.y) / atlasHeight;
            v[1] = (leftWidth + centerWidth + textureRect.y) / atlasHeight;
            v[0] = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;

            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    uvs[offset] = u[row];
                    uvs[offset+1] = v[3-col];
                    offset += 2;
                }
            }
        }
        else {
            u[0] = (textureRect.x + texelCorrect) / atlasWidth;
            u[1] = (leftWidth + textureRect.x) / atlasWidth;
            u[2] = (leftWidth + centerWidth + textureRect.x) / atlasWidth;
            u[3] = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;

            v[3] = (textureRect.y + texelCorrect) / atlasHeight;
            v[2] = (topHeight + textureRect.y) / atlasHeight;
            v[1] = (topHeight + centerHeight + textureRect.y) / atlasHeight;
            v[0] = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;

            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    uvs[offset] = u[col];
                    uvs[offset+1] = v[row];
                    offset += 2;
                }
            }
        }
    }
};

var tiledQuadGenerator = {
    _rebuildQuads_base: function (sprite, spriteFrame, contentSize) {
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            uvs = sprite._uvs;
        //build uvs
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        //uv computation should take spritesheet into account.
        var u0, v0, u1, v1;
        var texelCorrect = macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        if (spriteFrame._rotated) {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u1 = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            v0 = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            v1 = (textureRect.y + texelCorrect) / atlasHeight;
        }
        else {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u1 = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            v0 = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            v1 = (textureRect.y + texelCorrect) / atlasHeight;
        }

        //build quads
        var rectWidth = textureRect.width;
        var rectHeight = textureRect.height;
        var hRepeat = contentSize.width / rectWidth;
        var vRepeat = contentSize.height / rectHeight;
        var row = Math.ceil(vRepeat), col = Math.ceil(hRepeat);

        if (row * col > (65536 / 4)) {
            cc.errorID(2625);
        }
        var dataLength = row * col * 4 * 2;
        if (vertices.length < dataLength) {
            dataPool.put(vertices);
            vertices = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._vertices = vertices;
        }
        if (uvs.length < dataLength) {
            dataPool.put(uvs);
            uvs = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._uvs = uvs;
        }

        var offset = 0, l, b, r, t;
        sprite._vertCount = 0;
        for (var vindex = 0; vindex < row; ++vindex) {
            for (var hindex = 0; hindex < col; ++hindex) {
                l = rectWidth * hindex;
                b = rectHeight * vindex;
                r = rectWidth * Math.min(hindex + 1, hRepeat);
                t = rectHeight * Math.min(vindex + 1, vRepeat);
                // bl.x, bl.y, br.x, br.y, tl.x, tl.y, tr.x, tr.y
                if (webgl) {
                    var la = l * wt.a, lb = l * wt.b, ra = r * wt.a, rb = r * wt.b,
                        tcx = t * wt.c + wt.tx, tdy = t * wt.d + wt.ty, 
                        bcx = b * wt.c + wt.tx, bdy = b * wt.d + wt.ty;
                    vertices[offset] = la + bcx;
                    vertices[offset + 1] = lb + bdy;
                    vertices[offset + 2] = ra + bcx;
                    vertices[offset + 3] = rb + bdy;
                    vertices[offset + 4] = la + tcx;
                    vertices[offset + 5] = lb + tdy;
                    vertices[offset + 6] = ra + tcx;
                    vertices[offset + 7] = rb + tdy;
                }
                else {
                    vertices[offset] = l;
                    vertices[offset + 1] = b;
                    vertices[offset + 2] = r;
                    vertices[offset + 3] = b;
                    vertices[offset + 4] = l;
                    vertices[offset + 5] = t;
                    vertices[offset + 6] = r;
                    vertices[offset + 7] = t;
                }

                if (!spriteFrame._rotated) {
                    uvs[offset] = u0;
                    uvs[offset + 1] = v0;
                    uvs[offset + 2] = r = u0 + (u1 - u0) * Math.min(1, hRepeat - hindex);
                    uvs[offset + 3] = v0;
                    uvs[offset + 4] = u0;
                    uvs[offset + 5] = t = v0 + (v1 - v0) * Math.min(1, vRepeat - vindex);
                    uvs[offset + 6] = r;
                    uvs[offset + 7] = t;
                } else {
                    uvs[offset] = u0;
                    uvs[offset + 1] = v1;
                    uvs[offset + 2] = u0;
                    uvs[offset + 3] = t = v1 + (v0 - v1) * Math.min(1, hRepeat - hindex);
                    uvs[offset + 4] = r = u0 + (u1 - u0) * Math.min(1, vRepeat - vindex);
                    uvs[offset + 5] = v1;
                    uvs[offset + 6] = r;
                    uvs[offset + 7] = t;
                }
                offset += 8;
                sprite._vertCount += 4;
                if (offset > dataLength) return;
            }
        }

        cornerId[0] = 0; // bl
        cornerId[1] = (col-1) * 8 + 2; // br
        cornerId[2] = (row-1) * col * 8 + 4; // tl
        cornerId[3] = dataLength - 2; // tr
    }
};

var fillQuadGeneratorBar = {
    //percentage from 0 to 1;
    _rebuildQuads_base : function (sprite, spriteFrame, contentSize, fillType, fillStart, fillRange) {
        var vertices = sprite._vertices,
            wt = sprite._renderCmd._worldTransform,
            uvs = sprite._uvs;
        var fillEnd;
        //build vertices
        var l = 0, b = 0,
            r = contentSize.width, t = contentSize.height;
        //build uvs
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;
        //uv computation should take spritesheet into account.
        var ul, vb, ur, vt;
        var texelCorrect = macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;
        if (spriteFrame._rotated) {
            ul = (textureRect.x + texelCorrect) / atlasWidth;
            vb = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
            ur = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;
            vt = (textureRect.y + texelCorrect) / atlasHeight;
        }
        else {
            ul = (textureRect.x + texelCorrect) / atlasWidth;
            vb = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
            ur = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;
            vt = (textureRect.y + texelCorrect) / atlasHeight;
        }

        if (vertices.length < 8) {
            dataPool.put(vertices);
            vertices = dataPool.get(8) || new Float32Array(8);
            sprite._vertices = vertices;
        }
        if (uvs.length < 8) {
            dataPool.put(uvs);
            uvs = dataPool.get(8) || new Float32Array(8);
            sprite._uvs = uvs;
        }

        var quadUV = new Array(8);
        if (!spriteFrame._rotated) {
            quadUV[0] = quadUV[4] = ul;
            quadUV[2] = quadUV[6] = ur;
            quadUV[1] = quadUV[3] = vb;
            quadUV[5] = quadUV[7] = vt;
        } else {
            quadUV[0] = quadUV[2] = ul;
            quadUV[4] = quadUV[6] = ur;
            quadUV[3] = quadUV[7] = vb;
            quadUV[1] = quadUV[5] = vt;
        }

        //do clamp
        fillStart = fillStart > 1 ? 1 : fillStart;
        fillStart = fillStart < 0 ? 0 : fillStart;
        fillRange = fillRange < 0 ? 0 : fillRange;
        fillEnd = fillStart + fillRange;
        fillEnd = fillEnd > 1 ? 1 : fillEnd;

        // bl : 0, 1
        // br : 2, 3
        // tl : 4, 5
        // tr : 6, 7
        var progressStart, progressEnd;
        switch (fillType) {
            case FillType.HORIZONTAL:
                progressStart = l + (r - l) * fillStart;
                progressEnd = l + (r - l) * fillEnd;

                l = progressStart;
                r = progressEnd;

                uvs[0] = quadUV[0] + (quadUV[2] - quadUV[0]) * fillStart;
                uvs[1] = quadUV[1];
                uvs[2] = quadUV[0] + (quadUV[2] - quadUV[0]) * fillEnd;
                uvs[3] = quadUV[3];
                uvs[4] = quadUV[4] + (quadUV[6] - quadUV[4]) * fillStart;
                uvs[5] = quadUV[5];
                uvs[6] = quadUV[4] + (quadUV[6] - quadUV[4]) * fillEnd;
                uvs[7] = quadUV[7];
                break;
            case FillType.VERTICAL:
                progressStart = b + (t - b) * fillStart;
                progressEnd = b + (t - b) * fillEnd;

                b = progressStart;
                t = progressEnd;

                uvs[0] = quadUV[0];
                uvs[1] = quadUV[1] + (quadUV[5] - quadUV[1]) * fillStart;
                uvs[2] = quadUV[2];
                uvs[3] = quadUV[3] + (quadUV[7] - quadUV[3]) * fillStart;
                uvs[4] = quadUV[4];
                uvs[5] = quadUV[1] + (quadUV[5] - quadUV[1]) * fillEnd;
                uvs[6] = quadUV[6];
                uvs[7] = quadUV[3] + (quadUV[7] - quadUV[3]) * fillEnd;
                break;
            default:
                cc.errorID(2626);
                break;
        }

        //build vertices
        if (webgl) {
            var la = l * wt.a, lb = l * wt.b, ra = r * wt.a, rb = r * wt.b,
                tcx = t * wt.c + wt.tx, tdy = t * wt.d + wt.ty, 
                bcx = b * wt.c + wt.tx, bdy = b * wt.d + wt.ty;
            vertices[0] = la + bcx;
            vertices[1] = lb + bdy;
            vertices[2] = ra + bcx;
            vertices[3] = rb + bdy;
            vertices[4] = la + tcx;
            vertices[5] = lb + tdy;
            vertices[6] = ra + tcx;
            vertices[7] = rb + tdy;
        } else{
            vertices[0] = l;
            vertices[1] = b;
            vertices[2] = r;
            vertices[3] = b;
            vertices[4] = l;
            vertices[5] = t;
            vertices[6] = r;
            vertices[7] = t;
        }

        sprite._vertCount = 4;

        cornerId[0] = 0; // bl
        cornerId[1] = 2; // br
        cornerId[2] = 4; // tl
        cornerId[3] = 6; // tr
    }
};

var fillQuadGeneratorRadial = {
    _vertPos: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    _vertices: [cc.v2(0,0),cc.v2(0,0)],
    _uvs: [cc.v2(0,0),cc.v2(0,0)],
    _intersectPoint_1: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    _intersectPoint_2: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
    outVerts: null,
    outUvs: null,
    rawVerts: null,
    rawUvs: null,

    _rebuildQuads_base : function (sprite, spriteFrame, contentSize, fillCenter, fillStart, fillRange) {
        var vertices = sprite._vertices,
            uvs = sprite._uvs,
            rawVerts = sprite._rawVerts,
            rawUvs = sprite._rawUvs,
            wt = sprite._renderCmd._worldTransform;
        //do round fill start [0,1), include 0, exclude 1
        while (fillStart >= 1.0) fillStart -= 1.0;
        while (fillStart < 0.0) fillStart += 1.0;
        var cx = fillCenter.x * contentSize.width,
            cy = fillCenter.y * contentSize.height;
        var center = cc.v2( cx, cy);

        fillStart *= Math.PI * 2;
        fillRange *= Math.PI * 2;
        var fillEnd = fillStart + fillRange;

        this.outVerts = vertices;
        this.outUvs = uvs;
        this.rawVerts = rawVerts;
        this.rawUvs = rawUvs;

        //build vertices
        this._calculateVertices(wt, spriteFrame, contentSize);
        //build uvs
        this._calculateUVs(spriteFrame);

        var _vertPos = this._vertPos,
            _vertices = this._vertices;

        _vertPos[0].x = _vertPos[3].x = _vertices[0].x;
        _vertPos[1].x = _vertPos[2].x = _vertices[1].x;
        _vertPos[0].y = _vertPos[1].y = _vertices[0].y;
        _vertPos[2].y = _vertPos[3].y = _vertices[1].y;

        //fallback
        //todo remove it if outside is implemented
        if(center.x > _vertices[1].x) {
            center.x = _vertices[1].x;
        }
        if(center.x < _vertices[0].x) {
            center.x = _vertices[0].x;
        }
        if(center.y < _vertices[0].y) {
            center.y = _vertices[0].y;
        }
        if(center.y > _vertices[1].y) {
            center.y = _vertices[1].y;
        }

        rawVerts[0] = rawVerts[4] = this._vertices[0].x;
        rawVerts[2] = rawVerts[6] = this._vertices[1].x;
        rawVerts[1] = rawVerts[3] = this._vertices[0].y;
        rawVerts[5] = rawVerts[7] = this._vertices[1].y;

        if (!spriteFrame._rotated) {
            rawUvs[0] = rawUvs[4] = this._uvs[0].x;
            rawUvs[2] = rawUvs[6] = this._uvs[1].x;
            rawUvs[1] = rawUvs[3] = this._uvs[0].y;
            rawUvs[5] = rawUvs[7] = this._uvs[1].y;
        } else {
            rawUvs[0] = rawUvs[2] = this._uvs[0].x;
            rawUvs[4] = rawUvs[6] = this._uvs[1].x;
            rawUvs[3] = rawUvs[7] = this._uvs[0].y;
            rawUvs[1] = rawUvs[5] = this._uvs[1].y;
        }

        var triangles = [null, null, null, null];
        if(center.x !== this._vertices[0].x) {
            triangles[0] = [3, 0];
        }
        if(center.x !== this._vertices[1].x) {
            triangles[2] = [1, 2];
        }
        if(center.y !== this._vertices[0].y) {
            triangles[1] = [0, 1];
        }
        if(center.y !== this._vertices[1].y) {
            triangles[3] = [2, 3];
        }

        this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, center, fillStart, this._intersectPoint_1);
        this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, center, fillStart + fillRange, this._intersectPoint_2);

        var dataLength = 3 * 5 * 2;
        if (vertices.length < dataLength) {
            dataPool.put(vertices);
            vertices = dataPool.get(dataLength) || new Float32Array(dataLength);
            this.outVerts = sprite._vertices = vertices;
        }
        if (uvs.length < dataLength) {
            dataPool.put(uvs);
            uvs = dataPool.get(dataLength) || new Float32Array(dataLength);
            this.outUvs = sprite._uvs = uvs;
        }

        var offset = 0, count = 0;
        for(var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
            var triangle = triangles[triangleIndex];
            if(triangle === null) {
                continue;
            }
            //all in
            if(fillRange >= Math.PI * 2) {
                this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._vertPos[triangle[1]]);
                offset += 6;
                count += 3;
                continue;
            }
            //test against
            var startAngle = this._getVertAngle(center, this._vertPos[triangle[0]]);
            var endAngle = this._getVertAngle(center, this._vertPos[triangle[1]]);
            if(endAngle < startAngle) endAngle += Math.PI * 2;
            startAngle -= Math.PI * 2;
            endAngle -= Math.PI * 2;
            //testing
            for(var testIndex = 0; testIndex < 3; ++testIndex) {
                if(startAngle >= fillEnd) {
                    //all out
                } else if (startAngle >= fillStart) {
                    if(endAngle >= fillEnd) {
                        //startAngle to fillEnd
                        this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._intersectPoint_2[triangleIndex]);
                    } else {
                        //startAngle to endAngle
                        this._generateTriangle(wt, offset, center, this._vertPos[triangle[0]], this._vertPos[triangle[1]]);
                    }
                    offset += 6;
                    count += 3;
                } else {
                    //startAngle < fillStart
                    if(endAngle <= fillStart) {
                        //all out
                    } else if(endAngle <= fillEnd) {
                        //fillStart to endAngle
                        this._generateTriangle(wt, offset, center, this._intersectPoint_1[triangleIndex], this._vertPos[triangle[1]]);
                        offset += 6;
                        count += 3;
                    } else {
                        //fillStart to fillEnd
                        this._generateTriangle(wt, offset, center, this._intersectPoint_1[triangleIndex], this._intersectPoint_2[triangleIndex]);
                        offset += 6;
                        count += 3;
                    }
                }
                //add 2 * PI
                startAngle += Math.PI * 2;
                endAngle += Math.PI * 2;
            }
        }
        sprite._vertCount = count;

        cornerId[0] = 0; // bl
        cornerId[1] = 2; // br
        cornerId[2] = 4; // tl
        cornerId[3] = 6; // tr
    },

    _generateTriangle: function(wt, offset, vert0, vert1, vert2) {
        var rawVerts = this.rawVerts;
        var rawUvs = this.rawUvs;
        var vertices = this.outVerts;
        var v0x = rawVerts[0];
        var v0y = rawVerts[1];
        var v1x = rawVerts[6];
        var v1y = rawVerts[7];
        var progressX, progressY;
        // tl: 0, 1
        // bl: 2, 3
        // tr: 4, 5
        if(webgl) {
            vertices[offset]  = vert0.x * wt.a + vert0.y * wt.c + wt.tx;
            vertices[offset+1]  = vert0.x * wt.b + vert0.y * wt.d + wt.ty;
            vertices[offset+2]  = vert1.x * wt.a + vert1.y * wt.c + wt.tx;
            vertices[offset+3]  = vert1.x * wt.b + vert1.y * wt.d + wt.ty;
            vertices[offset+4]  = vert2.x * wt.a + vert2.y * wt.c + wt.tx;
            vertices[offset+5]  = vert2.x * wt.b + vert2.y * wt.d + wt.ty;

        } else {
            vertices[offset]  = vert0.x;
            vertices[offset+1]  = vert0.y;
            vertices[offset+2]  = vert1.x;
            vertices[offset+3]  = vert1.y;
            vertices[offset+4]  = vert2.x;
            vertices[offset+5]  = vert2.y;
        }

        progressX = (vert0.x - v0x) / (v1x - v0x);
        progressY = (vert0.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset);

        progressX = (vert1.x - v0x) / (v1x - v0x);
        progressY = (vert1.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset + 2);

        progressX = (vert2.x - v0x) / (v1x - v0x);
        progressY = (vert2.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, rawUvs, offset + 4);
    },

    _generateUV : function(progressX, progressY, uvs, offset) {
        var out = this.outUvs;
        var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
        var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
        var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
        var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
        out[offset] = px1 + (px2 - px1) * progressY;
        out[offset+1] = py1 + (py2 - py1) * progressY;
    },

    _isAngleIn : function(angle, start, rangeAngle) {
        var pi_2 = Math.PI * 2;
        while(angle < start || angle >= start + pi_2) {
            if(angle < start) {
                angle += pi_2;
            }
            if(angle >= start + pi_2) {
                angle -= pi_2;
            }
        }

        return angle <= start + rangeAngle;
    },

    //[0,PI * 2)
    _getVertAngle: function(start, end) {
        var placementX, placementY;
        placementX = end.x - start.x;
        placementY = end.y - start.y;

        if(placementX === 0 && placementY === 0) {
            return undefined;
        } else if(placementX === 0) {
            if(placementY > 0) {
                return Math.PI * 0.5;
            } else {
                return Math.PI * 1.5;
            }
        } else {
            var angle = Math.atan(placementY / placementX);
            if(placementX < 0) {
                angle += Math.PI;
            }

            return angle;
        }
    },

    _getInsectedPoints: function(left, right, bottom, top, center, angle, intersectPoints) {
        //left bottom, right, top
        var result = [null, null, null, null];
        var sinAngle = Math.sin(angle);
        var cosAngle = Math.cos(angle);
        var tanAngle,cotAngle;
        if(Math.cos(angle) !== 0) {
            tanAngle = sinAngle / cosAngle;
            //calculate right and left
            if((left - center.x) * cosAngle > 0) {
                var yleft = center.y + tanAngle * (left - center.x);
                intersectPoints[0].x = left;
                intersectPoints[0].y = yleft;
            }
            if((right - center.x) * cosAngle > 0) {
                var yright = center.y + tanAngle * (right - center.x);

                intersectPoints[2].x = right;
                intersectPoints[2].y = yright;
            }

        }

        if(Math.sin(angle) !== 0) {
            cotAngle = cosAngle / sinAngle;
            //calculate  top and bottom
            if((top - center.y) * sinAngle > 0) {
                var xtop = center.x  + cotAngle * (top-center.y);
                intersectPoints[3].x = xtop;
                intersectPoints[3].y = top;
            }
            if((bottom - center.y) * sinAngle > 0) {
                var xbottom = center.x  + cotAngle * (bottom-center.y);
                intersectPoints[1].x = xbottom;
                intersectPoints[1].y = bottom;
            }

        }
        return result;
    },

    _calculateVertices : function (wt, spriteFrame, contentSize) {
        var x0, x3, y0, y3;
        x0 = 0;
        y0 = 0;
        x3 = contentSize.width;
        y3 = contentSize.height;

        this._vertices[0].x = x0;
        this._vertices[0].y = y0;
        this._vertices[1].x = x3;
        this._vertices[1].y = y3;
    },

    _calculateUVs : function (spriteFrame) {
        var atlasWidth = spriteFrame._texture._pixelWidth;
        var atlasHeight = spriteFrame._texture._pixelHeight;
        var textureRect = spriteFrame._rect;

        //uv computation should take spritesheet into account.
        var u0, u3, v0, v3;
        var texelCorrect = macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;

        if (spriteFrame._rotated) {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u3 = (textureRect.x + textureRect.height - texelCorrect) / atlasWidth;

            v0 = (textureRect.y + texelCorrect) / atlasHeight;
            v3 = (textureRect.y + textureRect.width - texelCorrect) / atlasHeight;
        }
        else {
            u0 = (textureRect.x + texelCorrect) / atlasWidth;
            u3 = (textureRect.x + textureRect.width - texelCorrect) / atlasWidth;

            v0 = (textureRect.y + texelCorrect) / atlasHeight;
            v3 = (textureRect.y + textureRect.height - texelCorrect) / atlasHeight;
        }

        this._uvs[0].x = u0;
        this._uvs[0].y = v3;
        this._uvs[1].x = u3;
        this._uvs[1].y = v0;
    }
};

var meshQuadGenerator = {
    _rebuildQuads_base: function (sprite, spriteFrame, polygonInfo) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            return;
        }

        if (!polygonInfo) {
            return;
        }

        var wt = sprite._renderCmd._worldTransform;
        var srcVerts = polygonInfo.triangles.verts;
        var vertices = sprite._vertices;
        var uvs = sprite._uvs;
        var count = srcVerts.length;

        var dataLength = count * 2;
        if (vertices.length < dataLength) {
            dataPool.put(vertices);
            vertices = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._vertices = vertices;
        }
        if (uvs.length < dataLength) {
            dataPool.put(uvs);
            uvs = dataPool.get(dataLength) || new Float32Array(dataLength);
            sprite._uvs = uvs;
        }

        var l = Infinity, b = Infinity,
            r = -Infinity, t = -Infinity;
        for (var i = 0; i < count; i++) {
            var x = srcVerts[i].x * wt.a + srcVerts[i].y * wt.c + wt.tx;
            var y = srcVerts[i].x * wt.b + srcVerts[i].y * wt.d + wt.ty;
            vertices[i * 2] = x;
            vertices[i * 2 + 1] = y;
            uvs[i * 2] = srcVerts[i].u;
            uvs[i * 2 + 1] = srcVerts[i].v;

            if (x < l) {
                l = x;
                cornerId[0] = i * 2; // left
            }

            if (x > r) {
                r = x;
                cornerId[1] = i * 2; // right
            }

            if (y < b) {
                b = y;
                cornerId[2] = i * 2; // bottom
            }

            if (y > t) {
                t = y;
                cornerId[3] = i * 2; // top
            }
        }

        sprite._vertCount = count;
    }
};

cc.Scale9Sprite = _ccsg.Node.extend({
    //resource data, could be async loaded.
    _spriteFrame: null,

    //scale 9 data
    _insetLeft: 0,
    _insetRight: 0,
    _insetTop: 0,
    _insetBottom: 0,
    //blend function
    _blendFunc: null,
    //sliced or simple
    _renderingType: 1,
    //bright or not
    _brightState: 0,
    //rendering quads shared by canvas and webgl
    _rawVerts: null,
    _rawUvs: null,
    _vertices: null,
    _uvs: null,
    _vertCount: 0,
    _quadsDirty: true,
    _uvsDirty: true,
    _isTriangle: false,
    _isTrimmedContentSize: true,
    //fill type
    _fillType: 0,
    //for fill radial
    _fillCenter: null,
    //normalized filled start and range
    _fillStart: 0,
    _fillRange: Math.PI * 2,
    _distortionOffset: null,
    _distortionTiling: null,
    _meshPolygonInfo: null,

    ctor: function (textureOrSpriteFrame) {
        _ccsg.Node.prototype.ctor.call(this);
        this._renderCmd.setState(this._brightState);
        this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();
        this._fillCenter = cc.v2(0,0);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        // Init vertex data for simple
        this._rawVerts = null;
        this._rawUvs = null;
        this._vertices = dataPool.get(8) || new Float32Array(8);
        this._uvs = dataPool.get(8) || new Float32Array(8);
        // Init sprite frame
        if (typeof textureOrSpriteFrame === 'string' || textureOrSpriteFrame instanceof cc.Texture2D) {
            this.initWithTexture(textureOrSpriteFrame);
        }
        else if (textureOrSpriteFrame instanceof cc.SpriteFrame) {
            this.initWithSpriteFrame(textureOrSpriteFrame);
        }

        if (webgl === undefined) {
            webgl = cc._renderType === cc.game.RENDER_TYPE_WEBGL;
            vl = cc.visibleRect.left;
            vr = cc.visibleRect.right;
            vt = cc.visibleRect.top;
            vb = cc.visibleRect.bottom;
        }
    },

    loaded: function () {
        if (this._spriteFrame === null) {
            return false;
        } else {
            return this._spriteFrame.textureLoaded();
        }
    },

    /**
     * Initializes a 9-slice sprite with a texture file
     *
     * @param textureOrTextureFile The name of the texture file.
     */
    initWithTexture: function (textureOrTextureFile) {
        this.setTexture(textureOrTextureFile);
    },

    /**
     * Initializes a 9-slice sprite with an sprite frame
     * @param spriteFrameOrSFName The sprite frame object.
     */
    initWithSpriteFrame: function (spriteFrameOrSFName) {
        this.setSpriteFrame(spriteFrameOrSFName);
    },

    /**
     * Change the texture file of 9 slice sprite
     *
     * @param textureOrTextureFile The name of the texture file.
     */
    setTexture: function (textureOrTextureFile) {
        var spriteFrame = new cc.SpriteFrame(textureOrTextureFile);
        this.setSpriteFrame(spriteFrame);
    },

    /**
     * Change the sprite frame of 9 slice sprite
     *
     * @param spriteFrame The SpriteFrame object.
     */
    setSpriteFrame: function (spriteFrame) {
        if (spriteFrame) {
            this._spriteFrame = spriteFrame;
            this._quadsDirty = true;
            this._uvsDirty = true;
            this._renderCmd._needDraw = false;
            var self = this;
            var onResourceDataLoaded = function () {
                if (cc.sizeEqualToSize(self._contentSize, cc.size(0, 0))) {
                    self.setContentSize(self._spriteFrame._rect);
                }
                self._renderCmd._needDraw = true;
                self._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
            };
            if (spriteFrame.textureLoaded()) {
                onResourceDataLoaded();
            } else {
                spriteFrame.once('load', onResourceDataLoaded, this);
            }
        }
    },

    /**
     * Sets the source blending function.
     *
     * @param blendFunc A structure with source and destination factor to specify pixel arithmetic. e.g. {GL_ONE, GL_ONE}, {GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA}.
     */
    setBlendFunc: function (blendFunc, dst) {
        if (dst === undefined) {
            this._blendFunc.src = blendFunc.src || cc.macro.BLEND_SRC;
            this._blendFunc.dst = blendFunc.dst || cc.macro.BLEND_DST;
        }
        else {
            this._blendFunc.src = blendFunc || cc.macro.BLEND_SRC;
            this._blendFunc.dst = dst || cc.macro.BLEND_DST;
        }
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * Returns the blending function that is currently being used.
     *
     * @return A BlendFunc structure with source and destination factor which specified pixel arithmetic.
     */
    getBlendFunc: function () {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    // overrides
    setContentSize: function (width, height) {
        if (height === undefined) {
            height = width.height;
            width = width.width;
        }
        if (width === this._contentSize.width && height === this._contentSize.height) {
            return;
        }

        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._quadsDirty = true;
    },

    //
    enableTrimmedContentSize: function (isTrimmed) {
        if (this._isTrimmedContentSize !== isTrimmed) {
            this._isTrimmedContentSize = isTrimmed;
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    isTrimmedContentSizeEnabled: function () {
        return this._isTrimmedContentSize;
    },
    /**
     * Change the state of 9-slice sprite.
     * @see `State`
     * @param state A enum value in State.
     */
    setState: function (state) {
        this._brightState = state;
        this._renderCmd.setState(state);
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * Query the current bright state.
     * @return @see `State`
     */
    getState: function () {
        return this._brightState;
    },

    /**
     * change the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    setRenderingType: function (type) {
        if (this._renderingType === type) return;
        this._renderingType = type;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    getRenderingType: function () {
        return this._renderingType;
    },
    /**
     * change the left border of 9 slice sprite, it should be specified before trimmed.
     * @param insetLeft left border.
     */
    setInsetLeft: function (insetLeft) {
        this._insetLeft = insetLeft;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the left border of 9 slice sprite, the result is specified before trimmed.
     * @return left border.
     */
    getInsetLeft: function () {
        return this._insetLeft;
    },
    /**
     * change the top border of 9 slice sprite, it should be specified before trimmed.
     * @param insetTop top border.
     */
    setInsetTop: function (insetTop) {
        this._insetTop = insetTop;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the top border of 9 slice sprite, the result is specified before trimmed.
     * @return top border.
     */
    getInsetTop: function () {
        return this._insetTop;
    },

    /**
     * change the right border of 9 slice sprite, it should be specified before trimmed.
     * @param insetRight right border.
     */
    setInsetRight: function (insetRight) {
        this._insetRight = insetRight;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the right border of 9 slice sprite, the result is specified before trimmed.
     * @return right border.
     */
    getInsetRight: function () {
        return this._insetRight;
    },

    /**
     * change the bottom border of 9 slice sprite, it should be specified before trimmed.
     * @param insetBottom bottom border.
     */
    setInsetBottom: function (insetBottom) {
        this._insetBottom = insetBottom;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the bottom border of 9 slice sprite, the result is specified before trimmed.
     * @return bottom border.
     */
    getInsetBottom: function () {
        return this._insetBottom;
    },

    setFillType: function(value) {
        if(this._fillType === value)
            return;
        this._fillType = value;
        if(this._renderingType === RenderingType.FILLED) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillType: function() {
        return this._fillType;
    },

    setFillCenter: function(value, y) {
        this._fillCenter = cc.v2(value,y);
        if(this._renderingType === RenderingType.FILLED && this._fillType === FillType.RADIAL) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    setDistortionTiling: function(valueOrX, y) {
        if(y === undefined) {
            y = valueOrX.y;
            valueOrX = valueOrX.x;
        }
        this._distortionTiling = this._distortionTiling || cc.v2(0,0);
        this._distortionTiling.x = valueOrX;
        this._distortionTiling.y = y;
    },

    setDistortionOffset: function(valueOrX, y) {
        if(y === undefined) {
            y = valueOrX.y;
            valueOrX = valueOrX.x;
        }
        this._distortionOffset = this._distortionOffset || cc.v2(0,0);
        this._distortionOffset.x = valueOrX;
        this._distortionOffset.y = y;
    },

    getFillCenter: function() {
        return cc.v2(this._fillCenter);
    },

    setFillStart: function(value) {
        if(this._fillStart === value)
            return;
        this._fillStart = value;
        if(this._renderingType === RenderingType.FILLED) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillStart: function() {
        return this._fillStart;
    },

    setFillRange: function(value) {
        if(this._fillRange === value)
            return;
        this._fillRange = value;
        if(this._renderingType === RenderingType.FILLED ) {
            this._quadsDirty = true;
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        }
    },

    getFillRange: function() {
        return this._fillRange;
    },

    _rebuildQuads: function () {
        if (!this._spriteFrame || !this._spriteFrame._textureLoaded) {
            this._renderCmd._needDraw = false;
            return;
        }
        this._isTriangle = false;
        switch (this._renderingType) {
        case RenderingType.SIMPLE:
            simpleQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._isTrimmedContentSize);
            break;
        case RenderingType.SLICED:
            scale9QuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._insetLeft, this._insetRight, this._insetTop, this._insetBottom);
            break;
        case RenderingType.TILED:
            tiledQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize);
            break;
        case RenderingType.FILLED:
            var fillstart = this._fillStart;
            var fillRange = this._fillRange;
            if(fillRange < 0) {
                fillstart += fillRange;
                fillRange = -fillRange;
            }
            if (this._fillType !== FillType.RADIAL) {
                fillRange = fillstart + fillRange;
                fillstart = fillstart > 1.0 ? 1.0 : fillstart;
                fillstart = fillstart < 0.0 ? 0.0 : fillstart;

                fillRange = fillRange > 1.0 ? 1.0 : fillRange;
                fillRange = fillRange < 0.0 ? 0.0 : fillRange;
                fillRange = fillRange - fillstart;
                fillQuadGeneratorBar._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._fillType, fillstart, fillRange);
            } else {
                this._isTriangle = true;
                if (!this._rawVerts) {
                    this._rawVerts = dataPool.get(8) || new Float32Array(8);
                    this._rawUvs = dataPool.get(8) || new Float32Array(8);
                }
                fillQuadGeneratorRadial._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._fillCenter,fillstart, fillRange);
            }
            break;
        case RenderingType.MESH:
            meshQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._meshPolygonInfo);
            break;
        default:
            this._quadsDirty = false;
            this._uvsDirty = false;
            this._renderCmd._needDraw = false;
            cc.errorID(2627);
            return;
        }

        // Culling
        if (webgl) {
            // disabled for camera for now, find a better way for webgl culling

            // x1, y1  leftBottom
            // x2, y2  rightBottom
            // x3, y3  leftTop
            // x4, y4  rightTop
            // var vert = this._isTriangle ? this._rawVerts : this._vertices,
            //     x0 = vert[cornerId[0]], x1 = vert[cornerId[1]], x2 = vert[cornerId[2]], x3 = vert[cornerId[3]],
            //     y0 = vert[cornerId[0] + 1], y1 = vert[cornerId[1] + 1], y2 = vert[cornerId[2] + 1], y3 = vert[cornerId[3] + 1];
            // if (((x0-vl.x) & (x1-vl.x) & (x2-vl.x) & (x3-vl.x)) >> 31 || // All outside left
            //     ((vr.x-x0) & (vr.x-x1) & (vr.x-x2) & (vr.x-x3)) >> 31 || // All outside right
            //     ((y0-vb.y) & (y1-vb.y) & (y2-vb.y) & (y3-vb.y)) >> 31 || // All outside bottom
            //     ((vt.y-y0) & (vt.y-y1) & (vt.y-y2) & (vt.y-y3)) >> 31)   // All outside top
            // {
            //     this._renderCmd._needDraw = false;
            // }
            // else {
            //     this._renderCmd._needDraw = true;
            // }
        }
        else {
            var bb = this._renderCmd._currentRegion,
                l = bb._minX, r = bb._maxX, b = bb._minY, t = bb._maxY;
            if (r < vl.x || l > vr.x || t < vb.y || b > vt.y) {
                this._renderCmd._needDraw = false;
            }
            else {
                this._renderCmd._needDraw = true;
            }
        }

        this._quadsDirty = false;
        this._uvsDirty = false;
    },
    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.Scale9Sprite.CanvasRenderCmd(this);
        else
            return new cc.Scale9Sprite.WebGLRenderCmd(this);
    },

    setMeshPolygonInfo: function (polygonInfo) {
        /**
         * polygonInfo in format:
         * {
         *     triangles: {
         *         verts: displayVertices,
         *         indices: vertexIndices
         *     },
         *     rect: boundsRect
         * }
         */
        this.setRenderingType(RenderingType.MESH);
        this._meshPolygonInfo = polygonInfo;
        this._quadsDirty = true;
        this._uvsDirty = true;
    },

    getMeshPolygonInfo: function () {
        return this._meshPolygonInfo;
    }
});

var _p = cc.Scale9Sprite.prototype;
cc.js.addon(_p, EventTarget.prototype);
// Extended properties
cc.defineGetterSetter(_p, 'insetLeft', _p.getInsetLeft, _p.setInsetLeft);
cc.defineGetterSetter(_p, 'insetTop', _p.getInsetTop, _p.setInsetTop);
cc.defineGetterSetter(_p, 'insetRight', _p.getInsetRight, _p.setInsetRight);
cc.defineGetterSetter(_p, 'insetBottom', _p.getInsetBottom, _p.setInsetBottom);

cc.Scale9Sprite.state = {NORMAL: 0, GRAY: 1, DISTORTION: 2};

/**
 * Enum for sprite type
 * @enum SpriteType
 */
var RenderingType = cc.Scale9Sprite.RenderingType = cc.Enum({
    /**
     * @property {Number} SIMPLE
     */
    SIMPLE: 0,
    /**
     * @property {Number} SLICED
     */
    SLICED: 1,
    /*
     * @property {Number} TILED
     */
    TILED: 2,
    /*
     * @property {Number} FILLED
     */
    FILLED: 3,
    /*
     * @property {Number} MESH
     */
    MESH: 4
});

var FillType = cc.Scale9Sprite.FillType = cc.Enum({
    HORIZONTAL: 0,
    VERTICAL: 1,
    RADIAL:2,
});

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

cc.Scale9Sprite.CanvasRenderCmd = function (renderable) {
    this._rootCtor(renderable);
    if (this._node.loaded()) {
        this._needDraw = true;
    }
    else {
        this._needDraw = false;
    }
    this._state = cc.Scale9Sprite.state.NORMAL;
    this._originalTexture = this._textureToRender = null;
};

var proto = cc.Scale9Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.Scale9Sprite.CanvasRenderCmd;

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);
    this._node._rebuildQuads();
};

proto._updateDisplayColor = function(parentColor){
    _ccsg.Node.WebGLRenderCmd.prototype._updateDisplayColor.call(this, parentColor);
    this._originalTexture = this._textureToRender = null;
};

proto.setState = function(state){
    if(this._state === state) return;

    this._state = state;
    this._originalTexture = this._textureToRender = null;
};

proto.rendering = function (ctx, scaleX, scaleY) {
    var node = this._node;
    var locDisplayOpacity = this._displayedOpacity;
    var alpha =  locDisplayOpacity/ 255;
    var locTexture = null;
    if (node._spriteFrame) locTexture = node._spriteFrame._texture;
    if (!node.loaded() || locDisplayOpacity === 0)
        return;
    if (this._textureToRender === null || this._originalTexture !== locTexture) {
        this._textureToRender = this._originalTexture = locTexture;
        if (cc.Scale9Sprite.state.GRAY === this._state) {
            this._textureToRender = this._textureToRender._generateGrayTexture();
        }
        var color = node.getDisplayedColor();
        if (locTexture && (color.r !== 255 || color.g !==255 || color.b !== 255))
            this._textureToRender = this._textureToRender._generateColorTexture(color.r,color.g,color.b);
    }

    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    wrapper.setTransform(this._worldTransform, scaleX, scaleY);
    wrapper.setCompositeOperation(_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(node._blendFunc));
    wrapper.setGlobalAlpha(alpha);

    if (this._textureToRender) {
        if (node._quadsDirty) {
            node._rebuildQuads();
        }
        var sx,sy,sw,sh;
        var x, y, w,h;
        var textureWidth = this._textureToRender._pixelWidth;
        var textureHeight = this._textureToRender._pixelHeight;
        var image = this._textureToRender._htmlElementObj;
        var vertices = node._vertices;
        var uvs = node._uvs;
        var i = 0, off = 0;

        if (node._isTriangle) {
            var rawVerts = node._rawVerts, rawUvs = node._rawUvs;
            x = rawVerts[0];
            y = rawVerts[1];
            w = rawVerts[6] - x;
            h = rawVerts[7] - y;
            y = - y - h;

            sx = rawUvs[4] * textureWidth;
            sy = rawUvs[5] * textureHeight;
            sw = (rawUvs[6] - rawUvs[0]) * textureWidth;
            sh = (rawUvs[1] - rawUvs[7]) * textureHeight;


            wrapper.save();
            context.beginPath();
            var triangleCount = Math.floor(node._vertCount / 3);

            for (i = 0, off = 0; i < triangleCount; i++) {
                context.moveTo(vertices[off++], -vertices[off++]);
                context.lineTo(vertices[off++], -vertices[off++]);
                context.lineTo(vertices[off++], -vertices[off++]);
            }

            context.clip();
            if (this._textureToRender._pattern !== '') {
                wrapper.setFillStyle(context.createPattern(image, this._textureToRender._pattern));
                context.fillRect(x, y, w, h);
            } 
            else {
                if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                    context.drawImage(image,
                        sx, sy, sw, sh,
                        x, y, w, h);
                }
            }

            wrapper.restore();
            cc.g_NumberOfDraws += triangleCount;
        } 
        else if (node._renderingType === cc.Scale9Sprite.RenderingType.SLICED) {
            // Sliced use a special vertices layout 16 vertices for 9 quads
            for (var r = 0; r < 3; ++r) {
                for (var c = 0; c < 3; ++c) {
                    off = r*8 + c*2;
                    x = vertices[off];
                    y = vertices[off+1];
                    w = vertices[off+10] - x;
                    h = vertices[off+11] - y;
                    y = - y - h;

                    sx = uvs[off] * textureWidth;
                    sy = uvs[off+11] * textureHeight;
                    sw = (uvs[off+10] - uvs[off]) * textureWidth;
                    sh = (uvs[off+1] - uvs[off+11]) * textureHeight;

                    if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
            }
            cc.g_NumberOfDraws += 9;
        }
        else {
            var quadCount = Math.floor(node._vertCount / 4);
            for (i = 0, off = 0; i < quadCount; i++) {
                x = vertices[off];
                y = vertices[off+1];
                w = vertices[off+6] - x;
                h = vertices[off+7] - y;
                y = - y - h;

                sx = uvs[off] * textureWidth;
                sy = uvs[off+7] * textureHeight;
                sw = (uvs[off+6] - uvs[off]) * textureWidth;
                sh = (uvs[off+1] - uvs[off+7]) * textureHeight;
                

                if (this._textureToRender._pattern !== '') {
                    wrapper.setFillStyle(context.createPattern(image, this._textureToRender._pattern));
                    context.fillRect(x, y, w, h);
                } else {
                    if (sw > 0 && sh > 0 && w > 0 && h > 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
                off += 8;
            }
            cc.g_NumberOfDraws += quadCount;
        }
    }
};

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

var ccgl = cc.gl;

cc.Scale9Sprite.WebGLRenderCmd = function (renderable) {
    this._rootCtor(renderable);
    if (this._node.loaded()) {
        this._needDraw = true;
    }
    else {
        this._needDraw = false;
    }

    this.vertexType = cc.renderer.VertexType.QUAD;
    this._dirty = false;
    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
};

var Scale9Sprite = cc.Scale9Sprite;
var proto = Scale9Sprite.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = Scale9Sprite.WebGLRenderCmd;

proto._uploadSliced = function (vertices, uvs, color, z, f32buffer, ui32buffer, offset) {
    var off;
    for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
            off = r*8 + c*2;
            // lb
            f32buffer[offset] = vertices[off];
            f32buffer[offset+1] = vertices[off+1];
            f32buffer[offset+2] = z;
            ui32buffer[offset+3] = color;
            f32buffer[offset+4] = uvs[off];
            f32buffer[offset+5] = uvs[off+1];
            offset += 6;
            // rb
            f32buffer[offset] = vertices[off+2];
            f32buffer[offset + 1] = vertices[off+3];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color;
            f32buffer[offset + 4] = uvs[off+2];
            f32buffer[offset + 5] = uvs[off+3];
            offset += 6;
            // lt
            f32buffer[offset] = vertices[off+8];
            f32buffer[offset + 1] = vertices[off+9];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color;
            f32buffer[offset + 4] = uvs[off+8];
            f32buffer[offset + 5] = uvs[off+9];
            offset += 6;
            // rt
            f32buffer[offset] = vertices[off+10];
            f32buffer[offset + 1] = vertices[off+11];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color;
            f32buffer[offset + 4] = uvs[off+10];
            f32buffer[offset + 5] = uvs[off+11];
            offset += 6;
        }
    }
    return 36;
};

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);
    this._node._rebuildQuads();
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset){
    var node = this._node;
    if (this._displayedOpacity === 0) {
        return 0;
    }

    // Rebuild vertex data
    if (node._quadsDirty) {
        node._rebuildQuads();
    }

    if (node._distortionOffset && this._shaderProgram === Scale9Sprite.WebGLRenderCmd._distortionProgram) {
        this._shaderProgram.use();
        this._shaderProgram.setUniformLocationWith2f(
            Scale9Sprite.WebGLRenderCmd._distortionOffset,
            node._distortionOffset.x, node._distortionOffset.y
        );
        this._shaderProgram.setUniformLocationWith2f(
            Scale9Sprite.WebGLRenderCmd._distortionTiling,
            node._distortionTiling.x, node._distortionTiling.y
        );
        cc.renderer._breakBatch();
    }

    // Color & z
    var opacity = this._displayedOpacity;
    var color, colorVal = this._displayedColor._val;
    if (node._opacityModifyRGB) {
        var a = opacity / 255,
            r = this._displayedColor.r * a,
            g = this._displayedColor.g * a,
            b = this._displayedColor.b * a;
        color = ((opacity<<24) >>> 0) + (b<<16) + (g<<8) + r;
    }
    else {
        color = ((opacity<<24) >>> 0) + ((colorVal&0xff00)<<8) + ((colorVal&0xff0000)>>8) + (colorVal>>>24);
    }
    var z = node._vertexZ;

    // Upload data
    var vertices = node._vertices;
    var uvs = node._uvs;
    var types = Scale9Sprite.RenderingType;
    var offset = vertexDataOffset;
    var len = 0;
    switch (node._renderingType) {
    case types.SIMPLE:
    case types.TILED:
    case types.FILLED:
    case types.MESH:
        // Inline for performance
        len = this._node._vertCount;
        for (var i = 0, srcOff = 0; i < len; i++, srcOff += 2) {
            f32buffer[offset] = vertices[srcOff];
            f32buffer[offset + 1] = vertices[srcOff+1];
            f32buffer[offset + 2] = z;
            ui32buffer[offset + 3] = color;
            f32buffer[offset + 4] = uvs[srcOff];
            f32buffer[offset + 5] = uvs[srcOff+1];
            offset += 6;
        }
        break;
    case types.SLICED:
        len = this._uploadSliced(vertices, uvs, color, z, f32buffer, ui32buffer, offset);
        break;
    }

    if (node._renderingType === types.MESH ) {
        this.vertexType = cc.renderer.VertexType.CUSTOM;
    }
    else if (node._renderingType === types.FILLED && node._fillType === Scale9Sprite.FillType.RADIAL) {
        this.vertexType = cc.renderer.VertexType.TRIANGLE;
    }
    else {
        this.vertexType = cc.renderer.VertexType.QUAD;
    }
    return len;
};

proto.uploadIndexData = function (indexData, indexSize, batchingSize) {
    var polygonInfo = this._node._meshPolygonInfo;
    if (! polygonInfo) {
        return 0;
    }

    var indices = polygonInfo.triangles.indices;
    var len = indices.length;
    for (var i = 0; i < len; i++) {
        indexData[indexSize + i] = batchingSize + indices[i];
    }

    return len;
};

proto.setState = function (state) {
    if (state === Scale9Sprite.state.NORMAL) {
        this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
    } else if (state === Scale9Sprite.state.GRAY) {
        this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram();
    } else if (state === Scale9Sprite.state.DISTORTION) {
        this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getDistortionProgram();
    }
};

Scale9Sprite.WebGLRenderCmd._grayShaderProgram = null;
Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram = function(){
    var grayShader = Scale9Sprite.WebGLRenderCmd._grayShaderProgram;
    if (grayShader)
        return grayShader;

    grayShader = new cc.GLProgram();
    grayShader.initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, cc.Scale9Sprite.WebGLRenderCmd._grayShaderFragment);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
    grayShader.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
    grayShader.link();
    grayShader.updateUniforms();

    Scale9Sprite.WebGLRenderCmd._grayShaderProgram = grayShader;
    return grayShader;
};

Scale9Sprite.WebGLRenderCmd._grayShaderFragment =
    "precision lowp float;\n"
    + "varying vec4 v_fragmentColor;\n"
    + "varying vec2 v_texCoord;\n"
    + "void main()\n"
    + "{\n"
    + "vec4 c = texture2D(CC_Texture0, v_texCoord);\n"
    + "gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n"
    + "gl_FragColor.w = c.w ;\n"
    + "}";

Scale9Sprite.WebGLRenderCmd._distortionProgram = null;
Scale9Sprite.WebGLRenderCmd._getDistortionProgram = function(){
    var shader = Scale9Sprite.WebGLRenderCmd._distortionProgram;
    if(shader)
        return shader;

    shader = new cc.GLProgram();
    shader.initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, distortionSpriteShader.fShader);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
    shader.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
    shader.link();
    shader.updateUniforms();

    Scale9Sprite.WebGLRenderCmd._distortionProgram = shader;
    Scale9Sprite.WebGLRenderCmd._distortionOffset = shader.getUniformLocationForName('u_offset');
    Scale9Sprite.WebGLRenderCmd._distortionTiling = shader.getUniformLocationForName('u_offset_tiling');
    return shader;
};

var distortionSpriteShader = {
    shaderKey: 'cc.Sprite.Shader.Distortion',
    fShader:  "precision lowp float;\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "uniform vec2 u_offset;\n"
        + "uniform vec2 u_offset_tiling;\n"
        + "const float PI = 3.14159265359;\n"
        + "void main()\n"
        + "{\n"
        + "float halfPI = 0.5 * PI;\n"
        + "float maxFactor = sin(halfPI);\n"
        + "vec2 uv = v_texCoord;\n"
        + "vec2 xy = 2.0 * uv.xy - 1.0;\n"
        + "float d = length(xy);\n"
        + "if (d < (2.0-maxFactor)) {\n"
        + "d = length(xy * maxFactor);\n"
        + "float z = sqrt(1.0 - d * d);\n"
        + "float r = atan(d, z) / PI;\n"
        + "float phi = atan(xy.y, xy.x);\n"
        + "uv.x = r * cos(phi) + 0.5;\n"
        + "uv.y = r * sin(phi) + 0.5;\n"
        + "} else {\n"
        + "discard;\n"
        + "}\n"
        + "uv = uv * u_offset_tiling + u_offset;\n"
        + "uv = fract(uv);\n"
        + "gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, uv);\n"
        + "}"
};


/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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


/**
 * <p>
 *     A cc.SpriteBatchNode can reference one and only one texture (one image file, one texture atlas).<br/>
 *     Only the cc.Sprites that are contained in that texture can be added to the cc.SpriteBatchNode.<br/>
 *     All cc.Sprites added to a cc.SpriteBatchNode are drawn in one WebGL draw call. <br/>
 *     If the cc.Sprites are not added to a cc.SpriteBatchNode then an WebGL draw call will be needed for each one, which is less efficient. <br/>
 *     <br/>
 *     Limitations:<br/>
 *       - The only object that is accepted as child (or grandchild, grand-grandchild, etc...) is _ccsg.Sprite or any subclass of _ccsg.Sprite. <br/>
 *          eg: particles, labels and layer can't be added to a cc.SpriteBatchNode. <br/>
 *       - Either all its children are Aliased or Antialiased. It can't be a mix. <br/>
 *          This is because "alias" is a property of the texture, and all the sprites share the same texture. </br>
 * </p>
 * @class
 * @extends _ccsg.Node
 *
 * @param {String|cc.Texture2D} fileImage
 * @param {Number} capacity
 * @example
 *
 * // 1. create a SpriteBatchNode with image path
 * var spriteBatchNode = new cc.SpriteBatchNode("res/animations/grossini.png", 50);
 *
 * // 2. create a SpriteBatchNode with texture
 * var texture = cc.textureCache.addImage("res/animations/grossini.png");
 * var spriteBatchNode = new cc.SpriteBatchNode(texture,50);
 *
 * @property {cc.TextureAtlas}  textureAtlas    - The texture atlas
 * @property {Array}            descendants     - <@readonly> Descendants of sprite batch node
 */
cc.SpriteBatchNode = _ccsg.Node.extend(/** @lends cc.SpriteBatchNode# */{
    _blendFunc: null,
    // all descendants: chlidren, gran children, etc...
    _texture: null,
    _className: "SpriteBatchNode",

    ctor: function (fileImage) {
        _ccsg.Node.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.macro.BLEND_SRC, cc.macro.BLEND_DST);

        var texture2D;
        if (cc.js.isString(fileImage)) {
            texture2D = cc.textureCache.getTextureForKey(fileImage);
            if (!texture2D)
                texture2D = cc.textureCache.addImage(fileImage);
        }else if (fileImage instanceof cc.Texture2D)
            texture2D = fileImage;

        texture2D && this.initWithTexture(texture2D);
    },

    /**
     * <p>
     *    Same as addChild
     * </p>
     * @param {_ccsg.Sprite} child
     * @param {Number} z zOrder
     * @param {Number} aTag
     * @return {cc.SpriteBatchNode}
     * @deprecated since v1.2
     */
    addSpriteWithoutQuad: function (child, z, aTag) {
        this.addChild(child, z, aTag);
        return this;
    },

    // property
    /**
     * Return null, no texture atlas is used any more
     * @return {cc.TextureAtlas}
     * @deprecated since v1.2
     */
    getTextureAtlas: function () {
        return null;
    },

    /**
     * TextureAtlas of cc.SpriteBatchNode setter
     * @param {cc.TextureAtlas} textureAtlas
     * @deprecated since v1.2
     */
    setTextureAtlas: function (textureAtlas) {},

    /**
     * Return Descendants of cc.SpriteBatchNode
     * @return {Array}
     * @deprecated since v1.2
     */
    getDescendants: function () {
        return this._children;
    },

    /**
     * <p>
     *    Initializes a cc.SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.<br/>
     *    The capacity will be increased in 33% in runtime if it run out of space.<br/>
     *    The file will be loaded using the TextureMgr.<br/>
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     * </p>
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    initWithFile: function (fileImage, capacity) {
        var texture2D = cc.textureCache.getTextureForKey(fileImage);
        if (!texture2D)
            texture2D = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(texture2D, capacity);
    },

    /**
     * <p>
     *    initializes a cc.SpriteBatchNode with a file image (.png, .jpeg, .pvr, etc) and a capacity of children.<br/>
     *    The capacity will be increased in 33% in runtime if it run out of space.<br/>
     *    The file will be loaded using the TextureMgr.<br/>
     *    Please pass parameters to constructor to initialize the sprite batch node, do not call this function yourself.
     * </p>
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    init: function (fileImage, capacity) {
        var texture2D = cc.textureCache.getTextureForKey(fileImage);
        if (!texture2D)
            texture2D = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(texture2D, capacity);
    },

    /**
     * Do nothing
     * @deprecated since v1.2
     */
    increaseAtlasCapacity: function () {},

    /**
     * Removes a child given a certain index. It will also cleanup the running actions depending on the cleanup parameter.
     * @warning Removing a child from a cc.SpriteBatchNode is very slow
     * @param {Number} index
     * @param {Boolean} doCleanup
     */
    removeChildAtIndex: function (index, doCleanup) {
        this.removeChild(this._children[index], doCleanup);
    },

    /**
     * Do nothing
     * @param {_ccsg.Sprite} pobParent
     * @param {Number} index
     * @return {Number}
     * @deprecated since v1.2
     */
    rebuildIndexInOrder: function (pobParent, index) {
        return index;
    },

    /**
     * Returns highest atlas index in child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    highestAtlasIndexInChild: function (sprite) {
        var children = sprite.children;
        if (!children || children.length === 0)
            return sprite.zIndex;
        else
            return this.highestAtlasIndexInChild(children[children.length - 1]);
    },

    /**
     * Returns lowest atlas index in child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    lowestAtlasIndexInChild: function (sprite) {
        var children = sprite.children;
        if (!children || children.length === 0)
            return sprite.zIndex;
        else
            return this.lowestAtlasIndexInChild(children[children.length - 1]);
    },

    /**
     * Returns index for child
     * @param {_ccsg.Sprite} sprite
     * @return {Number}
     * @deprecated since v1.2
     */
    atlasIndexForChild: function (sprite) {
        return sprite.zIndex;
    },

    /**
     * Sprites use this to start sortChildren, don't call this manually
     * @param {Boolean} reorder
     * @deprecated since v1.2
     */
    reorderBatch: function (reorder) {
        this._reorderChildDirty = reorder;
    },

    /**
     * Sets the source and destination blending function for the texture
     * @param {Number | cc.BlendFunc} src
     * @param {Number} dst
     */
    setBlendFunc: function (src, dst) {
        if (dst === undefined)
            this._blendFunc = src;
        else
            this._blendFunc = {src: src, dst: dst};
    },

    /**
     * Returns the blending function used for the texture
     * @return {cc.BlendFunc}
     */
    getBlendFunc: function () {
        return new cc.BlendFunc(this._blendFunc.src,this._blendFunc.dst);
    },

    /**
     * <p>
     *   Updates a quad at a certain index into the texture atlas. The CCSprite won't be added into the children array.                 <br/>
     *   This method should be called only when you are dealing with very big AtlasSrite and when most of the _ccsg.Sprite won't be updated.<br/>
     *   For example: a tile map (cc.TMXMap) or a label with lots of characters (BitmapFontAtlas)<br/>
     * </p>
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Number} index
     */
    updateQuadFromSprite: function (sprite, index) {
        cc.assertID(sprite, 2623);
        if (!(sprite instanceof _ccsg.Sprite)) {
            cc.log(2616);
            return;
        }

        //
        // update the quad directly. Don't add the sprite to the scene graph
        //
        sprite.dirty = true;
        // UpdateTransform updates the textureAtlas quad
        sprite._renderCmd.transform(this._renderCmd, true);
    },

    /**
     * <p>
     *    Same as addChild(sprite, index)
     * </p>
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Number} index
     * @deprecated since v1.2
     */
    insertQuadFromSprite: function (sprite, index) {
        this.addChild(sprite, index);
    },

    /**
     * Same as addChild(sprite, index)
     * @param {_ccsg.Sprite} sprite The child sprite
     * @param {Number} index The insert index
     * @deprecated since v1.2
     */
    insertChild: function (sprite, index) {
        this.addChild(sprite, index);
    },

    /**
     * Add child at the end
     * @function
     * @param {_ccsg.Sprite} sprite
     */
    appendChild: function (sprite) {
        this.sortAllChildren();
        var lastLocalZOrder = this._children[this._children.length-1]._localZOrder;
        this.addChild(sprite. lastLocalZOrder + 1);
    },

    /**
     * Same as removeChild
     * @function
     * @param {_ccsg.Sprite} sprite
     * @param {Boolean} [cleanup=true]  true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     * @deprecated since v1.2
     */
    removeSpriteFromAtlas: function (sprite, cleanup) {
        this.removeChild(sprite, cleanup);
    },

    /**
     * Set the texture property
     * @function
     * @param {Texture2D} tex
     * @return {Boolean}
     */
    initWithTexture: function (tex) {
        this.setTexture(tex);
        return true;
    },

    // CCTextureProtocol
    /**
     * Returns texture of the sprite batch node
     * @function
     * @return {Texture2D}
     */
    getTexture: function () {
        return this._texture;
    },

    /**
     * Sets the texture of the sprite batch node.
     * @function
     * @param {Texture2D} texture
     */
    setTexture: function(texture){
        this._texture = texture;

        if (texture._textureLoaded) {
            var children = this._children, i, len = children.length;
            for (i = 0; i < len; ++i) {
                children[i].setTexture(texture);
            }
        }
        else {
            texture.addEventListener("load", function(){
                var children = this._children, i, len = children.length;
                for (i = 0; i < len; ++i) {
                    children[i].setTexture(texture);
                }
            }, this);
        }
    },

    setShaderProgram: function (newShaderProgram) {
        this._renderCmd.setShaderProgram(newShaderProgram);
        var children = this._children, i, len = children.length;
        for (i = 0; i < len; ++i) {
            children[i].setShaderProgram(newShaderProgram);
        }
    },

    /**
     * Add child to the sprite batch node (override addChild of ccsg.Node)
     * @function
     * @override
     * @param {_ccsg.Sprite} child
     * @param {Number} [zOrder]
     * @param {Number} [tag]
     */
    addChild: function (child, zOrder, tag) {
        cc.assertID(child !== undefined, 2614);

        if(!this._isValidChild(child))
            return;

        zOrder = (zOrder === undefined) ? child.zIndex : zOrder;
        tag = (tag === undefined) ? child.tag : tag;
        _ccsg.Node.prototype.addChild.call(this, child, zOrder, tag);

        // Apply shader
        if (this._renderCmd._shaderProgram) {
            child.shaderProgram = this._renderCmd._shaderProgram;
        }
    },

    _isValidChild: function (child) {
        if (!(child instanceof _ccsg.Sprite)) {
            cc.logID(2618);
            return false;
        }
        if (child.texture !== this._texture) {
            cc.logID(2619);
            return false;
        }
        return true;
    }
});

var _p = cc.SpriteBatchNode.prototype;

// Override properties
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
cc.defineGetterSetter(_p, "shaderProgram", _p.getShaderProgram, _p.setShaderProgram);

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

var CustomFontDescriptor = function() {
    this._status =  'unloaded';
    //when font is loaded, it will notify each observer in the observers array
    this._observers = [];
    this._isLoadWithCSS = false;
};

CustomFontDescriptor.prototype.onLoaded = function () {
    this._status = 'loaded';
    this._observers.forEach(function(item) {
        item();
    });
};

CustomFontDescriptor.prototype.isLoaded = function () {
    return this._status === 'loaded';
};

CustomFontDescriptor.prototype.addHandler = function (callback) {
    if(this._observers.indexOf(callback) === -1) {
        this._observers.push(callback);
    }
};

var CustomFontLoader = {
    _fontCache: {},
    _fontWidthCache: {},
    _canvasContext: null,
    _testString: "BESbswy",
    _allFontsLoaded: false,
    loadTTF: function (url, callback) {
        //these platforms support window.FontFace, but it sucks sometimes.
        var useFontFace = (cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU
                           && cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU_APP
                           && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ);

        if (window.FontFace && useFontFace) {
            this._loadWithFontFace(url, callback);
        } else {
            this._loadWithCSS(url, callback);
        }

        if(!cc.director.getScheduler().isScheduled(this._checkFontLoaded, this)) {
            cc.director.getScheduler().schedule(this._checkFontLoaded, this, 0.1);
        }
    },

    _checkFontLoaded: function () {
        this._allFontsLoaded = true;

        for(var k in this._fontCache) {
            var fontDescriptor = this._fontCache[k];
            if(fontDescriptor.isLoaded() || !fontDescriptor._isLoadWithCSS) {
                continue;
            }
            var oldWidth = this._fontWidthCache[k];
            this._canvasContext.font = '40px ' + k;
            var newWidth = this._canvasContext.measureText(this._testString).width;
            if(oldWidth !== newWidth) {
                fontDescriptor.onLoaded();
            } else {
                this._allFontsLoaded = false;
            }
        }

        if(this._allFontsLoaded) {
            cc.director.getScheduler().unschedule(this._checkFontLoaded, this);
        }
    },

    _loadWithFontFace: function(url, callback) {
        var fontFamilyName = this._getFontFamily(url);

        var fontDescriptor = this._fontCache[fontFamilyName];
        if(!fontDescriptor) {
            var fontFace = new FontFace(fontFamilyName, "url('" + url + "')");
            document.fonts.add(fontFace);

            fontDescriptor = new CustomFontDescriptor();
            fontDescriptor.addHandler(callback);
            this._fontCache[fontFamilyName] = fontDescriptor;

            fontFace.loaded.then(function() {
                fontDescriptor.onLoaded();
            });
        } else {
            if(!fontDescriptor.isLoaded()) {
                fontDescriptor.addHandler(callback);
            }
        }
    },

    _loadWithCSS: function(url, callback) {
        var fontFamilyName = this._getFontFamily(url);

        var fontDescriptor = this._fontCache[fontFamilyName];
        if(!fontDescriptor) {
            //fall back implementations
            var doc = document;
            var fontStyle = document.createElement("style");
            fontStyle.type = "text/css";
            doc.body.appendChild(fontStyle);

            var fontStr = "";
            if (isNaN(fontFamilyName - 0))
                fontStr += "@font-face { font-family:" + fontFamilyName + "; src:";
            else
                fontStr += "@font-face { font-family:'" + fontFamilyName + "'; src:";

            fontStr += "url('" + url + "');";

            fontStyle.textContent = fontStr + "}";

            var preloadDiv = document.createElement("div");
            var _divStyle = preloadDiv.style;
            _divStyle.fontFamily = fontFamilyName;
            preloadDiv.innerHTML = ".";
            _divStyle.position = "absolute";
            _divStyle.left = "-100px";
            _divStyle.top = "-100px";
            doc.body.appendChild(preloadDiv);

            fontDescriptor = new CustomFontDescriptor();
            fontDescriptor.addHandler(callback);
            this._fontCache[fontFamilyName] = fontDescriptor;
            fontDescriptor._isLoadWithCSS = true;

            if(!this._canvasContext) {
                var labelCanvas = document.createElement('canvas');
                labelCanvas.width = 100;
                labelCanvas.height = 100;
                this._canvasContext = labelCanvas.getContext('2d');
            }

            var fontDesc = '40px ' + fontFamilyName;
            this._canvasContext.font = fontDesc;

            var width = this._canvasContext.measureText(this._testString).width;
            this._fontWidthCache[fontFamilyName] = width;

            var self = this;
            fontStyle.onload = function() {
                setTimeout(function () {
                    //in case some font won't cause the width as to system font.
                    if(!self._allFontsLoaded) {
                        cc.logID(4004);
                        fontDescriptor.onLoaded();
                        cc.director.getScheduler().unschedule(this._checkFontLoaded, this);
                    }
                }, 20000);
            };

        } else {
            if(!fontDescriptor.isLoaded()) {
                fontDescriptor.addHandler(callback);
            }
        }
    },

    _getFontFamily: function (fontHandle) {
        var ttfIndex = fontHandle.lastIndexOf(".ttf");
        if (ttfIndex === -1) return fontHandle;

        var slashPos = fontHandle.lastIndexOf("/");
        var fontFamilyName;
        if (slashPos === -1) {
            fontFamilyName = fontHandle.substring(0, ttfIndex) + "_LABEL";
        } else {
            fontFamilyName = fontHandle.substring(slashPos + 1, ttfIndex) + "_LABEL";
        }
        return fontFamilyName;
    }
};

var TextUtils = {
    label_wordRex : /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
    label_symbolRex : /^[!,.:;}\]%\?>、‘“》？。，！]/,
    label_lastWordRex : /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)$/,
    label_lastEnglish : /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+$/,
    label_firsrEnglish : /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]/,
    label_wrapinspection : true,

    isUnicodeCJK: function(ch) {
        var __CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
        var __JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
        var __KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
        return __CHINESE_REG.test(ch) || __JAPANESE_REG.test(ch) || __KOREAN_REG.test(ch);
    },

    //Checking whether the character is a whitespace
    isUnicodeSpace: function(ch) {
        ch = ch.charCodeAt(0);
        return ((ch >= 9 && ch <= 13) || ch === 32 || ch === 133 || ch === 160 || ch === 5760 || (ch >= 8192 && ch <= 8202) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288);
    },

    fragmentText: function (stringToken, allWidth, maxWidth, measureText) {
        //check the first character
        var wrappedWords = [];
        //fast return if strArr is empty
        if(stringToken.length === 0 || maxWidth < 0) {
            wrappedWords.push('');
            return wrappedWords;
        }

        var text = stringToken;
        while (allWidth > maxWidth && text.length > 1) {

            var fuzzyLen = text.length * ( maxWidth / allWidth ) | 0;
            var tmpText = text.substr(fuzzyLen);
            var width = allWidth - measureText(tmpText);
            var sLine = tmpText;
            var pushNum = 0;

            var checkWhile = 0;
            var checkCount = 10;

            //Exceeded the size
            while (width > maxWidth && checkWhile++ < checkCount) {
                fuzzyLen *= maxWidth / width;
                fuzzyLen = fuzzyLen | 0;
                tmpText = text.substr(fuzzyLen);
                width = allWidth - measureText(tmpText);
            }

            checkWhile = 0;

            //Find the truncation point
            while (width < maxWidth && checkWhile++ < checkCount) {
                if (tmpText) {
                    var exec = this.label_wordRex.exec(tmpText);
                    pushNum = exec ? exec[0].length : 1;
                    sLine = tmpText;
                }

                fuzzyLen = fuzzyLen + pushNum;
                tmpText = text.substr(fuzzyLen);
                width = allWidth - measureText(tmpText);
            }

            fuzzyLen -= pushNum;
            if (fuzzyLen === 0) {
                fuzzyLen = 1;
                sLine = sLine.substr(1);
            }

            var sText = text.substr(0, fuzzyLen), result;

            //symbol in the first
            if (this.label_wrapinspection) {
                if (this.label_symbolRex.test(sLine || tmpText)) {
                    result = this.label_lastWordRex.exec(sText);
                    fuzzyLen -= result ? result[0].length : 0;
                    if (fuzzyLen === 0) fuzzyLen = 1;

                    sLine = text.substr(fuzzyLen);
                    sText = text.substr(0, fuzzyLen);
                }
            }

            //To judge whether a English words are truncated
            if (this.label_firsrEnglish.test(sLine)) {
                result = this.label_lastEnglish.exec(sText);
                if (result && sText !== result[0]) {
                    fuzzyLen -= result[0].length;
                    sLine = text.substr(fuzzyLen);
                    sText = text.substr(0, fuzzyLen);
                }
            }
            if (sText.trim().length > 0) {
                wrappedWords.push(sText);
            }
            text = sLine || tmpText;
            allWidth = measureText(text);
        }
        if (text.length > 0) {
            wrappedWords.push(text);
        }

        return wrappedWords;
    },

};

cc.TextUtils = module.exports = TextUtils;
cc.CustomFontLoader = module.exports = CustomFontLoader;

/*global cc */

/****************************************************************************
 Copyright (c) 2015 Chukong Technologies Inc.

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

var EventTarget = require("../cocos2d/core/event/event-target");

var FntLoader = {
    INFO_EXP: /info [^\n]*(\n|$)/gi,
    COMMON_EXP: /common [^\n]*(\n|$)/gi,
    PAGE_EXP: /page [^\n]*(\n|$)/gi,
    CHAR_EXP: /char [^\n]*(\n|$)/gi,
    KERNING_EXP: /kerning [^\n]*(\n|$)/gi,
    ITEM_EXP: /\w+=[^ \r\n]+/gi,
    INT_EXP: /^[\-]?\d+$/,

    _parseStrToObj: function (str) {
        var arr = str.match(this.ITEM_EXP);
        var obj = {};
        if (arr) {
            for (var i = 0, li = arr.length; i < li; i++) {
                var tempStr = arr[i];
                var index = tempStr.indexOf("=");
                var key = tempStr.substring(0, index);
                var value = tempStr.substring(index + 1);
                if (value.match(this.INT_EXP)) value = parseInt(value);
                else if (value[0] === '"') value = value.substring(1, value.length - 1);
                obj[key] = value;
            }
        }
        return obj;
    },

    /**
     * Parse Fnt string.
     * @param fntStr
     * @returns {{}}
     */
    parseFnt: function (fntStr) {
        var self = this, fnt = {};
        //padding
        var infoResult = fntStr.match(self.INFO_EXP);
        if (!infoResult) return fnt;

        var infoObj = self._parseStrToObj(infoResult[0]);
        var paddingArr = infoObj["padding"].split(",");
        var padding = {
            left: parseInt(paddingArr[0]),
            top: parseInt(paddingArr[1]),
            right: parseInt(paddingArr[2]),
            bottom: parseInt(paddingArr[3])
        };

        //common
        var commonObj = self._parseStrToObj(fntStr.match(self.COMMON_EXP)[0]);
        fnt.commonHeight = commonObj["lineHeight"];
        fnt.fontSize = infoObj["size"];

        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            var texSize = cc.configuration.getMaxTextureSize();
            if (commonObj["scaleW"] > texSize.width || commonObj["scaleH"] > texSize.height)
                cc.log("cc.LabelBMFont._parseCommonArguments(): page can't be larger than supported");
        }
        if (commonObj["pages"] !== 1) cc.log("cc.LabelBMFont._parseCommonArguments(): only supports 1 page");

        //page
        var pageObj = self._parseStrToObj(fntStr.match(self.PAGE_EXP)[0]);
        if (pageObj["id"] !== 0) cc.log("cc.LabelBMFont._parseImageFileName() : file could not be found");
        fnt.atlasName = pageObj["file"];

        //char
        var charLines = fntStr.match(self.CHAR_EXP);
        var fontDefDictionary = fnt.fontDefDictionary = {};
        for (var i = 0, li = charLines.length; i < li; i++) {
            var charObj = self._parseStrToObj(charLines[i]);
            var charId = charObj["id"];
            fontDefDictionary[charId] = {
                rect: {x: charObj["x"], y: charObj["y"], width: charObj["width"], height: charObj["height"]},
                xOffset: charObj["xoffset"],
                yOffset: charObj["yoffset"],
                xAdvance: charObj["xadvance"]
            };
        }

        //kerning
        var kerningDict = fnt.kerningDict = {};
        var kerningLines = fntStr.match(self.KERNING_EXP);
        if (kerningLines) {
            for (i = 0, li = kerningLines.length; i < li; i++) {
                var kerningObj = self._parseStrToObj(kerningLines[i]);
                kerningDict[(kerningObj["first"] << 16) | (kerningObj["second"] & 0xffff)] = kerningObj["amount"];
            }
        }
        return fnt;
    }
};

var FontLetterDefinition = function() {
    this._u = 0;
    this._v = 0;
    this._width = 0;
    this._height = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._textureID = 0;
    this._validDefinition = false;
    this._xAdvance = 0;
};

cc.FontAtlas = function(fntConfig) {
    this._lineHeight = fntConfig.commonHeight;
    this._fontSize = fntConfig.fontSize;
    this._letterDefinitions = {};
    this._fntConfig = fntConfig;
};

cc.FontAtlas.prototype = {
    constructor: cc.FontAtlas,
    setFontSize: function(fontSize) {
        this._fontSize = fontSize;
    },
    getOriginalFontSize: function() {
        return this._fntConfig.fontSize;
    },
    addLetterDefinitions: function(letter, letterDefinition) {
        this._letterDefinitions[letter] = letterDefinition;
    },
    cloneLetterDefinition: function() {
        var copyLetterDefinitions = {};
        for (var key in this._letterDefinitions) {
            var value = new FontLetterDefinition();
            cc.js.mixin(value, this._letterDefinitions[key]);
            copyLetterDefinitions[key] = value;
        }
        return copyLetterDefinitions;
    },
    assignLetterDefinitions: function(letterDefinition) {
        for (var key in this._letterDefinitions) {
            var newValue = letterDefinition[key];
            var oldValue = this._letterDefinitions[key];
            cc.js.mixin(oldValue, newValue);
        }
    },
    scaleFontLetterDefinition: function(scaleFactor) {
        for (var fontDefinition in this._letterDefinitions) {
            var letterDefinitions = this._letterDefinitions[fontDefinition];
            letterDefinitions._width *= scaleFactor;
            letterDefinitions._height *= scaleFactor;
            letterDefinitions._offsetX *= scaleFactor;
            letterDefinitions._offsetY *= scaleFactor;
            letterDefinitions._xAdvance *= scaleFactor;
        }
    },

    getLetterDefinitionForChar: function(char) {
        var hasKey = this._letterDefinitions.hasOwnProperty(char.charCodeAt(0));
        var letterDefinition;
        if (hasKey) {
            letterDefinition = this._letterDefinitions[char.charCodeAt(0)];
        } else {
            letterDefinition = null;
        }
        return letterDefinition;
    }
};

var LetterInfo = function() {
    this._char = '';
    this._valid = true;
    this._positionX = 0;
    this._positionY = 0;
    this._atlasIndex = 0;
    this._lineIndex = 0;
};

_ccsg.Label = _ccsg.Node.extend({
    _hAlign: cc.TextAlignment.LEFT, //0 left, 1 center, 2 right
    _vAlign: cc.VerticalTextAlignment.TOP, //0 bottom,1 center, 2 top
    _string: "",
    _fontSize: 40,
    _drawFontsize: 40,
    _overFlow: 0, //see _ccsg.Label.Overflow
    _isWrapText: true,
    _spacingX: 0,

    _blendFunc: null,
    _labelType: 0, //0 is ttf, 1 is bmfont.
    _fontHandle: "", //a ttf font name or a bmfont file path.
    _lineSpacing: 0,

    _maxLineWidth:  0,
    _labelDimensions:  cc.size(0, 0),
    _labelWidth:  0,
    _labelHeight:  0,

    _lineHeight: 40,
    _outlined: false,
    _outlineColor: null,
    _outlineWidth: 1,
    _gradientEnabled: false,
    _gradientStartColor: cc.color(255, 255, 255, 255),
    _gradientEndColor: cc.color(255, 255, 255, 255),
    _gradientDirection: 0,
    _className: "Label",
    //used for left and right margin
    _margin : 0,
    //bold,italic, underline
    _isBold: false,
    _isItalic: false,
    _isUnderline: false,
    _fontAsset: null,

    //fontHandle it is a system font name, ttf file path or bmfont file path.
    ctor: function(string, fontHandle, spriteFrame, fontAsset) {
        EventTarget.call(this);

        fontHandle = fontHandle || "";
        this._fontHandle = fontHandle;
        if (typeof string !== 'string') {
            string = '' + string;
        }

        this._string = string;

        _ccsg.Node.prototype.ctor.call(this);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        _ccsg.Node.prototype.setContentSize.call(this, cc.size(128, 128));
        this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();

        this.setFontFileOrFamily(fontHandle, spriteFrame, fontAsset);
        this.setString(this._string);
    },

    _resetBMFont: function() {
        this._imageOffset = cc.p(0, 0);
        this._cascadeColorEnabled = true;
        this._cascadeOpacityEnabled = true;
        this._fontAtlas = null;
        this._config = null;
        this._numberOfLines =  0;
        this._lettersInfo =  [];
        this._linesWidth =  [];
        this._linesOffsetX =  [];
        this._textDesiredHeight =  0;
        this._letterOffsetY =  0;
        this._tailoredTopY =  0;
        this._tailoredBottomY =  0;
        this._bmfontScale =  1.0;
        this._spacingX =  0;
        this._horizontalKernings =  [];
        this._lineBreakWithoutSpaces =  false;

        this._reusedRect =  cc.rect(0, 0, 0, 0);
        this._textureLoaded = false;

        if (this._spriteBatchNode) {
            this.removeChild(this._spriteBatchNode);
            this._spriteBatchNode = null;
        }
    },

    setHorizontalAlign: function(align) {
        if (this._hAlign === align) return;

        this._hAlign = align;
        this._notifyLabelSkinDirty();
    },

    getHorizontalAlign: function() {
        return this._hAlign;
    },

    setVerticalAlign: function(align) {
        if (this._vAlign === align) return;

        this._vAlign = align;
        this._notifyLabelSkinDirty();
    },

    getVerticalAlign: function() {
        return this._vAlign;
    },

    setString: function(string) {
        //convert param to string
        if (typeof string !== 'string') {
            string = '' + string;
        }

        if (this._string === string) return;

        this._string = string;
        this._notifyLabelSkinDirty();
    },

    setMargin: function(value) {
        if(this._margin === value) return;

        this._margin = value;
        this._notifyLabelSkinDirty();
    },

    getString: function() {
        return this._string;
    },
    getStringLength: function() {
        return this._string.length;
    },

    enableWrapText: function(enabled) {
        if (this._isWrapText === enabled) return;

        //when label is in resize mode, wrap is disabled.
        if (this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT ||
           this._overFlow === _ccsg.Label.Overflow.NONE) {
            return;
        }
        this._isWrapText = enabled;
        this._rescaleWithOriginalFontSize();

        this._notifyLabelSkinDirty();
    },

    enableItalics: function (enabled) {
        this._isItalic = enabled;
        if(enabled) {
            this.setSkewX(12);
        } else {
            this.setSkewX(0);
        }
    },

    enableBold: function (enabled) {
        if(this._isBold === enabled) return;

        this._isBold = enabled;
        this._notifyLabelSkinDirty();
    },

    enableUnderline: function (enabled) {
        if(this._isUnderline === enabled) return;

        this._isUnderline = enabled;
        this._notifyLabelSkinDirty();
    },

    isWrapTextEnabled: function() {
        return this._isWrapText;
    },
    getFontName: function() {
        return this._fontHandle;
    },
    setFontSize: function(fntSize) {
        if(this._fontSize === fntSize) return;

        this._fontSize = fntSize;
        this._drawFontsize = fntSize;
        this._notifyLabelSkinDirty();
    },

    getFontSize: function() {
        return this._fontSize;
    },

    isOutlined: function() {
        return this._outlined;
    },

    setOutlined: function(value) {
        if(this._outlined === value) return;

        this._outlined = !!value;
        this._notifyLabelSkinDirty();
    },

    setFillColorGradientEnabled: function(value) {
        if(this._gradientEnabled === value) return;

        this._gradientEnabled = !!value;
        this._notifyLabelSkinDirty();
    },
    getFillColorGradientEnabled: function () {
        return this._gradientEnabled;
    },

    setGradientStartColor: function (value) {
        if(this._gradientStartColor === value) return;
        this._gradientStartColor = value;
        this._notifyLabelSkinDirty();
    },

    getGradientStartColor: function () {
        return this._gradientStartColor;
    },

    setGradientEndColor: function (value) {
        if(this._gradientEndColor === value) return;
        this._gradientEndColor = value;
        this._notifyLabelSkinDirty();
    },

    getGradientEndColor: function () {
        return this._gradientEndColor;
    },

    setFillColorGradientDirection: function (direction) {
        this._gradientDirection = direction;
        this._notifyLabelSkinDirty();
    },

    getFillColorGradientDirection: function () {
        return this._gradientDirection;
    },

    getOutlineColor: function() {
        return this._outlineColor;
    },

    setOutlineColor: function(value) {
        if(this._outlineColor === value) return;

        this._outlineColor = cc.color(value);
        this._notifyLabelSkinDirty();
    },

    setOutlineWidth: function(value) {
        if(this._outlineWidth === value) return;

        this._outlineWidth = value;
        this._notifyLabelSkinDirty();
    },

    getOutlineWidth: function() {
        return this._outlineWidth;
    },

    _updateWrapText: function(overflow){
        if ( overflow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
            this._isWrapText = true;
        }

        if (overflow === _ccsg.Label.Overflow.NONE) {
            this._isWrapText = false;
        }
    },


    _setOverflowBMFont: function () {
        if (this._labelType === _ccsg.Label.Type.BMFont) {

            if ( this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
                this._setDimensions(this._labelDimensions.width, 0);
            }

            if (this._overFlow === _ccsg.Label.Overflow.NONE) {
                this._setDimensions(0, 0);
            }

            this._rescaleWithOriginalFontSize();
        }
    },

    setOverflow: function(overflow) {
        if (this._overFlow === overflow) return;

        this._overFlow = overflow;

        this._updateWrapText(this._overFlow);

        this._setOverflowBMFont();

        this._notifyLabelSkinDirty();
    },

    getOverflow: function() {
        return this._overFlow;
    },

    setSpacingX: function(spacing) {
        if (this._spacingX === spacing) return;
        this._spacingX = spacing;
        this._notifyLabelSkinDirty();
    },

    setLineHeight: function(lineHeight) {
        if (this._lineHeight === lineHeight) return;

        this._lineHeight = lineHeight;
        this._notifyLabelSkinDirty();
    },
    setLineBreakWithoutSpace: function(lineBreakFlag) {
        if (this._lineBreakWithoutSpaces === lineBreakFlag) return;

        this._lineBreakWithoutSpaces = lineBreakFlag;
        this._notifyLabelSkinDirty();
    },
    getSpacingX: function() {
        return this._spacingX;
    },

    getLineHeight: function() {
        return this._lineHeight;
    },

    getBMFontLineHeight : function() {
        if(this._fontAtlas) {
            return this._fontAtlas._lineHeight;
        }
    },

    setFontFileOrFamily: function(fontHandle, spriteFrame, fontAsset) {
        fontHandle = fontHandle || "Arial";
        this._fontAsset = fontAsset;
        var extName = cc.path.extname(fontHandle);

        this._resetBMFont();
        //specify font family name directly
        if (!extName && !spriteFrame) {
            this._fontHandle = fontHandle;
            this._labelType = _ccsg.Label.Type.SystemFont;
            this._blendFunc = cc.BlendFunc._alphaPremultiplied();
            this._renderCmd._needDraw = true;
            this._notifyLabelSkinDirty();
            this.emit('load');
            return;
        }

        if (extName === ".ttf") {
            this._labelType = _ccsg.Label.Type.TTF;
            this._blendFunc = cc.BlendFunc._alphaPremultiplied();
            this._renderCmd._needDraw = true;
            this._fontHandle = this._loadTTFFont(fontHandle);
        } else if (spriteFrame) {
            //todo add bmfont here
            this._labelType = _ccsg.Label.Type.BMFont;
            this._blendFunc = cc.BlendFunc._alphaNonPremultiplied();
            this._renderCmd._needDraw = false;
            this._initBMFontWithString(this._string, fontHandle, spriteFrame);
        }
        this._notifyLabelSkinDirty();
    },

    _loadTTFFont: function(fontHandle) {
        var self = this;

        var fontFamilyName = cc.CustomFontLoader._getFontFamily(fontHandle);
        var callback = function () {
            self._notifyLabelSkinDirty();
            self.emit('load');
        };
        cc.CustomFontLoader.loadTTF(fontHandle, callback);

        return fontFamilyName;
    },

    setContentSize: function(size, height) {
        if (this._overFlow === _ccsg.Label.Overflow.NONE) {
            return;
        }

        this._setDimensions(size, height);
    },

    setBlendFunc: function(src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst;
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst;
        }
    },


    getBlendFunc: function() {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    _setupBMFontOverflowMetrics: function(newWidth, newHeight) {
        if (this._overFlow === _ccsg.Label.Overflow.RESIZE_HEIGHT) {
            newHeight = 0;
        }

        if (this._overFlow === _ccsg.Label.Overflow.NONE) {
            newWidth = 0;
            newHeight = 0;
        }

        this._labelWidth = newWidth;
        this._labelHeight = newHeight;
        this._labelDimensions.width = newWidth;
        this._labelDimensions.height = newHeight;
        this._maxLineWidth = newWidth;
    },

    _updateLabel: function () {
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            var contentSize = this._contentSize;
            var newWidth = contentSize.width;
            var newHeight = contentSize.height;
            this._setupBMFontOverflowMetrics(newWidth, newHeight);

            this._updateContent();
            this.setColor(this.color);
        } else if (this._labelType === _ccsg.Label.Type.TTF
                   || this._labelType === _ccsg.Label.Type.SystemFont) {
            this._renderCmd._bakeLabel();
        }
    },

    _notifyLabelSkinDirty: function() {
        if (CC_EDITOR) {
            this._updateLabel();
        } else {
            this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.textDirty
                                         |_ccsg.Node._dirtyFlags.contentDirty);
        }
    },
    _createRenderCmd: function() {
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            return new _ccsg.Label.WebGLRenderCmd(this);
        } else {
            return new _ccsg.Label.CanvasRenderCmd(this);
        }
    },

    getContentSize: function() {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype.getContentSize.call(this);
    },
    _getWidth: function () {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype._getWidth.call(this);
    },
    _getHeight: function () {
        var locFlag = this._renderCmd._dirtyFlag;
        if (locFlag & _ccsg.Node._dirtyFlags.textDirty) {
            this._updateLabel();
            this._renderCmd._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        }
        return _ccsg.Node.prototype._getHeight.call(this);
    },
});

cc.BMFontHelper = {
    _alignText: function() {
        var ret = true;

        do {
            if (!this._spriteBatchNode) return true;


            this._textDesiredHeight = 0;
            this._linesWidth = [];
            if (!this._lineBreakWithoutSpaces) {
                this._multilineTextWrapByWord();
            } else {
                this._multilineTextWrapByChar();
            }

            this._computeAlignmentOffset();

            //shrink
            if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                var fontSize = this.getFontSize();

                if (fontSize > 0 && this._isVerticalClamp()) {
                    this._shrinkLabelToContentSize(this._isVerticalClamp.bind(this));
                }
            }

            if (!this._updateQuads()) {
                ret = false;
                if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                    this._shrinkLabelToContentSize(this._isHorizontalClamp.bind(this));
                }
                break;
            }
        } while (0);

        return ret;
    },

    _isHorizontalClamped : function(px, lineIndex){
        var wordWidth = this._linesWidth[lineIndex];
        var letterOverClamp = (px > this._contentSize.width || px < 0);

        if(!this._isWrapText){
            return letterOverClamp;
        }else{
            return (wordWidth > this._contentSize.width && letterOverClamp);
        }
    },

    _updateQuads: function() {
        var ret = true;

        this._spriteBatchNode.removeAllChildren();
        for (var ctr = 0; ctr < this._string.length; ++ctr) {
            if (this._lettersInfo[ctr]._valid) {
                var letterDef = this._fontAtlas._letterDefinitions[this._lettersInfo[ctr]._char];

                this._reusedRect.height = letterDef._height;
                this._reusedRect.width = letterDef._width;
                this._reusedRect.x = letterDef._u;
                this._reusedRect.y = letterDef._v;

                var py = this._lettersInfo[ctr]._positionY + this._letterOffsetY;

                if (this._labelHeight > 0) {
                    if (py > this._tailoredTopY) {
                        var clipTop = py - this._tailoredTopY;
                        this._reusedRect.y += clipTop;
                        this._reusedRect.height -= clipTop;
                        py = py - clipTop;
                    }

                    if (py - letterDef._height * this._bmfontScale < this._tailoredBottomY) {
                        this._reusedRect.height = (py < this._tailoredBottomY) ? 0 : (py - this._tailoredBottomY);
                    }
                }

                var lineIndex = this._lettersInfo[ctr]._lineIndex;
                var px = this._lettersInfo[ctr]._positionX + letterDef._width / 2 * this._bmfontScale + this._linesOffsetX[lineIndex];


                if (this._labelWidth > 0) {
                    if (this._isHorizontalClamped(px, lineIndex)) {
                        if (this._overFlow === _ccsg.Label.Overflow.CLAMP) {
                            this._reusedRect.width = 0;
                        } else if (this._overFlow === _ccsg.Label.Overflow.SHRINK) {
                            if (this._contentSize.width > letterDef._width) {
                                ret = false;
                                break;
                            } else {
                                this._reusedRect.width = 0;
                            }
                        }
                    }
                }


                if (this._reusedRect.height > 0 && this._reusedRect.width > 0) {
                    var fontChar = this.getChildByTag(ctr);
                    var locTexture = this._spriteBatchNode._texture;
                    var spriteFrame = this._spriteFrame;

                    var isRotated = this._spriteFrame.isRotated();

                    var originalSize = spriteFrame._originalSize;
                    var rect = spriteFrame._rect;
                    var offset = spriteFrame._offset;
                    var trimmedLeft = offset.x + (originalSize.width - rect.width) / 2;
                    var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;


                    if(!isRotated) {
                        this._reusedRect.x += (rect.x - trimmedLeft);
                        this._reusedRect.y += (rect.y + trimmedTop);
                    } else {
                        var originalX = this._reusedRect.x;
                        this._reusedRect.x = rect.x + rect.height - this._reusedRect.y - this._reusedRect.height - trimmedTop;
                        this._reusedRect.y = originalX + rect.y - trimmedLeft;
                        if (this._reusedRect.y < 0) {
                            this._reusedRect.height = this._reusedRect.height + trimmedTop;
                        }
                    }

                    if (!fontChar) {
                        fontChar = new _ccsg.Sprite();
                        fontChar.initWithTexture(locTexture, this._reusedRect, isRotated);
                        fontChar.setAnchorPoint(cc.p(0, 1));
                    } else {
                        fontChar.setTextureRect(this._reusedRect, isRotated);
                    }


                    var letterPositionX = this._lettersInfo[ctr]._positionX + this._linesOffsetX[this._lettersInfo[ctr]._lineIndex];
                    fontChar.setPosition(letterPositionX, py);

                    var index = this._spriteBatchNode.getChildrenCount();

                    this._lettersInfo[ctr]._atlasIndex = index;

                    this._updateLetterSpriteScale(fontChar);

                    this._spriteBatchNode.addChild(fontChar);

                }
            }
        }

        return ret;
    },

    _updateLetterSpriteScale: function(sprite) {
        if (this._labelType === _ccsg.Label.Type.BMFont && this._fontSize > 0) {
            sprite.setScale(this._bmfontScale);
        }
    },

    _recordPlaceholderInfo: function(letterIndex, char) {
        if (letterIndex >= this._lettersInfo.length) {
            var tmpInfo = new LetterInfo();
            this._lettersInfo.push(tmpInfo);
        }

        this._lettersInfo[letterIndex]._char = char;
        this._lettersInfo[letterIndex]._valid = false;
    },

    _recordLetterInfo: function(letterPosition, character, letterIndex, lineIndex) {
        if (letterIndex >= this._lettersInfo.length) {
            var tmpInfo = new LetterInfo();
            this._lettersInfo.push(tmpInfo);
        }
        character = character.charCodeAt(0);

        this._lettersInfo[letterIndex]._lineIndex = lineIndex;
        this._lettersInfo[letterIndex]._char = character;
        this._lettersInfo[letterIndex]._valid = this._fontAtlas._letterDefinitions[character]._validDefinition;
        this._lettersInfo[letterIndex]._positionX = letterPosition.x;
        this._lettersInfo[letterIndex]._positionY = letterPosition.y;
    },

    _setDimensions: function(size, height) {
        var newWidth = (typeof size.width === 'number') ? size.width : size;
        var newHeight = (typeof size.height === 'number') ? size.height : height;

        var oldSize = this.getContentSize();
        _ccsg.Node.prototype.setContentSize.call(this, size, height);

        if (newHeight !== oldSize.height || newWidth !== oldSize.width) {

            this._setupBMFontOverflowMetrics(newWidth, newHeight);

            if (this._drawFontsize > 0) {
                this._restoreFontSize();
            }

            this._notifyLabelSkinDirty();
        }
    },

    _restoreFontSize: function() {
        this._fontSize = this._drawFontsize;
    },

    _multilineTextWrap: function(nextTokenFunc) {
        var textLen = this.getStringLength();
        var lineIndex = 0;
        var nextTokenX = 0;
        var nextTokenY = 0;
        var longestLine = 0;
        var letterRight = 0;

        var lineSpacing = this._lineSpacing;
        var highestY = 0;
        var lowestY = 0;
        var letterDef = null;
        var letterPosition = cc.p(0, 0);

        this._updateBMFontScale();

        for (var index = 0; index < textLen;) {
            var character = this._string.charAt(index);
            if (character === "\n") {
                this._linesWidth.push(letterRight);
                letterRight = 0;
                lineIndex++;
                nextTokenX = 0;
                nextTokenY -= this._lineHeight * this._bmfontScale + lineSpacing;
                this._recordPlaceholderInfo(index, character);
                index++;
                continue;
            }

            var tokenLen = nextTokenFunc(this._string, index, textLen);
            var tokenHighestY = highestY;
            var tokenLowestY = lowestY;
            var tokenRight = letterRight;
            var nextLetterX = nextTokenX;
            var newLine = false;

            for (var tmp = 0; tmp < tokenLen; ++tmp) {
                var letterIndex = index + tmp;
                character = this._string.charAt(letterIndex);
                if (character === "\r") {
                    this._recordPlaceholderInfo(letterIndex, character);
                    continue;
                }
                letterDef = this._fontAtlas.getLetterDefinitionForChar(character);
                if (!letterDef) {
                    this._recordPlaceholderInfo(letterIndex, character);
                    console.log("Can't find letter definition in texture atlas " + this._config.atlasName + " for letter:" + character);
                    continue;
                }

                var letterX = nextLetterX + letterDef._offsetX * this._bmfontScale;

                if (this._isWrapText
                    && this._maxLineWidth > 0
                    && nextTokenX > 0
                    && letterX + letterDef._width * this._bmfontScale > this._maxLineWidth
                    && !cc.TextUtils.isUnicodeSpace(character)) {
                    this._linesWidth.push(letterRight);
                    letterRight = 0;
                    lineIndex++;
                    nextTokenX = 0;
                    nextTokenY -= (this._lineHeight * this._bmfontScale + lineSpacing);
                    newLine = true;
                    break;
                } else {
                    letterPosition.x = letterX;
                }

                letterPosition.y = nextTokenY - letterDef._offsetY * this._bmfontScale;
                this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex);

                if (letterIndex + 1 < this._horizontalKernings.length && letterIndex < textLen - 1) {
                    nextLetterX += this._horizontalKernings[letterIndex + 1];
                }

                nextLetterX += letterDef._xAdvance * this._bmfontScale + this._spacingX;

                tokenRight = letterPosition.x + letterDef._width * this._bmfontScale;

                if (tokenHighestY < letterPosition.y) {
                    tokenHighestY = letterPosition.y;
                }

                if (tokenLowestY > letterPosition.y - letterDef._height * this._bmfontScale) {
                    tokenLowestY = letterPosition.y - letterDef._height * this._bmfontScale;
                }

            } //end of for loop

            if (newLine) continue;

            nextTokenX = nextLetterX;
            letterRight = tokenRight;

            if (highestY < tokenHighestY) {
                highestY = tokenHighestY;
            }
            if (lowestY > tokenLowestY) {
                lowestY = tokenLowestY;
            }
            if (longestLine < letterRight) {
                longestLine = letterRight;
            }

            index += tokenLen;
        } //end of for loop

        this._linesWidth.push(letterRight);

        this._numberOfLines = lineIndex + 1;
        this._textDesiredHeight = this._numberOfLines * this._lineHeight * this._bmfontScale;
        if (this._numberOfLines > 1) {
            this._textDesiredHeight += (this._numberOfLines - 1) * this._lineSpacing;
        }

        var contentSize = cc.size(this._labelWidth, this._labelHeight);
        if (this._labelWidth <= 0) {
            contentSize.width = parseFloat(longestLine.toFixed(2));
        }
        if (this._labelHeight <= 0) {
            contentSize.height = parseFloat(this._textDesiredHeight.toFixed(2));
        }

        _ccsg.Node.prototype.setContentSize.call(this, contentSize);

        this._tailoredTopY = contentSize.height;
        this._tailoredBottomY = 0;
        if (highestY > 0) {
            this._tailoredTopY = contentSize.height + highestY;
        }
        if (lowestY < -this._textDesiredHeight) {
            this._tailoredBottomY = this._textDesiredHeight + lowestY;
        }

        return true;
    },

    _multilineTextWrapByWord: function() {
        return this._multilineTextWrap(this._getFirstWordLen.bind(this));
    },

    _multilineTextWrapByChar: function() {
        return this._multilineTextWrap(this._getFirstCharLen.bind(this));
    },

    _isVerticalClamp: function() {
        if (this._textDesiredHeight > this._contentSize.height) {
            return true;
        } else {
            return false;
        }
    },

    _isHorizontalClamp: function() {
        var letterClamp = false;

        for (var ctr = 0; ctr < this.getStringLength(); ++ctr) {
            if (this._lettersInfo[ctr]._valid) {
                var letterDef = this._fontAtlas._letterDefinitions[this._lettersInfo[ctr]._char];

                var px = this._lettersInfo[ctr]._positionX + letterDef._width / 2 * this._bmfontScale;
                var lineIndex = this._lettersInfo[ctr]._lineIndex;
                if (this._labelWidth > 0) {
                    if (!this._isWrapText) {
                        if(px > this._contentSize.width){
                            letterClamp = true;
                            break;
                        }
                    }else{
                        var wordWidth = this._linesWidth[lineIndex];
                        if(wordWidth > this._contentSize.width && (px > this._contentSize.width || px < 0)){
                            letterClamp = true;
                            break;
                        }
                    }
                }
            }
        }

        return letterClamp;
    },

    _shrinkLabelToContentSize: function(lambda) {
        var fontSize = this.getFontSize();

        var i = 0;
        var tempLetterDefinition = this._fontAtlas.cloneLetterDefinition();
        var originalLineHeight = this._lineHeight;
        var flag = true;

        while (lambda()) {
            ++i;

            var newFontSize = fontSize - i;
            flag = false;
            if (newFontSize <= 0) {
                break;
            }

            var scale = newFontSize / fontSize;
            this._fontAtlas.assignLetterDefinitions(tempLetterDefinition);
            this._fontAtlas.scaleFontLetterDefinition(scale);
            this._lineHeight = originalLineHeight * scale;
            if (!this._lineBreakWithoutSpaces) {
                this._multilineTextWrapByWord();
            } else {
                this._multilineTextWrapByChar();
            }
            this._computeAlignmentOffset();
        }

        this._lineHeight = originalLineHeight;
        this._fontAtlas.assignLetterDefinitions(tempLetterDefinition);

        if (!flag) {
            if (fontSize - i >= 0) {
                this._scaleFontSizeDown(fontSize - i);
            }
        }
    },

    _scaleFontSizeDown: function(fontSize) {
        var shouldUpdateContent = true;
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            if (!fontSize) {
                fontSize = 0.1;
                shouldUpdateContent = false;
            }
            this._fontSize = fontSize;

            if (shouldUpdateContent) {
                this._updateContent();
            }
        }
    },

    _updateContent: function() {
        if (this._fontAtlas) {
            this._computeHorizontalKerningForText(this._string);
            this._alignText();
        }
    },


    _computeAlignmentOffset: function() {
        this._linesOffsetX = [];
        switch (this._hAlign) {
            case cc.TextAlignment.LEFT:
                for (var i = 0; i < this._numberOfLines; ++i) {
                    this._linesOffsetX.push(0);
                }
                break;
            case cc.TextAlignment.CENTER:
                this._linesWidth.forEach(function(lineWidth) {
                    this._linesOffsetX.push((this._contentSize.width - lineWidth) / 2);
                }.bind(this));
                break;
            case cc.TextAlignment.RIGHT:
                this._linesWidth.forEach(function(lineWidth) {
                    this._linesOffsetX.push(this._contentSize.width - lineWidth);
                }.bind(this));
                break;
            default:
                break;
        }

        switch (this._vAlign) {
            case cc.VerticalTextAlignment.TOP:
                this._letterOffsetY = this._contentSize.height;
                break;
            case cc.VerticalTextAlignment.CENTER:
                this._letterOffsetY = (this._contentSize.height + this._textDesiredHeight) / 2;
                break;
            case cc.VerticalTextAlignment.BOTTOM:
                this._letterOffsetY = this._textDesiredHeight;
                break;
            default:
                break;
        }
    },

    _getFirstCharLen: function() {
        return 1;
    },

    _getFirstWordLen: function(text, startIndex, textLen) {
        var character = text.charAt(startIndex);
        if (cc.TextUtils.isUnicodeCJK(character)
            || character === "\n"
            || cc.TextUtils.isUnicodeSpace(character)) {
            return 1;
        }

        var len = 1;
        letterDef = this._fontAtlas.getLetterDefinitionForChar(character);
        if (!letterDef) {
            return len;
        }
        var nextLetterX = letterDef._xAdvance * this._bmfontScale + this._spacingX;
        var letterDef;
        var letterX;
        for (var index = startIndex + 1; index < textLen; ++index) {
            character = text.charAt(index);

            letterDef = this._fontAtlas.getLetterDefinitionForChar(character);
            if (!letterDef) {
                break;
            }
            letterX = nextLetterX + letterDef._offsetX * this._bmfontScale;

            if(letterX + letterDef._width * this._bmfontScale > this._maxLineWidth
               && !cc.TextUtils.isUnicodeSpace(character)
               && this._maxLineWidth > 0) {
                return len;
            }
            nextLetterX += letterDef._xAdvance * this._bmfontScale + this._spacingX;
            if (character === "\n"
                || cc.TextUtils.isUnicodeSpace(character)
                || cc.TextUtils.isUnicodeCJK(character)) {
                break;
            }
            len++;
        }

        return len;
    },

    _updateBMFontScale: function() {
        if (this._labelType === _ccsg.Label.Type.BMFont) {
            var originalFontSize = this._fontAtlas._fontSize;
            this._bmfontScale = this._fontSize / originalFontSize;
        } else {
            this._bmfontScale = 1;
        }

    },

    _initBMFontWithString: function(str, fntFile, spriteFrame) {
        var self = this;
        if (self._config) {
            cc.logID(4002);
            return false;
        }
        this._string = str;
        this._setBMFontFile(fntFile, spriteFrame);
    },

    _createSpriteBatchNode: function(texture) {

        this._spriteBatchNode = new cc.SpriteBatchNode(texture, this._string.length);
        this._spriteBatchNode.setCascadeColorEnabled(true);
        this._spriteBatchNode.setCascadeOpacityEnabled(true);
        this.addChild(this._spriteBatchNode);

        this._updateContent();
        this.setColor(this.color);
    },
    //this method is used as createFontAtlas
    _createFontChars: function() {
        if (!this._config) {
            return;
        }

        this._fontAtlas = new cc.FontAtlas(this._config);

        if(!this._lineHeight){
            this._lineHeight = this._fontAtlas._lineHeight;
        }

        var locCfg = this._config;
        var locFontDict = locCfg.fontDefDictionary;

        for (var fontDef in locFontDict) {
            var letterDefinition = new FontLetterDefinition();

            var tempRect = locFontDict[fontDef].rect;

            letterDefinition._offsetX = locFontDict[fontDef].xOffset;
            letterDefinition._offsetY = locFontDict[fontDef].yOffset;
            letterDefinition._width = tempRect.width;
            letterDefinition._height = tempRect.height;
            letterDefinition._u = tempRect.x + this._imageOffset.x;
            letterDefinition._v = tempRect.y + this._imageOffset.y;
            //FIXME: only one texture supported for now
            letterDefinition._textureID = 0;
            letterDefinition._validDefinition = true;
            letterDefinition._xAdvance = locFontDict[fontDef].xAdvance;

            this._fontAtlas.addLetterDefinitions(fontDef, letterDefinition);
        }
    },

    _rescaleWithOriginalFontSize: function() {
        var renderingFontSize = this.getFontSize();
        if (this._drawFontsize - renderingFontSize >= 1 && this._overFlow === _ccsg.Label.Overflow.SHRINK) {
            if(this._labelType === _ccsg.Label.Type.BMFont) {
                this._scaleFontSizeDown(this._drawFontsize);
            } else {
                this._fontSize = this._drawFontsize;
            }
        }
    },

    _computeHorizontalKerningForText: function() {
        var stringLen = this.getStringLength();
        var locKerningDict = this._config.kerningDict;

        var prev = -1;
        for (var i = 0; i < stringLen; ++i) {
            var key = this._string.charCodeAt(i);
            var kerningAmount = locKerningDict[(prev << 16) | (key & 0xffff)] || 0;
            if (i < stringLen - 1) {
                this._horizontalKernings[i] = kerningAmount;
            } else {
                this._horizontalKernings[i] = 0;
            }
            prev = key;
        }
    },

    _setBMFontFile: function(fntDataStr, spriteFrame) {
        if (fntDataStr) {
            this._fontHandle = fntDataStr;
            if (this._labelType === _ccsg.Label.Type.BMFont) {
                var self = this;
                this._resetBMFont();

                var fntConfig = this._fontAsset._fntConfig;
                if (fntConfig) {
                    self._config = fntConfig;
                } else {
                    self._config = FntLoader.parseFnt(fntDataStr);
                    this._fontAsset._fntConfig = self._config;
                }
                self._createFontChars();
                self._spriteFrame = spriteFrame;

                var createLabelSprites = function () {
                    var texture = spriteFrame.getTexture();
                    self._textureLoaded = texture.isLoaded();
                    self._createSpriteBatchNode(texture);
                    self.emit("load");
                };

                if (spriteFrame.textureLoaded()) {
                    createLabelSprites();
                } else {
                    spriteFrame.once('load', createLabelSprites);
                    spriteFrame.ensureLoadTexture();
                }
            }
        }
    }
};


var _p = _ccsg.Label.prototype;
cc.js.addon(_p, EventTarget.prototype);
cc.js.mixin(_p, cc.BMFontHelper);

_ccsg.Label.Type = cc.Enum({
    TTF: 0,
    BMFont: 1,
    SystemFont: 2
});
_ccsg.Label.Overflow = cc.Enum({
    NONE: 0,
    CLAMP: 1,
    SHRINK: 2,
    RESIZE_HEIGHT: 3
});


// fireball#2856

var labelPro = _ccsg.Label.prototype;
Object.defineProperty(labelPro, 'width', {
    get: labelPro._getWidth,
    set: _ccsg.Node.prototype._setWidth
});

Object.defineProperty(labelPro, 'height', {
    get: labelPro._getHeight,
    set: _ccsg.Node.prototype._setHeight
});

/*global dirtyFlags */

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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
(function () {
    _ccsg.Label.TTFLabelBaker = function () {};

    var proto = _ccsg.Label.TTFLabelBaker.prototype = Object.create(Object.prototype);

    proto.updateStatus = function () {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        var colorDirty = locFlag & flags.colorDirty,
            opacityDirty = locFlag & flags.opacityDirty;

        if (colorDirty) {
            this._updateDisplayColor();
        }

        if (opacityDirty) {
            this._updateDisplayOpacity();
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
        }

        if(locFlag & dirtyFlags.contentDirty) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._dirtyFlag &= ~dirtyFlags.contentDirty;
        }

        if (colorDirty || (locFlag & flags.textDirty)) {
            this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
            this._rebuildLabelSkin();
        }

        if (this._dirtyFlag & flags.transformDirty) {
            this.transform(this.getParentRenderCmd(), true);
            this._dirtyFlag &= ~flags.transformDirty;
        }
    };


    proto._syncStatus = function (parentCmd) {
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        var parentNode = parentCmd ? parentCmd._node : null;

        if (parentNode && parentNode._cascadeColorEnabled && (parentCmd._dirtyFlag & flags.colorDirty))
            locFlag |= flags.colorDirty;

        if (parentNode && parentNode._cascadeOpacityEnabled && (parentCmd._dirtyFlag & flags.opacityDirty))
            locFlag |= flags.opacityDirty;

        if (parentCmd && (parentCmd._dirtyFlag & flags.transformDirty))
            locFlag |= flags.transformDirty;

        var colorDirty = locFlag & flags.colorDirty,
            opacityDirty = locFlag & flags.opacityDirty;

        this._dirtyFlag = locFlag;

        if (colorDirty)
            this._syncDisplayColor();
        if (opacityDirty)
            this._syncDisplayOpacity();

        if (colorDirty || opacityDirty || (this._dirtyFlag & flags.textDirty)) {
            this._rebuildLabelSkin();
        }

        if (this._dirtyFlag & flags.transformDirty) {
            this.transform(parentCmd);
        }
    };

    proto._getLineHeight = function () {
        var nodeSpacingY = this._node.getLineHeight();
        var node = this._node;
        if (nodeSpacingY === 0) {
            nodeSpacingY = node._fontSize;
        } else {
            nodeSpacingY = nodeSpacingY * node._fontSize / this._drawFontsize;
        }

        var lineHeight = nodeSpacingY | 0;
        return lineHeight;
    };

    proto._constructFontDesc = function () {
        var node = this._node;
        var fontDesc = node._fontSize.toString() + 'px ';
        var fontFamily = node._fontHandle.length === 0 ? 'serif' : node._fontHandle;
        fontDesc = fontDesc + fontFamily;
        if(node._isBold) {
            fontDesc = "bold " + fontDesc;
        }

        return fontDesc;
    };

    proto._measureText = function (ctx) {
        return function(string) {
            return ctx.measureText(string).width;
        };
    };


    proto._calculateLabelFont = function() {
        var node = this._node;
        var paragraphedStrings = node._string.split('\n');

        node._fontSize = node._drawFontsize;
        var fontDesc = this._constructFontDesc();
        this._labelContext.font = fontDesc;

        var paragraphLength = this._calculateParagraphLength(paragraphedStrings, this._labelContext);

        if (_ccsg.Label.Overflow.SHRINK === node._overFlow) {
            this._splitedStrings = paragraphedStrings;
            var i = 0;
            var totalHeight = 0;
            var maxLength = 0;

            if (node._isWrapText) {

                var canvasWidthNoMargin = this._canvasSize.width - 2 * this._getMargin();
                var canvasHeightNoMargin = this._canvasSize.height - 2 * this._getMargin();
                if(canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
                    fontDesc = this._constructFontDesc();
                    this._labelContext.font = fontDesc;
                    return fontDesc;
                }
                totalHeight = canvasHeightNoMargin + 1;
                maxLength = canvasWidthNoMargin + 1;
                var actualFontSize = this._drawFontsize + 1;
                var textFragment = "";
                var tryDivideByTwo = true;
                var startShrinkFontSize = actualFontSize | 0;

                while (totalHeight > canvasHeightNoMargin || maxLength > canvasWidthNoMargin) {
                    if (tryDivideByTwo) {
                        actualFontSize = (startShrinkFontSize / 2) | 0;
                    } else {
                        actualFontSize = startShrinkFontSize - 1;
                        startShrinkFontSize = actualFontSize;
                    }
                    if(actualFontSize <= 0) {
                        cc.logID(4003);
                        break;
                    }
                    node._fontSize = actualFontSize;
                    fontDesc = this._constructFontDesc();
                    this._labelContext.font = fontDesc;

                    this._splitedStrings = [];
                    totalHeight = 0;
                    for (i = 0; i < paragraphedStrings.length; ++i) {
                        var j = 0;
                        var allWidth = this._labelContext.measureText(paragraphedStrings[i]).width;
                        textFragment = cc.TextUtils.fragmentText(paragraphedStrings[i],
                                                                 allWidth,
                                                                 canvasWidthNoMargin,
                                                                 this._measureText(this._labelContext));
                        while(j < textFragment.length) {
                            var measureWidth = this._labelContext.measureText(textFragment[j]).width;
                            maxLength = measureWidth;
                            totalHeight += this._getLineHeight();
                            ++j;
                        }
                        this._splitedStrings = this._splitedStrings.concat(textFragment);
                    }

                    if(tryDivideByTwo) {
                        if (totalHeight > canvasHeightNoMargin) {
                            startShrinkFontSize = actualFontSize | 0;
                        } else {
                            tryDivideByTwo = false;
                            totalHeight = canvasHeightNoMargin + 1;
                        }
                    }
                }
            }
            else {
                totalHeight = paragraphedStrings.length * this._getLineHeight();

                for (i = 0; i < paragraphedStrings.length; ++i) {
                    if (maxLength < paragraphLength[i]) {
                        maxLength = paragraphLength[i];
                    }
                }
                var scaleX = (this._canvasSize.width - 2 * this._getMargin()) / maxLength;
                var scaleY = this._canvasSize.height / totalHeight;

                node._fontSize = (this._drawFontsize * Math.min(1, scaleX, scaleY)) | 0;
                fontDesc = this._constructFontDesc();
                this._labelContext.font = fontDesc;
            }
        }

        return fontDesc;
    };

    proto._getMargin = function() {
        return (this._node && this._node._margin) || 0;
    };

    proto._calculateParagraphLength = function(paragraphedStrings, ctx) {
        var paragraphLength = [];

        for (var i = 0; i < paragraphedStrings.length; ++i) {
            var textMetric = ctx.measureText(paragraphedStrings[i]);
            paragraphLength.push(textMetric.width);
        }

        return paragraphLength;
    };

    proto._calculateCanvasSize = function() {
        var node = this._node;
        var canvasWidth = node._contentSize.width;
        var canvasHeight = node._contentSize.height;
        if (canvasWidth <= 0) canvasWidth = 1;
        if (canvasHeight <= 0) canvasHeight = 1;

        return cc.size(canvasWidth, canvasHeight);
    };

    proto._calculateSplitedStrings = function() {
        var node = this._node;

        var paragraphedStrings = node._string.split('\n');

        var i;
        if (node._isWrapText) {
            this._splitedStrings = [];
            var canvasWidthNoMargin = this._canvasSize.width - 2 * this._getMargin();
            for (i = 0; i < paragraphedStrings.length; ++i) {
                var allWidth = this._labelContext.measureText(paragraphedStrings[i]).width;
                var textFragment = cc.TextUtils.fragmentText(paragraphedStrings[i],
                                                             allWidth,
                                                             canvasWidthNoMargin,
                                                             this._measureText(this._labelContext));
                this._splitedStrings = this._splitedStrings.concat(textFragment);
            }
        }
        else {
            this._splitedStrings = paragraphedStrings;
        }

    };

    proto._updateLabelDimensions = function() {
        var node = this._node;
        var paragraphedStrings = node._string.split('\n');
        var i;
        var ctx = this._labelContext;

        if (_ccsg.Label.Overflow.RESIZE_HEIGHT === node._overFlow) {
            this._canvasSize.height = this._splitedStrings.length * this._getLineHeight();
            _ccsg.Node.prototype.setContentSize.call(node, this._canvasSize);
        }
        else if(_ccsg.Label.Overflow.NONE === node._overFlow) {
            this._splitedStrings = paragraphedStrings;
            var canvasSizeX = 0;
            var canvasSizeY = 0;
            for (i = 0; i < paragraphedStrings.length; ++i) {
                var paraLength = ctx.measureText(paragraphedStrings[i]).width;
                canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
            }
            canvasSizeY = this._splitedStrings.length * this._getLineHeight();

            this._canvasSize.width = parseFloat(canvasSizeX.toFixed(2)) + 2 * this._getMargin();
            this._canvasSize.height = parseFloat(canvasSizeY.toFixed(2));
            if(node._isItalic) {
                //0.0174532925 = 3.141592653 / 180
                this._canvasSize.width += node._drawFontsize * Math.tan(12 * 0.0174532925);
            }
            _ccsg.Node.prototype.setContentSize.call(node, this._canvasSize);
        }

        this._labelCanvas.width = this._canvasSize.width;
        this._labelCanvas.height = this._canvasSize.height;

    };

    proto._calculateFillTextStartPosition = function() {
        var node = this._node;
        var lineHeight = this._getLineHeight();
        var lineCount = this._splitedStrings.length;
        var labelX;
        var firstLinelabelY;

        if (cc.TextAlignment.RIGHT === node._hAlign) {
            labelX = this._canvasSize.width - this._getMargin();
        }
        else if (cc.TextAlignment.CENTER === node._hAlign) {
            labelX = this._canvasSize.width / 2;
        }
        else {
            labelX = 0 + this._getMargin();
        }

        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            firstLinelabelY = 0;
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            firstLinelabelY = this._canvasSize.height / 2 - lineHeight * (lineCount - 1) / 2;
        }
        else {
            firstLinelabelY = this._canvasSize.height - lineHeight * (lineCount - 1);
        }

        return cc.p(labelX, firstLinelabelY);
    };

    proto._calculateTextBaseline = function() {
        var node = this._node;
        var hAlign;
        var vAlign;

        if (cc.TextAlignment.RIGHT === node._hAlign) {
            hAlign = 'right';
        }
        else if (cc.TextAlignment.CENTER === node._hAlign) {
            hAlign = 'center';
        }
        else {
            hAlign = 'left';
        }

        this._labelContext.textAlign = hAlign;
        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            vAlign = 'top';
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            vAlign = 'middle';
        }
        else {
            vAlign = 'bottom';
        }
        this._labelContext.textBaseline = vAlign;
    };

    proto._bakeLabel = function () {
        var node = this._node;
        this._drawFontsize = node._drawFontsize;
        this._canvasSize = this._calculateCanvasSize();

        //Note: don't change the calling order of the following 3 statements
        this._fontDesc = this._calculateLabelFont();
        this._calculateSplitedStrings();
        this._updateLabelDimensions();

        this._calculateTextBaseline();

        this._updateTexture();
    };


    proto._calculateUnderlineStartPosition = function () {
        var node = this._node;
        var lineHeight = this._getLineHeight();
        var lineCount = this._splitedStrings.length;
        var labelX;
        var firstLinelabelY;

        labelX = 0 + this._getMargin();

        if (cc.VerticalTextAlignment.TOP === node._vAlign) {
            firstLinelabelY = node._fontSize;
        }
        else if (cc.VerticalTextAlignment.CENTER === node._vAlign) {
            firstLinelabelY = this._canvasSize.height / 2 - lineHeight * (lineCount - 1) / 2 + node._fontSize / 2;
        }
        else {
            firstLinelabelY = this._canvasSize.height - lineHeight * (lineCount - 1);
        }

        return cc.p(labelX, firstLinelabelY);
    };

    proto._updateTexture = function() {
        this._labelContext.clearRect(0, 0, this._labelCanvas.width, this._labelCanvas.height);

        this._labelContext.font = this._fontDesc;

        var startPosition = this._calculateFillTextStartPosition();
        var lineHeight = this._getLineHeight();
        //use round for line join to avoid sharp intersect point
        this._labelContext.lineJoin = 'round';
        var color = this._displayedColor;
        this._labelContext.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        var underlineStartPosition;

        //do real rendering
        for (var i = 0; i < this._splitedStrings.length; ++i) {
            if(this._node.isOutlined())
            {
                var strokeColor = this._node.getOutlineColor() || cc.color(255,255,255,255);
                this._labelContext.globalCompositeOperation = 'source-over';
                this._labelContext.strokeStyle = 'rgb(' + strokeColor.r + ',' + strokeColor.g + ',' + strokeColor.b + ')';
                this._labelContext.lineWidth = this._node.getOutlineWidth() * 2;
                this._labelContext.strokeText(this._splitedStrings[i],
                                              startPosition.x, startPosition.y + i * lineHeight);
            }
            if(this._node.getFillColorGradientEnabled()) {
                var gradientStartColor = this._node.getGradientStartColor() || cc.color(255, 255, 255, 255);
                var gradientEndColor = this._node.getGradientEndColor() || cc.color(255, 255, 255, 255);
                var gradientArgument = this._getGradientArgs();
                var gradient = this._labelContext.createLinearGradient(gradientArgument.left, gradientArgument.top, gradientArgument.right, gradientArgument.bottom);
                gradient.addColorStop(0, cc.colorToHex(gradientStartColor));
                gradient.addColorStop(1, cc.colorToHex(gradientEndColor));
                this._labelContext.fillStyle = gradient;
            }
            this._labelContext.fillText(this._splitedStrings[i], startPosition.x, startPosition.y + i * lineHeight);
            if(this._node._isUnderline) {
                underlineStartPosition = this._calculateUnderlineStartPosition();
                this._labelContext.save();
                this._labelContext.beginPath();
                this._labelContext.lineWidth = this._node._fontSize / 8;
                this._labelContext.strokeStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
                this._labelContext.moveTo(underlineStartPosition.x, underlineStartPosition.y + i * lineHeight - 1);
                this._labelContext.lineTo(underlineStartPosition.x + this._labelCanvas.width, underlineStartPosition.y + i * lineHeight - 1);
                this._labelContext.stroke();
                this._labelContext.restore();
            }
        }

        this._texture._textureLoaded = false;
        // Hack. because we delete _htmlElementObj after usage in WEBGL mode
        this._texture._htmlElementObj = this._labelCanvas;
        this._texture.handleLoadedTexture(true);
    };

    proto._getGradientArgs = function () {
        this._gradientArgument = {};
        this._gradientArgument.left = 0;
        this._gradientArgument.top = 0;
        var contentSize = this._node._contentSize;
        switch(this._node.getFillColorGradientDirection()) {
                //horizontal
            case 0:
                this._gradientArgument.right = contentSize.width;
                this._gradientArgument.bottom = 0;
                break;
            case 1:
                this._gradientArgument.right = 0;
                this._gradientArgument.bottom = contentSize.height;
                break;
            case 2:
                this._gradientArgument.right = contentSize.width;
                this._gradientArgument.bottom = contentSize.height;
                break;
            default:
                break;
        }
        return this._gradientArgument;
    };

    proto._rebuildLabelSkin = function () {
        this._dirtyFlag &= ~_ccsg.Node._dirtyFlags.textDirty;
        var node = this._node;
        node._updateLabel();
    };
})();

(function () {
    _ccsg.Label.CanvasRenderCmd = function (renderableObject) {
        this._rootCtor(renderableObject);
        this._needDraw = true;
        this._texture = new cc.Texture2D();
        this._labelCanvas = document.createElement('canvas');
        this._labelCanvas.width = 1;
        this._labelCanvas.height = 1;
        this._labelContext = this._labelCanvas.getContext('2d');
        this._texture.initWithElement(this._labelCanvas);
        this._splitedStrings = null;
    };

    var proto = _ccsg.Label.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    cc.js.mixin(proto, _ccsg.Label.TTFLabelBaker.prototype);

    proto.constructor = _ccsg.Label.CanvasRenderCmd;

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);

        var bb = this._currentRegion,
            l = bb._minX, r = bb._maxX, b = bb._minY, t = bb._maxY,
            rect = cc.visibleRect,
            vl = rect.left.x, vr = rect.right.x, vt = rect.top.y, vb = rect.bottom.y;
        if (r < vl || l > vr || t < vb || b > vt) {
            this._needDraw = false;
        }
        else {
            this._needDraw = true;
        }
    };

    proto.rendering = function (ctx, scaleX, scaleY) {
        var node = this._node;

        if (node._labelType === _ccsg.Label.Type.TTF ||
            node._labelType === _ccsg.Label.Type.SystemFont) {
            var locDisplayOpacity = this._displayedOpacity;
            var alpha = locDisplayOpacity / 255;

            if (locDisplayOpacity === 0)
                return;

            var wrapper = ctx || cc._renderContext,
                context = wrapper.getContext();
            wrapper.setTransform(this._worldTransform, scaleX, scaleY);
            wrapper.setCompositeOperation(_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(node._blendFunc));
            wrapper.setGlobalAlpha(alpha);

            if (this._texture) {
                var sx, sy, sw, sh;
                var x, y, w, h;

                x = 0;
                y = -this._node._contentSize.height;
                w = this._node._contentSize.width;
                h = this._node._contentSize.height;


                var textureWidth = this._texture.getPixelWidth();
                var textureHeight = this._texture.getPixelHeight();

                sx = 0;
                sy = 0;
                sw = textureWidth;
                sh = textureHeight;

                var image = this._texture._htmlElementObj;
                if (this._texture._pattern !== '') {
                    wrapper.setFillStyle(context.createPattern(image, this._texture._pattern));
                    context.fillRect(x, y, w, h);
                }
                else {
                    if(sw !== 0 && sh !== 0 && w !== 0 && h !== 0) {
                        context.drawImage(image,
                            sx, sy, sw, sh,
                            x, y, w, h);
                    }
                }
            }
            cc.g_NumberOfDraws = cc.g_NumberOfDraws + 1;
        }

    };

})();

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

 Use any of these editors to generate BMFonts:
 http://glyphdesigner.71squared.com/ (Commercial, Mac OS X)
 http://www.n4te.com/hiero/hiero.jnlp (Free, Java)
 http://slick.cokeandcode.com/demos/hiero.jnlp (Free, Java)
 http://www.angelcode.com/products/bmfont/ (Free, Windows only)
 ****************************************************************************/

_ccsg.Label.WebGLRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = true;

    this._texture = new cc.Texture2D();
    this._labelCanvas = document.createElement("canvas");
    this._texture.initWithElement(this._labelCanvas);
    this._labelContext = this._labelCanvas.getContext("2d");

    this._labelCanvas.width = 1;
    this._labelCanvas.height = 1;
    this._splitedStrings = null;
    this._drawFontsize = 0;

    this._vertices = [
        {x: 0, y: 0, u: 0, v: 0}, // tl
        {x: 0, y: 0, u: 0, v: 1}, // bl
        {x: 0, y: 0, u: 1, v: 0}, // tr
        {x: 0, y: 0, u: 1, v: 1}  // br
    ];
    this._color = new Uint32Array(1);
    this._dirty = false;

    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR);
};

var proto = _ccsg.Label.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
cc.js.mixin(proto, _ccsg.Label.TTFLabelBaker.prototype);

proto.constructor = _ccsg.Label.WebGLRenderCmd;

proto.transform = function (parentCmd, recursive) {
    this.originTransform(parentCmd, recursive);

    var node = this._node,
        lx = 0, rx = this._labelCanvas.width,
        by = 0, ty = this._labelCanvas.height,
        wt = this._worldTransform;

    var vert = this._vertices;
    vert[0].x = lx * wt.a + ty * wt.c + wt.tx; // tl
    vert[0].y = lx * wt.b + ty * wt.d + wt.ty;
    vert[1].x = lx * wt.a + by * wt.c + wt.tx; // bl
    vert[1].y = lx * wt.b + by * wt.d + wt.ty;
    vert[2].x = rx * wt.a + ty * wt.c + wt.tx; // tr
    vert[2].y = rx * wt.b + ty * wt.d + wt.ty;
    vert[3].x = rx * wt.a + by * wt.c + wt.tx; // br
    vert[3].y = rx * wt.b + by * wt.d + wt.ty;

    if (!node._string || (node._labelType !== _ccsg.Label.Type.TTF &&
       node._labelType !== _ccsg.Label.Type.SystemFont)) {
        // No culling for bmfont
        return;
    }

    var rect = cc.visibleRect,
        vl = rect.left.x, vr = rect.right.x, vt = rect.top.y, vb = rect.bottom.y;
    if (((vert[0].x-vl) & (vert[1].x-vl) & (vert[2].x-vl) & (vert[3].x-vl)) >> 31 || // All outside left
        ((vr-vert[0].x) & (vr-vert[1].x) & (vr-vert[2].x) & (vr-vert[3].x)) >> 31 || // All outside right
        ((vert[0].y-vb) & (vert[1].y-vb) & (vert[2].y-vb) & (vert[3].y-vb)) >> 31 || // All outside bottom
        ((vt-vert[0].y) & (vt-vert[1].y) & (vt-vert[2].y) & (vt-vert[3].y)) >> 31)   // All outside top
    {
        this._needDraw = false;
    }
    else {
        this._needDraw = true;
    }
};

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset) {
    var node = this._node;
    if (!node._string || (node._labelType !== _ccsg.Label.Type.TTF &&
       node._labelType !== _ccsg.Label.Type.SystemFont))
        return 0;

    // Fill in vertex data with quad information (4 vertices for sprite)
    // Use 255 because color has been set when baking label
    // premultiplied alpha is used for labelTTF and system font
    var opacity = this._displayedOpacity;
    this._color[0] = ((opacity<<24) | (opacity<<16) | (opacity<<8) | opacity);

    var z = node._vertexZ;

    var vertices = this._vertices;
    var i, len = vertices.length, vertex, offset = vertexDataOffset;
    for (i = 0; i < len; ++i) {
        vertex = vertices[i];
        f32buffer[offset] = vertex.x;
        f32buffer[offset + 1] = vertex.y;
        f32buffer[offset + 2] = z;
        ui32buffer[offset + 3] = this._color[0];
        f32buffer[offset + 4] = vertex.u;
        f32buffer[offset + 5] = vertex.v;
        offset += 6;
    }

    return len;
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2012 Scott Lembcke and Howling Moon Software

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

var __t = function (v) {
    return {u: v.x, v: v.y};
};

/**
 * <p>CCDrawNode                                                <br/>
 * Node that draws dots, segments and polygons.                        <br/>
 * Faster than the "drawing primitives" since they it draws everything in one single batch.</p>
 * @class
 * @name cc.DrawNode
 * @extends _ccsg.Node
 */
cc.DrawNode = _ccsg.Node.extend(/** @lends cc.DrawNode# */{
//TODO need refactor

    _buffer: null,
    _blendFunc: null,
    _lineWidth: 1,
    _drawColor: null,

    /**
     * Gets the blend func
     * @returns {Object}
     */
    getBlendFunc: function () {
        return this._blendFunc;
    },

    /**
     * Set the blend func
     * @param blendFunc
     * @param dst
     */
    setBlendFunc: function (blendFunc, dst) {
        if (dst === undefined) {
            this._blendFunc.src = blendFunc.src;
            this._blendFunc.dst = blendFunc.dst;
        } else {
            this._blendFunc.src = blendFunc;
            this._blendFunc.dst = dst;
        }
    },

    /**
     * line width setter
     * @param {Number} width
     */
    setLineWidth: function (width) {
        this._lineWidth = width;
    },

    /**
     * line width getter
     * @returns {Number}
     */
    getLineWidth: function () {
        return this._lineWidth;
    },

    /**
     * draw color setter
     * @param {cc.Color} color
     */
    setDrawColor: function (color) {
        var locDrawColor = this._drawColor;
        locDrawColor.r = color.r;
        locDrawColor.g = color.g;
        locDrawColor.b = color.b;
        locDrawColor.a = (color.a == null) ? 255 : color.a;
    },

    /**
     * draw color getter
     * @returns {cc.Color}
     */
    getDrawColor: function () {
        return cc.color(this._drawColor.r, this._drawColor.g, this._drawColor.b, this._drawColor.a);
    }
});

cc.DrawNode.TYPE_DOT = 0;
cc.DrawNode.TYPE_SEGMENT = 1;
cc.DrawNode.TYPE_POLY = 2;

cc.game.once(cc.game.EVENT_RENDERER_INITED, function () {
    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {

        cc._DrawNodeElement = function (type, verts, fillColor, lineWidth, lineColor, lineCap, isClosePolygon, isFill, isStroke) {
            var _t = this;
            _t.type = type;
            _t.verts = verts || null;
            _t.fillColor = fillColor || null;
            _t.lineWidth = lineWidth || 0;
            _t.lineColor = lineColor || null;
            _t.lineCap = lineCap || "butt";
            _t.isClosePolygon = isClosePolygon || false;
            _t.isFill = isFill || false;
            _t.isStroke = isStroke || false;
        };

        cc.js.mixin(cc.DrawNode.prototype, /** @lends cc.DrawNode# */{
            _className: "DrawNodeCanvas",

            /**
             * <p>The cc.DrawNodeCanvas's constructor. <br/>
             * This function will automatically be invoked when you create a node using new construction: "var node = new cc.DrawNodeCanvas()".<br/>
             * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
             */
            ctor: function () {
                _ccsg.Node.prototype.ctor.call(this);
                var locCmd = this._renderCmd;
                locCmd._buffer = this._buffer = [];
                locCmd._drawColor = this._drawColor = cc.color(255, 255, 255, 255);
                locCmd._blendFunc = this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA);

                this.init();
            },

            /**
             * draws a rectangle given the origin and destination point measured in points.
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} destination
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} lineColor
             */
            drawRect: function (origin, destination, fillColor, lineWidth, lineColor) {
                lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
                lineColor = lineColor || this.getDrawColor();
                if(lineColor.a == null)
                    lineColor.a = 255;

                var vertices = [
                    origin,
                    cc.p(destination.x, origin.y),
                    destination,
                    cc.p(origin.x, destination.y)
                ];
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = lineColor;
                element.isClosePolygon = true;
                element.isStroke = true;
                element.lineCap = "butt";
                element.fillColor = fillColor;
                if (fillColor) {
                    if(fillColor.a == null)
                        fillColor.a = 255;
                    element.isFill = true;
                }
                this._buffer.push(element);
            },

            /**
             * draws a circle given the center, radius and number of segments.
             * @override
             * @param {cc.Vec2} center center of circle
             * @param {Number} radius
             * @param {Number} angle angle in radians
             * @param {Number} segments
             * @param {Boolean} drawLineToCenter
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCircle: function (center, radius, angle, segments, drawLineToCenter, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var coef = 2.0 * Math.PI / segments;
                var vertices = [];
                for (var i = 0; i <= segments; i++) {
                    var rads = i * coef;
                    var j = radius * Math.cos(rads + angle) + center.x;
                    var k = radius * Math.sin(rads + angle) + center.y;
                    vertices.push(cc.p(j, k));
                }
                if (drawLineToCenter) {
                    vertices.push(cc.p(center.x, center.y));
                }

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isClosePolygon = true;
                element.isStroke = true;
                this._buffer.push(element);
            },

            /**
             * draws a quad bezier path
             * @override
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} control
             * @param {cc.Vec2} destination
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawQuadBezier: function (origin, control, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var vertices = [], t = 0.0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
                    var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draws a cubic bezier path
             * @override
             * @param {cc.Vec2} origin
             * @param {cc.Vec2} control1
             * @param {cc.Vec2} control2
             * @param {cc.Vec2} destination
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCubicBezier: function (origin, control1, control2, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;

                var vertices = [], t = 0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
                    var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a CatmullRom curve
             * @override
             * @param {Array} points
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCatmullRom: function (points, segments, lineWidth, color) {
                this.drawCardinalSpline(points, 0.5, segments, lineWidth, color);
            },

            /**
             * draw a cardinal spline path
             * @override
             * @param {Array} config
             * @param {Number} tension
             * @param {Number} segments
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawCardinalSpline: function (config, tension, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if(color.a == null)
                    color.a = 255;

                var vertices = [], p, lt, deltaT = 1.0 / config.length;
                for (var i = 0; i < segments + 1; i++) {
                    var dt = i / segments;
                    // border
                    if (dt === 1) {
                        p = config.length - 1;
                        lt = 1;
                    } else {
                        p = 0 | (dt / deltaT);
                        lt = (dt - deltaT * p) / deltaT;
                    }

                    // Interpolate
                    var newPos = cc.cardinalSplineAt(
                        cc.getControlPointAt(config, p - 1),
                        cc.getControlPointAt(config, p - 0),
                        cc.getControlPointAt(config, p + 1),
                        cc.getControlPointAt(config, p + 2),
                        tension, lt);
                    vertices.push(newPos);
                }

                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = vertices;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a dot at a position, with a given radius and color
             * @param {cc.Vec2} pos
             * @param {Number} radius
             * @param {cc.Color} color
             */
            drawDot: function (pos, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_DOT);
                element.verts = [pos];
                element.lineWidth = radius;
                element.fillColor = color;
                this._buffer.push(element);
            },

            /**
             * draws an array of points.
             * @override
             * @param {Array} points point of array
             * @param {Number} radius
             * @param {cc.Color} color
             */
            drawDots: function(points, radius, color){
                if(!points || points.length == 0)
                    return;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                for(var i = 0, len = points.length; i < len; i++)
                   this.drawDot(points[i], radius, color);
            },

            /**
             * draw a segment with a radius and color
             * @param {cc.Vec2} from
             * @param {cc.Vec2} to
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawSegment: function (from, to, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                element.verts = [from, to];
                element.lineWidth = lineWidth * 2;
                element.lineColor = color;
                element.isStroke = true;
                element.lineCap = "round";
                this._buffer.push(element);
            },

            /**
             * draw a polygon with a fill color and line color without copying the vertex list
             * @param {Array} verts
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} color
             */
            drawPoly_: function (verts, fillColor, lineWidth, color, notClosePoly) {
                lineWidth = (lineWidth == null ) ? this._lineWidth : lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                
                element.verts = verts;
                element.fillColor = fillColor;
                element.lineWidth = lineWidth;
                element.lineColor = color;
                element.isClosePolygon = !notClosePoly;
                element.isStroke = true;
                element.lineCap = "round";
                if (fillColor)
                    element.isFill = true;
                this._buffer.push(element);
            },
            
            /**
             * draw a polygon with a fill color and line color, copying the vertex list
             * @param {Array} verts
             * @param {cc.Color} fillColor
             * @param {Number} lineWidth
             * @param {cc.Color} color
             * @param {Boolean} notClosePoly
             */
            drawPoly: function (verts, fillColor, lineWidth, color, notClosePoly) {
                var vertsCopy = [];
                for (var i=0; i < verts.length; i++) {
                    vertsCopy.push(cc.p(verts[i].x, verts[i].y));
                }
                return this.drawPoly_(vertsCopy, fillColor, lineWidth, color, notClosePoly);
            },

            /**
             * Clear the geometry in the node's buffer.
             */
            clear: function () {
                this._buffer.length = 0;
            },

            _createRenderCmd: function(){
                return new cc.DrawNode.CanvasRenderCmd(this);
            }
        });
    }
    else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
        
        cc.js.mixin(cc.DrawNode.prototype, {
            _bufferCapacity:0,

            _trianglesArrayBuffer:null,
            _trianglesWebBuffer:null,
            _trianglesReader:null,

            _dirty:false,
            _className:"DrawNodeWebGL",

            ctor:function () {
                _ccsg.Node.prototype.ctor.call(this);
                this._buffer = [];
                this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA);
                this._drawColor = cc.color(255,255,255,255);

                this.init();
            },

            init:function () {
                if (_ccsg.Node.prototype.init.call(this)) {
                    this.shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_LENGTHTEXTURECOLOR);
                    this._ensureCapacity(64);
                    this._trianglesWebBuffer = cc._renderContext.createBuffer();
                    this._dirty = true;
                    return true;
                }
                return false;
            },

            drawRect: function (origin, destination, fillColor, lineWidth, lineColor) {
                lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
                lineColor = lineColor || this.getDrawColor();
                if (lineColor.a == null)
                    lineColor.a = 255;
                var vertices = [origin, cc.p(destination.x, origin.y), destination, cc.p(origin.x, destination.y)];
                if(fillColor == null)
                    this._drawSegments(vertices, lineWidth, lineColor, true);
                else
                    this.drawPoly(vertices, fillColor, lineWidth, lineColor);
            },

            drawCircle: function (center, radius, angle, segments, drawLineToCenter, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var coef = 2.0 * Math.PI / segments, vertices = [], i, len;
                for (i = 0; i <= segments; i++) {
                    var rads = i * coef;
                    var j = radius * Math.cos(rads + angle) + center.x;
                    var k = radius * Math.sin(rads + angle) + center.y;
                    vertices.push(cc.p(j, k));
                }
                if (drawLineToCenter)
                    vertices.push(cc.p(center.x, center.y));

                lineWidth *= 0.5;
                for (i = 0, len = vertices.length; i < len - 1; i++)
                    this.drawSegment(vertices[i], vertices[i + 1], lineWidth, color);
            },

            drawQuadBezier: function (origin, control, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], t = 0.0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 2) * origin.x + 2.0 * (1 - t) * t * control.x + t * t * destination.x;
                    var y = Math.pow(1 - t, 2) * origin.y + 2.0 * (1 - t) * t * control.y + t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));
                this._drawSegments(vertices, lineWidth, color, false);
            },

            drawCubicBezier: function (origin, control1, control2, destination, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], t = 0;
                for (var i = 0; i < segments; i++) {
                    var x = Math.pow(1 - t, 3) * origin.x + 3.0 * Math.pow(1 - t, 2) * t * control1.x + 3.0 * (1 - t) * t * t * control2.x + t * t * t * destination.x;
                    var y = Math.pow(1 - t, 3) * origin.y + 3.0 * Math.pow(1 - t, 2) * t * control1.y + 3.0 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
                    vertices.push(cc.p(x, y));
                    t += 1.0 / segments;
                }
                vertices.push(cc.p(destination.x, destination.y));
                this._drawSegments(vertices, lineWidth, color, false);
            },

            drawCatmullRom: function (points, segments, lineWidth, color) {
                this.drawCardinalSpline(points, 0.5, segments, lineWidth, color);
            },

            drawCardinalSpline: function (config, tension, segments, lineWidth, color) {
                lineWidth = lineWidth || this._lineWidth;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var vertices = [], p, lt, deltaT = 1.0 / config.length;

                for (var i = 0; i < segments + 1; i++) {
                    var dt = i / segments;

                    // border
                    if (dt === 1) {
                        p = config.length - 1;
                        lt = 1;
                    } else {
                        p = 0 | (dt / deltaT);
                        lt = (dt - deltaT * p) / deltaT;
                    }

                    // Interpolate
                    var newPos = cc.cardinalSplineAt(
                        cc.getControlPointAt(config, p - 1),
                        cc.getControlPointAt(config, p - 0),
                        cc.getControlPointAt(config, p + 1),
                        cc.getControlPointAt(config, p + 2),
                        tension, lt);
                    vertices.push(newPos);
                }

                lineWidth *= 0.5;
                for (var j = 0, len = vertices.length; j < len - 1; j++)
                    this.drawSegment(vertices[j], vertices[j + 1], lineWidth, color);
            },

            _render:function () {
                var gl = cc._renderContext;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._trianglesWebBuffer);
                if (this._dirty) {
                    gl.bufferData(gl.ARRAY_BUFFER, this._trianglesArrayBuffer, gl.STREAM_DRAW);
                    this._dirty = false;
                }
                var triangleSize = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;

                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
                gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS);

                // vertex
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, triangleSize, 0);
                // color
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, gl.UNSIGNED_BYTE, true, triangleSize, 8);
                // texcood
                gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, gl.FLOAT, false, triangleSize, 12);

                gl.drawArrays(gl.TRIANGLES, 0, this._buffer.length * 3);
                cc.incrementGLDraws(1);
                //cc.checkGLErrorDebug();
            },

            _ensureCapacity:function(count){
                var _t = this;
                var locBuffer = _t._buffer;
                if(locBuffer.length + count > _t._bufferCapacity){
                    var TriangleLength = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT;
                    _t._bufferCapacity += Math.max(_t._bufferCapacity, count);
                    //re alloc
                    if((locBuffer == null) || (locBuffer.length === 0)){
                        //init
                        _t._buffer = [];
                        _t._trianglesArrayBuffer = new ArrayBuffer(TriangleLength * _t._bufferCapacity);
                        _t._trianglesReader = new Uint8Array(_t._trianglesArrayBuffer);
                    } else {
                        var newTriangles = [];
                        var newArrayBuffer = new ArrayBuffer(TriangleLength * _t._bufferCapacity);
                        for(var i = 0; i < locBuffer.length;i++){
                            newTriangles[i] = new cc.V2F_C4B_T2F_Triangle(locBuffer[i].a,locBuffer[i].b,locBuffer[i].c,
                                newArrayBuffer, i * TriangleLength);
                        }
                        _t._trianglesReader = new Uint8Array(newArrayBuffer);
                        _t._trianglesArrayBuffer = newArrayBuffer;
                        _t._buffer = newTriangles;
                    }
                }
            },

            drawDot:function (pos, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                var c4bColor = {r: 0 | color.r, g: 0 | color.g, b: 0 | color.b, a: 0 | color.a};
                var a = {vertices: {x: pos.x - radius, y: pos.y - radius}, colors: c4bColor, texCoords: {u: -1.0, v: -1.0}};
                var b = {vertices: {x: pos.x - radius, y: pos.y + radius}, colors: c4bColor, texCoords: {u: -1.0, v: 1.0}};
                var c = {vertices: {x: pos.x + radius, y: pos.y + radius}, colors: c4bColor, texCoords: {u: 1.0, v: 1.0}};
                var d = {vertices: {x: pos.x + radius, y: pos.y - radius}, colors: c4bColor, texCoords: {u: 1.0, v: -1.0}};

                this._ensureCapacity(2*3);

                this._buffer.push(new cc.V2F_C4B_T2F_Triangle(a, b, c, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
                this._buffer.push(new cc.V2F_C4B_T2F_Triangle(a, c, d, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
                this._dirty = true;
            },

            drawDots: function(points, radius,color) {
                if(!points || points.length === 0)
                    return;
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                for(var i = 0, len = points.length; i < len; i++)
                    this.drawDot(points[i], radius, color);
            },

            drawSegment:function (from, to, radius, color) {
                color = color || this.getDrawColor();
                if (color.a == null)
                    color.a = 255;
                radius = radius || (this._lineWidth * 0.5);
                var vertexCount = 6*3;
                this._ensureCapacity(vertexCount);

                var c4bColor = {r: 0 | color.r, g: 0 | color.g, b: 0 | color.b, a: 0 | color.a};
                var a = cc.v2(from), b = cc.v2(to);
                var n = cc.pNormalize(cc.pPerp(cc.pSub(b, a))), t = cc.pPerp(n);
                var nw = cc.pMult(n, radius), tw = cc.pMult(t, radius);

                var v0 = cc.pSub(b, cc.pAdd(nw, tw));
                var v1 = cc.pAdd(b, cc.pSub(nw, tw));
                var v2 = cc.pSub(b, nw);
                var v3 = cc.pAdd(b, nw);
                var v4 = cc.pSub(a, nw);
                var v5 = cc.pAdd(a, nw);
                var v6 = cc.pSub(a, cc.pSub(nw, tw));
                var v7 = cc.pAdd(a, cc.pAdd(nw, tw));

                var TriangleLength = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, triangleBuffer = this._trianglesArrayBuffer, locBuffer = this._buffer;
                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v0, colors: c4bColor, texCoords: __t(cc.pNeg(cc.pAdd(n, t)))},
                    {vertices: v1, colors: c4bColor, texCoords: __t(cc.pSub(n, t))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v1, colors: c4bColor, texCoords: __t(cc.pSub(n, t))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v2, colors: c4bColor, texCoords: __t(cc.pNeg(n))},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v3, colors: c4bColor, texCoords: __t(n)},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v6, colors: c4bColor, texCoords: __t(cc.pSub(t, n))},
                    {vertices: v4, colors: c4bColor, texCoords: __t(cc.pNeg(n))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));

                locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v6, colors: c4bColor, texCoords: __t(cc.pSub(t, n))},
                    {vertices: v7, colors: c4bColor, texCoords: __t(cc.pAdd(n, t))}, {vertices: v5, colors: c4bColor, texCoords: __t(n)},
                    triangleBuffer, locBuffer.length * TriangleLength));
                this._dirty = true;
            },

            drawPoly:function (verts, fillColor, borderWidth, borderColor, notClosePoly) {
                if(fillColor == null){
                    this._drawSegments(verts, borderWidth, borderColor, !notClosePoly);
                    return;
                }
                if (fillColor.a == null)
                    fillColor.a = 255;
                if (borderColor.a == null)
                    borderColor.a = 255;
                borderWidth = (borderWidth == null)? this._lineWidth : borderWidth;
                borderWidth *= 0.5;
                var c4bFillColor = {r: 0 | fillColor.r, g: 0 | fillColor.g, b: 0 | fillColor.b, a: 0 | fillColor.a};
                var c4bBorderColor = {r: 0 | borderColor.r, g: 0 | borderColor.g, b: 0 | borderColor.b, a: 0 | borderColor.a};
                var extrude = [], i, v0, v1, v2, count = verts.length;
                for (i = 0; i < count; i++) {
                    v0 = cc.v2(verts[(i - 1 + count) % count]);
                    v1 = cc.v2(verts[i]);
                    v2 = cc.v2(verts[(i + 1) % count]);
                    var n1 = cc.pNormalize(cc.pPerp(cc.pSub(v1, v0)));
                    var n2 = cc.pNormalize(cc.pPerp(cc.pSub(v2, v1)));
                    var offset = cc.pMult(cc.pAdd(n1, n2), 1.0 / (cc.pDot(n1, n2) + 1.0));
                    extrude[i] = {offset: offset, n: n2};
                }
                var outline = (borderWidth > 0.0), triangleCount = 3 * count - 2, vertexCount = 3 * triangleCount;
                this._ensureCapacity(vertexCount);

                var triangleBytesLen = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, trianglesBuffer = this._trianglesArrayBuffer;
                var locBuffer = this._buffer;
                var inset = (outline == false ? 0.5 : 0.0);
                for (i = 0; i < count - 2; i++) {
                    v0 = cc.pSub(cc.v2(verts[0]), cc.pMult(extrude[0].offset, inset));
                    v1 = cc.pSub(cc.v2(verts[i + 1]), cc.pMult(extrude[i + 1].offset, inset));
                    v2 = cc.pSub(cc.v2(verts[i + 2]), cc.pMult(extrude[i + 2].offset, inset));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: v0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                        {vertices: v1, colors: c4bFillColor, texCoords: __t(cc.v2())}, {vertices: v2, colors: c4bFillColor, texCoords: __t(cc.v2())},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                }

                for (i = 0; i < count; i++) {
                    var j = (i + 1) % count;
                    v0 = cc.v2(verts[i]);
                    v1 = cc.v2(verts[j]);

                    var n0 = extrude[i].n;
                    var offset0 = extrude[i].offset;
                    var offset1 = extrude[j].offset;
                    var inner0 = outline ? cc.pSub(v0, cc.pMult(offset0, borderWidth)) : cc.pSub(v0, cc.pMult(offset0, 0.5));
                    var inner1 = outline ? cc.pSub(v1, cc.pMult(offset1, borderWidth)) : cc.pSub(v1, cc.pMult(offset1, 0.5));
                    var outer0 = outline ? cc.pAdd(v0, cc.pMult(offset0, borderWidth)) : cc.pAdd(v0, cc.pMult(offset0, 0.5));
                    var outer1 = outline ? cc.pAdd(v1, cc.pMult(offset1, borderWidth)) : cc.pAdd(v1, cc.pMult(offset1, 0.5));

                    if (outline) {
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                            {vertices: inner1, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                            {vertices: outer0, colors: c4bBorderColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                    } else {
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                            {vertices: inner1, colors: c4bFillColor, texCoords: __t(cc.v2())}, {vertices: outer1, colors: c4bFillColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                        locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bFillColor, texCoords: __t(cc.v2())},
                            {vertices: outer0, colors: c4bFillColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bFillColor, texCoords: __t(n0)},
                            trianglesBuffer, locBuffer.length * triangleBytesLen));
                    }
                }
                extrude = null;
                this._dirty = true;
            },

            _drawSegments: function(verts, borderWidth, borderColor, closePoly){
                borderWidth = (borderWidth == null) ? this._lineWidth : borderWidth;
                borderColor = borderColor || this._drawColor;
                if(borderColor.a == null)
                    borderColor.a = 255;
                borderWidth *= 0.5;
                if (borderWidth <= 0)
                    return;

                var c4bBorderColor = {r: 0 | borderColor.r, g: 0 | borderColor.g, b: 0 | borderColor.b, a: 0 | borderColor.a };
                var extrude = [], i, v0, v1, v2, count = verts.length;
                for (i = 0; i < count; i++) {
                    v0 = cc.v2(verts[(i - 1 + count) % count]);
                    v1 = cc.v2(verts[i]);
                    v2 = cc.v2(verts[(i + 1) % count]);
                    var n1 = cc.pNormalize(cc.pPerp(cc.pSub(v1, v0)));
                    var n2 = cc.pNormalize(cc.pPerp(cc.pSub(v2, v1)));
                    var offset = cc.pMult(cc.pAdd(n1, n2), 1.0 / (cc.pDot(n1, n2) + 1.0));
                    extrude[i] = {offset: offset, n: n2};
                }

                var triangleCount = 3 * count - 2, vertexCount = 3 * triangleCount;
                this._ensureCapacity(vertexCount);

                var triangleBytesLen = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT, trianglesBuffer = this._trianglesArrayBuffer;
                var locBuffer = this._buffer;
                var len = closePoly ? count : count - 1;
                for (i = 0; i < len; i++) {
                    var j = (i + 1) % count;
                    v0 = cc.v2(verts[i]);
                    v1 = cc.v2(verts[j]);

                    var n0 = extrude[i].n;
                    var offset0 = extrude[i].offset;
                    var offset1 = extrude[j].offset;
                    var inner0 = cc.pSub(v0, cc.pMult(offset0, borderWidth));
                    var inner1 = cc.pSub(v1, cc.pMult(offset1, borderWidth));
                    var outer0 = cc.pAdd(v0, cc.pMult(offset0, borderWidth));
                    var outer1 = cc.pAdd(v1, cc.pMult(offset1, borderWidth));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                        {vertices: inner1, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                    locBuffer.push(new cc.V2F_C4B_T2F_Triangle({vertices: inner0, colors: c4bBorderColor, texCoords: __t(cc.pNeg(n0))},
                        {vertices: outer0, colors: c4bBorderColor, texCoords: __t(n0)}, {vertices: outer1, colors: c4bBorderColor, texCoords: __t(n0)},
                        trianglesBuffer, locBuffer.length * triangleBytesLen));
                }
                extrude = null;
                this._dirty = true;
            },

            clear:function () {
                this._buffer.length = 0;
                this._dirty = true;
            },

            _createRenderCmd: function () {
                return new cc.DrawNode.WebGLRenderCmd(this);
            }
        });
    }
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

cc.DrawNode.CanvasRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = true;
    this._buffer = null;
    this._drawColor = null;
    this._blendFunc = null;
};

cc.DrawNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
cc.DrawNode.CanvasRenderCmd.prototype.constructor = cc.DrawNode.CanvasRenderCmd;
cc.js.mixin( cc.DrawNode.CanvasRenderCmd.prototype, {
    rendering: function (ctx, scaleX, scaleY) {
        var wrapper = ctx || cc._renderContext, context = wrapper.getContext(), node = this._node;
        var alpha = node._displayedOpacity / 255;
        if (alpha === 0)
            return;

        wrapper.setTransform(this._worldTransform, scaleX, scaleY);

        //context.save();
        wrapper.setGlobalAlpha(alpha);
        if ((this._blendFunc && (this._blendFunc.src === cc.macro.SRC_ALPHA) && (this._blendFunc.dst === cc.macro.ONE)))
            wrapper.setCompositeOperation('lighter');               //todo: need refactor
        var locBuffer = this._buffer;
        for (var i = 0, len = locBuffer.length; i < len; i++) {
            var element = locBuffer[i];
            switch (element.type) {
                case cc.DrawNode.TYPE_DOT:
                    this._drawDot(wrapper, element, scaleX, scaleY);
                    break;
                case cc.DrawNode.TYPE_SEGMENT:
                    this._drawSegment(wrapper, element, scaleX, scaleY);
                    break;
                case cc.DrawNode.TYPE_POLY:
                    this._drawPoly(wrapper, element, scaleX, scaleY);
                    break;
            }
        }
        //context.restore();            //todo It can be reserve
    },

    _drawDot: function (wrapper, element, scaleX, scaleY) {
        var locColor = element.fillColor, locPos = element.verts[0], locRadius = element.lineWidth;

        var ctx = wrapper.getContext();
        wrapper.setFillStyle("rgba(" + (0 | locColor.r) + "," + (0 | locColor.g) + "," + (0 | locColor.b) + "," + locColor.a / 255 + ")");

        ctx.beginPath();
        ctx.arc(locPos.x, -locPos.y, locRadius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    _drawSegment: function (wrapper, element, scaleX, scaleY) {
        var locColor = element.lineColor;
        var locFrom = element.verts[0], locTo = element.verts[1];
        var locLineWidth = element.lineWidth, locLineCap = element.lineCap;

        var ctx = wrapper.getContext();
        wrapper.setStrokeStyle("rgba(" + (0 | locColor.r) + "," + (0 | locColor.g) + "," + (0 | locColor.b) + "," + locColor.a / 255 + ")");

        ctx.lineWidth = locLineWidth * scaleX;
        ctx.beginPath();
        ctx.lineCap = locLineCap;
        ctx.moveTo(locFrom.x, -locFrom.y);
        ctx.lineTo(locTo.x, -locTo.y);
        ctx.stroke();
    },

    _drawPoly: function (wrapper, element, scaleX, scaleY) {
        var locVertices = element.verts, locLineCap = element.lineCap;
        if (locVertices == null)
            return;

        var locFillColor = element.fillColor, locLineWidth = element.lineWidth;
        var locLineColor = element.lineColor, locIsClosePolygon = element.isClosePolygon;
        var locIsFill = element.isFill, locIsStroke = element.isStroke;

        var ctx = wrapper.getContext();
        var firstPoint = locVertices[0];
        ctx.lineCap = locLineCap;
        if (locFillColor)
            wrapper.setFillStyle("rgba(" + (0 | locFillColor.r) + "," + (0 | locFillColor.g) + ","
                + (0 | locFillColor.b) + "," + locFillColor.a / 255 + ")");
        if (locLineWidth)
            ctx.lineWidth = locLineWidth * scaleX;
        if (locLineColor)
            wrapper.setStrokeStyle("rgba(" + (0 | locLineColor.r) + "," + (0 | locLineColor.g) + ","
                + (0 | locLineColor.b) + "," + locLineColor.a / 255 + ")");

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, -firstPoint.y);
        for (var i = 1, len = locVertices.length; i < len; i++)
            ctx.lineTo(locVertices[i].x, -locVertices[i].y);

        if (locIsClosePolygon)
            ctx.closePath();
        if (locIsFill)
            ctx.fill();
        if (locIsStroke)
            ctx.stroke();
    }
});
/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

cc.DrawNode.WebGLRenderCmd = function (renderableObject) {
    this._rootCtor(renderableObject);
    this._needDraw = true;
    this._matrix = new cc.math.Matrix4();
    this._matrix.identity();
};

cc.DrawNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
cc.DrawNode.WebGLRenderCmd.prototype.constructor = cc.DrawNode.WebGLRenderCmd;

cc.DrawNode.WebGLRenderCmd.prototype.rendering = function (ctx) {
    var node = this._node;
    if (node._buffer.length > 0) {
        var wt = this._worldTransform, mat = this._matrix.mat;
        mat[0] = wt.a;
        mat[4] = wt.c;
        mat[12] = wt.tx;
        mat[1] = wt.b;
        mat[5] = wt.d;
        mat[13] = wt.ty;

        cc.gl.blendFunc(node._blendFunc.src, node._blendFunc.dst);
        this._shaderProgram.use();
        this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
        node._render();
    }
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2012 Pierre-David Bélanger

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


/**
 * <p>
 *     cc.ClippingNode is a subclass of ccsg.Node.                                                            <br/>
 *     It draws its content (children) clipped using a stencil.                                               <br/>
 *     The stencil is an other ccsg.Node that will not be drawn.                                               <br/>
 *     The clipping is done using the alpha part of the stencil (adjusted with an alphaThreshold).
 * </p>
 * @class
 * @extends _ccsg.Node
 * @param {_ccsg.Node} [stencil=null]
 *
 * @property {Number}   alphaThreshold  - Threshold for alpha value.
 * @property {Boolean}  inverted        - Indicate whether in inverted mode.
 * @property {_ccsg.Node}  stencil         - he ccsg.Node to use as a stencil to do the clipping.
 */
cc.ClippingNode = _ccsg.Node.extend(/** @lends cc.ClippingNode# */{
    inverted: false,
    _alphaThreshold: 0,

    _stencil: null,
    _className: "ClippingNode",

    _originStencilProgram: null,

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @param {_ccsg.Node} [stencil=null]
     */
    ctor: function (stencil) {
        stencil = stencil || null;
        _ccsg.Node.prototype.ctor.call(this);
        this._stencil = stencil;
        if (stencil) {
            this._originStencilProgram = stencil.getShaderProgram();
        }
        this.alphaThreshold = 1;
        this.inverted = false;
        this._renderCmd.initStencilBits();
    },

    /**
     * <p>
     *     Event callback that is invoked every time when node enters the 'stage'.                                   <br/>
     *     If the CCNode enters the 'stage' with a transition, this event is called when the transition starts.        <br/>
     *     During onEnter you can't access a "sister/brother" node.                                                    <br/>
     *     If you override onEnter, you must call its parent's onEnter function with this._super().
     * </p>
     * @function
     */
    onEnter: function () {
        _ccsg.Node.prototype.onEnter.call(this);
        if (this._stencil)
            this._stencil.performRecursive(_ccsg.Node.performType.onEnter);
    },

    /**
     * <p>
     *     Event callback that is invoked when the node enters in the 'stage'.                                                        <br/>
     *     If the node enters the 'stage' with a transition, this event is called when the transition finishes.                       <br/>
     *     If you override onEnterTransitionDidFinish, you shall call its parent's onEnterTransitionDidFinish with this._super()
     * </p>
     * @function
     */
    onEnterTransitionDidFinish: function () {
        _ccsg.Node.prototype.onEnterTransitionDidFinish.call(this);
        if (this._stencil)
            this._stencil.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish);
    },

    /**
     * <p>
     *     callback that is called every time the node leaves the 'stage'.  <br/>
     *     If the node leaves the 'stage' with a transition, this callback is called when the transition starts. <br/>
     *     If you override onExitTransitionDidStart, you shall call its parent's onExitTransitionDidStart with this._super()
     * </p>
     * @function
     */
    onExitTransitionDidStart: function () {
        if (this._stencil) {
            this._stencil.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart);
        }
        _ccsg.Node.prototype.onExitTransitionDidStart.call(this);
    },

    /**
     * <p>
     * callback that is called every time the node leaves the 'stage'. <br/>
     * If the node leaves the 'stage' with a transition, this callback is called when the transition finishes. <br/>
     * During onExit you can't access a sibling node.                                                             <br/>
     * If you override onExit, you shall call its parent's onExit with this._super().
     * </p>
     * @function
     */
    onExit: function () {
        if (this._stencil) {
            this._stencil.performRecursive(_ccsg.Node.performType.onExit);
        }
        _ccsg.Node.prototype.onExit.call(this);
    },

    visit: function (parent) {
        this._renderCmd.clippingVisit(parent && parent._renderCmd);
    },

    _visitChildren: function () {
        if (this._reorderChildDirty) {
            this.sortAllChildren();
        }
        var children = this._children, child;
        for (var i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if (child && child._visible) {
                child.visit(this);
            }
        }
        this._renderCmd._dirtyFlag = 0;
    },

    /**
     * <p>
     * The alpha threshold.                                                                                   <br/>
     * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold.     <br/>
     * Should be a float between 0 and 1.                                                                     <br/>
     * This default to 1 (so alpha test is disabled).
     * </P>
     * @return {Number}
     */
    getAlphaThreshold: function () {
        return this._alphaThreshold;
    },

    /**
     * set alpha threshold.
     * @param {Number} alphaThreshold
     */
    setAlphaThreshold: function (alphaThreshold) {
        if (alphaThreshold === 1 && alphaThreshold !== this._alphaThreshold) {
            // should reset program used by _stencil
            this._renderCmd.resetProgramByStencil();
        }
        this._alphaThreshold = alphaThreshold;
    },

    /**
     * <p>
     *     Inverted. If this is set to YES,                                                                 <br/>
     *     the stencil is inverted, so the content is drawn where the stencil is NOT drawn.                 <br/>
     *     This default to NO.
     * </p>
     * @return {Boolean}
     */
    isInverted: function () {
        return this.inverted;
    },

    /**
     * set whether or not invert of stencil
     * @param {Boolean} inverted
     */
    setInverted: function (inverted) {
        this.inverted = inverted;
    },

    /**
     * The ccsg.Node to use as a stencil to do the clipping.                                   <br/>
     * The stencil node will be retained. This default to nil.
     * @return {_ccsg.Node}
     */
    getStencil: function () {
        return this._stencil;
    },

    /**
     * Set stencil.
     * @function
     * @param {_ccsg.Node} stencil
     */
    setStencil: function (stencil) {
        if(this._stencil === stencil)
            return;

        if (stencil)
            this._originStencilProgram = stencil.getShaderProgram();

        this._renderCmd.setStencil(stencil);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.ClippingNode.CanvasRenderCmd(this);
        else
            return new cc.ClippingNode.WebGLRenderCmd(this);
    }
});

cc.ClippingNode.stencilBits = -1;

var _p = cc.ClippingNode.prototype;

// Extended properties
cc.defineGetterSetter(_p, "stencil", _p.getStencil, _p.setStencil);
cc.defineGetterSetter(_p, "alphaThreshold", _p.getAlphaThreshold, _p.setAlphaThreshold);

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

//-------------------------- ClippingNode's canvas render cmd --------------------------------
cc.ClippingNode.CanvasRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = false;

    this._rendererClipCmd = new cc.CustomRenderCmd(this, this._drawStencilCommand);
    this._rendererRestoreCmd = new cc.CustomRenderCmd(this, this._restoreCmdCallback);
};
var proto = cc.ClippingNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.ClippingNode.CanvasRenderCmd;

proto.resetProgramByStencil = function () {};

proto.initStencilBits = function(){};

proto.setStencil = function(stencil){
    if(stencil == null)
        return;

    this._node._stencil = stencil;

    if (!(stencil instanceof cc.DrawNode)) {
        cc.errorID(6300);
    }
};

proto._restoreCmdCallback = function (ctx) {
    var wrapper = ctx || cc._renderContext;
    wrapper.restore();
};

proto._drawStencilCommand = function (ctx, scaleX, scaleY) {
    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
    wrapper.save();
    context.beginPath();                                                         //save for clip
    wrapper.setTransform(this._worldTransform, scaleX, scaleY);

    //draw elements
    var stencilBuffer = this._node._stencil._buffer;
    for(var index = 0; index < stencilBuffer.length; ++index) {
        var vertices = stencilBuffer[index].verts;
        if(vertices.length < 3) continue;
        context.moveTo(vertices[0].x, -vertices[0].y);
        for(var vIndex = 1; vIndex < vertices.length; ++vIndex) {
            context.lineTo(vertices[vIndex].x, -vertices[vIndex].y);
        }
    }
    //end draw elements
    context.clip();
};

proto.clippingVisit = function (parentCmd) {
    var node = this._node;
    parentCmd = parentCmd || this.getParentRenderCmd();
    this._propagateFlagsDown(parentCmd);
    // quick return if not visible
    if (!node._visible)
        return;

    if (parentCmd)
        this._curLevel = parentCmd._curLevel + 1;

    this._syncStatus(parentCmd);
    if (node._stencil) {
        cc.renderer.pushRenderCommand(this._rendererClipCmd);
    }
    var children = node._children;

    var i, len = children.length;
    if (len > 0) {
        node.sortAllChildren();
        for (i = 0; i < len; i++)
            children[i].visit(node);
    }

    if (node._stencil) {
        cc.renderer.pushRenderCommand(this._rendererRestoreCmd);
    }
    this._dirtyFlag = 0;
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

// ------------------------------- ClippingNode's WebGL render cmd ------------------------------
function setProgram (node, program) {
    node.shaderProgram = program;

    var children = node.children;
    if (!children)
        return;

    for (var i = 0; i < children.length; i++)
        setProgram(children[i], program);
}

var _currentState = {
    stencilEnabled: false,
    depthWriteMask: true
};

cc.ClippingNode.WebGLRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = false;

    this._beforeVisitCmd = new cc.CustomRenderCmd(this, this._onBeforeVisit);
    this._afterDrawStencilCmd = new cc.CustomRenderCmd(this, this._onAfterDrawStencil);
    this._afterVisitCmd = new cc.CustomRenderCmd(this, this._onAfterVisit);

    this._previousState = null;
    this._state = {
        stencilEnabled: true,
        stencilWriteMask: 0,
        depthWriteMask: false,
        stencilFunc: 0,
        stencilRef: 0,
        stencilValueMask: 0
    };
};

var proto = cc.ClippingNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = cc.ClippingNode.WebGLRenderCmd;

cc.ClippingNode.WebGLRenderCmd._init_once = null;
cc.ClippingNode.WebGLRenderCmd._visit_once = null;
cc.ClippingNode.WebGLRenderCmd._layer = -1;

proto.initStencilBits = function () {
    // get (only once) the number of bits of the stencil buffer
    cc.ClippingNode.WebGLRenderCmd._init_once = true;
    if (cc.ClippingNode.WebGLRenderCmd._init_once) {
        cc.ClippingNode.stencilBits = cc._renderContext.getParameter(cc._renderContext.STENCIL_BITS);
        if (cc.ClippingNode.stencilBits <= 0)
            cc.logID(6301);
        cc.ClippingNode.WebGLRenderCmd._init_once = false;
    }
};

proto.transform = function (parentCmd, recursive) {
    var node = this._node;
    this.originTransform(parentCmd, recursive);
    if (node._stencil) {
        node._stencil._renderCmd.transform(this, true);
        node._stencil._dirtyFlag &= ~_ccsg.Node._dirtyFlags.transformDirty;
    }
};

proto.clippingVisit = function (parentCmd) {
    var node = this._node;
    parentCmd = parentCmd || this.getParentRenderCmd();
    this.visit(parentCmd);

    // if stencil buffer disabled
    if (cc.ClippingNode.stencilBits < 1) {
        // draw everything, as if there where no stencil
        node._visitChildren();
        return;
    }

    if (!node._stencil || !node._stencil.visible) {
        if (node.inverted)
            node._visitChildren();   // draw everything
        return;
    }

    if (cc.ClippingNode.WebGLRenderCmd._layer + 1 === cc.ClippingNode.stencilBits) {
        cc.ClippingNode.WebGLRenderCmd._visit_once = true;
        if (cc.ClippingNode.WebGLRenderCmd._visit_once) {
            cc.logID(6302, cc.ClippingNode.stencilBits);
            cc.ClippingNode.WebGLRenderCmd._visit_once = false;
        }
        // draw everything, as if there were no stencil
        node._visitChildren();
        return;
    }

    cc.renderer.pushRenderCommand(this._beforeVisitCmd);

    node._stencil.visit(node);

    cc.renderer.pushRenderCommand(this._afterDrawStencilCmd);

    // draw (according to the stencil test func) this node and its children
    var locChildren = node._children;
    if (locChildren && locChildren.length > 0) {
        var childLen = locChildren.length;
        node.sortAllChildren();
        // draw children zOrder < 0
        for (var i = 0; i < childLen; i++) {
            locChildren[i].visit(node);
        }
    }

    cc.renderer.pushRenderCommand(this._afterVisitCmd);

    this._dirtyFlag = 0;
};

proto.setStencil = function(stencil){
    var node = this._node;
    if(node._stencil)
        node._stencil._parent = null;
    node._stencil = stencil;
    if(node._stencil)
        node._stencil._parent = node;
};

proto._drawFullScreenQuadClearStencil = function () {
    // draw a fullscreen solid rectangle to clear the stencil buffer
    var projStack = cc.math.projection_matrix_stack;
    projStack.push();
    projStack.top.identity();

    var modelViewStack = cc.math.modelview_matrix_stack;
    modelViewStack.push();
    modelViewStack.top.identity();

    cc._drawingUtil.drawSolidRect(cc.p(-1, -1), cc.p(1, 1), cc.color(255, 255, 255, 255));

    projStack.pop();

    modelViewStack.pop();
};

// should reset program used by _stencil
proto.resetProgramByStencil = function () {
    var node = this._node;
    if (node._stencil) {
        var program = node._originStencilProgram;
        setProgram(node._stencil, program);
    }
};

proto._onBeforeVisit = function(ctx){
    var gl = ctx || cc._renderContext, node = this._node;
    cc.ClippingNode.WebGLRenderCmd._layer++;

    // mask of the current layer (ie: for layer 3: 00000100)
    var mask_layer = 0x1 << cc.ClippingNode.WebGLRenderCmd._layer;
    // mask of all layers less than the current (ie: for layer 3: 00000011)
    var mask_layer_l = mask_layer - 1;
    // mask of all layers less than or equal to the current (ie: for layer 3: 00000111)
    var mask_layer_le = mask_layer | mask_layer_l;
    // manually save the stencil state
    this._previousState = _currentState;

    // enable stencil use
    gl.enable(gl.STENCIL_TEST);
    gl.stencilMask(mask_layer);

    gl.depthMask(false);

    gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
    gl.stencilOp(!this._node.inverted ? gl.ZERO : gl.REPLACE, gl.KEEP, gl.KEEP);

    this._drawFullScreenQuadClearStencil();

    gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
    gl.stencilOp(!this._node.inverted ? gl.REPLACE : gl.ZERO, gl.KEEP, gl.KEEP);

    if (node.alphaThreshold < 1) {            //TODO desktop
        var program = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLORALPHATEST);
        // set our alphaThreshold
        cc.gl.useProgram(program.getProgram());
        program.setUniformLocationWith1f(cc.macro.UNIFORM_ALPHA_TEST_VALUE_S, node.alphaThreshold);
        program.setUniformLocationWithMatrix4fv(cc.macro.UNIFORM_MVMATRIX_S, cc.renderer.mat4Identity.mat);
        setProgram(node._stencil, program);
    }

    // Save the current stencil states
    this._state.stencilWriteMask = mask_layer;
    this._state.stencilRef = this._state.stencilValueMask = mask_layer_le;
    this._state.stencilFunc = gl.NEVER;

    _currentState = this._state;
};

proto._onAfterDrawStencil = function (ctx) {
    var gl = ctx || cc._renderContext;
    gl.depthMask(this._previousState.depthWriteMask);

    gl.stencilFunc(gl.EQUAL, this._state.stencilRef, this._state.stencilValueMask);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

    this._state.stencilFunc = gl.EQUAL;
};

proto._onAfterVisit = function (ctx) {
    var gl = ctx || cc._renderContext;

    var state = this._previousState;
    if (!state.stencilEnabled) {
        gl.disable(gl.STENCIL_TEST);
    }
    else {
        gl.stencilFunc(state.stencilFunc, state.stencilRef, state.stencilValueMask);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.stencilMask(state.stencilWriteMask);
    }

    // restore _currentState, so self states won't affect other nodes any longer
    _currentState = this._previousState;
    this._previousState = null;

    // we are done using this layer, decrement
    cc.ClippingNode.WebGLRenderCmd._layer--;
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

var PNGReader = require('../cocos2d/particle/CCPNGReader');
var tiffReader = require('../cocos2d/particle/CCTIFFReader');

// ideas taken from:
//   . The ocean spray in your face [Jeff Lander]
//      http://www.double.co.nz/dust/col0798.pdf
//   . Building an Advanced Particle System [John van der Burg]
//      http://www.gamasutra.com/features/20000623/vanderburg_01.htm
//   . LOVE game engine
//      http://love2d.org/
//
//
// Radius mode support, from 71 squared
//      http://particledesigner.71squared.com/
//
// IMPORTANT: Particle Designer is supported by cocos2d, but
// 'Radius Mode' in Particle Designer uses a fixed emit rate of 30 hz. Since that can't be guarateed in cocos2d,
//  cocos2d uses a another approach, but the results are almost identical.
//


// tCCPositionType
// possible types of particle positions


/**
 * Structure that contains the values of each particle
 * @Class
 * @Construct
 * @param {cc.Vec2} [pos=cc.p(0,0)] Position of particle
 * @param {cc.Vec2} [startPos=cc.p(0,0)]
 * @param {cc.Color} [color= cc.color(0, 0, 0, 255)]
 * @param {cc.Color} [deltaColor=cc.color(0, 0, 0, 255)]
 * @param {Size} [size=0]
 * @param {Size} [deltaSize=0]
 * @param {Number} [rotation=0]
 * @param {Number} [deltaRotation=0]
 * @param {Number} [timeToLive=0]
 * @param {Number} [atlasIndex=0]
 * @param {cc.Particle.ModeA} [modeA=]
 * @param {cc.Particle.ModeA} [modeB=]
 */
cc.Particle = function (pos, startPos, color, deltaColor, size, deltaSize, rotation, deltaRotation, timeToLive, atlasIndex, modeA, modeB) {
    this.pos = pos || cc.v2(0, 0);
    this.startPos = startPos || cc.v2(0, 0);
    this.color = color || cc.color(0, 0, 0, 255);
    this.deltaColor = deltaColor || {r:0, g: 0, b:0, a:255};
    this.size = size || 0;
    this.deltaSize = deltaSize || 0;
    this.rotation = rotation || 0;
    this.deltaRotation = deltaRotation || 0;
    this.timeToLive = timeToLive || 0;
    this.atlasIndex = atlasIndex || 0;
    this.modeA = modeA ? modeA : new cc.Particle.ModeA();
    this.modeB = modeB ? modeB : new cc.Particle.ModeB();
    this.isChangeColor = false;
    this.drawPos = cc.p(0, 0);
};

/**
 * Mode A: gravity, direction, radial accel, tangential accel
 * @Class
 * @Construct
 * @param {cc.Vec2} dir direction of particle
 * @param {Number} radialAccel
 * @param {Number} tangentialAccel
 */
cc.Particle.ModeA = function (dir, radialAccel, tangentialAccel) {
    this.dir = dir ? dir : cc.p(0,0);
    this.radialAccel = radialAccel || 0;
    this.tangentialAccel = tangentialAccel || 0;
};

/**
 * Mode B: radius mode
 * @Class
 * @Construct
 * @param {Number} angle
 * @param {Number} degreesPerSecond
 * @param {Number} radius
 * @param {Number} deltaRadius
 */
cc.Particle.ModeB = function (angle, degreesPerSecond, radius, deltaRadius) {
    this.angle = angle || 0;
    this.degreesPerSecond = degreesPerSecond || 0;
    this.radius = radius || 0;
    this.deltaRadius = deltaRadius || 0;
};

/**
 * Array of Point instances used to optimize particle updates
 */
cc.Particle.TemporaryPoints = [
    cc.p(),
    cc.p(),
    cc.p(),
    cc.p()
];

/**
 * <p>
 *     Particle System base class. <br/>
 *     Attributes of a Particle System:<br/>
 *     - emission rate of the particles<br/>
 *     - Gravity Mode (Mode A): <br/>
 *     - gravity <br/>
 *     - direction <br/>
 *     - speed +-  variance <br/>
 *     - tangential acceleration +- variance<br/>
 *     - radial acceleration +- variance<br/>
 *     - Radius Mode (Mode B):      <br/>
 *     - startRadius +- variance    <br/>
 *     - endRadius +- variance      <br/>
 *     - rotate +- variance         <br/>
 *     - Properties common to all modes: <br/>
 *     - life +- life variance      <br/>
 *     - start spin +- variance     <br/>
 *     - end spin +- variance       <br/>
 *     - start size +- variance     <br/>
 *     - end size +- variance       <br/>
 *     - start color +- variance    <br/>
 *     - end color +- variance      <br/>
 *     - life +- variance           <br/>
 *     - blending function          <br/>
 *     - texture                    <br/>
 *                                  <br/>
 *     cocos2d also supports particles generated by Particle Designer (http://particledesigner.71squared.com/).<br/>
 *     'Radius Mode' in Particle Designer uses a fixed emit rate of 30 hz. Since that can't be guarateed in cocos2d,  <br/>
 *     cocos2d uses a another approach, but the results are almost identical.<br/>
 *     cocos2d supports all the variables used by Particle Designer plus a bit more:  <br/>
 *     - spinning particles (supported when using ParticleSystem)       <br/>
 *     - tangential acceleration (Gravity mode)                               <br/>
 *     - radial acceleration (Gravity mode)                                   <br/>
 *     - radius direction (Radius mode) (Particle Designer supports outwards to inwards direction only) <br/>
 *     It is possible to customize any of the above mentioned properties in runtime. Example:   <br/>
 * </p>
 * @class _ccsg.ParticleSystem
 * @extends _ccsg.Node
 *
 * @property {Boolean}              opacityModifyRGB    - Indicate whether the alpha value modify color.
 * @property {cc.SpriteBatchNode}   batchNode           - Weak reference to the sprite batch node.
 * @property {Boolean}              active              - <@readonly> Indicate whether the particle system is activated.
 * @property {Number}               shapeType           - ShapeType of ParticleSystem : ccsg.ParticleSystem.BALL_SHAPE | ccsg.ParticleSystem.STAR_SHAPE.
 * @property {Number}               atlasIndex          - Index of system in batch node array.
 * @property {Number}               particleCount       - Current quantity of particles that are being simulated.
 * @property {Number}               duration            - How many seconds the emitter wil run. -1 means 'forever'
 * @property {cc.Vec2}             sourcePos           - Source position of the emitter.
 * @property {cc.Vec2}             posVar              - Variation of source position.
 * @property {Number}               life                - Life of each particle setter.
 * @property {Number}               lifeVar             - Variation of life.
 * @property {Number}               angle               - Angle of each particle setter.
 * @property {Number}               angleVar            - Variation of angle of each particle setter.
 * @property {Number}               startSize           - Start size in pixels of each particle.
 * @property {Number}               startSizeVar        - Variation of start size in pixels.
 * @property {Number}               endSize             - End size in pixels of each particle.
 * @property {Number}               endSizeVar          - Variation of end size in pixels.
 * @property {Number}               startSpin           - Start angle of each particle.
 * @property {Number}               startSpinVar        - Variation of start angle.
 * @property {Number}               endSpin             - End angle of each particle.
 * @property {Number}               endSpinVar          - Variation of end angle.
 * @property {cc.Vec2}             gravity             - Gravity of the emitter.
 * @property {cc.Vec2}             speed               - Speed of the emitter.
 * @property {cc.Vec2}             speedVar            - Variation of the speed.
 * @property {Number}               tangentialAccel     - Tangential acceleration of each particle. Only available in 'Gravity' mode.
 * @property {Number}               tangentialAccelVar  - Variation of the tangential acceleration.
 * @property {Number}               tangentialAccel     - Radial acceleration of each particle. Only available in 'Gravity' mode.
 * @property {Number}               tangentialAccelVar  - Variation of the radial acceleration.
 * @property {Boolean}              rotationIsDir       - Indicate whether the rotation of each particle equals to its direction. Only available in 'Gravity' mode.
 * @property {Number}               startRadius         - Starting radius of the particles. Only available in 'Radius' mode.
 * @property {Number}               startRadiusVar      - Variation of the starting radius.
 * @property {Number}               endRadius           - Ending radius of the particles. Only available in 'Radius' mode.
 * @property {Number}               endRadiusVar        - Variation of the ending radius.
 * @property {Number}               rotatePerS          - Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
 * @property {Number}               rotatePerSVar       - Variation of the degress to rotate a particle around the source pos per second.
 * @property {cc.Color}             startColor          - Start color of each particle.
 * @property {cc.Color}             startColorVar       - Variation of the start color.
 * @property {cc.Color}             endColor            - Ending color of each particle.
 * @property {cc.Color}             endColorVar         - Variation of the end color.
 * @property {Number}               emissionRate        - Emission rate of the particles.
 * @property {ccsg.ParticleSystem.Mode} emitterMode       - Emitter modes: ccsg.ParticleSystem.Mode.GRAVITY: uses gravity, speed, radial and tangential acceleration; ccsg.ParticleSystem.Mode.RADIUS: uses radius movement + rotation.
 * @property {ccsg.ParticleSystem.Type} positionType      - Particles movement type: ccsg.ParticleSystem.Type.FREE | ccsg.ParticleSystem.Type.GROUPED.
 * @property {Number}               totalParticles      - Maximum particles of the system.
 * @property {Boolean}              autoRemoveOnFinish  - Indicate whether the node will be auto-removed when it has no particles left.
 * @property {Texture2D}         texture             - Texture of Particle System.
 *
 * @example
 *  emitter.radialAccel = 15;
 *  emitter.startSpin = 0;
 */
_ccsg.ParticleSystem = _ccsg.Node.extend({
    _className: "ParticleSystem",
    //***********variables*************
    _plistFile: "",
    //! time elapsed since the start of the system (in seconds)
    _elapsed: 0,
    _dontTint: false,

    // Different modes
    //! Mode A:Gravity + Tangential Accel + Radial Accel
    modeA: null,
    //! Mode B: circular movement (gravity, radial accel and tangential accel don't are not used in this mode)
    modeB: null,

    //private POINTZERO for ParticleSystem
    _pointZeroForParticle: cc.p(0, 0),

    //! Array of particles
    _particles: null,

    // color modulate
    //  BOOL colorModulate;

    //! How many particles can be emitted per second
    _emitCounter: 0,
    //!  particle idx
    _particleIdx: 0,

    _batchNode: null,
    atlasIndex: 0,

    //true if scaled or rotated
    _transformSystemDirty: false,
    _allocatedParticles: 0,

    _isActive: false,
    particleCount: 0,
    duration: 0,
    _sourcePosition: null,
    _posVar: null,
    life: 0,
    lifeVar: 0,
    angle: 0,
    angleVar: 0,
    startSize: 0,
    startSizeVar: 0,
    endSize: 0,
    endSizeVar: 0,
    _startColor: null,
    _startColorVar: null,
    _endColor: null,
    _endColorVar: null,
    startSpin: 0,
    startSpinVar: 0,
    endSpin: 0,
    endSpinVar: 0,
    emissionRate: 0,
    _totalParticles: 0,
    _texture: null,
    _blendFunc: null,
    _opacityModifyRGB: false,
    positionType: null,
    autoRemoveOnFinish: false,
    emitterMode: 0,

    _textureLoaded: null,

    /**
     * <p> return the string found by key in dict. <br/>
     *    This plist files can be create manually or with Particle Designer:<br/>
     *    http://particledesigner.71squared.com/<br/>
     * </p>
     * Constructor of ccsg.ParticleSystem
     * @param {String|Number} plistFile
     */
    ctor:function (plistFile) {
        _ccsg.Node.prototype.ctor.call(this);
        this.emitterMode = _ccsg.ParticleSystem.Mode.GRAVITY;
        this.modeA = new _ccsg.ParticleSystem.ModeA();
        this.modeB = new _ccsg.ParticleSystem.ModeB();
        this._blendFunc = {src:cc.macro.BLEND_SRC, dst:cc.macro.BLEND_DST};

        this._particles = [];
        this._sourcePosition = cc.p(0, 0);
        this._posVar = cc.p(0, 0);

        this._startColor = cc.color(255, 255, 255, 255);
        this._startColorVar = cc.color(255, 255, 255, 255);
        this._endColor = cc.color(255, 255, 255, 255);
        this._endColorVar = cc.color(255, 255, 255, 255);

        this._plistFile = "";
        this._elapsed = 0;
        this._dontTint = false;
        this._pointZeroForParticle = cc.p(0, 0);
        this._emitCounter = 0;
        this._particleIdx = 0;
        this._batchNode = null;
        this.atlasIndex = 0;

        this._transformSystemDirty = false;
        this._allocatedParticles = 0;
        this._isActive = false;
        this.particleCount = 0;
        this.duration = 0;
        this.life = 0;
        this.lifeVar = 0;
        this.angle = 0;
        this.angleVar = 0;
        this.startSize = 0;
        this.startSizeVar = 0;
        this.endSize = 0;
        this.endSizeVar = 0;

        this.startSpin = 0;
        this.startSpinVar = 0;
        this.endSpin = 0;
        this.endSpinVar = 0;
        this.emissionRate = 0;
        this._totalParticles = 0;
        this._texture = null;
        this._opacityModifyRGB = false;
        this.positionType = _ccsg.ParticleSystem.Type.FREE;
        this.autoRemoveOnFinish = false;

        this._textureLoaded = true;

        if (!plistFile || cc.js.isNumber(plistFile)) {
            var ton = plistFile || 100;
            this.setDrawMode(_ccsg.ParticleSystem.TEXTURE_MODE);
            this.initWithTotalParticles(ton);
        } else if (typeof plistFile === 'string') {
            this.initWithFile(plistFile);
        } else if (typeof plistFile === 'object') {
            this.initWithDictionary(plistFile, "");
        }
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.ParticleSystem.CanvasRenderCmd(this);
        else
            return new _ccsg.ParticleSystem.WebGLRenderCmd(this);
    },

    /**
     * This is a hack function for performance, it's only available on Canvas mode. <br/>
     * It's very expensive to change color on Canvas mode, so if set it to true, particle system will ignore the changing color operation.
     * @param {boolean} ignore
     */
    ignoreColor: function(ignore){
       this._dontTint = ignore;
    },

    /**
     * <p> initializes the texture with a rectangle measured Points<br/>
     * pointRect should be in Texture coordinates, not pixel coordinates
     * </p>
     * @param {Rect} pointRect
     */
    initTexCoordsWithRect:function (pointRect) {
        this._renderCmd.initTexCoordsWithRect(pointRect);
    },

    /**
     * return weak reference to the cc.SpriteBatchNode that renders the _ccsg.Sprite
     * @return {cc.ParticleBatchNode}
     */
    getBatchNode:function () {
        return this._batchNode;
    },

    /**
     *  set weak reference to the cc.SpriteBatchNode that renders the _ccsg.Sprite
     * @param {cc.ParticleBatchNode} batchNode
     */
    setBatchNode:function (batchNode) {
        this._renderCmd.setBatchNode(batchNode);
    },

    /**
     * return index of system in batch node array
     * @return {Number}
     */
    getAtlasIndex:function () {
        return this.atlasIndex;
    },

    /**
     * set index of system in batch node array
     * @param {Number} atlasIndex
     */
    setAtlasIndex:function (atlasIndex) {
        this.atlasIndex = atlasIndex;
    },

    /**
     * Return DrawMode of ParticleSystem   (Canvas Mode only)
     * @return {Number}
     */
    getDrawMode:function () {
        return this._renderCmd.getDrawMode();
    },

    /**
     * DrawMode of ParticleSystem setter   (Canvas Mode only)
     * @param {Number} drawMode
     */
    setDrawMode:function (drawMode) {
        this._renderCmd.setDrawMode(drawMode);
    },

    /**
     * Return ShapeType of ParticleSystem  (Canvas Mode only)
     * @return {Number}
     */
    getShapeType:function () {
        return this._renderCmd.getShapeType();
    },

    /**
     * ShapeType of ParticleSystem setter  (Canvas Mode only)
     * @param {Number} shapeType
     */
    setShapeType:function (shapeType) {
        this._renderCmd.setShapeType(shapeType);
    },

    /**
     * Return ParticleSystem is active
     * @return {Boolean}
     */
    isActive:function () {
        return this._isActive;
    },

    /**
     * Quantity of particles that are being simulated at the moment
     * @return {Number}
     */
    getParticleCount:function () {
        return this.particleCount;
    },

    /**
     * Quantity of particles setter
     * @param {Number} particleCount
     */
    setParticleCount:function (particleCount) {
        this.particleCount = particleCount;
    },

    /**
     * How many seconds the emitter wil run. -1 means 'forever'
     * @return {Number}
     */
    getDuration:function () {
        return this.duration;
    },

    /**
     * set run seconds of the emitter
     * @param {Number} duration
     */
    setDuration:function (duration) {
        this.duration = duration;
    },

    /**
     * Return sourcePosition of the emitter
     * @return {cc.Vec2 | Object}
     */
    getSourcePosition:function () {
        return {x: this._sourcePosition.x, y: this._sourcePosition.y};
    },

    /**
     * sourcePosition of the emitter setter
     * @param sourcePosition
     */
    setSourcePosition: function (sourcePosition) {
        this._sourcePosition.x = sourcePosition.x;
        this._sourcePosition.y = sourcePosition.y;
    },

    /**
     * Return Position variance of the emitter
     * @return {cc.Vec2 | Object}
     */
    getPosVar:function () {
        return {x: this._posVar.x, y: this._posVar.y};
    },

    /**
     * Position variance of the emitter setter
     * @param {cc.Vec2} posVar
     */
    setPosVar: function (posVar) {
        this._posVar.x = posVar.x;
        this._posVar.y = posVar.y;
    },

    /**
     * Return life of each particle
     * @return {Number}
     */
    getLife:function () {
        return this.life;
    },

    /**
     * life of each particle setter
     * @param {Number} life
     */
    setLife:function (life) {
        this.life = life;
    },

    /**
     * Return life variance of each particle
     * @return {Number}
     */
    getLifeVar:function () {
        return this.lifeVar;
    },

    /**
     * life variance of each particle setter
     * @param {Number} lifeVar
     */
    setLifeVar:function (lifeVar) {
        this.lifeVar = lifeVar;
    },

    /**
     * Return angle of each particle
     * @return {Number}
     */
    getAngle:function () {
        return this.angle;
    },

    /**
     * angle of each particle setter
     * @param {Number} angle
     */
    setAngle:function (angle) {
        this.angle = angle;
    },

    /**
     * Return angle variance of each particle
     * @return {Number}
     */
    getAngleVar:function () {
        return this.angleVar;
    },

    /**
     * angle variance of each particle setter
     * @param angleVar
     */
    setAngleVar:function (angleVar) {
        this.angleVar = angleVar;
    },

    // mode A
    /**
     * Return Gravity of emitter
     * @return {cc.Vec2}
     */
    getGravity:function () {
        var locGravity = this.modeA.gravity;
        return cc.p(locGravity.x, locGravity.y);
    },

    /**
     * Gravity of emitter setter
     * @param {cc.Vec2} gravity
     */
    setGravity:function (gravity) {
        this.modeA.gravity = gravity;
    },

    /**
     * Return Speed of each particle
     * @return {Number}
     */
    getSpeed:function () {
        return this.modeA.speed;
    },

    /**
     * Speed of each particle setter
     * @param {Number} speed
     */
    setSpeed:function (speed) {
        this.modeA.speed = speed;
    },

    /**
     * return speed variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getSpeedVar:function () {
        return this.modeA.speedVar;
    },

    /**
     * speed variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} speedVar
     */
    setSpeedVar:function (speedVar) {
        this.modeA.speedVar = speedVar;
    },

    /**
     * Return tangential acceleration of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getTangentialAccel:function () {
        return this.modeA.tangentialAccel;
    },

    /**
     * Tangential acceleration of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} tangentialAccel
     */
    setTangentialAccel:function (tangentialAccel) {
        this.modeA.tangentialAccel = tangentialAccel;
    },

    /**
     * Return tangential acceleration variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getTangentialAccelVar:function () {
        return this.modeA.tangentialAccelVar;
    },

    /**
     * tangential acceleration variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} tangentialAccelVar
     */
    setTangentialAccelVar:function (tangentialAccelVar) {
        this.modeA.tangentialAccelVar = tangentialAccelVar;
    },

    /**
     * Return radial acceleration of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getRadialAccel:function () {
        return this.modeA.radialAccel;
    },

    /**
     * radial acceleration of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} radialAccel
     */
    setRadialAccel:function (radialAccel) {
        this.modeA.radialAccel = radialAccel;
    },

    /**
     * Return radial acceleration variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getRadialAccelVar:function () {
        return this.modeA.radialAccelVar;
    },

    /**
     * radial acceleration variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} radialAccelVar
     */
    setRadialAccelVar:function (radialAccelVar) {
        this.modeA.radialAccelVar = radialAccelVar;
    },

    /**
     * get the rotation of each particle to its direction Only available in 'Gravity' mode.
     * @returns {boolean}
     */
    getRotationIsDir: function(){
        return this.modeA.rotationIsDir;
    },

    /**
     * set the rotation of each particle to its direction Only available in 'Gravity' mode.
     * @param {boolean} t
     */
    setRotationIsDir: function(t){
        this.modeA.rotationIsDir = t;
    },

    // mode B
    /**
     * Return starting radius of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getStartRadius:function () {
        return this.modeB.startRadius;
    },

    /**
     * starting radius of the particles setter. Only available in 'Radius' mode.
     * @param {Number} startRadius
     */
    setStartRadius:function (startRadius) {
        this.modeB.startRadius = startRadius;
    },

    /**
     * Return starting radius variance of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getStartRadiusVar:function () {
        return this.modeB.startRadiusVar;
    },

    /**
     * starting radius variance of the particles setter. Only available in 'Radius' mode.
     * @param {Number} startRadiusVar
     */
    setStartRadiusVar:function (startRadiusVar) {
        this.modeB.startRadiusVar = startRadiusVar;
    },

    /**
     * Return ending radius of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getEndRadius:function () {
        return this.modeB.endRadius;
    },

    /**
     * ending radius of the particles setter. Only available in 'Radius' mode.
     * @param {Number} endRadius
     */
    setEndRadius:function (endRadius) {
        this.modeB.endRadius = endRadius;
    },

    /**
     * Return ending radius variance of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getEndRadiusVar:function () {
        return this.modeB.endRadiusVar;
    },

    /**
     * ending radius variance of the particles setter. Only available in 'Radius' mode.
     * @param endRadiusVar
     */
    setEndRadiusVar:function (endRadiusVar) {
        this.modeB.endRadiusVar = endRadiusVar;
    },

    /**
     * get Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
     * @return {Number}
     */
    getRotatePerSecond:function () {
        return this.modeB.rotatePerSecond;
    },

    /**
     * set Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
     * @param {Number} degrees
     */
    setRotatePerSecond:function (degrees) {
        this.modeB.rotatePerSecond = degrees;
    },

    /**
     * Return Variance in degrees for rotatePerSecond. Only available in 'Radius' mode.
     * @return {Number}
     */
    getRotatePerSecondVar:function () {
        return this.modeB.rotatePerSecondVar;
    },

    /**
     * Variance in degrees for rotatePerSecond setter. Only available in 'Radius' mode.
     * @param degrees
     */
    setRotatePerSecondVar:function (degrees) {
        this.modeB.rotatePerSecondVar = degrees;
    },
    //////////////////////////////////////////////////////////////////////////

    //don't use a transform matrix, this is faster
    setScale:function (scale, scaleY) {
        this._transformSystemDirty = true;
        _ccsg.Node.prototype.setScale.call(this, scale, scaleY);
    },

    setRotation:function (newRotation) {
        this._transformSystemDirty = true;
        _ccsg.Node.prototype.setRotation.call(this, newRotation);
    },

    setScaleX:function (newScaleX) {
        this._transformSystemDirty = true;
        _ccsg.Node.prototype.setScaleX.call(this, newScaleX);
    },

    setScaleY:function (newScaleY) {
        this._transformSystemDirty = true;
        _ccsg.Node.prototype.setScaleY.call(this, newScaleY);
    },

    /**
     * get start size in pixels of each particle
     * @return {Number}
     */
    getStartSize:function () {
        return this.startSize;
    },

    /**
     * set start size in pixels of each particle
     * @param {Number} startSize
     */
    setStartSize:function (startSize) {
        this.startSize = startSize;
    },

    /**
     * get size variance in pixels of each particle
     * @return {Number}
     */
    getStartSizeVar:function () {
        return this.startSizeVar;
    },

    /**
     * set size variance in pixels of each particle
     * @param {Number} startSizeVar
     */
    setStartSizeVar:function (startSizeVar) {
        this.startSizeVar = startSizeVar;
    },

    /**
     * get end size in pixels of each particle
     * @return {Number}
     */
    getEndSize:function () {
        return this.endSize;
    },

    /**
     * set end size in pixels of each particle
     * @param endSize
     */
    setEndSize:function (endSize) {
        this.endSize = endSize;
    },

    /**
     * get end size variance in pixels of each particle
     * @return {Number}
     */
    getEndSizeVar:function () {
        return this.endSizeVar;
    },

    /**
     * set end size variance in pixels of each particle
     * @param {Number} endSizeVar
     */
    setEndSizeVar:function (endSizeVar) {
        this.endSizeVar = endSizeVar;
    },

    /**
     * set start color of each particle
     * @return {cc.Color}
     */
    getStartColor:function () {
        return cc.color(this._startColor.r, this._startColor.g, this._startColor.b, this._startColor.a);
    },

    /**
     * get start color of each particle
     * @param {cc.Color} startColor
     */
    setStartColor: function (startColor) {
        this._startColor.fromColor(startColor);
    },

    /**
     * get start color variance of each particle
     * @return {cc.Color}
     */
    getStartColorVar:function () {
        return cc.color(this._startColorVar.r, this._startColorVar.g, this._startColorVar.b, this._startColorVar.a);
    },

    /**
     * set start color variance of each particle
     * @param {cc.Color} startColorVar
     */
    setStartColorVar:function (startColorVar) {
        this._startColorVar.fromColor(startColorVar);
    },

    /**
     * get end color and end color variation of each particle
     * @return {cc.Color}
     */
    getEndColor:function () {
        return cc.color(this._endColor.r, this._endColor.g, this._endColor.b, this._endColor.a);
    },

    /**
     * set end color and end color variation of each particle
     * @param {cc.Color} endColor
     */
    setEndColor:function (endColor) {
        this._endColor.fromColor(endColor);
    },

    /**
     * get end color variance of each particle
     * @return {cc.Color}
     */
    getEndColorVar:function () {
        return cc.color(this._endColorVar.r, this._endColorVar.g, this._endColorVar.b, this._endColorVar.a);
    },

    /**
     * set end color variance of each particle
     * @param {cc.Color} endColorVar
     */
    setEndColorVar:function (endColorVar) {
        this._endColorVar.fromColor(endColorVar);
    },

    /**
     * get initial angle of each particle
     * @return {Number}
     */
    getStartSpin:function () {
        return this.startSpin;
    },

    /**
     * set initial angle of each particle
     * @param {Number} startSpin
     */
    setStartSpin:function (startSpin) {
        this.startSpin = startSpin;
    },

    /**
     * get initial angle variance of each particle
     * @return {Number}
     */
    getStartSpinVar:function () {
        return this.startSpinVar;
    },

    /**
     * set initial angle variance of each particle
     * @param {Number} startSpinVar
     */
    setStartSpinVar:function (startSpinVar) {
        this.startSpinVar = startSpinVar;
    },

    /**
     * get end angle of each particle
     * @return {Number}
     */
    getEndSpin:function () {
        return this.endSpin;
    },

    /**
     * set end angle of each particle
     * @param {Number} endSpin
     */
    setEndSpin:function (endSpin) {
        this.endSpin = endSpin;
    },

    /**
     * get end angle variance of each particle
     * @return {Number}
     */
    getEndSpinVar:function () {
        return this.endSpinVar;
    },

    /**
     * set end angle variance of each particle
     * @param {Number} endSpinVar
     */
    setEndSpinVar:function (endSpinVar) {
        this.endSpinVar = endSpinVar;
    },

    /**
     * get emission rate of the particles
     * @return {Number}
     */
    getEmissionRate:function () {
        return this.emissionRate;
    },

    /**
     * set emission rate of the particles
     * @param {Number} emissionRate
     */
    setEmissionRate:function (emissionRate) {
        this.emissionRate = emissionRate;
    },

    /**
     * get maximum particles of the system
     * @return {Number}
     */
    getTotalParticles:function () {
        return this._totalParticles;
    },

    /**
     * set maximum particles of the system
     * @param {Number} tp totalParticles
     */
    setTotalParticles:function (tp) {
        this._renderCmd.setTotalParticles(tp);
    },

    /**
     * get Texture of Particle System
     * @return {Texture2D}
     */
    getTexture:function () {
        return this._texture;
    },

    /**
     * set Texture of Particle System
     * @param {cc.Texture2D } texture
     */
    setTexture:function (texture) {
        if(!texture)
            return;

        if(texture.isLoaded()){
            this.setTextureWithRect(texture, cc.rect(0, 0, texture.width, texture.height));
        } else {
            this._textureLoaded = false;
            texture.once("load", function (event) {
                this._textureLoaded = true;
                this.setTextureWithRect(texture, cc.rect(0, 0, texture.width, texture.height));
            }, this);
        }
    },

    /** conforms to CocosNodeTexture protocol */
    /**
     * get BlendFunc of Particle System
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return this._blendFunc;
    },

    /**
     * set BlendFunc of Particle System
     * @param {Number} src
     * @param {Number} dst
     */
    setBlendFunc:function (src, dst) {
        if (dst === undefined) {
            if (this._blendFunc !== src) {
                this._blendFunc = src;
                this._updateBlendFunc();
            }
        } else {
            if (this._blendFunc.src !== src || this._blendFunc.dst !== dst) {
                this._blendFunc = {src:src, dst:dst};
                this._updateBlendFunc();
            }
        }
    },

    /**
     * does the alpha value modify color getter
     * @return {Boolean}
     */
    isOpacityModifyRGB:function () {
        return this._opacityModifyRGB;
    },

    /**
     * does the alpha value modify color setter
     * @param newValue
     */
    setOpacityModifyRGB:function (newValue) {
        this._opacityModifyRGB = newValue;
    },

    /**
     * <p>whether or not the particles are using blend additive.<br/>
     *     If enabled, the following blending function will be used.<br/>
     * </p>
     * @return {Boolean}
     * @example
     *    source blend function = GL_SRC_ALPHA;
     *    dest blend function = GL_ONE;
     */
    isBlendAdditive:function () {
        return (( this._blendFunc.src === cc.macro.SRC_ALPHA && this._blendFunc.dst === cc.macro.ONE) ||
                (this._blendFunc.src === cc.macro.ONE && this._blendFunc.dst === cc.macro.ONE));
    },

    /**
     * <p>whether or not the particles are using blend additive.<br/>
     *     If enabled, the following blending function will be used.<br/>
     * </p>
     * @param {Boolean} isBlendAdditive
     */
    setBlendAdditive:function (isBlendAdditive) {
        var locBlendFunc = this._blendFunc;
        if (isBlendAdditive) {
            locBlendFunc.src = cc.macro.SRC_ALPHA;
            locBlendFunc.dst = cc.macro.ONE;
        } else {
            this._renderCmd._setBlendAdditive();
        }
    },

    /**
     * get particles movement type: Free or Grouped
     * @return {Number}
     */
    getPositionType:function () {
        return this.positionType;
    },

    /**
     * set particles movement type: Free or Grouped
     * @param {Number} positionType
     */
    setPositionType:function (positionType) {
        this.positionType = positionType;
    },

    /**
     *  <p> return whether or not the node will be auto-removed when it has no particles left.<br/>
     *      By default it is false.<br/>
     *  </p>
     * @return {Boolean}
     */
    isAutoRemoveOnFinish:function () {
        return this.autoRemoveOnFinish;
    },

    /**
     *  <p> set whether or not the node will be auto-removed when it has no particles left.<br/>
     *      By default it is false.<br/>
     *  </p>
     * @param {Boolean} isAutoRemoveOnFinish
     */
    setAutoRemoveOnFinish:function (isAutoRemoveOnFinish) {
        this.autoRemoveOnFinish = isAutoRemoveOnFinish;
    },

    /**
     * return kind of emitter modes
     * @return {Number}
     */
    getEmitterMode:function () {
        return this.emitterMode;
    },

    /**
     * <p>Switch between different kind of emitter modes:<br/>
     *  - CCParticleSystem.Mode.GRAVITY: uses gravity, speed, radial and tangential acceleration<br/>
     *  - CCParticleSystem.Mode.RADIUS: uses radius movement + rotation <br/>
     *  </p>
     * @param {Number} emitterMode
     */
    setEmitterMode:function (emitterMode) {
        this.emitterMode = emitterMode;
    },

    /**
     * initializes a ccsg.ParticleSystem
     */
    init:function () {
        return this.initWithTotalParticles(150);
    },

    /**
     * <p>
     *     initializes a CCParticleSystem from a plist file. <br/>
     *      This plist files can be creted manually or with Particle Designer:<br/>
     *      http://particledesigner.71squared.com/
     * </p>
     * @param {String} plistFile
     * @return {boolean}
     */
    initWithFile:function (plistFile) {
        this._plistFile = plistFile;
        var dict = cc.loader.getRes(plistFile);
        if(!dict){
            cc.logID(6008);
            return false;
        }

        // XXX compute path from a path, should define a function somewhere to do it
        return this.initWithDictionary(dict, "");
    },

    /**
     * return bounding box of particle system in world space
     * @return {Rect}
     */
    getBoundingBoxToWorld:function () {
        return cc.rect(0, 0, cc._canvas.width, cc._canvas.height);
    },

    /**
     * initializes a particle system from a NSDictionary and the path from where to load the png
     * @param {object} dictionary
     * @param {String} dirname
     * @return {Boolean}
     */
    initWithDictionary:function (dictionary, dirname) {
        var ret = false;
        var buffer = null;
        var image = null;
        var locValueForKey = this._valueForKey;

        var maxParticles = parseInt(locValueForKey("maxParticles", dictionary));
        // self, not super
        if (this.initWithTotalParticles(maxParticles)) {
            // angle
            this.angle = parseFloat(locValueForKey("angle", dictionary));
            this.angleVar = parseFloat(locValueForKey("angleVariance", dictionary));

            // duration
            this.duration = parseFloat(locValueForKey("duration", dictionary));

            // blend function
            this._blendFunc.src = parseInt(locValueForKey("blendFuncSource", dictionary));
            this._blendFunc.dst = parseInt(locValueForKey("blendFuncDestination", dictionary));

            // color
            var locStartColor = this._startColor;
            locStartColor.r = parseFloat(locValueForKey("startColorRed", dictionary)) * 255;
            locStartColor.g = parseFloat(locValueForKey("startColorGreen", dictionary)) * 255;
            locStartColor.b = parseFloat(locValueForKey("startColorBlue", dictionary)) * 255;
            locStartColor.a = parseFloat(locValueForKey("startColorAlpha", dictionary)) * 255;

            var locStartColorVar = this._startColorVar;
            locStartColorVar.r = parseFloat(locValueForKey("startColorVarianceRed", dictionary)) * 255;
            locStartColorVar.g = parseFloat(locValueForKey("startColorVarianceGreen", dictionary)) * 255;
            locStartColorVar.b = parseFloat(locValueForKey("startColorVarianceBlue", dictionary)) * 255;
            locStartColorVar.a = parseFloat(locValueForKey("startColorVarianceAlpha", dictionary)) * 255;

            var locEndColor = this._endColor;
            locEndColor.r = parseFloat(locValueForKey("finishColorRed", dictionary)) * 255;
            locEndColor.g = parseFloat(locValueForKey("finishColorGreen", dictionary)) * 255;
            locEndColor.b = parseFloat(locValueForKey("finishColorBlue", dictionary)) * 255;
            locEndColor.a = parseFloat(locValueForKey("finishColorAlpha", dictionary)) * 255;

            var locEndColorVar = this._endColorVar;
            locEndColorVar.r = parseFloat(locValueForKey("finishColorVarianceRed", dictionary)) * 255;
            locEndColorVar.g = parseFloat(locValueForKey("finishColorVarianceGreen", dictionary)) * 255;
            locEndColorVar.b = parseFloat(locValueForKey("finishColorVarianceBlue", dictionary)) * 255;
            locEndColorVar.a = parseFloat(locValueForKey("finishColorVarianceAlpha", dictionary)) * 255;

            // particle size
            this.startSize = parseFloat(locValueForKey("startParticleSize", dictionary));
            this.startSizeVar = parseFloat(locValueForKey("startParticleSizeVariance", dictionary));
            this.endSize = parseFloat(locValueForKey("finishParticleSize", dictionary));
            this.endSizeVar = parseFloat(locValueForKey("finishParticleSizeVariance", dictionary));

            // position
            this.setPosition(parseFloat(locValueForKey("sourcePositionx", dictionary)),
                              parseFloat(locValueForKey("sourcePositiony", dictionary)));
            this._posVar.x = parseFloat(locValueForKey("sourcePositionVariancex", dictionary));
            this._posVar.y = parseFloat(locValueForKey("sourcePositionVariancey", dictionary));

            // Spinning
            this.startSpin = parseFloat(locValueForKey("rotationStart", dictionary));
            this.startSpinVar = parseFloat(locValueForKey("rotationStartVariance", dictionary));
            this.endSpin = parseFloat(locValueForKey("rotationEnd", dictionary));
            this.endSpinVar = parseFloat(locValueForKey("rotationEndVariance", dictionary));

            this.emitterMode = parseInt(locValueForKey("emitterType", dictionary));

            // Mode A: Gravity + tangential accel + radial accel
            if (this.emitterMode === _ccsg.ParticleSystem.Mode.GRAVITY) {
                var locModeA = this.modeA;
                // gravity
                locModeA.gravity.x = parseFloat(locValueForKey("gravityx", dictionary));
                locModeA.gravity.y = parseFloat(locValueForKey("gravityy", dictionary));

                // speed
                locModeA.speed = parseFloat(locValueForKey("speed", dictionary));
                locModeA.speedVar = parseFloat(locValueForKey("speedVariance", dictionary));

                // radial acceleration
                var pszTmp = locValueForKey("radialAcceleration", dictionary);
                locModeA.radialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = locValueForKey("radialAccelVariance", dictionary);
                locModeA.radialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;

                // tangential acceleration
                pszTmp = locValueForKey("tangentialAcceleration", dictionary);
                locModeA.tangentialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = locValueForKey("tangentialAccelVariance", dictionary);
                locModeA.tangentialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;

                // rotation is dir
                var locRotationIsDir = locValueForKey("rotationIsDir", dictionary);
                if (locRotationIsDir !== null) {
                    locRotationIsDir = locRotationIsDir.toString().toLowerCase();
                    locModeA.rotationIsDir = (locRotationIsDir === "true" || locRotationIsDir === "1");
                }
                else {
                    locModeA.rotationIsDir = false;
                }
            } else if (this.emitterMode === _ccsg.ParticleSystem.Mode.RADIUS) {
                // or Mode B: radius movement
                var locModeB = this.modeB;
                locModeB.startRadius = parseFloat(locValueForKey("maxRadius", dictionary));
                locModeB.startRadiusVar = parseFloat(locValueForKey("maxRadiusVariance", dictionary));
                locModeB.endRadius = parseFloat(locValueForKey("minRadius", dictionary));
                locModeB.endRadiusVar = 0;
                locModeB.rotatePerSecond = parseFloat(locValueForKey("rotatePerSecond", dictionary));
                locModeB.rotatePerSecondVar = parseFloat(locValueForKey("rotatePerSecondVariance", dictionary));
            } else {
                cc.logID(6009);
                return false;
            }

            // life span
            this.life = parseFloat(locValueForKey("particleLifespan", dictionary));
            this.lifeVar = parseFloat(locValueForKey("particleLifespanVariance", dictionary));

            // emission Rate
            this.emissionRate = this._totalParticles / this.life;

            //don't get the internal texture if a batchNode is used
            if (!this._batchNode) {
                // Set a compatible default for the alpha transfer
                this._opacityModifyRGB = false;

                // texture
                // Try to get the texture from the cache
                var textureName = locValueForKey("textureFileName", dictionary);
                var imgPath = cc.path.changeBasename(this._plistFile, textureName);
                var tex = cc.textureCache.getTextureForKey(imgPath);

                if (tex) {
                    this.setTexture(tex);
                } else {
                    var textureData = locValueForKey("textureImageData", dictionary);

                    if (!textureData || textureData.length === 0) {
                        tex = cc.textureCache.addImage(imgPath);
                        if (!tex)
                            return false;
                        this.setTexture(tex);
                    } else {
                        buffer = cc.Codec.unzipBase64AsArray(textureData, 1);
                        if (!buffer) {
                            cc.logID(6010);
                            return false;
                        }

                        var imageFormat = cc.getImageFormatByData(buffer);

                        if(imageFormat !== cc.ImageFormat.TIFF && imageFormat !== cc.ImageFormat.PNG){
                            cc.logID(6011);
                            return false;
                        }

                        var canvasObj = document.createElement("canvas");
                        if(imageFormat === cc.ImageFormat.PNG){
                            var myPngObj = new PNGReader(buffer);
                            myPngObj.render(canvasObj);
                        } else {
                            tiffReader.parseTIFF(buffer,canvasObj);
                        }

                        cc.textureCache.cacheImage(imgPath, canvasObj);

                        var addTexture = cc.textureCache.getTextureForKey(imgPath);
                        if(!addTexture)
                            cc.logID(6012);
                        this.setTexture(addTexture);
                    }
                }
            }
            ret = true;
        }
        return ret;
    },

    /**
     * Initializes a system with a fixed number of particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        this._totalParticles = numberOfParticles;

        var i, locParticles = this._particles;
        locParticles.length = 0;
        for(i = 0; i< numberOfParticles; i++){
            locParticles[i] = new cc.Particle();
        }

        if (!locParticles) {
            cc.logID(6013);
            return false;
        }
        this._allocatedParticles = numberOfParticles;

        if (this._batchNode)
            for (i = 0; i < this._totalParticles; i++)
                locParticles[i].atlasIndex = i;

        // default, active
        this._isActive = true;

        // default blend function
        this._blendFunc.src = cc.macro.BLEND_SRC;
        this._blendFunc.dst = cc.macro.BLEND_DST;

        // default movement type;
        this.positionType = _ccsg.ParticleSystem.Type.FREE;

        // by default be in mode A:
        this.emitterMode = _ccsg.ParticleSystem.Mode.GRAVITY;

        // default: modulate
        // XXX: not used
        //  colorModulate = YES;
        this.autoRemoveOnFinish = false;

        //for batchNode
        this._transformSystemDirty = false;

        // udpate after action in run!
        this.scheduleUpdateWithPriority(1);
        this._renderCmd._initWithTotalParticles(numberOfParticles);
        return true;
    },

    /**
     * Unschedules the "update" method.
     * @function
     * @see scheduleUpdate();
     */
    destroyParticleSystem:function () {
        this.unscheduleUpdate();
    },

    /**
     * Add a particle to the emitter
     * @return {Boolean}
     */
    addParticle: function () {
        if (this.isFull())
            return false;

        var particle = this._renderCmd.addParticle();
        this.initParticle(particle);
        ++this.particleCount;
        return true;
    },

    /**
     * Initializes a particle
     * @param {cc.Particle} particle
     */
    initParticle:function (particle) {
        var locRandomMinus11 = cc.randomMinus1To1;
        // timeToLive
        // no negative life. prevent division by 0
        particle.timeToLive = this.life + this.lifeVar * locRandomMinus11();
        particle.timeToLive = Math.max(0, particle.timeToLive);

        // position
        particle.pos.x = this._sourcePosition.x + this._posVar.x * locRandomMinus11();
        particle.pos.y = this._sourcePosition.y + this._posVar.y * locRandomMinus11();

        // Color
        var start, end;
        var locStartColor = this._startColor, locStartColorVar = this._startColorVar;
        var locEndColor = this._endColor, locEndColorVar = this._endColorVar;
        start = {
            r: cc.clampf(locStartColor.r + locStartColorVar.r * locRandomMinus11(), 0, 255),
            g: cc.clampf(locStartColor.g + locStartColorVar.g * locRandomMinus11(), 0, 255),
            b: cc.clampf(locStartColor.b + locStartColorVar.b * locRandomMinus11(), 0, 255),
            a: cc.clampf(locStartColor.a + locStartColorVar.a * locRandomMinus11(), 0, 255)
        };
        end = {
            r: cc.clampf(locEndColor.r + locEndColorVar.r * locRandomMinus11(), 0, 255),
            g: cc.clampf(locEndColor.g + locEndColorVar.g * locRandomMinus11(), 0, 255),
            b: cc.clampf(locEndColor.b + locEndColorVar.b * locRandomMinus11(), 0, 255),
            a: cc.clampf(locEndColor.a + locEndColorVar.a * locRandomMinus11(), 0, 255)
        };

        particle.color = start;
        var locParticleDeltaColor = particle.deltaColor, locParticleTimeToLive = particle.timeToLive;
        locParticleDeltaColor.r = (end.r - start.r) / locParticleTimeToLive;
        locParticleDeltaColor.g = (end.g - start.g) / locParticleTimeToLive;
        locParticleDeltaColor.b = (end.b - start.b) / locParticleTimeToLive;
        locParticleDeltaColor.a = (end.a - start.a) / locParticleTimeToLive;

        // size
        var startS = this.startSize + this.startSizeVar * locRandomMinus11();
        startS = Math.max(0, startS); // No negative value

        particle.size = startS;
        if (this.endSize === _ccsg.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE) {
            particle.deltaSize = 0;
        } else {
            var endS = this.endSize + this.endSizeVar * locRandomMinus11();
            endS = Math.max(0, endS); // No negative values
            particle.deltaSize = (endS - startS) / locParticleTimeToLive;
        }

        // rotation
        var startA = this.startSpin + this.startSpinVar * locRandomMinus11();
        var endA = this.endSpin + this.endSpinVar * locRandomMinus11();
        particle.rotation = startA;
        particle.deltaRotation = (endA - startA) / locParticleTimeToLive;

        // position
        if (this.positionType === _ccsg.ParticleSystem.Type.FREE)
            particle.startPos = this.convertToWorldSpace(this._pointZeroForParticle);
        else if (this.positionType === _ccsg.ParticleSystem.Type.RELATIVE){
            particle.startPos.x = this._position.x;
            particle.startPos.y = this._position.y;
        }

        // direction
        var a = cc.degreesToRadians(this.angle + this.angleVar * locRandomMinus11());

        // Mode Gravity: A
        if (this.emitterMode === _ccsg.ParticleSystem.Mode.GRAVITY) {
            var locModeA = this.modeA, locParticleModeA = particle.modeA;
            var s = locModeA.speed + locModeA.speedVar * locRandomMinus11();

            // direction
            locParticleModeA.dir.x = Math.cos(a);
            locParticleModeA.dir.y = Math.sin(a);
            cc.pMultIn(locParticleModeA.dir, s);

            // radial accel
            locParticleModeA.radialAccel = locModeA.radialAccel + locModeA.radialAccelVar * locRandomMinus11();

            // tangential accel
            locParticleModeA.tangentialAccel = locModeA.tangentialAccel + locModeA.tangentialAccelVar * locRandomMinus11();

            // rotation is dir
            if(locModeA.rotationIsDir)
                particle.rotation = -cc.radiansToDegrees(cc.pToAngle(locParticleModeA.dir));
        } else {
            // Mode Radius: B
            var locModeB = this.modeB, locParitlceModeB = particle.modeB;

            // Set the default diameter of the particle from the source position
            var startRadius = locModeB.startRadius + locModeB.startRadiusVar * locRandomMinus11();
            var endRadius = locModeB.endRadius + locModeB.endRadiusVar * locRandomMinus11();

            locParitlceModeB.radius = startRadius;
            locParitlceModeB.deltaRadius = (locModeB.endRadius === _ccsg.ParticleSystem.START_RADIUS_EQUAL_TO_END_RADIUS) ? 0 : (endRadius - startRadius) / locParticleTimeToLive;

            locParitlceModeB.angle = a;
            locParitlceModeB.degreesPerSecond = cc.degreesToRadians(locModeB.rotatePerSecond + locModeB.rotatePerSecondVar * locRandomMinus11());
        }
    },

    /**
     * stop emitting particles. Running particles will continue to run until they die
     */
    stopSystem:function () {
        this._isActive = false;
        this._elapsed = this.duration;
        this._emitCounter = 0;
    },

    /**
     * Kill all living particles.
     */
    resetSystem:function () {
        this._isActive = true;
        this._elapsed = 0;
        var locParticles = this._particles;
        for (this._particleIdx = 0; this._particleIdx < this.particleCount; ++this._particleIdx)
            locParticles[this._particleIdx].timeToLive = 0 ;
    },

    /**
     * whether or not the system is full
     * @return {Boolean}
     */
    isFull:function () {
        return (this.particleCount >= this._totalParticles);
    },

    /**
     * should be overridden by subclasses
     * @param {cc.Particle} particle
     * @param {cc.Vec2} newPosition
     */
    updateQuadWithParticle:function (particle, newPosition) {
        this._renderCmd.updateQuadWithParticle(particle, newPosition);
    },

    /**
     * should be overridden by subclasses
     */
    postStep:function () {
        this._renderCmd.postStep();
    },

    /**
     * update emitter's status
     * @override
     * @param {Number} dt delta time
     */
    update:function (dt) {
        this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty);
        if (this._isActive && this.emissionRate) {
            var rate = 1.0 / this.emissionRate;
            //issue #1201, prevent bursts of particles, due to too high emitCounter
            if (this.particleCount < this._totalParticles)
                this._emitCounter += dt;

            while ((this.particleCount < this._totalParticles) && (this._emitCounter > rate)) {
                this.addParticle();
                this._emitCounter -= rate;
            }

            this._elapsed += dt;
            if (this.duration !== -1 && this.duration < this._elapsed)
                this.stopSystem();
        }
        this._particleIdx = 0;

        var currentPosition = cc.Particle.TemporaryPoints[0];
        if (this.positionType === _ccsg.ParticleSystem.Type.FREE) {
            cc.pIn(currentPosition, this.convertToWorldSpace(this._pointZeroForParticle));
        } else if (this.positionType === _ccsg.ParticleSystem.Type.RELATIVE) {
            currentPosition.x = this._position.x;
            currentPosition.y = this._position.y;
        }

        if (this._visible) {
            // Used to reduce memory allocation / creation within the loop
            var tpa = cc.Particle.TemporaryPoints[1],
                tpb = cc.Particle.TemporaryPoints[2],
                tpc = cc.Particle.TemporaryPoints[3];

            var locParticles = this._particles;
            while (this._particleIdx < this.particleCount) {

                // Reset the working particles
                cc.pZeroIn(tpa);
                cc.pZeroIn(tpb);
                cc.pZeroIn(tpc);

                var selParticle = locParticles[this._particleIdx];

                // life
                selParticle.timeToLive -= dt;

                if (selParticle.timeToLive > 0) {
                    // Mode A: gravity, direction, tangential accel & radial accel
                    if (this.emitterMode === _ccsg.ParticleSystem.Mode.GRAVITY) {

                        var tmp = tpc, radial = tpa, tangential = tpb;

                        // radial acceleration
                        if (selParticle.pos.x || selParticle.pos.y) {
                            cc.pIn(radial, selParticle.pos);
                            cc.pNormalizeIn(radial);
                        } else {
                            cc.pZeroIn(radial);
                        }

                        cc.pIn(tangential, radial);
                        cc.pMultIn(radial, selParticle.modeA.radialAccel);

                        // tangential acceleration
                        var newy = tangential.x;
                        tangential.x = -tangential.y;
                        tangential.y = newy;

                        cc.pMultIn(tangential, selParticle.modeA.tangentialAccel);

                        cc.pIn(tmp, radial);
                        cc.pAddIn(tmp, tangential);
                        cc.pAddIn(tmp, this.modeA.gravity);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.modeA.dir, tmp);


                        cc.pIn(tmp, selParticle.modeA.dir);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.pos, tmp);
                    } else {
                        // Mode B: radius movement
                        var selModeB = selParticle.modeB;
                        // Update the angle and radius of the particle.
                        selModeB.angle += selModeB.degreesPerSecond * dt;
                        selModeB.radius += selModeB.deltaRadius * dt;

                        selParticle.pos.x = -Math.cos(selModeB.angle) * selModeB.radius;
                        selParticle.pos.y = -Math.sin(selModeB.angle) * selModeB.radius;
                    }

                    // color
                    this._renderCmd._updateDeltaColor(selParticle, dt);

                    // size
                    selParticle.size += (selParticle.deltaSize * dt);
                    selParticle.size = Math.max(0, selParticle.size);

                    // angle
                    selParticle.rotation += (selParticle.deltaRotation * dt);

                    //
                    // update values in quad
                    //
                    var newPos = tpa;
                    if (this.positionType === _ccsg.ParticleSystem.Type.FREE || this.positionType === _ccsg.ParticleSystem.Type.RELATIVE) {
                        var diff = tpb;
                        cc.pIn(diff, currentPosition);
                        cc.pSubIn(diff, selParticle.startPos);

                        cc.pIn(newPos, selParticle.pos);
                        cc.pSubIn(newPos, diff);
                    } else {
                        cc.pIn(newPos, selParticle.pos);
                    }

                    // translate newPos to correct position, since matrix transform isn't performed in batchnode
                    // don't update the particle with the new position information, it will interfere with the radius and tangential calculations
                    if (this._batchNode) {
                        newPos.x += this._position.x;
                        newPos.y += this._position.y;
                    }
                    this._renderCmd.updateParticlePosition(selParticle, newPos);

                    // update particle counter
                    ++this._particleIdx;
                } else {
                    // life < 0
                    var currentIndex = selParticle.atlasIndex;
                    if(this._particleIdx !== this.particleCount -1){
                         var deadParticle = locParticles[this._particleIdx];
                        locParticles[this._particleIdx] = locParticles[this.particleCount -1];
                        locParticles[this.particleCount -1] = deadParticle;
                    }
                    if (this._batchNode) {
                        //disable the switched particle
                        this._batchNode.disableParticle(this.atlasIndex + currentIndex);
                        //switch indexes
                        locParticles[this.particleCount - 1].atlasIndex = currentIndex;
                    }

                    --this.particleCount;
                    if (this.particleCount === 0 && this.autoRemoveOnFinish) {
                        this.unscheduleUpdate();
                        this._parent.removeChild(this, true);
                        this._renderCmd.updateLocalBB && this._renderCmd.updateLocalBB();
                        return;
                    }
                }
            }
            this._renderCmd.updateLocalBB && this._renderCmd.updateLocalBB();
            this._transformSystemDirty = false;
        }

        if (!this._batchNode)
            this.postStep();
    },

    /**
     * update emitter's status (dt = 0)
     */
    updateWithNoTime:function () {
        this.update(0);
    },

    //
    // return the string found by key in dict.
    // @param {string} key
    // @param {object} dict
    // @return {String} "" if not found; return the string if found.
    // @private
    //
    _valueForKey:function (key, dict) {
        if (dict) {
            var pString = dict[key];
            return pString != null ? pString : "";
        }
        return "";
    },

    _updateBlendFunc:function () {
        if(this._batchNode){
            cc.logID(6014);
            return;
        }

        var locTexture = this._texture;
        if (locTexture && locTexture instanceof cc.Texture2D) {
            this._opacityModifyRGB = false;
            var locBlendFunc = this._blendFunc;
            if (locBlendFunc.src === cc.macro.BLEND_SRC && locBlendFunc.dst === cc.macro.BLEND_DST) {
                if (locTexture.hasPremultipliedAlpha()) {
                    this._opacityModifyRGB = true;
                } else {
                    locBlendFunc.src = cc.macro.SRC_ALPHA;
                    locBlendFunc.dst = cc.macro.ONE_MINUS_SRC_ALPHA;
                }
            }
        }
    },

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {ccsg.ParticleSystem}
     */
    clone:function () {
        var retParticle = new _ccsg.ParticleSystem();

        // self, not super
        if (retParticle.initWithTotalParticles(this.getTotalParticles())) {
            // angle
            retParticle.setAngle(this.getAngle());
            retParticle.setAngleVar(this.getAngleVar());

            // duration
            retParticle.setDuration(this.getDuration());

            // blend function
            var blend = this.getBlendFunc();
            retParticle.setBlendFunc(blend.src,blend.dst);

            // color
            retParticle.setStartColor(this.getStartColor());

            retParticle.setStartColorVar(this.getStartColorVar());

            retParticle.setEndColor(this.getEndColor());

            retParticle.setEndColorVar(this.getEndColorVar());

            // this size
            retParticle.setStartSize(this.getStartSize());
            retParticle.setStartSizeVar(this.getStartSizeVar());
            retParticle.setEndSize(this.getEndSize());
            retParticle.setEndSizeVar(this.getEndSizeVar());

            // position
            retParticle.setPosition(cc.p(this.x, this.y));
            retParticle.setPosVar(cc.p(this.getPosVar().x,this.getPosVar().y));

            retParticle.setPositionType(this.getPositionType());

            // Spinning
            retParticle.setStartSpin(this.getStartSpin()||0);
            retParticle.setStartSpinVar(this.getStartSpinVar()||0);
            retParticle.setEndSpin(this.getEndSpin()||0);
            retParticle.setEndSpinVar(this.getEndSpinVar()||0);

            retParticle.setEmitterMode(this.getEmitterMode());

            // Mode A: Gravity + tangential accel + radial accel
            if (this.getEmitterMode() === _ccsg.ParticleSystem.Mode.GRAVITY) {
                // gravity
                var gra = this.getGravity();
                retParticle.setGravity(cc.p(gra.x,gra.y));

                // speed
                retParticle.setSpeed(this.getSpeed());
                retParticle.setSpeedVar(this.getSpeedVar());

                // radial acceleration
                retParticle.setRadialAccel(this.getRadialAccel());
                retParticle.setRadialAccelVar(this.getRadialAccelVar());

                // tangential acceleration
                retParticle.setTangentialAccel(this.getTangentialAccel());
                retParticle.setTangentialAccelVar(this.getTangentialAccelVar());

            } else if (this.getEmitterMode() === _ccsg.ParticleSystem.Mode.RADIUS) {
                // or Mode B: radius movement
                retParticle.setStartRadius(this.getStartRadius());
                retParticle.setStartRadiusVar(this.getStartRadiusVar());
                retParticle.setEndRadius(this.getEndRadius());
                retParticle.setEndRadiusVar(this.getEndRadiusVar());

                retParticle.setRotatePerSecond(this.getRotatePerSecond());
                retParticle.setRotatePerSecondVar(this.getRotatePerSecondVar());
            }

            // life span
            retParticle.setLife(this.getLife());
            retParticle.setLifeVar(this.getLifeVar());

            // emission Rate
            retParticle.setEmissionRate(this.getEmissionRate());

            //don't get the internal texture if a batchNode is used
            if (!this.getBatchNode()) {
                // Set a compatible default for the alpha transfer
                retParticle.setOpacityModifyRGB(this.isOpacityModifyRGB());
                // texture
                var texture = this.getTexture();
                if(texture){
                    var size = texture.getContentSize();
                    retParticle.setTextureWithRect(texture, cc.rect(0, 0, size.width, size.height));
                }
            }
        }
        return retParticle;
    },

    /**
     * <p> Sets a new CCSpriteFrame as particle.</br>
     * WARNING: this method is experimental. Use setTextureWithRect instead.
     * </p>
     * @param {cc.SpriteFrame} spriteFrame
     */
    setDisplayFrame: function (spriteFrame) {
        if (!spriteFrame)
            return;

        var locOffset = spriteFrame.getOffset();
        if (locOffset.x !== 0 || locOffset.y !== 0)
            cc.logID(6015);

        // update texture before updating texture rect
        var texture = spriteFrame.getTexture(), locTexture = this._texture;
        if (locTexture !== texture)
            this.setTexture(texture);
    },

    /**
     * Sets a new texture with a rect. The rect is in Points.
     * @param {Texture2D} texture
     * @param {Rect} rect
     */
    setTextureWithRect: function (texture, rect) {
        var locTexture = this._texture;
        if (locTexture !== texture) {
            this._texture = texture;
            this._updateBlendFunc();
        }
        this.initTexCoordsWithRect(rect);
    },

    /**
     * listen the event that coming to foreground on Android  (An empty function for native)
     * @param {cc._Class} obj
     */
    listenBackToForeground:function (obj) {
        //do nothing
    }
});

var _p = _ccsg.ParticleSystem.prototype;

// Extended properties
/** @expose */
_p.opacityModifyRGB;
cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
/** @expose */
_p.batchNode;
cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
/** @expose */
_p.drawMode;
cc.defineGetterSetter(_p, "drawMode", _p.getDrawMode, _p.setDrawMode);
/** @expose */
_p.shapeType;
cc.defineGetterSetter(_p, "shapeType", _p.getShapeType, _p.setShapeType);
/** @expose */
_p.active;
cc.defineGetterSetter(_p, "active", _p.isActive);
/** @expose */
_p.sourcePos;
cc.defineGetterSetter(_p, "sourcePos", _p.getSourcePosition, _p.setSourcePosition);
/** @expose */
_p.posVar;
cc.defineGetterSetter(_p, "posVar", _p.getPosVar, _p.setPosVar);
/** @expose */
_p.gravity;
cc.defineGetterSetter(_p, "gravity", _p.getGravity, _p.setGravity);
/** @expose */
_p.speed;
cc.defineGetterSetter(_p, "speed", _p.getSpeed, _p.setSpeed);
/** @expose */
_p.speedVar;
cc.defineGetterSetter(_p, "speedVar", _p.getSpeedVar, _p.setSpeedVar);
/** @expose */
_p.tangentialAccel;
cc.defineGetterSetter(_p, "tangentialAccel", _p.getTangentialAccel, _p.setTangentialAccel);
/** @expose */
_p.tangentialAccelVar;
cc.defineGetterSetter(_p, "tangentialAccelVar", _p.getTangentialAccelVar, _p.setTangentialAccelVar);
/** @expose */
_p.radialAccel;
cc.defineGetterSetter(_p, "radialAccel", _p.getRadialAccel, _p.setRadialAccel);
/** @expose */
_p.radialAccelVar;
cc.defineGetterSetter(_p, "radialAccelVar", _p.getRadialAccelVar, _p.setRadialAccelVar);
/** @expose */
_p.rotationIsDir;
cc.defineGetterSetter(_p, "rotationIsDir", _p.getRotationIsDir, _p.setRotationIsDir);
/** @expose */
_p.startRadius;
cc.defineGetterSetter(_p, "startRadius", _p.getStartRadius, _p.setStartRadius);
/** @expose */
_p.startRadiusVar;
cc.defineGetterSetter(_p, "startRadiusVar", _p.getStartRadiusVar, _p.setStartRadiusVar);
/** @expose */
_p.endRadius;
cc.defineGetterSetter(_p, "endRadius", _p.getEndRadius, _p.setEndRadius);
/** @expose */
_p.endRadiusVar;
cc.defineGetterSetter(_p, "endRadiusVar", _p.getEndRadiusVar, _p.setEndRadiusVar);
/** @expose */
_p.rotatePerS;
cc.defineGetterSetter(_p, "rotatePerS", _p.getRotatePerSecond, _p.setRotatePerSecond);
/** @expose */
_p.rotatePerSVar;
cc.defineGetterSetter(_p, "rotatePerSVar", _p.getRotatePerSecondVar, _p.setRotatePerSecondVar);
/** @expose */
_p.startColor;
cc.defineGetterSetter(_p, "startColor", _p.getStartColor, _p.setStartColor);
/** @expose */
_p.startColorVar;
cc.defineGetterSetter(_p, "startColorVar", _p.getStartColorVar, _p.setStartColorVar);
/** @expose */
_p.endColor;
cc.defineGetterSetter(_p, "endColor", _p.getEndColor, _p.setEndColor);
/** @expose */
_p.endColorVar;
cc.defineGetterSetter(_p, "endColorVar", _p.getEndColorVar, _p.setEndColorVar);
/** @expose */
_p.totalParticles;
cc.defineGetterSetter(_p, "totalParticles", _p.getTotalParticles, _p.setTotalParticles);
/** @expose */
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);


// Different modes
/**
 * Mode A:Gravity + Tangential Accel + Radial Accel
 * @Class
 * @Construct
 * @param {cc.Vec2} [gravity=] Gravity value.
 * @param {Number} [speed=0] speed of each particle.
 * @param {Number} [speedVar=0] speed variance of each particle.
 * @param {Number} [tangentialAccel=0] tangential acceleration of each particle.
 * @param {Number} [tangentialAccelVar=0] tangential acceleration variance of each particle.
 * @param {Number} [radialAccel=0] radial acceleration of each particle.
 * @param {Number} [radialAccelVar=0] radial acceleration variance of each particle.
 * @param {boolean} [rotationIsDir=false]
 */
_ccsg.ParticleSystem.ModeA = function (gravity, speed, speedVar, tangentialAccel, tangentialAccelVar, radialAccel, radialAccelVar, rotationIsDir) {
    /** Gravity value. Only available in 'Gravity' mode. */
    this.gravity = gravity ? gravity : cc.p(0,0);
    /** speed of each particle. Only available in 'Gravity' mode.  */
    this.speed = speed || 0;
    /** speed variance of each particle. Only available in 'Gravity' mode. */
    this.speedVar = speedVar || 0;
    /** tangential acceleration of each particle. Only available in 'Gravity' mode. */
    this.tangentialAccel = tangentialAccel || 0;
    /** tangential acceleration variance of each particle. Only available in 'Gravity' mode. */
    this.tangentialAccelVar = tangentialAccelVar || 0;
    /** radial acceleration of each particle. Only available in 'Gravity' mode. */
    this.radialAccel = radialAccel || 0;
    /** radial acceleration variance of each particle. Only available in 'Gravity' mode. */
    this.radialAccelVar = radialAccelVar || 0;
    /** set the rotation of each particle to its direction Only available in 'Gravity' mode. */
    this.rotationIsDir = rotationIsDir || false;
};

/**
 * Mode B: circular movement (gravity, radial accel and tangential accel don't are not used in this mode)
 * @Class
 * @Construct
 * @param {Number} [startRadius=0] The starting radius of the particles.
 * @param {Number} [startRadiusVar=0] The starting radius variance of the particles.
 * @param {Number} [endRadius=0] The ending radius of the particles.
 * @param {Number} [endRadiusVar=0] The ending radius variance of the particles.
 * @param {Number} [rotatePerSecond=0] Number of degrees to rotate a particle around the source pos per second.
 * @param {Number} [rotatePerSecondVar=0] Variance in degrees for rotatePerSecond.
 */
_ccsg.ParticleSystem.ModeB = function (startRadius, startRadiusVar, endRadius, endRadiusVar, rotatePerSecond, rotatePerSecondVar) {
    /** The starting radius of the particles. Only available in 'Radius' mode. */
    this.startRadius = startRadius || 0;
    /** The starting radius variance of the particles. Only available in 'Radius' mode. */
    this.startRadiusVar = startRadiusVar || 0;
    /** The ending radius of the particles. Only available in 'Radius' mode. */
    this.endRadius = endRadius || 0;
    /** The ending radius variance of the particles. Only available in 'Radius' mode. */
    this.endRadiusVar = endRadiusVar || 0;
    /** Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode. */
    this.rotatePerSecond = rotatePerSecond || 0;
    /** Variance in degrees for rotatePerSecond. Only available in 'Radius' mode. */
    this.rotatePerSecondVar = rotatePerSecondVar || 0;
};

/**
 * Shape Mode of Particle Draw
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.SHAPE_MODE = 0;

/**
 * Texture Mode of Particle Draw
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.TEXTURE_MODE = 1;

/**
 * Star Shape for ShapeMode of Particle
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.STAR_SHAPE = 0;

/**
 * Ball Shape for ShapeMode of Particle
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.BALL_SHAPE = 1;

/**
 * The Particle emitter lives forever
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.DURATION_INFINITY = -1;

/**
 * The starting size of the particle is equal to the ending size
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE = -1;

/**
 * The starting radius of the particle is equal to the ending radius
 * @constant
 * @type Number
 */
_ccsg.ParticleSystem.START_RADIUS_EQUAL_TO_END_RADIUS = -1;

/**
 * Enum for particle mode
 * @readonly
 * @enum {number}
 */
_ccsg.ParticleSystem.Mode = cc.Enum({
    /** The gravity mode (A mode) */
    GRAVITY: 0,
    /** The radius mode (B mode) */
    RADIUS: 1
});

/**
 * Enum for particle type
 * @readonly
 * @enum {number}
 */
_ccsg.ParticleSystem.Type = cc.Enum({
    /**
     * Living particles are attached to the world and are unaffected by emitter repositioning.
     */
    FREE: 0,

    /**
     * Living particles are attached to the world but will follow the emitter repositioning.<br/>
     * Use case: Attach an emitter to an sprite, and you want that the emitter follows the sprite.
     */
    RELATIVE: 1,

    /**
     * Living particles are attached to the emitter and are translated along with it.
     */
    GROUPED: 2
});

// fireball#2856

var particleSystemPro = _ccsg.ParticleSystem.prototype;
Object.defineProperty(particleSystemPro, 'visible', {
    get: _ccsg.Node.prototype.isVisible,
    set: particleSystemPro.setVisible
});

Object.defineProperty(particleSystemPro, 'ignoreAnchor', {
    get: _ccsg.Node.prototype.isIgnoreAnchorPointForPosition,
    set: particleSystemPro.ignoreAnchorPointForPosition
});

Object.defineProperty(particleSystemPro, 'opacityModifyRGB', {
    get: particleSystemPro.isOpacityModifyRGB
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * ParticleSystem's canvas render command
 */
_ccsg.ParticleSystem.CanvasRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = true;

    this._drawMode = _ccsg.ParticleSystem.TEXTURE_MODE;
    this._shapeType = _ccsg.ParticleSystem.BALL_SHAPE;

    this._pointRect = cc.rect(0, 0, 0, 0);
    //region for local bb
    this._localRegion = new cc.Region();
    this._tintCache = null;
};
var proto = _ccsg.ParticleSystem.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = _ccsg.ParticleSystem.CanvasRenderCmd;

proto.getDrawMode = function(){
    return this._drawMode;
};

proto.setDrawMode = function(drawMode){
    this._drawMode = drawMode;
};

proto.getShapeType = function(){
    return this._shapeType;
};

proto.setShapeType = function(shapeType){
    this._shapeType = shapeType;
};

proto.setBatchNode = function(batchNode){
    if (this._batchNode !== batchNode) {
        this._node._batchNode = batchNode;
    }
};

proto.updateQuadWithParticle = function (particle, newPosition) {
    //do nothing
};

proto.updateParticlePosition = function(particle, position){
    cc.pIn(particle.drawPos, position);
};

var particleRegion = new cc.Region();
var localBB = new cc.Rect();
proto.updateLocalBB = function() {
    var region = this._localRegion;
    var particles = this._node._particles;
    region.setEmpty();
    for(var index = particles.length - 1; index >=0; --index) {
        var particle = particles[index];
        var pos = particle.drawPos;
        var size = particle.size * 1.415 /*a little bigger than sqrt(2)*/;
        particleRegion.setTo(pos.x - size, pos.y - size, pos.x + size, pos.y + size);
        region.union(particleRegion);
    }

    localBB.x = region._minX; localBB.y = region._minY;
    localBB.width = region._maxX - region._minX;
    localBB.height = region._maxY - region._minY;
};

proto.getLocalBB = function() {
    return localBB;
};

proto.updateStatus = function() {
    this.originUpdateStatus();
    this._updateCurrentRegions();
    this._regionFlag = _ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble;
    this._dirtyFlag &= ~_ccsg.Node._dirtyFlags.contentDirty;
};

proto.rendering = function (ctx, scaleX, scaleY) {
    //TODO: need refactor rendering for performance
    var wrapper = ctx || cc._renderContext, context = wrapper.getContext(),
        node = this._node, pointRect = this._pointRect;

    wrapper.setTransform(this._worldTransform, scaleX, scaleY);
    wrapper.save();
    if (node.isBlendAdditive())
        context.globalCompositeOperation = 'lighter';
    else
        context.globalCompositeOperation = 'source-over';

    var i, particle, lpx, alpha;
    var particleCount = this._node.particleCount, particles = this._node._particles;
    if (node.drawMode !== _ccsg.ParticleSystem.SHAPE_MODE && node._texture) {
        // Delay drawing until the texture is fully loaded by the browser
        if (!node._texture._textureLoaded) {
            wrapper.restore();
            return;
        }
        var element = node._texture.getHtmlElementObj();
        if (!element.width || !element.height) {
            wrapper.restore();
            return;
        }

        var drawElement = element;
        for (i = 0; i < particleCount; i++) {
            particle = particles[i];
            lpx = (0 | (particle.size * 0.5));

            alpha = particle.color.a / 255;
            if (alpha === 0) continue;
            context.globalAlpha = alpha;

            context.save();
            context.translate((0 | particle.drawPos.x), -(0 | particle.drawPos.y));

            var size = Math.floor(particle.size / 4) * 4;
            var w = pointRect.width;
            var h = pointRect.height;

            context.scale(Math.max((1 / w) * size, 0.000001), Math.max((1 / h) * size, 0.000001));
            if (particle.rotation)
                context.rotate(cc.degreesToRadians(particle.rotation));

            drawElement = particle.isChangeColor ? this._changeTextureColor(node._texture, particle.color, this._pointRect) : element;
            context.drawImage(drawElement, -(0 | (w / 2)), -(0 | (h / 2)));
            context.restore();
        }
    } else {
        var drawTool = cc._drawingUtil;
        for (i = 0; i < particleCount; i++) {
            particle = particles[i];
            lpx = (0 | (particle.size * 0.5));
            alpha = particle.color.a / 255;
            if (alpha === 0) continue;
            context.globalAlpha = alpha;

            context.save();
            context.translate(0 | particle.drawPos.x, -(0 | particle.drawPos.y));
            if (node.shapeType === _ccsg.ParticleSystem.STAR_SHAPE) {
                if (particle.rotation)
                    context.rotate(cc.degreesToRadians(particle.rotation));
                drawTool.drawStar(wrapper, lpx, particle.color);
            } else
                drawTool.drawColorBall(wrapper, lpx, particle.color);
            context.restore();
        }
    }
    wrapper.restore();
    cc.g_NumberOfDraws++;
};

proto._changeTextureColor = function (texture, color, rect) {
    if (!this._tintCache) {
        this._tintCache = document.createElement("canvas");
    }
    var tintCache = this._tintCache;
    var textureContentSize = texture.getContentSize();
    tintCache.width = textureContentSize.width;
    tintCache.height = textureContentSize.height;
    return texture._generateColorTexture(color.r, color.g, color.b, rect, tintCache);
};

proto.initTexCoordsWithRect = function(pointRect){
    this._pointRect = pointRect;
};

proto.setTotalParticles = function(tp){
    //cc.assert(tp <= this._allocatedParticles, "Particle: resizing particle array only supported for quads");
    this._node._totalParticles = (tp < 200) ? tp : 200;
};

proto.addParticle = function(){
    var node = this._node,
        particles = node._particles,
        particle;
    if (node.particleCount < particles.length) {
        particle = particles[node.particleCount];
    } else {
        particle = new cc.Particle();
        particles.push(particle);
    }
    return particle;
};

proto._setupVBO = function(){};
proto._allocMemory = function(){
    return true;
};

proto.postStep = function(){};

proto._setBlendAdditive = function(){
    var locBlendFunc = this._node._blendFunc;
    locBlendFunc.src = cc.macro.BLEND_SRC;
    locBlendFunc.dst = cc.macro.BLEND_DST;
};

proto._initWithTotalParticles = function(totalParticles){};
proto._updateDeltaColor = function(selParticle, dt){
    if (!this._node._dontTint) {
        selParticle.color.r += selParticle.deltaColor.r * dt;
        selParticle.color.g += selParticle.deltaColor.g * dt;
        selParticle.color.b += selParticle.deltaColor.b * dt;
        selParticle.color.a += selParticle.deltaColor.a * dt;
        selParticle.isChangeColor = true;
    }
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * ParticleSystem's WebGL render command
 */
_ccsg.ParticleSystem.WebGLRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = true;

    this._matrix = new cc.math.Matrix4();
    this._matrix.identity();

    this._buffersVBO = [0, 0];
    this._quads = [];
    this._indices = [];
    this._quadsArrayBuffer = null;
};
var proto = _ccsg.ParticleSystem.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = _ccsg.ParticleSystem.WebGLRenderCmd;

proto.getDrawMode = function(){};
proto.setDrawMode = function(drawMode){};
proto.getShapeType = function(){};
proto.setShapeType = function(shapeType){};

proto.setBatchNode = function(batchNode){
    var node = this._node;
    if (node._batchNode !== batchNode) {
        var oldBatch = node._batchNode;
        node._batchNode = batchNode; //weak reference

        if (batchNode) {
            var locParticles = node._particles;
            for (var i = 0; i < node._totalParticles; i++)
                locParticles[i].atlasIndex = i;
        }

        // NEW: is self render ?
        if (!batchNode) {
            this._allocMemory();
            this.initIndices(node._totalParticles);
            node.setTexture(oldBatch.getTexture());
            this._setupVBO();

        } else if (!oldBatch) {
            // OLD: was it self render cleanup  ?
            // copy current state to batch
            node._batchNode.textureAtlas._copyQuadsToTextureAtlas(this._quads, node.atlasIndex);

            //delete buffer
            cc._renderContext.deleteBuffer(this._buffersVBO[1]);     //where is re-bindBuffer code?
        }
    }
};

proto.initIndices = function (totalParticles) {
    var locIndices = this._indices;
    for (var i = 0, len = totalParticles; i < len; ++i) {
        var i6 = i * 6;
        var i4 = i * 4;
        locIndices[i6 + 0] = i4 + 0;
        locIndices[i6 + 1] = i4 + 1;
        locIndices[i6 + 2] = i4 + 2;

        locIndices[i6 + 5] = i4 + 1;
        locIndices[i6 + 4] = i4 + 2;
        locIndices[i6 + 3] = i4 + 3;
    }
};

proto.isDifferentTexture = function(texture1, texture2){
     return (texture1 === texture2);
};

proto.updateParticlePosition = function(particle, position){
    // IMPORTANT: newPos may not be used as a reference here! (as it is just the temporary tpa point)
    // the implementation of updateQuadWithParticle must use
    // the x and y values directly
    this.updateQuadWithParticle(particle, position);
};

proto.updateQuadWithParticle = function (particle, newPosition) {
    var quad = null, node = this._node;
    if (node._batchNode) {
        var batchQuads = node._batchNode.textureAtlas.quads;
        quad = batchQuads[node.atlasIndex + particle.atlasIndex];
        node._batchNode.textureAtlas.dirty = true;
    } else
        quad = this._quads[node._particleIdx];

    var r, g, b, a;
    if (node._opacityModifyRGB) {
        r = 0 | (particle.color.r * particle.color.a/255);
        g = 0 | (particle.color.g * particle.color.a/255);
        b = 0 | (particle.color.b * particle.color.a/255);
    } else {
        r = 0 | (particle.color.r );
        g = 0 | (particle.color.g );
        b = 0 | (particle.color.b );
    }
    a = 0 | (particle.color.a );

    var blColors = quad.bl.colors, brColors = quad.br.colors, tlColors = quad.tl.colors, trColors = quad.tr.colors;
    blColors.r = brColors.r = tlColors.r = trColors.r = r;
    blColors.g = brColors.g = tlColors.g = trColors.g = g;
    blColors.b = brColors.b = tlColors.b = trColors.b = b;
    blColors.a = brColors.a = tlColors.a = trColors.a = a;

    // vertices
    var size_2 = particle.size / 2;
    if (particle.rotation) {
        var x1 = -size_2, y1 = -size_2;

        var x2 = size_2, y2 = size_2;
        var x = newPosition.x, y = newPosition.y;

        var rad = -cc.degreesToRadians(particle.rotation);
        var cr = Math.cos(rad), sr = Math.sin(rad);
        var ax = x1 * cr - y1 * sr + x;
        var ay = x1 * sr + y1 * cr + y;
        var bx = x2 * cr - y1 * sr + x;
        var by = x2 * sr + y1 * cr + y;
        var cx = x2 * cr - y2 * sr + x;
        var cy = x2 * sr + y2 * cr + y;
        var dx = x1 * cr - y2 * sr + x;
        var dy = x1 * sr + y2 * cr + y;

        // bottom-left
        quad.bl.vertices.x = ax;
        quad.bl.vertices.y = ay;

        // bottom-right vertex:
        quad.br.vertices.x = bx;
        quad.br.vertices.y = by;

        // top-left vertex:
        quad.tl.vertices.x = dx;
        quad.tl.vertices.y = dy;

        // top-right vertex:
        quad.tr.vertices.x = cx;
        quad.tr.vertices.y = cy;
    } else {
        // bottom-left vertex:
        quad.bl.vertices.x = newPosition.x - size_2;
        quad.bl.vertices.y = newPosition.y - size_2;

        // bottom-right vertex:
        quad.br.vertices.x = newPosition.x + size_2;
        quad.br.vertices.y = newPosition.y - size_2;

        // top-left vertex:
        quad.tl.vertices.x = newPosition.x - size_2;
        quad.tl.vertices.y = newPosition.y + size_2;

        // top-right vertex:
        quad.tr.vertices.x = newPosition.x + size_2;
        quad.tr.vertices.y = newPosition.y + size_2;
    }
};

proto.rendering = function (ctx) {
    var node = this._node;
    if (!node._texture)
        return;

    var gl = ctx || cc._renderContext;

    var wt = this._worldTransform, mat = this._matrix.mat;
    mat[0] = wt.a;
    mat[4] = wt.c;
    mat[12] = wt.tx;
    mat[1] = wt.b;
    mat[5] = wt.d;
    mat[13] = wt.ty;

    this._shaderProgram.use();
    this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);     //;

    cc.gl.bindTexture2DN(0, node._texture);
    cc.gl.blendFuncForParticle(node._blendFunc.src, node._blendFunc.dst);

    //
    // Using VBO without VAO
    //
    gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
    gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
    gl.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
    gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 3, gl.FLOAT, false, 24, 0);               // vertices
    gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, gl.UNSIGNED_BYTE, true, 24, 12);          // colors
    gl.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, gl.FLOAT, false, 24, 16);            // tex coords

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
    gl.drawElements(gl.TRIANGLES, node._particleIdx * 6, gl.UNSIGNED_SHORT, 0);
};

proto.initTexCoordsWithRect = function(pointRect){
    var node = this._node;
    var texture = node.texture;

    var wide = pointRect.width;
    var high = pointRect.height;

    if (texture) {
        wide = texture.getPixelWidth();
        high = texture.getPixelHeight();
    }

    var left, bottom, right, top;
    if (cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
        left = (pointRect.x * 2 + 1) / (wide * 2);
        bottom = (pointRect.y * 2 + 1) / (high * 2);
        right = left + (pointRect.width * 2 - 2) / (wide * 2);
        top = bottom + (pointRect.height * 2 - 2) / (high * 2);
    } else {
        left = pointRect.x / wide;
        bottom = pointRect.y / high;
        right = left + pointRect.width / wide;
        top = bottom + pointRect.height / high;
    }

    // Important. Texture in cocos2d are inverted, so the Y component should be inverted
    var temp = top;
    top = bottom;
    bottom = temp;

    var quads;
    var start = 0, end = 0;
    if (node._batchNode) {
        quads = node._batchNode.textureAtlas.quads;
        start = node.atlasIndex;
        end = node.atlasIndex + node._totalParticles;
    } else {
        quads = this._quads;
        start = 0;
        end = node._totalParticles;
    }

    for (var i = start; i < end; i++) {
        if (!quads[i])
            quads[i] = cc.V3F_C4B_T2F_QuadZero();

        // bottom-left vertex:
        var selQuad = quads[i];
        selQuad.bl.texCoords.u = left;
        selQuad.bl.texCoords.v = bottom;
        // bottom-right vertex:
        selQuad.br.texCoords.u = right;
        selQuad.br.texCoords.v = bottom;
        // top-left vertex:
        selQuad.tl.texCoords.u = left;
        selQuad.tl.texCoords.v = top;
        // top-right vertex:
        selQuad.tr.texCoords.u = right;
        selQuad.tr.texCoords.v = top;
    }
};

proto.setTotalParticles = function(tp){
    var node = this._node;
    // If we are setting the total numer of particles to a number higher
    // than what is allocated, we need to allocate new arrays
    if (tp > node._allocatedParticles) {
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        // Allocate new memory
        this._indices = new Uint16Array(tp * 6);
        var locQuadsArrayBuffer = new ArrayBuffer(tp * quadSize);
        //TODO need fix
        // Assign pointers
        var locParticles = node._particles;
        locParticles.length = 0;
        var locQuads = this._quads;
        locQuads.length = 0;
        for (var j = 0; j < tp; j++) {
            locParticles[j] = new cc.Particle();
            locQuads[j] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, locQuadsArrayBuffer, j * quadSize);
        }
        node._allocatedParticles = tp;
        node._totalParticles = tp;

        // Init particles
        if (node._batchNode) {
            for (var i = 0; i < tp; i++)
                locParticles[i].atlasIndex = i;
        }

        this._quadsArrayBuffer = locQuadsArrayBuffer;
        this.initIndices(tp);
        this._setupVBO();

        //set the texture coord
        if(node._texture){
            this.initTexCoordsWithRect(cc.rect(0, 0, node._texture.width, node._texture.height));
        }
    } else
        node._totalParticles = tp;
    node.resetSystem();
};

proto.addParticle = function(){
    var node = this._node,
        particles = node._particles;
    return particles[node.particleCount];
};

proto._setupVBO = function(){
    var node = this;
    var gl = cc._renderContext;

    //gl.deleteBuffer(this._buffersVBO[0]);
    this._buffersVBO[0] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
    gl.bufferData(gl.ARRAY_BUFFER, this._quadsArrayBuffer, gl.DYNAMIC_DRAW);

    this._buffersVBO[1] = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW);

    //cc.checkGLErrorDebug();
};

proto._allocMemory = function(){
    var node  = this._node;
    //cc.assert((!this._quads && !this._indices), "Memory already allocated");
    if(node._batchNode){
        cc.logID(6016);
        return false;
    }

    var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
    var totalParticles = node._totalParticles;
    var locQuads = this._quads;
    locQuads.length = 0;
    this._indices = new Uint16Array(totalParticles * 6);
    var locQuadsArrayBuffer = new ArrayBuffer(quadSize * totalParticles);

    for (var i = 0; i < totalParticles; i++)
        locQuads[i] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, locQuadsArrayBuffer, i * quadSize);
    if (!locQuads || !this._indices) {
        cc.logID(6013);
        return false;
    }
    this._quadsArrayBuffer = locQuadsArrayBuffer;
    return true;
};

proto.postStep = function(){
    var gl = cc._renderContext;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this._quadsArrayBuffer);
};

proto._setBlendAdditive = function(){
    var locBlendFunc = this._node._blendFunc;
    if (this._texture && !this._texture.hasPremultipliedAlpha()) {
        locBlendFunc.src = cc.macro.SRC_ALPHA;
        locBlendFunc.dst = cc.macro.ONE_MINUS_SRC_ALPHA;
    } else {
        locBlendFunc.src = cc.macro.BLEND_SRC;
        locBlendFunc.dst = cc.macro.BLEND_DST;
    }
};

proto._initWithTotalParticles = function(totalParticles){
    // allocating data space
    if (!this._allocMemory())
        return false;

    this.initIndices(totalParticles);
    this._setupVBO();

    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLOR);
};

proto._updateDeltaColor = function (selParticle, dt) {
    selParticle.color.r += selParticle.deltaColor.r * dt;
    selParticle.color.g += selParticle.deltaColor.g * dt;
    selParticle.color.b += selParticle.deltaColor.b * dt;
    selParticle.color.a += selParticle.deltaColor.a * dt;
    selParticle.isChangeColor = true;
};

/**
 * Copyright (c) 2008-2010 Ricardo Quesada
 * Copyright (c) 2011-2012 cocos2d-x.org
 * Copyright (c) 2013-2014 Chukong Technologies Inc.
 * Copyright (C) 2009 Matt Oswald
 * Copyright (c) 2011 Marco Tillemans
 *
 * http://www.cocos2d-x.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/**
 * <p>
 *    cc.ParticleBatchNode is like a batch node: if it contains children, it will draw them in 1 single OpenGL call  <br/>
 *    (often known as "batch draw").  </br>
 *
 *    A cc.ParticleBatchNode can reference one and only one texture (one image file, one texture atlas).<br/>
 *    Only the cc.ParticleSystems that are contained in that texture can be added to the cc.SpriteBatchNode.<br/>
 *    All cc.ParticleSystems added to a cc.SpriteBatchNode are drawn in one OpenGL ES draw call.<br/>
 *    If the cc.ParticleSystems are not added to a cc.ParticleBatchNode then an OpenGL ES draw call will be needed for each one, which is less efficient.</br>
 *
 *    Limitations:<br/>
 *    - At the moment only ccsg.ParticleSystem is supported<br/>
 *    - All systems need to be drawn with the same parameters, blend function, aliasing, texture<br/>
 *
 *    Most efficient usage<br/>
 *    - Initialize the ParticleBatchNode with the texture and enough capacity for all the particle systems<br/>
 *    - Initialize all particle systems and add them as child to the batch node<br/>
 * </p>
 * @class
 * @extends ccsg.ParticleSystem
 * @param {String|cc.Texture2D} fileImage
 * @param {Number} capacity
 *
 * @property {cc.Texture2D|HTMLImageElement|HTMLCanvasElement}  texture         - The used texture
 * @property {cc.TextureAtlas}                                  textureAtlas    - The texture atlas used for drawing the quads
 *
 * @example
 * 1.
 * //Create a cc.ParticleBatchNode with image path  and capacity
 * var particleBatchNode = new cc.ParticleBatchNode("res/grossini_dance.png",30);
 *
 * 2.
 * //Create a cc.ParticleBatchNode with a texture and capacity
 * var texture = cc.TextureCache.getInstance().addImage("res/grossini_dance.png");
 * var particleBatchNode = new cc.ParticleBatchNode(texture, 30);
 */
cc.ParticleBatchNode = _ccsg.Node.extend(/** @lends cc.ParticleBatchNode# */{
	textureAtlas:null,
    //the blend function used for drawing the quads
    _blendFunc:null,
    _className:"ParticleBatchNode",

    /**
     * initializes the particle system with the name of a file on disk (for a list of supported formats look at the cc.Texture2D class), a capacity of particles
     * Constructor of cc.ParticleBatchNode
     * @param {String|cc.Texture2D} fileImage
     * @param {Number} capacity
     * @example
     * 1.
     * //Create a cc.ParticleBatchNode with image path  and capacity
     * var particleBatchNode = new cc.ParticleBatchNode("res/grossini_dance.png",30);
     *
     * 2.
     * //Create a cc.ParticleBatchNode with a texture and capacity
     * var texture = cc.TextureCache.getInstance().addImage("res/grossini_dance.png");
     * var particleBatchNode = new cc.ParticleBatchNode(texture, 30);
     */
    ctor:function (fileImage, capacity) {
        _ccsg.Node.prototype.ctor.call(this);
        this._blendFunc = {src:cc.macro.BLEND_SRC, dst:cc.macro.BLEND_DST};
        if (cc.js.isString(fileImage)) {
            this.init(fileImage, capacity);
        } else if (fileImage instanceof cc.Texture2D) {
            this.initWithTexture(fileImage, capacity);
        }
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.ParticleBatchNode.CanvasRenderCmd(this);
        else
            return new cc.ParticleBatchNode.WebGLRenderCmd(this);
    },

    /**
     * initializes the particle system with cc.Texture2D, a capacity of particles
     * @param {cc.Texture2D|HTMLImageElement|HTMLCanvasElement} texture
     * @param {Number} capacity
     * @return {Boolean}
     */
    initWithTexture:function (texture, capacity) {
        this.textureAtlas = new cc.TextureAtlas();
        this.textureAtlas.initWithTexture(texture, capacity);

        // no lazy alloc in this node
        this._children.length = 0;

        this._renderCmd._initWithTexture();
        return true;
    },

    /**
     * initializes the particle system with the name of a file on disk (for a list of supported formats look at the cc.Texture2D class), a capacity of particles
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    initWithFile:function (fileImage, capacity) {
        var tex = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(tex, capacity);
    },

    /**
     * initializes the particle system with the name of a file on disk (for a list of supported formats look at the cc.Texture2D class), a capacity of particles
     * @param {String} fileImage
     * @param {Number} capacity
     * @return {Boolean}
     */
    init:function (fileImage, capacity) {
        var tex = cc.textureCache.addImage(fileImage);
        return this.initWithTexture(tex, capacity);
    },

    visit: function (parent) {
        var cmd = this._renderCmd, parentCmd = parent ? parent._renderCmd : null;

        // quick return if not visible
        if (!this._visible) {
            cmd._propagateFlagsDown(parentCmd);
            return;
        }

        cmd.visit(parentCmd);
        cc.renderer.pushRenderCommand(cmd);
        cmd._dirtyFlag = 0;
    },

    /**
     * Add a child into the cc.ParticleBatchNode
     * @param {ccsg.ParticleSystem} child
     * @param {Number} zOrder
     * @param {Number} tag
     */
    addChild:function (child, zOrder, tag) {
        if(!child)
            throw new Error("cc.ParticleBatchNode.addChild() : child should be non-null");
        if(!(child instanceof _ccsg.ParticleSystem))
            throw new Error("cc.ParticleBatchNode.addChild() : only supports _ccsg.ParticleSystem as children");
        zOrder = (zOrder == null) ? child.zIndex : zOrder;
        tag = (tag == null) ? child.tag : tag;

        if(child.getTexture() !== this.textureAtlas.texture)
            throw new Error("_ccsg.ParticleSystem.addChild() : the child is not using the same texture id");

        // If this is the 1st children, then copy blending function
        var childBlendFunc = child.getBlendFunc();
        if (this._children.length === 0)
            this.setBlendFunc(childBlendFunc);
        else{
            if((childBlendFunc.src !== this._blendFunc.src) || (childBlendFunc.dst !== this._blendFunc.dst)){
                cc.logID(6002);
                return;
            }
        }

        //no lazy sorting, so don't call super addChild, call helper instead
        var pos = this._addChildHelper(child, zOrder, tag);

        //get new atlasIndex
        var atlasIndex = 0;

        if (pos !== 0) {
            var p = this._children[pos - 1];
            atlasIndex = p.getAtlasIndex() + p.getTotalParticles();
        } else
            atlasIndex = 0;

        this.insertChild(child, atlasIndex);

        // update quad info
        child.setBatchNode(this);
    },

    /**
     * Inserts a child into the cc.ParticleBatchNode
     * @param {ccsg.ParticleSystem} pSystem
     * @param {Number} index
     */
    insertChild:function (pSystem, index) {
        var totalParticles = pSystem.getTotalParticles();
        var locTextureAtlas = this.textureAtlas;
        var totalQuads = locTextureAtlas.totalQuads;
        pSystem.setAtlasIndex(index);
        if (totalQuads + totalParticles > locTextureAtlas.getCapacity()) {
            this._increaseAtlasCapacityTo(totalQuads + totalParticles);
            // after a realloc empty quads of textureAtlas can be filled with gibberish (realloc doesn't perform calloc), insert empty quads to prevent it
            locTextureAtlas.fillWithEmptyQuadsFromIndex(locTextureAtlas.getCapacity() - totalParticles, totalParticles);
        }

        // make room for quads, not necessary for last child
        if (pSystem.getAtlasIndex() + totalParticles !== totalQuads)
            locTextureAtlas.moveQuadsFromIndex(index, index + totalParticles);

        // increase totalParticles here for new particles, update method of particlesystem will fill the quads
        locTextureAtlas.increaseTotalQuadsWith(totalParticles);
        this._updateAllAtlasIndexes();
    },

    /**
     * @param {ccsg.ParticleSystem} child
     * @param {Boolean} cleanup
     */
    removeChild:function (child, cleanup) {
        // explicit nil handling
        if (child == null)
            return;

        if(!(child instanceof _ccsg.ParticleSystem))
            throw new Error("cc.ParticleBatchNode.removeChild(): only supports _ccsg.ParticleSystem as children");
        if(this._children.indexOf(child) === -1){
            cc.logID(6003);
            return;
        }

        _ccsg.Node.prototype.removeChild.call(this, child, cleanup);

        var locTextureAtlas = this.textureAtlas;
        // remove child helper
        locTextureAtlas.removeQuadsAtIndex(child.getAtlasIndex(), child.getTotalParticles());

        // after memmove of data, empty the quads at the end of array
        locTextureAtlas.fillWithEmptyQuadsFromIndex(locTextureAtlas.totalQuads, child.getTotalParticles());

        // paticle could be reused for self rendering
        child.setBatchNode(null);

        this._updateAllAtlasIndexes();
    },

    /**
     * Reorder will be done in this function, no "lazy" reorder to particles
     * @param {ccsg.ParticleSystem} child
     * @param {Number} zOrder
     */
    reorderChild:function (child, zOrder) {
        if(!child)
            throw new Error("cc.ParticleBatchNode.reorderChild(): child should be non-null");
        if(!(child instanceof _ccsg.ParticleSystem))
            throw new Error("cc.ParticleBatchNode.reorderChild(): only supports cc.QuadParticleSystems as children");
        if(this._children.indexOf(child) === -1){
            cc.logID(6004);
            return;
        }

        if (zOrder === child.zIndex)
            return;

        // no reordering if only 1 child
        if (this._children.length > 1) {
            var getIndexes = this._getCurrentIndex(child, zOrder);

            if (getIndexes.oldIndex !== getIndexes.newIndex) {
                // reorder m_pChildren.array
                this._children.splice(getIndexes.oldIndex, 1)
                this._children.splice(getIndexes.newIndex, 0, child);

                // save old altasIndex
                var oldAtlasIndex = child.getAtlasIndex();

                // update atlas index
                this._updateAllAtlasIndexes();

                // Find new AtlasIndex
                var newAtlasIndex = 0;
                var locChildren = this._children;
                for (var i = 0; i < locChildren.length; i++) {
                    var pNode = locChildren[i];
                    if (pNode === child) {
                        newAtlasIndex = child.getAtlasIndex();
                        break;
                    }
                }

                // reorder textureAtlas quads
                this.textureAtlas.moveQuadsFromIndex(oldAtlasIndex, child.getTotalParticles(), newAtlasIndex);

                child.updateWithNoTime();
            }
        }
        child._setLocalZOrder(zOrder);
    },

    /**
     * @param {Number} index
     * @param {Boolean} doCleanup
     */
    removeChildAtIndex:function (index, doCleanup) {
        this.removeChild(this._children[i], doCleanup);
    },

    /**
     * @param {Boolean} doCleanup
     */
    removeAllChildren:function (doCleanup) {
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            locChildren[i].setBatchNode(null);
        }
        _ccsg.Node.prototype.removeAllChildren.call(this, doCleanup);
        this.textureAtlas.removeAllQuads();
    },

    /**
     * disables a particle by inserting a 0'd quad into the texture atlas
     * @param {Number} particleIndex
     */
    disableParticle:function (particleIndex) {
        var quad = this.textureAtlas.quads[particleIndex];
        quad.br.vertices.x = quad.br.vertices.y = quad.tr.vertices.x = quad.tr.vertices.y =
            quad.tl.vertices.x = quad.tl.vertices.y = quad.bl.vertices.x = quad.bl.vertices.y = 0.0;
        this.textureAtlas._setDirty(true);
    },

    /**
     * returns the used texture
     * @return {Texture2D}
     */
    getTexture:function () {
        return this.textureAtlas.texture;
    },

    /**
     * sets a new texture. it will be retained
     * @param {Texture2D} texture
     */
    setTexture:function (texture) {
        this.textureAtlas.texture = texture;

        // If the new texture has No premultiplied alpha, AND the blendFunc hasn't been changed, then update it
        var locBlendFunc = this._blendFunc;
        if (texture && !texture.hasPremultipliedAlpha() && ( locBlendFunc.src === cc.macro.BLEND_SRC && locBlendFunc.dst === cc.macro.BLEND_DST )) {
            locBlendFunc.src = cc.macro.SRC_ALPHA;
            locBlendFunc.dst = cc.macro.ONE_MINUS_SRC_ALPHA;
        }
    },

    /**
     * set the blending function used for the texture
     * @param {Number|Object} src
     * @param {Number} dst
     */
    setBlendFunc:function (src, dst) {
        if (dst === undefined){
            this._blendFunc.src = src.src;
            this._blendFunc.dst = src.dst;
        } else{
            this._blendFunc.src = src;
            this._blendFunc.src = dst;
        }
    },

    /**
     * returns the blending function used for the texture
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    _updateAllAtlasIndexes:function () {
        var index = 0;
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            child.setAtlasIndex(index);
            index += child.getTotalParticles();
        }
    },

    _increaseAtlasCapacityTo:function (quantity) {
        cc.logID(6006, this.textureAtlas.getCapacity(), quantity);

        if (!this.textureAtlas.resizeCapacity(quantity)) {
            // serious problems
            cc.logID(6005);
        }
    },

    _searchNewPositionInChildrenForZ:function (z) {
        var locChildren = this._children;
        var count = locChildren.length;
        for (var i = 0; i < count; i++) {
            if (locChildren[i].zIndex > z)
                return i;
        }
        return count;
    },

    _getCurrentIndex:function (child, z) {
        var foundCurrentIdx = false;
        var foundNewIdx = false;

        var newIndex = 0;
        var oldIndex = 0;

        var minusOne = 0, locChildren = this._children;
        var count = locChildren.length;
        for (var i = 0; i < count; i++) {
            var pNode = locChildren[i];
            // new index
            if (pNode.zIndex > z && !foundNewIdx) {
                newIndex = i;
                foundNewIdx = true;

                if (foundCurrentIdx && foundNewIdx)
                    break;
            }
            // current index
            if (child === pNode) {
                oldIndex = i;
                foundCurrentIdx = true;
                if (!foundNewIdx)
                    minusOne = -1;
                if (foundCurrentIdx && foundNewIdx)
                    break;
            }
        }
        if (!foundNewIdx)
            newIndex = count;
        newIndex += minusOne;
        return {newIndex:newIndex, oldIndex:oldIndex};
    },

    //
    // <p>
    //     don't use lazy sorting, reordering the particle systems quads afterwards would be too complex                                    <br/>
    //     XXX research whether lazy sorting + freeing current quads and calloc a new block with size of capacity would be faster           <br/>
    //     XXX or possibly using vertexZ for reordering, that would be fastest                                                              <br/>
    //     this helper is almost equivalent to CCNode's addChild, but doesn't make use of the lazy sorting                                  <br/>
    // </p>
    // @param {ccsg.ParticleSystem} child
    // @param {Number} z
    // @param {Number} aTag
    // @return {Number}
    // @private
    //
    _addChildHelper:function (child, z, aTag) {
        if(!child)
            throw new Error("cc.ParticleBatchNode._addChildHelper(): child should be non-null");
        if(child.parent){
            cc.logID(6007);
            return null;
        }


        if (!this._children)
            this._children = [];

        //don't use a lazy insert
        var pos = this._searchNewPositionInChildrenForZ(z);

        this._children.splice(pos, 0, child);
        child.tag = aTag;
        child._setLocalZOrder(z);
        child.parent = this;
        if (this._running) {
            child.performRecursive(_ccsg.Node.performType.onEnter);
            child.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish);
        }
        return pos;
    },

    _updateBlendFunc:function () {
        if (!this.textureAtlas.texture.hasPremultipliedAlpha()) {
            this._blendFunc.src = cc.macro.SRC_ALPHA;
            this._blendFunc.dst = cc.macro.ONE_MINUS_SRC_ALPHA;
        }
    },

    /**
     * return the texture atlas used for drawing the quads
     * @return {cc.TextureAtlas}
     */
    getTextureAtlas:function () {
        return this.textureAtlas;
    },

    /**
     * set the texture atlas used for drawing the quads
     * @param {cc.TextureAtlas} textureAtlas
     */
    setTextureAtlas:function (textureAtlas) {
        this.textureAtlas = textureAtlas;
    }
});

var _p = cc.ParticleBatchNode.prototype;

// Extended properties
/** @expose */
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * cc.ParticleBatchNode's rendering objects of Canvas
 */
cc.ParticleBatchNode.CanvasRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = false;
};

var proto = cc.ParticleBatchNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.ParticleBatchNode.CanvasRenderCmd;

proto._initWithTexture = function(){};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * cc.ParticleBatchNode's rendering objects of WebGL
 */
cc.ParticleBatchNode.WebGLRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = true;
    this._matrix = new cc.math.Matrix4();
    this._matrix.identity();
};

var proto = cc.ParticleBatchNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = cc.ParticleBatchNode.WebGLRenderCmd;

proto.rendering = function (ctx) {
    var _t = this._node;
    if (_t.textureAtlas.totalQuads === 0)
        return;

    var wt = this._worldTransform, mat = this._matrix.mat;
    mat[0] = wt.a;
    mat[4] = wt.c;
    mat[12] = wt.tx;
    mat[1] = wt.b;
    mat[5] = wt.d;
    mat[13] = wt.ty;

    this._shaderProgram.use();
    this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
    cc.gl.blendFuncForParticle(_t._blendFunc.src, _t._blendFunc.dst);
    _t.textureAtlas.drawQuads();
};

proto._initWithTexture = function(){
    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLOR);
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * <p>_ccsg.TMXTiledMap knows how to parse and render a TMX map.</p>
 *
 * <p>It adds support for the TMX tiled map format used by http://www.mapeditor.org <br />
 * It supports isometric, hexagonal and orthogonal tiles.<br />
 * It also supports object groups, objects, and properties.</p>
 *
 * <p>Features: <br />
 * - Each tile will be treated as an _ccsg.Sprite<br />
 * - The sprites are created on demand. They will be created only when you call "layer.getTileAt(position)" <br />
 * - Each tile can be rotated / moved / scaled / tinted / "opacitied", since each tile is a _ccsg.Sprite<br />
 * - Tiles can be added/removed in runtime<br />
 * - The z-order of the tiles can be modified in runtime<br />
 * - Each tile has an anchorPoint of (0,0) <br />
 * - The anchorPoint of the TMXTileMap is (0,0) <br />
 * - The TMX layers will be added as a child <br />
 * - The TMX layers will be aliased by default <br />
 * - The tileset image will be loaded using the cc.TextureCache <br />
 * - Each tile will have a unique tag<br />
 * - Each tile will have a unique z value. top-left: z=1, bottom-right: z=max z<br />
 * - Each object group will be treated as an cc.MutableArray <br />
 * - Object class which will contain all the properties in a dictionary<br />
 * - Properties can be assigned to the Map, Layer, Object Group, and Object</p>
 *
 * <p>Limitations: <br />
 * - It only supports one tileset per layer. <br />
 * - Embeded images are not supported <br />
 * - It only supports the XML format (the JSON format is not supported)</p>
 *
 * <p>Technical description: <br />
 * Each layer is created using an _ccsg.TMXLayer (subclass of cc.SpriteBatchNode). If you have 5 layers, then 5 _ccsg.TMXLayer will be created, <br />
 * unless the layer visibility is off. In that case, the layer won't be created at all. <br />
 * You can obtain the layers (_ccsg.TMXLayer objects) at runtime by: <br />
 * - map.getChildByTag(tag_number);  // 0=1st layer, 1=2nd layer, 2=3rd layer, etc...<br />
 * - map.getLayer(name_of_the_layer); </p>
 *
 * <p>Each object group is created using a cc.TMXObjectGroup which is a subclass of cc.MutableArray.<br />
 * You can obtain the object groups at runtime by: <br />
 * - map.getObjectGroup(name_of_the_object_group); </p>
 *
 * <p>Each object is a cc.TMXObject.</p>
 *
 * <p>Each property is stored as a key-value pair in an cc.MutableDictionary.<br />
 * You can obtain the properties at runtime by: </p>
 *
 * <p>map.getProperty(name_of_the_property); <br />
 * layer.getProperty(name_of_the_property); <br />
 * objectGroup.getProperty(name_of_the_property); <br />
 * object.getProperty(name_of_the_property);</p>
 * @class
 * @extends _ccsg.Node
 * @param {String} tmxFile tmxFile fileName or content string
 * @param {String} resourcePath   If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.

 *
 * @property {Array}    properties      - Properties from the map. They can be added using tilemap editors
 * @property {Number}   mapOrientation  - Map orientation
 * @property {Number}   mapWidth        - Width of the map
 * @property {Number}   mapHeight       - Height of the map
 * @property {Number}   tileWidth       - Width of a tile
 * @property {Number}   tileHeight      - Height of a tile
 *
 * @example
 * //example
 * 1.
 * //create a TMXTiledMap with file name
 * var tmxTiledMap = new _ccsg.TMXTiledMap("res/orthogonal-test1.tmx");
 * 2.
 * //create a TMXTiledMap with content string and resource path
 * var resources = "res/TileMaps";
 * var filePath = "res/TileMaps/orthogonal-test1.tmx";
 * var xmlStr = cc.loader.getRes(filePath);
 * var tmxTiledMap = new _ccsg.TMXTiledMap(xmlStr, resources);
 */
_ccsg.TMXTiledMap = _ccsg.Node.extend(/** @lends _ccsg.TMXTiledMap# */{
	properties: null,
	mapOrientation: null,

    //the map's size property measured in tiles
    _mapSize: null,
    _tileSize: null,
    //tile properties
    _tileProperties: null,
    _className: "TMXTiledMap",

    /**
     * Creates a TMX Tiled Map with a TMX file  or content string. <br/>
     * Constructor of _ccsg.TMXTiledMap
     * @param {String} tmxFile tmxFile fileName or content string
     * @param {String} resourcePath   If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
     */
    ctor:function(tmxFile,resourcePath){
        _ccsg.Node.prototype.ctor.call(this);
        this._mapSize = cc.size(0, 0);
        this._tileSize = cc.size(0, 0);

        if(resourcePath !== undefined){
            this.initWithXML(tmxFile,resourcePath);
        }else if(tmxFile !== undefined){
            this.initWithTMXFile(tmxFile);
        }
    },

    /**
     * Gets the map size.
     * @return {Size}
     */
    getMapSize:function () {
        return cc.size(this._mapSize.width, this._mapSize.height);
    },

    /**
     * Set the map size.
     * @param {Size} Var
     */
    setMapSize:function (Var) {
        this._mapSize.width = Var.width;
        this._mapSize.height = Var.height;
    },

	_getMapWidth: function () {
		return this._mapSize.width;
	},
	_setMapWidth: function (width) {
		this._mapSize.width = width;
	},
	_getMapHeight: function () {
		return this._mapSize.height;
	},
	_setMapHeight: function (height) {
		this._mapSize.height = height;
	},

    /**
     * Gets the tile size.
     * @return {Size}
     */
    getTileSize:function () {
        return cc.size(this._tileSize.width, this._tileSize.height);
    },

    /**
     * Set the tile size
     * @param {Size} Var
     */
    setTileSize:function (Var) {
        this._tileSize.width = Var.width;
        this._tileSize.height = Var.height;
    },

	_getTileWidth: function () {
		return this._tileSize.width;
	},
	_setTileWidth: function (width) {
		this._tileSize.width = width;
	},
	_getTileHeight: function () {
		return this._tileSize.height;
	},
	_setTileHeight: function (height) {
		this._tileSize.height = height;
	},

    /**
     * map orientation
     * @return {Number}
     */
    getMapOrientation:function () {
        return this.mapOrientation;
    },

    /**
     * map orientation
     * @param {Number} Var
     */
    setMapOrientation:function (Var) {
        this.mapOrientation = Var;
    },

    /**
     * object groups
     * @return {Array}
     */
    getObjectGroups:function () {
        var retArr = [], locChildren = this._children;
        for(var i = 0, len = locChildren.length;i< len;i++){
            var group = locChildren[i];
            if(group && group instanceof _ccsg.TMXObjectGroup)
                retArr.push(group);
        }
        return retArr;
    },

    /**
     * Gets the properties
     * @return {object}
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * Set the properties
     * @param {object} Var
     */
    setProperties:function (Var) {
        this.properties = Var;
    },

    /**
     * Initializes the instance of _ccsg.TMXTiledMap with tmxFile
     * @param {String} tmxFile
     * @return {Boolean} Whether the initialization was successful.
     * @example
     * //example
     * var map = new _ccsg.TMXTiledMap()
     * map.initWithTMXFile("hello.tmx");
     */
    initWithTMXFile:function (tmxFile) {
        if(!tmxFile || tmxFile.length === 0) {
            return false;
        }
	    this.width = 0;
	    this.height = 0;
        var mapInfo = new cc.TMXMapInfo(tmxFile);
        if (!mapInfo)
            return false;

        var locTilesets = mapInfo.getTilesets();
        if(!locTilesets || locTilesets.length === 0)
            cc.logID(7212);
        this._buildWithMapInfo(mapInfo);
        return true;
    },

    /**
     * Initializes the instance of _ccsg.TMXTiledMap with tmxString
     * @param {String} tmxString
     * @param {String} resourcePath
     * @return {Boolean} Whether the initialization was successful.
     */
    initWithXML:function(tmxString, resourcePath){
        this.width = 0;
	    this.height = 0;

        var mapInfo = new cc.TMXMapInfo(tmxString, resourcePath);
        var locTilesets = mapInfo.getTilesets();
        if(!locTilesets || locTilesets.length === 0)
            cc.logID(7213);
        this._buildWithMapInfo(mapInfo);
        return true;
    },

    _buildWithMapInfo:function (mapInfo) {
        this._mapSize = mapInfo.getMapSize();
        this._tileSize = mapInfo.getTileSize();
        this.mapOrientation = mapInfo.orientation;
        this.properties = mapInfo.properties;
        this._tileProperties = mapInfo.getTileProperties();

        // remove the layers & object groups added before
        var oldChildren = this._children;
        var childCount = oldChildren.length;
        for(var j = childCount - 1; j >= 0; j--){
            var childNode = oldChildren[j];
            if (childNode && (childNode instanceof _ccsg.TMXLayer || childNode instanceof _ccsg.TMXObjectGroup))
                this.removeChild(childNode);
        }

        var idx = 0;
        var children = mapInfo.getAllChildren();
        if (children && children.length > 0) {
            for (var i = 0, len = children.length; i < len; i++) {
                var childInfo = children[i];
                var child;
                if (childInfo instanceof cc.TMXLayerInfo && childInfo.visible) {
                    child = this._parseLayer(childInfo, mapInfo);
                    this.addChild(child, idx, idx);
                    // update content size with the max size
                    this.width = Math.max(this.width, child.width);
                    this.height = Math.max(this.height, child.height);
                    idx++;
                }

                if (childInfo instanceof  cc.TMXObjectGroupInfo) {
                    child = new _ccsg.TMXObjectGroup(childInfo, mapInfo);
                    this.addChild(child, idx, idx);
                    idx++;
                }
            }
        }
    },

    /**
     * Return All layers array.
     * @returns {Array}
     */
    allLayers: function () {
        var retArr = [], locChildren = this._children;
        for(var i = 0, len = locChildren.length;i< len;i++){
            var layer = locChildren[i];
            if(layer && layer instanceof _ccsg.TMXLayer)
                retArr.push(layer);
        }
        return retArr;
    },

    /**
     * return the TMXLayer for the specific layer
     * @param {String} layerName
     * @return {_ccsg.TMXLayer}
     */
    getLayer:function (layerName) {
        if(!layerName || layerName.length === 0)
            throw new Error("_ccsg.TMXTiledMap.getLayer(): layerName should be non-null or non-empty string.");
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var layer = locChildren[i];
            if (layer && layer instanceof _ccsg.TMXLayer && layer.layerName === layerName)
                return layer;
        }
        // layer not found
        return null;
    },

    /**
     * Return the TMXObjectGroup for the specific group
     * @param {String} groupName
     * @return {cc.TMXObjectGroup}
     */
    getObjectGroup:function (groupName) {
        if(!groupName || groupName.length === 0)
            throw new Error("_ccsg.TMXTiledMap.getObjectGroup(): groupName should be non-null or non-empty string.");
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var group = locChildren[i];
            if (group && group instanceof _ccsg.TMXObjectGroup && group.groupName === groupName)
                return group;
        }
        // objectGroup not found
        return null;
    },

    /**
     * Return the value for the specific property name
     * @param {String} propertyName
     * @return {String}
     */
    getProperty:function (propertyName) {
        return this.properties[propertyName.toString()];
    },

    /**
     * Return properties dictionary for tile GID
     * @param {Number} GID
     * @return {object}
     * @deprecated
     */
    propertiesForGID:function (GID) {
        cc.logID(7214);
        return this.getPropertiesForGID[GID];
    },

    /**
     * Return properties dictionary for tile GID
     * @param {Number} GID
     * @return {object}
     */
    getPropertiesForGID: function(GID) {
        return this._tileProperties[GID];
    },

    _parseLayer:function (layerInfo, mapInfo) {
        var tileset = this._tilesetForLayer(layerInfo, mapInfo);
        var layer = new _ccsg.TMXLayer(tileset, layerInfo, mapInfo);
        // tell the layerinfo to release the ownership of the tiles map.
        layerInfo.ownTiles = false;
        return layer;
    },

    _tilesetForLayer:function (layerInfo, mapInfo) {
        var size = layerInfo._layerSize;
        var tilesets = mapInfo.getTilesets();
        if (tilesets) {
            for (var i = tilesets.length - 1; i >= 0; i--) {
                var tileset = tilesets[i];
                if (tileset) {
                    for (var y = 0; y < size.height; y++) {
                        for (var x = 0; x < size.width; x++) {
                            var pos = x + size.width * y;
                            var gid = layerInfo._tiles[pos];
                            if (gid !== 0) {
                                // Optimization: quick return
                                // if the layer is invalid (more than 1 tileset per layer) an cc.assert will be thrown later
                                if (((gid & cc.TiledMap.TileFlag.FLIPPED_MASK)>>>0) >= tileset.firstGid) {
                                    return tileset;
                                }
                            }

                        }
                    }
                }
            }
        }

        // If all the tiles are 0, return empty tileset
        cc.logID(7215, layerInfo.name);
        return null;
    }
});

var _p = _ccsg.TMXTiledMap.prototype;

// Extended properties
/** @expose */
_p.mapWidth;
cc.defineGetterSetter(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
/** @expose */
_p.mapHeight;
cc.defineGetterSetter(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
/** @expose */
_p.tileWidth;
cc.defineGetterSetter(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
/** @expose */
_p.tileHeight;
cc.defineGetterSetter(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

function uint8ArrayToUint32Array (uint8Arr) {
    if(uint8Arr.length % 4 !== 0)
        return null;

    var arrLen = uint8Arr.length /4;
    var retArr = window.Uint32Array? new Uint32Array(arrLen) : [];
    for(var i = 0; i < arrLen; i++){
        var offset = i * 4;
        retArr[i] = uint8Arr[offset]  + uint8Arr[offset + 1] * (1 << 8) + uint8Arr[offset + 2] * (1 << 16) + uint8Arr[offset + 3] * (1<<24);
    }
    return retArr;
};

// Bits on the far end of the 32-bit global tile ID (GID's) are used for tile flags

/**
 * <p>cc.TMXLayerInfo contains the information about the layers like: <br />
 * - Layer name<br />
 * - Layer size <br />
 * - Layer opacity at creation time (it can be modified at runtime)  <br />
 * - Whether the layer is visible (if it's not visible, then the CocosNode won't be created) <br />
 *  <br />
 * This information is obtained from the TMX file.</p>
 * @class
 * @extends cc._Class
 *
 * @property {Array}    properties  - Properties of the layer info.
 */
cc.TMXLayerInfo = cc._Class.extend(/** @lends cc.TMXLayerInfo# */{

    ctor:function () {
        this.properties = {};
        this.name = "";
        this._layerSize = null;
        this._tiles = [];
        this.visible = true;
        this._opacity = 0;
        this.ownTiles = true;
        this._minGID = 100000;
        this._maxGID = 0;
        this.offset = cc.p(0,0);
    },

    /**
     * Gets the Properties.
     * @return {Array}
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * Set the Properties.
     * @param {object} value
     */
    setProperties:function (value) {
        this.properties = value;
    }
});

/**
 * <p>cc.TMXObjectGroupInfo contains the information about the object group like: <br />
 * - group name<br />
 * - group size <br />
 * - group opacity at creation time (it can be modified at runtime)  <br />
 * - Whether the group is visible <br />
 *  <br />
 * This information is obtained from the TMX file.</p>
 * @class
 * @extends cc._Class
 *
 * @property {Array}    properties  - Properties of the ObjectGroup info.
 */
cc.TMXObjectGroupInfo = cc._Class.extend(/** @lends cc.TMXObjectGroupInfo# */{

    ctor:function () {
        this.properties = {};
        this.name = "";
        this._objects = [];
        this.visible = true;
        this._opacity = 0;
        this._color = new cc.Color(255, 255, 255, 255);
        this.offset = cc.p(0,0);
        this._draworder = 'topdown';
    },

    /**
     * Gets the Properties.
     * @return {Array}
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * Set the Properties.
     * @param {object} value
     */
    setProperties:function (value) {
        this.properties = value;
    }
});

/**
 * <p>cc.TMXTilesetInfo contains the information about the tilesets like: <br />
 * - Tileset name<br />
 * - Tileset spacing<br />
 * - Tileset margin<br />
 * - size of the tiles<br />
 * - Image used for the tiles<br />
 * - Image size<br />
 *
 * This information is obtained from the TMX file. </p>
 * @class
 * @extends cc._Class
 *
 * @property {string} name - Tileset name
 * @property {number} firstGid - First grid
 * @property {number} spacing - Spacing
 * @property {number} margin - Margin
 * @property {string} sourceImage - Filename containing the tiles (should be sprite sheet / texture atlas)
 * @property {cc.Size|null} imageSize - Size in pixels of the image
 */
cc.TMXTilesetInfo = cc._Class.extend(/** @lends cc.TMXTilesetInfo# */{

    ctor:function () {
        // Tileset name
        this.name = "";
        // First grid
        this.firstGid = 0;
        // Spacing
        this.spacing = 0;
        // Margin
        this.margin = 0;
        // Filename containing the tiles (should be sprite sheet / texture atlas)
        this.sourceImage = "";
        // Size in pixels of the image
        this.imageSize = cc.size(0, 0);

        this.tileOffset = cc.p(0, 0);

        this._tileSize = cc.size(0, 0);
    },

    /**
     * Return rect
     * @param {Number} gid
     * @return {Rect}
     */
    rectForGID:function (gid, result) {
        var rect = result || cc.rect(0, 0, 0, 0);
        rect.width = this._tileSize.width;
        rect.height = this._tileSize.height;
        gid &= cc.TiledMap.TileFlag.FLIPPED_MASK;
        gid = gid - parseInt(this.firstGid, 10);
        var max_x = parseInt((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing), 10);
        rect.x = parseInt((gid % max_x) * (this._tileSize.width + this.spacing) + this.margin, 10);
        rect.y = parseInt(parseInt(gid / max_x, 10) * (this._tileSize.height + this.spacing) + this.margin, 10);
        return rect;
    }
});

/**
 * <p>cc.TMXMapInfo contains the information about the map like: <br/>
 *- Map orientation (hexagonal, isometric or orthogonal)<br/>
 *- Tile size<br/>
 *- Map size</p>
 *
 * <p>And it also contains: <br/>
 * - Layers (an array of TMXLayerInfo objects)<br/>
 * - Tilesets (an array of TMXTilesetInfo objects) <br/>
 * - ObjectGroups (an array of TMXObjectGroupInfo objects) </p>
 *
 * <p>This information is obtained from the TMX file. </p>
 * @class
 * @extends cc.saxParser
 *
 * @property {Array}    properties          - Properties of the map info.
 * @property {Number}   orientation         - Map orientation.
 * @property {Object}   parentElement       - Parent element.
 * @property {Number}   parentGID           - Parent GID.
 * @property {Object}   layerAttrs        - Layer attributes.
 * @property {Boolean}  storingCharacters   - Is reading storing characters stream.
 * @property {String}   tmxFileName         - TMX file name.
 * @property {String}   currentString       - Current string stored from characters stream.
 * @property {Number}   mapWidth            - Width of the map
 * @property {Number}   mapHeight           - Height of the map
 * @property {Number}   tileWidth           - Width of a tile
 * @property {Number}   tileHeight          - Height of a tile
 *
 * @param {String} tmxFile fileName or content string
 * @param {String} resourcePath  If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
 * @example
 * 1.
 * //create a TMXMapInfo with file name
 * var tmxMapInfo = new cc.TMXMapInfo("res/orthogonal-test1.tmx");
 * 2.
 * //create a TMXMapInfo with content string and resource path
 * var resources = "res/TileMaps";
 * var filePath = "res/TileMaps/orthogonal-test1.tmx";
 * var xmlStr = cc.loader.getRes(filePath);
 * var tmxMapInfo = new cc.TMXMapInfo(xmlStr, resources);
 */
cc.TMXMapInfo = cc.SAXParser.extend(/** @lends cc.TMXMapInfo# */{
	properties:null,
    orientation:null,
	parentElement:null,
	parentGID:null,
	layerAttrs:0,
	storingCharacters:false,
	tmxFileName:null,
	currentString:null,

	_objectGroups:null,
    _allChildren: null,
    _mapSize:null,
    _tileSize:null,
    _layers:null,
    _tilesets:null,
    // tile properties
    _tileProperties:null,
    _resources:"",

    // hex map values
    _staggerAxis: null,
    _staggerIndex: null,
    _hexSideLength: 0,

    /**
     * Creates a TMX Format with a tmx file or content string                           <br/>
     * Constructor of cc.TMXMapInfo
     * @param {String} tmxFile fileName or content string
     * @param {String} resourcePath  If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
     */
    ctor:function (tmxFile, resourcePath) {
        cc.SAXParser.prototype.ctor.apply(this);
        this._mapSize = cc.size(0, 0);
        this._tileSize = cc.size(0, 0);
        this._layers = [];
        this._tilesets = [];
        this._objectGroups = [];
        this._allChildren = [];
        this.properties = [];
        this._tileProperties = {};

        if (resourcePath !== undefined) {
            this.initWithXML(tmxFile,resourcePath);
        } else if(tmxFile !== undefined){
            this.initWithTMXFile(tmxFile);
        }
    },
    /**
     * Gets Map orientation.
     * @return {Number}
     */
    getOrientation:function () {
        return this.orientation;
    },

    /**
     * Set the Map orientation.
     * @param {Number} value
     */
    setOrientation:function (value) {
        this.orientation = value;
    },

    /**
     * Gets the staggerAxis of map.
     * @return {cc.TiledMap.StaggerAxis}
     */
    getStaggerAxis:function () {
        return this._staggerAxis;
    },

    /**
     * Set the staggerAxis of map.
     * @param {cc.TiledMap.StaggerAxis} value
     */
    setStaggerAxis:function (value) {
        this._staggerAxis = value;
    },

    /**
     * Gets stagger index
     * @return {cc.TiledMap.StaggerIndex}
     */
    getStaggerIndex:function () {
        return this._staggerIndex;
    },

    /**
     * Set the stagger index.
     * @param {cc.TiledMap.StaggerIndex} value
     */
    setStaggerIndex:function (value) {
        this._staggerIndex = value;
    },

    /**
     * Gets Hex side length.
     * @return {Number}
     */
    getHexSideLength:function () {
        return this._hexSideLength;
    },

    /**
     * Set the Hex side length.
     * @param {Number} value
     */
    setHexSideLength:function (value) {
        this._hexSideLength = value;
    },

    /**
     * Map width & height
     * @return {Size}
     */
    getMapSize:function () {
        return cc.size(this._mapSize.width,this._mapSize.height);
    },

    /**
     * Map width & height
     * @param {Size} value
     */
    setMapSize:function (value) {
        this._mapSize.width = value.width;
        this._mapSize.height = value.height;
    },

	_getMapWidth: function () {
		return this._mapSize.width;
	},
	_setMapWidth: function (width) {
		this._mapSize.width = width;
	},
	_getMapHeight: function () {
		return this._mapSize.height;
	},
	_setMapHeight: function (height) {
		this._mapSize.height = height;
	},

    /**
     * Tiles width & height
     * @return {Size}
     */
    getTileSize:function () {
        return cc.size(this._tileSize.width, this._tileSize.height);
    },

    /**
     * Tiles width & height
     * @param {Size} value
     */
    setTileSize:function (value) {
        this._tileSize.width = value.width;
        this._tileSize.height = value.height;
    },

	_getTileWidth: function () {
		return this._tileSize.width;
	},
	_setTileWidth: function (width) {
		this._tileSize.width = width;
	},
	_getTileHeight: function () {
		return this._tileSize.height;
	},
	_setTileHeight: function (height) {
		this._tileSize.height = height;
	},

    /**
     * Layers
     * @return {Array}
     */
    getLayers:function () {
        return this._layers;
    },

    /**
     * Layers
     * @param {cc.TMXLayerInfo} value
     */
    setLayers:function (value) {
        this._allChildren.push(value);
        this._layers.push(value);
    },

    /**
     * tilesets
     * @return {Array}
     */
    getTilesets:function () {
        return this._tilesets;
    },

    /**
     * tilesets
     * @param {cc.TMXTilesetInfo} value
     */
    setTilesets:function (value) {
        this._tilesets.push(value);
    },

    /**
     * ObjectGroups
     * @return {Array}
     */
    getObjectGroups:function () {
        return this._objectGroups;
    },

    /**
     * ObjectGroups
     * @param {cc.TMXObjectGroup} value
     */
    setObjectGroups:function (value) {
        this._allChildren.push(value);
        this._objectGroups.push(value);
    },

    getAllChildren: function() {
        return this._allChildren;
    },

    /**
     * parent element
     * @return {Object}
     */
    getParentElement:function () {
        return this.parentElement;
    },

    /**
     * parent element
     * @param {Object} value
     */
    setParentElement:function (value) {
        this.parentElement = value;
    },

    /**
     * parent GID
     * @return {Number}
     */
    getParentGID:function () {
        return this.parentGID;
    },

    /**
     * parent GID
     * @param {Number} value
     */
    setParentGID:function (value) {
        this.parentGID = value;
    },

    /**
     * Layer attribute
     * @return {Object}
     */
    getLayerAttribs:function () {
        return this.layerAttrs;
    },

    /**
     * Layer attribute
     * @param {Object} value
     */
    setLayerAttribs:function (value) {
        this.layerAttrs = value;
    },

    /**
     * Is reading storing characters stream
     * @return {Boolean}
     */
    getStoringCharacters:function () {
        return this.storingCharacters;
    },

    /**
     * Is reading storing characters stream
     * @param {Boolean} value
     */
    setStoringCharacters:function (value) {
        this.storingCharacters = value;
    },

    /**
     * Properties
     * @return {Array}
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * Properties
     * @param {object} value
     */
    setProperties:function (value) {
        this.properties = value;
    },

    /**
     * Initializes a TMX format with a  tmx file
     * @param {String} tmxFile
     * @return {Element}
     */
    initWithTMXFile:function (tmxFile) {
        this._internalInit(tmxFile, null);
        return this.parseXMLFile(tmxFile);
    },

    /**
     * initializes a TMX format with an XML string and a TMX resource path
     * @param {String} tmxString
     * @param {String} resourcePath
     * @return {Boolean}
     */
    initWithXML:function (tmxString, resourcePath) {
        this._internalInit(null, resourcePath);
        return this.parseXMLString(tmxString);
    },

    /** Initalises parsing of an XML file, either a tmx (Map) file or tsx (Tileset) file
     * @param {String} tmxFile
     * @param {boolean} [isXmlString=false]
     * @param {Number} tilesetFirstGid
     * @return {Element}
     */
    parseXMLFile:function (tmxFile, isXmlString, tilesetFirstGid) {
        isXmlString = isXmlString || false;
	    var xmlStr = isXmlString ? tmxFile : cc.loader.getRes(tmxFile);
        if(!xmlStr) throw new Error("Please load the resource first : " + tmxFile);

        var mapXML = this._parseXML(xmlStr);
        var i, j;

        // PARSE <map>
        var map = mapXML.documentElement;

        var version = map.getAttribute('version');
        var orientationStr = map.getAttribute('orientation');
        var staggerAxisStr = map.getAttribute('staggeraxis');
        var staggerIndexStr = map.getAttribute('staggerindex');
        var hexSideLengthStr = map.getAttribute('hexsidelength');

        if (map.nodeName === "map") {
            if (version !== "1.0" && version !== null)
                cc.logID(7216, version);

            if (orientationStr === "orthogonal")
                this.orientation = cc.TiledMap.Orientation.ORTHO;
            else if (orientationStr === "isometric")
                this.orientation = cc.TiledMap.Orientation.ISO;
            else if (orientationStr === "hexagonal")
                this.orientation = cc.TiledMap.Orientation.HEX;
            else if (orientationStr !== null)
                cc.logID(7217, orientationStr);

            if (staggerAxisStr === 'x') {
                this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_X);
            }
            else if (staggerAxisStr === 'y') {
                this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_Y);
            }

            if (staggerIndexStr === 'odd') {
                this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD);
            }
            else if (staggerIndexStr === 'even') {
                this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN);
            }

            if (hexSideLengthStr) {
                this.setHexSideLength(parseFloat(hexSideLengthStr));
            }

            var mapSize = cc.size(0, 0);
            mapSize.width = parseFloat(map.getAttribute('width'));
            mapSize.height = parseFloat(map.getAttribute('height'));
            this.setMapSize(mapSize);

            mapSize = cc.size(0, 0);
            mapSize.width = parseFloat(map.getAttribute('tilewidth'));
            mapSize.height = parseFloat(map.getAttribute('tileheight'));
            this.setTileSize(mapSize);

            // The parent element is the map
            var propertyArr = map.querySelectorAll("map > properties >  property");
            if (propertyArr) {
                var aPropertyDict = {};
                for (i = 0; i < propertyArr.length; i++) {
                    aPropertyDict[propertyArr[i].getAttribute('name')] = propertyArr[i].getAttribute('value');
                }
                this.properties = aPropertyDict;
            }
        }

        // PARSE <tileset>
        var tilesets = map.getElementsByTagName('tileset');
        if (map.nodeName !== "map") {
            tilesets = [];
            tilesets.push(map);
        }

        for (i = 0; i < tilesets.length; i++) {
            var selTileset = tilesets[i];
            // If this is an external tileset then start parsing that
            var tsxName = selTileset.getAttribute('source');
            if (tsxName) {
                var currentFirstGID = parseInt(selTileset.getAttribute('firstgid'));
                var tsxPath = isXmlString ? cc.path.join(this._resources, tsxName) : cc.path.changeBasename(tmxFile, tsxName);
                this.parseXMLFile(tsxPath, false, currentFirstGID);
            } else {
                var tileset = new cc.TMXTilesetInfo();
                tileset.name = selTileset.getAttribute('name') || "";
                if (tilesetFirstGid) {
                    tileset.firstGid = tilesetFirstGid;
                } else {
                    tileset.firstGid = parseInt(selTileset.getAttribute('firstgid')) || 0;
                }

                tileset.spacing = parseInt(selTileset.getAttribute('spacing')) || 0;
                tileset.margin = parseInt(selTileset.getAttribute('margin')) || 0;

                var tilesetSize = cc.size(0, 0);
                tilesetSize.width = parseFloat(selTileset.getAttribute('tilewidth'));
                tilesetSize.height = parseFloat(selTileset.getAttribute('tileheight'));
                tileset._tileSize = tilesetSize;

                var image = selTileset.getElementsByTagName('image')[0];
                var imagename = image.getAttribute('source');
                var num = -1;
                if(this.tmxFileName)
                    num  = this.tmxFileName.lastIndexOf("/");
                if (num !== -1) {
                    var dir = this.tmxFileName.substr(0, num + 1);
                    tileset.sourceImage = dir + imagename;
                } else {
                    tileset.sourceImage = this._resources + (this._resources ? "/" : "") + imagename;
                }
                this.setTilesets(tileset);

                // parse tile offset
                var offset = selTileset.getElementsByTagName('tileoffset')[0];
                if (offset) {
                    var offsetX = parseFloat(offset.getAttribute('x'));
                    var offsetY = parseFloat(offset.getAttribute('y'));
                    tileset.tileOffset = cc.p(offsetX, offsetY);
                }

                // PARSE  <tile>
                var tiles = selTileset.getElementsByTagName('tile');
                if (tiles) {
                    for (var tIdx = 0; tIdx < tiles.length; tIdx++) {
                        var t = tiles[tIdx];
                        this.parentGID = parseInt(tileset.firstGid) + parseInt(t.getAttribute('id') || 0);
                        var tp = t.querySelectorAll("properties > property");
                        if (tp) {
                            var dict = {};
                            for (j = 0; j < tp.length; j++) {
                                var name = tp[j].getAttribute('name');
                                dict[name] = tp[j].getAttribute('value');
                            }
                            this._tileProperties[this.parentGID] = dict;
                        }
                    }
                }
            }
        }

        // PARSE <layer> & <objectgroup> in order
        var childNodes = map.childNodes;
        for (i = 0; i < childNodes.length; i++) {
            var childNode = childNodes[i];
            if (this._shouldIgnoreNode(childNode)) {
                continue;
            }

            if (childNode.nodeName === 'layer') {
                var layer = this._parseLayer(childNode);
                this.setLayers(layer);
            }

            if (childNode.nodeName === 'objectgroup') {
                var objectGroup = this._parseObjectGroup(childNode);
                this.setObjectGroups(objectGroup);
            }
        }

        return map;
    },

    _shouldIgnoreNode: function (node) {
        return node.nodeType === 3 // text
            || node.nodeType === 8   // comment
            || node.nodeType === 4;  // cdata
    },

    _parseLayer: function (selLayer) {
        var data = selLayer.getElementsByTagName('data')[0];

        var layer = new cc.TMXLayerInfo();
        layer.name = selLayer.getAttribute('name');

        var layerSize = cc.size(0, 0);
        layerSize.width = parseFloat(selLayer.getAttribute('width'));
        layerSize.height = parseFloat(selLayer.getAttribute('height'));
        layer._layerSize = layerSize;

        var visible = selLayer.getAttribute('visible');
        layer.visible = !(visible == "0");

        var opacity = selLayer.getAttribute('opacity') || 1;
        if (opacity)
            layer._opacity = parseInt(255 * parseFloat(opacity));
        else
            layer._opacity = 255;
        layer.offset = cc.p(parseFloat(selLayer.getAttribute('x')) || 0, parseFloat(selLayer.getAttribute('y')) || 0);

        var nodeValue = '';
        for (j = 0; j < data.childNodes.length; j++) {
            nodeValue += data.childNodes[j].nodeValue
        }
        nodeValue = nodeValue.trim();

        // Unpack the tilemap data
        var compression = data.getAttribute('compression');
        var encoding = data.getAttribute('encoding');
        if(compression && compression !== "gzip" && compression !== "zlib"){
            cc.logID(7218);
            return null;
        }
        var tiles;
        switch (compression) {
            case 'gzip':
                tiles = cc.Codec.unzipBase64AsArray(nodeValue, 4);
                break;
            case 'zlib':
                var inflator = new Zlib.Inflate(cc.Codec.Base64.decodeAsArray(nodeValue, 1));
                tiles = uint8ArrayToUint32Array(inflator.decompress());
                break;
            case null:
            case '':
                // Uncompressed
                if (encoding === "base64")
                    tiles = cc.Codec.Base64.decodeAsArray(nodeValue, 4);
                else if (encoding === "csv") {
                    tiles = [];
                    var csvTiles = nodeValue.split(',');
                    for (var csvIdx = 0; csvIdx < csvTiles.length; csvIdx++)
                        tiles.push(parseInt(csvTiles[csvIdx]));
                } else {
                    //XML format
                    var selDataTiles = data.getElementsByTagName("tile");
                    tiles = [];
                    for (var xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++)
                        tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute("gid")));
                }
                break;
            default:
                if(this.layerAttrs === cc.TMXLayerInfo.ATTRIB_NONE)
                    cc.logID(7219);
                break;
        }
        if (tiles) {
            layer._tiles = new Uint32Array(tiles);
        }

        // The parent element is the last layer
        var layerProps = selLayer.querySelectorAll("properties > property");
        if (layerProps) {
            var layerProp = {};
            for (var j = 0; j < layerProps.length; j++) {
                layerProp[layerProps[j].getAttribute('name')] = layerProps[j].getAttribute('value');
            }
            layer.properties = layerProp;
        }
        return layer;
    },

    _parseObjectGroup: function (selGroup) {
        var objectGroup = new cc.TMXObjectGroupInfo();
        objectGroup.name = selGroup.getAttribute('name') || '';
        objectGroup.offset = cc.p(parseFloat(selGroup.getAttribute('offsetx')), parseFloat(selGroup.getAttribute('offsety')));

        var opacity = selGroup.getAttribute('opacity') || 1;
        if (opacity)
            objectGroup._opacity = parseInt(255 * parseFloat(opacity));
        else
            objectGroup._opacity = 255;

        var visible = selGroup.getAttribute('visible');
        if (visible && parseInt(visible) === 0)
            objectGroup.visible = false;

        var color = selGroup.getAttribute('color');
        if (color)
            objectGroup._color = cc.hexToColor(color);

        var draworder = selGroup.getAttribute('draworder');
        if (draworder)
            objectGroup._draworder = draworder;

        var groupProps = selGroup.querySelectorAll("objectgroup > properties > property");
        if (groupProps) {
            var parsedProps = {};
            for (j = 0; j < groupProps.length; j++) {
                parsedProps[groupProps[j].getAttribute('name')] = groupProps[j].getAttribute('value');
            }
            // set the properties to the group
            objectGroup.setProperties(parsedProps);
        }

        var objects = selGroup.querySelectorAll('object');
        var getContentScaleFactor = cc.director.getContentScaleFactor();
        if (objects) {
            for (var j = 0; j < objects.length; j++) {
                var selObj = objects[j];
                // The value for "type" was blank or not a valid class name
                // Create an instance of TMXObjectInfo to store the object and its properties
                var objectProp = {};

                // Set the id of the object
                objectProp['id'] = selObj.getAttribute('id') || 0;

                // Set the name of the object to the value for "name"
                objectProp["name"] = selObj.getAttribute('name') || "";

                // Assign all the attributes as key/name pairs in the properties dictionary
                objectProp["width"] = parseFloat(selObj.getAttribute('width')) || 0;
                objectProp["height"] = parseFloat(selObj.getAttribute('height')) || 0;

                objectProp["x"] = (selObj.getAttribute('x') || 0) / getContentScaleFactor;
                objectProp["y"] = (selObj.getAttribute('y') || 0) / getContentScaleFactor;

                objectProp["rotation"] = parseFloat(selObj.getAttribute('rotation')) || 0;

                var docObjProps = selObj.querySelectorAll("properties > property");
                if (docObjProps) {
                    for (var k = 0; k < docObjProps.length; k++)
                        objectProp[docObjProps[k].getAttribute('name')] = docObjProps[k].getAttribute('value');
                }

                // visible
                var visibleAttr = selObj.getAttribute('visible');
                objectProp['visible'] = ! (visibleAttr && parseInt(visibleAttr) === 0);

                // image
                var gid = selObj.getAttribute('gid');
                if (gid) {
                    objectProp['gid'] = parseInt(gid);
                    objectProp['type'] = cc.TiledMap.TMXObjectType.IMAGE;
                }

                // ellipse
                var ellipse = selObj.querySelectorAll('ellipse');
                if (ellipse && ellipse.length > 0) {
                    objectProp['type'] = cc.TiledMap.TMXObjectType.ELLIPSE;
                }

                //polygon
                var polygonProps = selObj.querySelectorAll("polygon");
                if(polygonProps && polygonProps.length > 0) {
                    objectProp['type'] = cc.TiledMap.TMXObjectType.POLYGON;
                    var selPgPointStr = polygonProps[0].getAttribute('points');
                    if(selPgPointStr)
                        objectProp["points"] = this._parsePointsString(selPgPointStr);
                }

                //polyline
                var polylineProps = selObj.querySelectorAll("polyline");
                if(polylineProps && polylineProps.length > 0) {
                    objectProp['type'] = cc.TiledMap.TMXObjectType.POLYLINE;
                    var selPlPointStr = polylineProps[0].getAttribute('points');
                    if(selPlPointStr)
                        objectProp["polylinePoints"] = this._parsePointsString(selPlPointStr);
                }

                if (!objectProp['type']) {
                    objectProp['type'] = cc.TiledMap.TMXObjectType.RECT;
                }

                // Add the object to the objectGroup
                objectGroup._objects.push(objectProp);
            }
        }
        return objectGroup;
    },

    _parsePointsString:function(pointsString){
         if(!pointsString)
            return null;

        var points = [];
        var pointsStr = pointsString.split(' ');
        for(var i = 0; i < pointsStr.length; i++){
            var selPointStr = pointsStr[i].split(',');
            points.push({'x':parseFloat(selPointStr[0]), 'y':parseFloat(selPointStr[1])});
        }
        return points;
    },

    /**
     * initializes parsing of an XML string, either a tmx (Map) string or tsx (Tileset) string
     * @param {String} xmlString
     * @return {Boolean}
     */
    parseXMLString:function (xmlString) {
        return this.parseXMLFile(xmlString, true);
    },

    /**
     * Gets the tile properties.
     * @return {object}
     */
    getTileProperties:function () {
        return this._tileProperties;
    },

    /**
     * Set the tile properties.
     * @param {object} tileProperties
     */
    setTileProperties:function (tileProperties) {
        this._tileProperties.push(tileProperties);
    },

    /**
     * Gets the currentString
     * @return {String}
     */
    getCurrentString:function () {
        return this.currentString;
    },

    /**
     * Set the currentString
     * @param {String} currentString
     */
    setCurrentString:function (currentString) {
        this.currentString = currentString;
    },

    /**
     * Gets the tmxFileName
     * @return {String}
     */
    getTMXFileName:function () {
        return this.tmxFileName;
    },

    /**
     * Set the tmxFileName
     * @param {String} fileName
     */
    setTMXFileName:function (fileName) {
        this.tmxFileName = fileName;
    },

    _internalInit:function (tmxFileName, resourcePath) {
        this._tilesets.length = 0;
        this._layers.length = 0;

        this.tmxFileName = tmxFileName;
        if (resourcePath)
            this._resources = resourcePath;

        this._objectGroups.length = 0;
        this._allChildren.length = 0;
        this.properties.length = 0;
        this._tileProperties.length = 0;

        // tmp vars
        this.currentString = "";
        this.storingCharacters = false;
        this.layerAttrs = cc.TMXLayerInfo.ATTRIB_NONE;
        this.parentElement = cc.TiledMap.NONE;
    }
});

var _p = cc.TMXMapInfo.prototype;

// Extended properties
/** @expose */
_p.mapWidth;
cc.defineGetterSetter(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
/** @expose */
_p.mapHeight;
cc.defineGetterSetter(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
/** @expose */
_p.tileWidth;
cc.defineGetterSetter(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
/** @expose */
_p.tileHeight;
cc.defineGetterSetter(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);


/**
 * Creates a TMX Format with a tmx file or content string
 * @deprecated since v3.0 please use new cc.TMXMapInfo(tmxFile, resourcePath) instead.
 * @param {String} tmxFile fileName or content string
 * @param {String} resourcePath  If tmxFile is a file name ,it is not required.If tmxFile is content string ,it is must required.
 * @return {cc.TMXMapInfo}
 */
cc.TMXMapInfo.create = function (tmxFile, resourcePath) {
    return new cc.TMXMapInfo(tmxFile, resourcePath);
};


/**
 * @constant
 * @type Number
 */
cc.TMXLayerInfo.ATTRIB_NONE = 1 << 0;
/**
 * @constant
 * @type Number
 */
cc.TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
/**
 * @constant
 * @type Number
 */
cc.TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
/**
 * @constant
 * @type Number
 */
cc.TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * !#en _ccsg.TMXObjectGroup represents the TMX object group.
 * !#zh TMXObjectGroup 用来表示 TMX 对象组。
 * @class TMXObjectGroup
 * @extends _ccsg.Node
 *
 * @property {Array}    properties  - Properties from the group. They can be added using tilemap editors
 * @property {String}   groupName   - Name of the group
 */
_ccsg.TMXObjectGroup = _ccsg.Node.extend(/** @lends cc.TMXObjectGroup# */{
	  properties: null,
    groupName: "",

    _positionOffset: null,
    _mapInfo: null,
    _objects : [],

    /**
     * <p>The _ccsg.TMXObjectGroup's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.TMXObjectGroup()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     * @method ctor
     */
    ctor:function (groupInfo, mapInfo) {
        _ccsg.Node.prototype.ctor.call(this);
        this._initGroup(groupInfo, mapInfo);
    },

    _initGroup: function (groupInfo, mapInfo) {
        this.groupName = groupInfo.name;
        this._positionOffset = groupInfo.offset;
        this._mapInfo = mapInfo;
        this.properties = groupInfo.getProperties();

        var mapSize = mapInfo._mapSize;
        var tileSize = mapInfo._tileSize;
        if (mapInfo.orientation === cc.TiledMap.Orientation.HEX) {
            var width = 0, height = 0;
            if (mapInfo.getStaggerAxis() === cc.TiledMap.StaggerAxis.STAGGERAXIS_X) {
                height = tileSize.height * (mapSize.height + 0.5);
                width = (tileSize.width + mapInfo.getHexSideLength()) * Math.floor(mapSize.width / 2) + tileSize.width * (mapSize.width % 2);
            } else {
                width = tileSize.width * (mapSize.width + 0.5);
                height = (tileSize.height + mapInfo.getHexSideLength()) * Math.floor(mapSize.height / 2) + tileSize.height * (mapSize.height % 2);
            }
            this.setContentSize(width, height);
        } else {
            this.setContentSize(mapSize.width * tileSize.width, mapSize.height * tileSize.height);
        }
        this.setAnchorPoint(cc.p(0, 0));
        this.setPosition(this._positionOffset.x, -this._positionOffset.y);
        this.setVisible(groupInfo.visible);

        var objects = [];
        if (groupInfo._objects instanceof Array) {
            objects = groupInfo._objects;
        }

        // create objects
        this._objects = [];
        for (var i = 0, n = objects.length; i < n; i++) {
            var objInfo = objects[i];
            var object = new _ccsg.TMXObject();
            object.initWithInfo(objInfo, mapInfo, this.getContentSize(), groupInfo._color);
            this._objects.push(object);
            if (object.sgNode) {
                object.sgNode.setOpacity(groupInfo._opacity);
                // TODO addChild in order with property cc.TMXObjectGroupInfo._draworder
                this.addChild(object.sgNode, i, i);
            }
        }
    },

    /**
     * !#en Offset position of child objects.
     * !#zh 获取子对象的偏移位置。
     * @method getPositionOffset
     * @return {Vec2}
     * @example
     * var offset = tMXObjectGroup.getPositionOffset();
     */
    getPositionOffset:function () {
        return cc.p(this._positionOffset);
    },

    /**
     * !#en Offset position of child objects.
     * !#zh 设置子对象的偏移位置。
     * @method setPositionOffset
     * @param {Vec2} offset
     * @example
     * tMXObjectGroup.setPositionOffset(cc.v2(5, 5));
     */
    setPositionOffset:function (offset) {
        this._positionOffset.x = offset.x;
        this._positionOffset.y = offset.y;
    },

    /**
     * !#en List of properties stored in a dictionary.
     * !#zh 以映射的形式获取属性列表。
     * @method getProperties
     * @return {Array}
     * @example
     * var offset = tMXObjectGroup.getProperties();
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * !#en List of properties stored in a dictionary.
     * !#zh 设置属性列表。
     * @method setProperties
     * @param {Object} Var
     * @example
     * tMXObjectGroup.setProperties(obj);
     */
    setProperties:function (Var) {
        this.properties = Var;
    },

    /**
     * !#en Gets the Group name.
     * !#zh 获取组名称。
     * @method getGroupName
     * @return {String}
     * @example
     * var groupName = tMXObjectGroup.getGroupName();
     */
    getGroupName:function () {
        return this.groupName;
    },

    /**
     * !#en Set the Group name.
     * !#zh 设置组名称。
     * @method setGroupName
     * @param {String} groupName
     * @example
     * tMXObjectGroup.setGroupName("New Group");
     */
    setGroupName:function (groupName) {
        this.groupName = groupName;
    },

    /**
     * Return the value for the specific property name
     * @param {String} propertyName
     * @return {Object}
     */
    propertyNamed:function (propertyName) {
        return this.properties[propertyName];
    },

    /**
     * <p>Return the dictionary for the specific object name. <br />
     * It will return the 1st object found on the array for the given name.</p>
     * @deprecated since v3.4 please use .getObject
     * @param {String} objectName
     * @return {object|Null}
     */
    objectNamed:function (objectName) {
        return this.getObject(objectName);
    },

    /**
     * !#en
     * Return the object for the specific object name. <br />
     * It will return the 1st object found on the array for the given name.
     * !#zh 获取指定的对象。
     * @method getObject
     * @param {String} objectName
     * @return {Object|Null}
     * @example
     * var object = tMXObjectGroup.getObject("Group");
     */
    getObject: function(objectName){
        for (var i = 0, len = this._objects.length; i < len; i++) {
            var obj = this._objects[i];
            if (obj && obj.getObjectName() === objectName) {
                return obj;
            }
        }
        // object not found
        return null;
    },

    /**
     * !#en Gets the objects.
     * !#zh 获取对象数组。
     * @method getObjects
     * @return {Array}
     * @example
     * var objects = tMXObjectGroup.getObjects();
     */
    getObjects:function () {
        return this._objects;
    }
});

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.

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


/**
 * !#en Renders the TMX object.
 * !#zh 渲染 tmx object。
 * @class TMXObject
 */
_ccsg.TMXObject = cc.Class({
    properties : {
        sgNode: null,
        offset: cc.p(0, 0),
        gid: 0,
        name: '',
        type: null,
        id: 0,
        objectVisible: true,
        objectSize: cc.size(0, 0),
        objectRotation: 0,
        _properties: null,
        _groupSize: cc.size(0, 0)
    },

    initWithInfo : function(objInfo, mapInfo, groupSize, color) {
        this.setProperties(objInfo);
        this.setObjectName(objInfo.name);
        this.id = objInfo.id;
        this.gid = objInfo.gid;
        this.type = objInfo.type;
        this.offset = cc.p(objInfo.x, objInfo.y);

        this.objectSize = cc.size(objInfo.width, objInfo.height);
        this.objectVisible = objInfo.visible;
        this.objectRotation = objInfo.rotation;
        this._groupSize = groupSize;

        if (this.type === cc.TiledMap.TMXObjectType.IMAGE) {
            this.sgNode = new _ccsg.TMXObjectImage(this, mapInfo);
        } else {
            this.sgNode = new _ccsg.TMXObjectShape(this, mapInfo, color);
        }
    },

    /**
     * !#en Get the name of object
     * !#zh 获取对象的名称
     * @method getObjectName
     * @return {String}
     */
    getObjectName: function() {
        return this.name;
    },

    /**
     * !#en Get the property of object
     * !#zh 获取对象的属性
     * @method getProperty
     * @return {Object}
     */
    getProperty: function (propName) {
        return this._properties[propName];
    },

    /**
     * !#en Get the properties of object
     * !#zh 获取对象的属性
     * @method getProperties
     * @return {Object}
     */
    getProperties: function () {
        return this._properties;
    },

    /**
     * !#en Set the object name
     * !#zh 设置对象名称
     * @method setObjectName
     * @param {String} name
     */
    setObjectName: function(name) {
        this.name = name;
    },

    /**
     * !#en Set the properties of the object
     * !#zh 设置对象的属性
     * @method setProperties
     * @param {Object} props
     */
    setProperties: function (props) {
        this._properties = props;
    }
});

_ccsg.TMXObjectImage = _ccsg.Sprite.extend(/** @lends cc.TMXObjectImage# */{
    _container : null,

    ctor:function (container, mapInfo) {
        _ccsg.Sprite.prototype.ctor.call(this);
        this._container = container;
        this.initWithMapInfo(mapInfo);
    },

    initWithMapInfo: function (mapInfo) {
        if (!this._container.gid) {
            return false;
        }

        var useTileset;
        var tilesets = mapInfo.getTilesets();
        for (var i = tilesets.length - 1; i >= 0; i--) {
            var tileset = tilesets[i];
            if (((this._container.gid & cc.TiledMap.TileFlag.FLIPPED_MASK)>>>0) >= tileset.firstGid) {
                useTileset = tileset;
                break;
            }
        }

        if (!useTileset) {
            return false;
        }

        this.setVisible(this._container.objectVisible);

        // init the image
        var texture = cc.textureCache.addImage(cc.path._normalize(tileset.sourceImage));
        this._initWithTileset(texture, useTileset);

        // init the position & anchor point with map info
        this._initPosWithMapInfo(mapInfo);

        // set rotation
        this.setRotation(this._container.objectRotation);

        // set flip
        if ((this._container.gid & cc.TiledMap.TileFlag.HORIZONTAL) >>> 0) {
            this.setFlippedX(true);
        }
        if ((this._container.gid & cc.TiledMap.TileFlag.VERTICAL) >>> 0) {
            this.setFlippedY(true);
        }

        return true;
    },

    _initWithTileset: function(texture, tileset) {
        if (!texture.isLoaded()) {
            texture.once('load', function () {
                this._initWithTileset(texture, tileset);
            }, this);
            return;
        }

        tileset.imageSize.width = texture.width;
        tileset.imageSize.height = texture.height;
        var rect = tileset.rectForGID(this._container.gid);
        this.initWithTexture(texture, rect);

        // set scale
        this.setScaleX(this._container.objectSize.width / rect.size.width);
        this.setScaleY(this._container.objectSize.height / rect.size.height);
    },

    _initPosWithMapInfo: function (mapInfo) {
        var mapOri = mapInfo.getOrientation();
        switch(mapOri) {
        case cc.TiledMap.Orientation.ORTHO:
        case cc.TiledMap.Orientation.HEX:
            this.setAnchorPoint(cc.p(0, 0));
            this.setPosition(this._container.offset.x, this._container._groupSize.height - this._container.offset.y);
            break;
        case cc.TiledMap.Orientation.ISO:
            this.setAnchorPoint(cc.p(0.5, 0));
            var posIdx = cc.p(this._container.offset.x / mapInfo._tileSize.height, this._container.offset.y / mapInfo._tileSize.height);
            var pos = cc.p(mapInfo._tileSize.width / 2 * ( mapInfo._mapSize.width + posIdx.x - posIdx.y),
                           mapInfo._tileSize.height / 2 * ( mapInfo._mapSize.height * 2 - posIdx.x - posIdx.y));
            this.setPosition(pos);
            break;
        default:
            break;
        }
    }
});

_ccsg.TMXObjectShape = cc.DrawNode.extend(/** @lends cc.TMXObjectShape# */{
    _container : null,
    _color : cc.Color.WHITE,
    _mapOrientation : 0,
    _mapInfo : null,

    ctor:function (container, mapInfo, color) {
        cc.DrawNode.prototype.ctor.call(this);
        this.setLineWidth(1);
        this._container = container;
        this._color = color;
        this._mapInfo = mapInfo;
        this._mapOrientation = mapInfo.getOrientation();
        this._initShape();
    },

    _initShape : function () {
        var originPos;
        if (cc.TiledMap.Orientation.ISO !== this._mapOrientation) {
            var startPos = cc.p(0, this._container._groupSize.height);
            originPos = cc.p(startPos.x + this._container.offset.x, startPos.y - this._container.offset.y);
        } else {
            originPos = this._getPosByOffset(cc.p(0, 0));
        }
        this.setPosition(originPos);
        this.setRotation(this._container.objectRotation);

        switch (this._container.type) {
            case cc.TiledMap.TMXObjectType.RECT:
                this._drawRect();
                break;
            case cc.TiledMap.TMXObjectType.ELLIPSE:
                this._drawEllipse();
                break;
            case cc.TiledMap.TMXObjectType.POLYGON:
                this._drawPoly(originPos, true);
                break;
            case cc.TiledMap.TMXObjectType.POLYLINE:
                this._drawPoly(originPos, false);
                break;
            default:
                break;
        }
        this.setVisible(this._container.objectVisible);
    },

    _getPosByOffset : function(offset)
    {
        var mapSize = this._mapInfo.getMapSize();
        var tileSize = this._mapInfo.getTileSize();
        var posIdx = cc.p((this._container.offset.x + offset.x) / tileSize.width * 2, (this._container.offset.y + offset.y) / tileSize.height);
        return cc.p(tileSize.width / 2 * (mapSize.width + posIdx.x - posIdx.y),
                    tileSize.height / 2 * (mapSize.height * 2 - posIdx.x - posIdx.y));
    },

    _drawRect : function () {
        if (cc.TiledMap.Orientation.ISO !== this._mapOrientation) {
            var objSize = this._container.objectSize;
            if (objSize.equals(cc.Size.ZERO)) {
                objSize = cc.size(20, 20);
                this.setAnchorPoint(cc.p(0.5, 0.5));
            } else {
                this.setAnchorPoint(cc.p(0, 1));
            }
            var bl = cc.p(0, 0);
            var tr = cc.p(objSize.width, objSize.height);
            this.drawRect(bl, tr, null, this.getLineWidth(), this._color);

            this.setContentSize(objSize);
        } else {
            if (this._container.objectSize.equals(cc.Size.ZERO)) {
                return;
            }

            var pos1 = this._getPosByOffset(cc.p(0, 0));
            var pos2 = this._getPosByOffset(cc.p(this._container.objectSize.width, 0));
            var pos3 = this._getPosByOffset(cc.p(this._container.objectSize.width, this._container.objectSize.height));
            var pos4 = this._getPosByOffset(cc.p(0, this._container.objectSize.height));

            var width = pos2.x - pos4.x, height = pos1.y - pos3.y;
            this.setContentSize(cc.size(width, height));
            this.setAnchorPoint(cc.p((pos1.x - pos4.x) / width, 1));

            var origin = cc.p(pos4.x, pos3.y);
            pos1.subSelf(origin);
            pos2.subSelf(origin);
            pos3.subSelf(origin);
            pos4.subSelf(origin);
            if (this._container.objectSize.width > 0) {
                this.drawSegment(pos1, pos2, this.getLineWidth(), this._color);
                this.drawSegment(pos3, pos4, this.getLineWidth(), this._color);
            }

            if (this._container.objectSize.height > 0) {
                this.drawSegment(pos1, pos4, this.getLineWidth(), this._color);
                this.drawSegment(pos3, pos2, this.getLineWidth(), this._color);
            }
        }
    },

    _drawEllipse : function() {
        var scaleX = 1.0, scaleY = 1.0, radius = 0.0;
        var center = cc.p(0, 0);
        var ellipseNode = null;
        if (cc.TiledMap.Orientation.ISO !== this._mapOrientation) {
            var objSize = this._container.objectSize;
            if (objSize.equals(cc.Size.ZERO)) {
                objSize = cc.size(20, 20);
                this.setAnchorPoint(cc.p(0.5, 0.5));
            } else {
                this.setAnchorPoint(cc.p(0, 1));
            }

            center = cc.p(objSize.width / 2, objSize.height / 2);
            if (objSize.width > objSize.height) {
                scaleX = objSize.width / objSize.height;
                radius = objSize.height / 2;
            } else {
                scaleY = objSize.height / objSize.width;
                radius = objSize.width / 2;
            }
            ellipseNode = this;

            this.setContentSize(objSize);
        } else {
            if (this._container.objectSize.equals(cc.Size.ZERO)) {
                return;
            }

            // draw the rect
            var pos1 = this._getPosByOffset(cc.p(0, 0));
            var pos2 = this._getPosByOffset(cc.p(this._container.objectSize.width, 0));
            var pos3 = this._getPosByOffset(cc.p(this._container.objectSize.width, this._container.objectSize.height));
            var pos4 = this._getPosByOffset(cc.p(0, this._container.objectSize.height));

            var width = pos2.x - pos4.x, height = pos1.y - pos3.y;
            this.setContentSize(cc.size(width, height));
            this.setAnchorPoint(cc.p((pos1.x - pos4.x) / width, 1));

            var origin = cc.p(pos4.x, pos3.y);
            pos1.subSelf(origin);
            pos2.subSelf(origin);
            pos3.subSelf(origin);
            pos4.subSelf(origin);
            if (this._container.objectSize.width > 0) {
                this.drawSegment(pos1, pos2, this.getLineWidth(), this._color);
                this.drawSegment(pos3, pos4, this.getLineWidth(), this._color);
            }

            if (this._container.objectSize.height > 0) {
                this.drawSegment(pos1, pos4, this.getLineWidth(), this._color);
                this.drawSegment(pos3, pos2, this.getLineWidth(), this._color);
            }

            // add a drawnode to draw the ellipse
            center = this._getPosByOffset(cc.p(this._container.objectSize.width / 2, this._container.objectSize.height / 2));
            center.subSelf(origin);

            ellipseNode = new cc.DrawNode();
            ellipseNode.setLineWidth(this.getLineWidth());
            ellipseNode.setContentSize(cc.size(width, height));
            ellipseNode.setAnchorPoint(cc.p(0.5, 0.5));
            ellipseNode.setPosition(center);
            this.addChild(ellipseNode);

            if (this._container.objectSize.width > this._container.objectSize.height) {
                scaleX = this._container.objectSize.width / this._container.objectSize.height;
                radius = this._container.objectSize.height / 2;
            } else {
                scaleY = this._container.objectSize.height / this._container.objectSize.width;
                radius = this._container.objectSize.width / 2;
            }
            var tileSize = this._mapInfo.getTileSize();
            var rotateDegree = Math.atan(tileSize.width / tileSize.height);
            radius /= Math.sin(rotateDegree);

            // should rotate the ellipse
            ellipseNode.setRotationX(cc.radiansToDegrees(rotateDegree));
            ellipseNode.setRotationY(90 - cc.radiansToDegrees(rotateDegree));
        }
        ellipseNode.drawCircle(center, radius, 0, 50, false, this.getLineWidth(), this._color);
        ellipseNode.setScaleX(scaleX);
        ellipseNode.setScaleY(scaleY);
    },

    _drawPoly : function (originPos, isPolygon) {
        // parse the data
        var pointsData;
        var objectInfo = this._container.getProperties();
        if (isPolygon)
            pointsData = objectInfo.points;
        else
            pointsData = objectInfo.polylinePoints;

        var points = [];
        var minX = 0, minY = 0, maxX = 0, maxY = 0;
        for (var i = 0, n = pointsData.length; i < n; i++) {
            var pointData = pointsData[i];
            points.push(cc.p(pointData.x, pointData.y));
            minX = Math.min(minX, pointData.x);
            minY = Math.min(minY, pointData.y);
            maxX = Math.max(maxX, pointData.x);
            maxY = Math.max(maxY, pointData.y);
        }

        var width = 0, height = 0;
        if (cc.TiledMap.Orientation.ISO !== this._mapOrientation) {
            // set the content size & anchor point
            width = maxX - minX, height = maxY - minY;
            this.setAnchorPoint(cc.p(-minX / width, maxY / height));

            // correct the points data
            for (var j = 0; j < points.length; j++) {
                points[j] = cc.p(points[j].x - minX, -points[j].y + maxY);
            }
        } else {
            var bl = this._getPosByOffset(cc.p(minX, maxY));
            var tr = this._getPosByOffset(cc.p(maxX, minY));
            var origin = this._getPosByOffset(cc.p(0 ,0));
            width = tr.x - bl.x, height = tr.y - bl.y;
            this.setAnchorPoint(cc.p((origin.x - bl.x) / width, (origin.y - bl.y) / height));

            // correct the points data
            for (var idx = 0; idx < points.length; idx++) {
                var tempPoint = this._getPosByOffset(points[idx]);
                points[idx] = cc.p(tempPoint.x - bl.x, tempPoint.y - bl.y);
            }
        }
        this.setContentSize(cc.size(width, height));

        this.drawPoly(points, null, this.getLineWidth(), this._color, !isPolygon);
    }
});

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

/**
 * <p>_ccsg.TMXLayer represents the TMX layer. </p>
 *
 * <p>It is a subclass of cc.SpriteBatchNode. By default the tiles are rendered using a cc.TextureAtlas. <br />
 * If you modify a tile on runtime, then, that tile will become a _ccsg.Sprite, otherwise no _ccsg.Sprite objects are created. <br />
 * The benefits of using _ccsg.Sprite objects as tiles are: <br />
 * - tiles (_ccsg.Sprite) can be rotated/scaled/moved with a nice API </p>
 *
 * <p>If the layer contains a property named "cc.vertexz" with an integer (in can be positive or negative), <br />
 * then all the tiles belonging to the layer will use that value as their OpenGL vertex Z for depth. </p>
 *
 * <p>On the other hand, if the "cc.vertexz" property has the "automatic" value, then the tiles will use an automatic vertex Z value. <br />
 * Also before drawing the tiles, GL_ALPHA_TEST will be enabled, and disabled after drawing them. The used alpha func will be:  </p>
 *
 * glAlphaFunc( GL_GREATER, value ) <br />
 *
 * <p>"value" by default is 0, but you can change it from Tiled by adding the "cc_alpha_func" property to the layer. <br />
 * The value 0 should work for most cases, but if you have tiles that are semi-transparent, then you might want to use a different value, like 0.5.</p>
 * @class
 * @extends cc.SpriteBatchNode
 *
 * @property {Array}                tiles               - Tiles for layer
 * @property {cc.TMXTilesetInfo}    tileset             - Tileset for layer
 * @property {Number}               layerOrientation    - Layer orientation
 * @property {Array}                properties          - Properties from the layer. They can be added using tilemap editors
 * @property {String}               layerName           - Name of the layer
 * @property {Number}               layerWidth          - Width of the layer
 * @property {Number}               layerHeight         - Height of the layer
 * @property {Number}               tileWidth           - Width of a tile
 * @property {Number}               tileHeight          - Height of a tile
 */
_ccsg.TMXLayer = _ccsg.Node.extend(/** @lends _ccsg.TMXLayer# */{
    tiles: null,
    tileset: null,
    layerOrientation: null,
    properties: null,
    layerName: "",

    _texture: null,
    _textures: null,
    _texGrids: null,
    _spriteTiles: null,

    //size of the layer in tiles
    _layerSize: null,
    _mapTileSize: null,
    //TMX Layer supports opacity
    _opacity: 255,
    _minGID: null,
    _maxGID: null,
    //Only used when vertexZ is used
    _vertexZvalue: null,
    _useAutomaticVertexZ: null,
    //used for optimization
    _reusedTile: null,
    _atlasIndexArray: null,
    //used for retina display
    _contentScaleFactor: null,

    // used for hex map
    _staggerAxis: null,
    _staggerIndex: null,
    _hexSideLength: 0,

    _className:"TMXLayer",

    /**
     * Creates a _ccsg.TMXLayer with an tile set info, a layer info and a map info   <br/>
     * Constructor of _ccsg.TMXLayer
     * @param {cc.TMXTilesetInfo} tilesetInfo
     * @param {_ccsg.TMXLayerInfo} layerInfo
     * @param {cc.TMXMapInfo} mapInfo
     */
    ctor:function (tilesetInfo, layerInfo, mapInfo) {
        cc.SpriteBatchNode.prototype.ctor.call(this);
        this._descendants = [];

        this._layerSize = cc.size(0, 0);
        this._mapTileSize = cc.size(0, 0);
        this._spriteTiles = {};
        this._staggerAxis = cc.TiledMap.StaggerAxis.STAGGERAXIS_Y;
        this._staggerIndex = cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN;

        if(mapInfo !== undefined)
            this.initWithTilesetInfo(tilesetInfo, layerInfo, mapInfo);
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new _ccsg.TMXLayer.CanvasRenderCmd(this);
        else
            return new _ccsg.TMXLayer.WebGLRenderCmd(this);
    },

    _fillTextureGrids: function (tileset, texId) {
        var tex = this._textures[texId];
        if (!tex.isLoaded()) {
            tex.once('load', function () {
                this._fillTextureGrids(tileset, texId);
            }, this);
            return;
        }
        if (!tileset.imageSize.width || !tileset.imageSize.height) {
            tileset.imageSize.width = tex.width;
            tileset.imageSize.height = tex.height;
        }
        var tw = tileset._tileSize.width,
            th = tileset._tileSize.height,
            imageW = tex._contentSize.width,
            imageH = tex._contentSize.height,
            spacing = tileset.spacing,
            margin = tileset.margin,

            cols = Math.floor((imageW - margin*2 + spacing) / (tw + spacing)),
            rows = Math.floor((imageH - margin*2 + spacing) / (th + spacing)),
            count = rows * cols,

            gid = tileset.firstGid,
            maxGid = tileset.firstGid + count,
            grids = this._texGrids,
            grid = null,
            override = grids[gid] ? true : false,
            texelCorrect = cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? 0.5 : 0;

        for (; gid < maxGid; ++gid) {
            // Avoid overlapping
            if (override && !grids[gid]) {
                override = false;
            }
            if (!override && grids[gid]) {
                break;
            }

            grid = {
                texId: texId,
                x: 0, y: 0, width: tw, height: th,
                t: 0, l: 0, r: 0, b: 0
            };
            tileset.rectForGID(gid, grid);
            grid.x += texelCorrect;
            grid.y += texelCorrect;
            grid.width -= texelCorrect*2;
            grid.height -= texelCorrect*2;
            grid.t = (grid.y) / imageH;
            grid.l = (grid.x) / imageW;
            grid.r = (grid.x + grid.width) / imageW;
            grid.b = (grid.y + grid.height) / imageH;
            grids[gid] = grid;
        }
    },

    /**
     * Initializes a cc.TMXLayer with a tileset info, a layer info and a map info
     * @param {cc.TMXTilesetInfo} tilesetInfo
     * @param {cc.TMXLayerInfo} layerInfo
     * @param {cc.TMXMapInfo} mapInfo
     * @return {Boolean}
     */
    initWithTilesetInfo:function (tilesetInfo, layerInfo, mapInfo) {
        var size = layerInfo._layerSize;

        // layerInfo
        this.layerName = layerInfo.name;
        this.tiles = layerInfo._tiles;
        this.properties = layerInfo.properties;
        this._layerSize = size;
        this._minGID = layerInfo._minGID;
        this._maxGID = layerInfo._maxGID;
        this._opacity = layerInfo._opacity;
        this._staggerAxis = mapInfo.getStaggerAxis();
        this._staggerIndex = mapInfo.getStaggerIndex();
        this._hexSideLength = mapInfo.getHexSideLength();

        // tilesetInfo
        this.tileset = tilesetInfo;

        // mapInfo
        this.layerOrientation = mapInfo.orientation;
        this._mapTileSize = mapInfo.getTileSize();

        var tilesets = mapInfo._tilesets;
        if (tilesets) {
            var i, len = tilesets.length, tileset, tex;
            this._textures = new Array(len);
            this._texGrids = [];
            for (i = 0; i < len; ++i) {
                tileset = tilesets[i];
                tex = cc.textureCache.addImage(tileset.sourceImage);
                tex.setAliasTexParameters();
                this._textures[i] = tex;
                this._fillTextureGrids(tileset, i);
                if (tileset === tilesetInfo) {
                    this._texture = tex;
                }
            }
        }

        // offset (after layer orientation is set);
        var offset = this._calculateLayerOffset(layerInfo.offset);
        this.setPosition(offset);

        // Parse cocos2d properties
        this._parseInternalProperties();

        if (this.layerOrientation === cc.TiledMap.Orientation.HEX) {
            var width = 0, height = 0;
            if (this._staggerAxis === cc.TiledMap.StaggerAxis.STAGGERAXIS_X) {
                height = mapInfo._tileSize.height * (this._layerSize.height + 0.5);
                width = (mapInfo._tileSize.width + this._hexSideLength) * Math.floor(this._layerSize.width / 2) + mapInfo._tileSize.width * (this._layerSize.width % 2);
            } else {
                width = mapInfo._tileSize.width * (this._layerSize.width + 0.5);
                height = (mapInfo._tileSize.height + this._hexSideLength) * Math.floor(this._layerSize.height / 2) + mapInfo._tileSize.height * (this._layerSize.height % 2);
            }
            this.setContentSize(width, height);
        } else {
            this.setContentSize(this._layerSize.width * this._mapTileSize.width,
                this._layerSize.height * this._mapTileSize.height);
        }
        this._useAutomaticVertexZ = false;
        this._vertexZvalue = 0;
        return true;
    },

    visit: function (parent) {
        var cmd = this._renderCmd, parentCmd = parent ? parent._renderCmd : null;

        // quick return if not visible
        if (!this._visible) {
            cmd._propagateFlagsDown(parentCmd);
            return;
        }

        var renderer = cc.renderer;
        cmd.visit(parentCmd);

        var i, children = this._children, len = children.length, child,
            isCanvas = cc._renderType === cc.game.RENDER_TYPE_CANVAS, spTiles = this._spriteTiles;
        if (len > 0) {
            if (this._reorderChildDirty) {
                this.sortAllChildren();
            }
            // draw children zOrder < 0
            for (i = 0; i < len; i++) {
                child = children[i];
                if (child._localZOrder < 0) {
                    child.visit(this);
                }
                else {
                    break;
                }
            }

            renderer.pushRenderCommand(cmd);
            for (; i < len; i++) {
                child = children[i];
                if (isCanvas &&
                    child._localZOrder === 0 && 
                    spTiles[child.tag]) {
                    if (isNaN(child._customZ)) {
                        child._vertexZ = renderer.assignedZ;
                        renderer.assignedZ += renderer.assignedZStep;
                    }
                    child._renderCmd.updateStatus();
                    continue;
                }
                child.visit(this);
            }
        } else {
            renderer.pushRenderCommand(cmd);
        }
        cmd._dirtyFlag = 0;
    },

    /**
     * Gets layer size.
     * @return {Size}
     */
    getLayerSize:function () {
        return cc.size(this._layerSize.width, this._layerSize.height);
    },

    /**
     * Set layer size
     * @param {Size} Var
     */
    setLayerSize:function (Var) {
        this._layerSize.width = Var.width;
        this._layerSize.height = Var.height;
    },

    _getLayerWidth: function () {
        return this._layerSize.width;
    },
    _setLayerWidth: function (width) {
        this._layerSize.width = width;
    },
    _getLayerHeight: function () {
        return this._layerSize.height;
    },
    _setLayerHeight: function (height) {
        this._layerSize.height = height;
    },

    /**
     * Size of the map's tile (could be different from the tile's size)
     * @return {Size}
     */
    getMapTileSize:function () {
        return cc.size(this._mapTileSize.width,this._mapTileSize.height);
    },

    /**
     * Set the map tile size.
     * @param {Size} Var
     */
    setMapTileSize:function (Var) {
        this._mapTileSize.width = Var.width;
        this._mapTileSize.height = Var.height;
    },

    _getTileWidth: function () {
        return this._mapTileSize.width;
    },
    _setTileWidth: function (width) {
        this._mapTileSize.width = width;
    },
    _getTileHeight: function () {
        return this._mapTileSize.height;
    },
    _setTileHeight: function (height) {
        this._mapTileSize.height = height;
    },

    /**
     * Pointer to the map of tiles
     * @return {Array}
     */
    getTiles:function () {
        return this.tiles;
    },

    /**
     * Pointer to the map of tiles
     * @param {Array} Var
     */
    setTiles:function (Var) {
        this.tiles = Var;
    },

    /**
     * Tile set information for the layer
     * @return {cc.TMXTilesetInfo}
     */
    getTileSet:function () {
        return this.tileset;
    },

    /**
     * Tile set information for the layer
     * @param {cc.TMXTilesetInfo} Var
     */
    setTileSet:function (Var) {
        this.tileset = Var;
    },

    /**
     * Layer orientation, which is the same as the map orientation
     * @return {Number}
     */
    getLayerOrientation:function () {
        return this.layerOrientation;
    },

    /**
     * Layer orientation, which is the same as the map orientation
     * @param {Number} Var
     */
    setLayerOrientation:function (Var) {
        this.layerOrientation = Var;
    },

    /**
     * properties from the layer. They can be added using Tiled
     * @return {Array}
     */
    getProperties:function () {
        return this.properties;
    },

    /**
     * properties from the layer. They can be added using Tiled
     * @param {Array} Var
     */
    setProperties:function (Var) {
        this.properties = Var;
    },

    /**
     * Return the value for the specific property name
     * @param {String} propertyName
     * @return {*}
     */
    getProperty:function (propertyName) {
        return this.properties[propertyName];
    },

    /**
     * Gets the layer name
     * @return {String}
     */
    getLayerName:function () {
        return this.layerName;
    },

    /**
     * Set the layer name
     * @param {String} layerName
     */
    setLayerName:function (layerName) {
        this.layerName = layerName;
    },

    /**
     * <p>Dealloc the map that contains the tile position from memory. <br />
     * Unless you want to know at runtime the tiles positions, you can safely call this method. <br />
     * If you are going to call layer.getTileGIDAt() then, don't release the map</p>
     */
    releaseMap:function () {
        this._spriteTiles = {};
    },

    /**
     * <p>Returns the tile (_ccsg.Sprite) at a given a tile coordinate. <br/>
     * The returned _ccsg.Sprite will be already added to the _ccsg.TMXLayer. Don't add it again.<br/>
     * The _ccsg.Sprite can be treated like any other _ccsg.Sprite: rotated, scaled, translated, opacity, color, etc. <br/>
     * You can remove either by calling: <br/>
     * - layer.removeChild(sprite, cleanup); <br/>
     * - or layer.removeTileAt(ccp(x,y)); </p>
     * @param {Vec2|Number} pos or x
     * @param {Number} [y]
     * @return {_ccsg.Sprite}
     */
    getTileAt: function (pos, y) {
        if (pos === undefined) {
            throw new Error("_ccsg.TMXLayer.getTileAt(): pos should be non-null");
        }
        var x = pos;
        if (y === undefined) {
            x = pos.x;
            y = pos.y;
        }
        if (x >= this._layerSize.width || y >= this._layerSize.height || x < 0 || y < 0) {
            throw new Error("_ccsg.TMXLayer.getTileAt(): invalid position");
        }
        if (!this.tiles) {
            cc.logID(7204);
            return null;
        }

        var tile = null, gid = this.getTileGIDAt(x, y);

        // if GID == 0, then no tile is present
        if (gid === 0) {
            return tile;
        }

        var z = Math.floor(x) + Math.floor(y) * this._layerSize.width;
        tile = this._spriteTiles[z];
        // tile not created yet. create it
        if (!tile) {
            var rect = this._texGrids[gid];
            var tex = this._textures[rect.texId];

            tile = new _ccsg.Sprite(tex, rect);
            tile.setPosition(this.getPositionAt(x, y));
            var vertexZ = this._vertexZForPos(x, y);
            tile.setVertexZ(vertexZ);
            tile.setAnchorPoint(0, 0);
            tile.setOpacity(this._opacity);
            this.addChild(tile, vertexZ, z);
        }
        return tile;
    },

    /**
     * Returns the tile gid at a given tile coordinate. <br />
     * if it returns 0, it means that the tile is empty. <br />
     * This method requires the the tile map has not been previously released (eg. don't call layer.releaseMap())<br />
     * @param {cc.Vec2|Number} pos or x
     * @param {Number} [y]
     * @return {Number}
     */
    getTileGIDAt:function (pos, y) {
        if (pos === undefined) {
            throw new Error("_ccsg.TMXLayer.getTileGIDAt(): pos should be non-null");
        }
        var x = pos;
        if (y === undefined) {
            x = pos.x;
            y = pos.y;
        }
        if (x >= this._layerSize.width || y >= this._layerSize.height || x < 0 || y < 0) {
            throw new Error("_ccsg.TMXLayer.getTileGIDAt(): invalid position");
        }
        if (!this.tiles) {
            cc.logID(7205);
            return null;
        }

        var idx = Math.floor(x) + Math.floor(y) * this._layerSize.width;
        // Bits on the far end of the 32-bit global tile ID are used for tile flags
        var tile = this.tiles[idx];

        return (tile & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
    },
    // XXX: deprecated
    // tileGIDAt:getTileGIDAt,

    /**
     * <p>Sets the tile gid (gid = tile global id) at a given tile coordinate.<br />
     * The Tile GID can be obtained by using the method "tileGIDAt" or by using the TMX editor . Tileset Mgr +1.<br />
     * If a tile is already placed at that position, then it will be removed.</p>
     * @param {Number} gid
     * @param {cc.Vec2|Number} posOrX position or x
     * @param {Number} flagsOrY flags or y
     * @param {Number} [flags]
     */
    setTileGID: function(gid, posOrX, flagsOrY, flags) {
        if (posOrX === undefined) {
            throw new Error("_ccsg.TMXLayer.setTileGID(): pos should be non-null");
        }
        var pos;
        if (flags !== undefined || !(posOrX instanceof cc.Vec2)) {
            // four parameters or posOrX is not a Vec2 object
            pos = cc.p(posOrX, flagsOrY);
        } else {
            pos = posOrX;
            flags = flagsOrY;
        }

        pos.x = Math.floor(pos.x);
        pos.y = Math.floor(pos.y);
        if(pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0) {
            throw new Error("_ccsg.TMXLayer.setTileGID(): invalid position");
        }
        if (!this.tiles) {
            cc.logID(7206);
            return;
        }
        if (gid !== 0 && gid < this.tileset.firstGid) {
            cc.logID(7207, gid);
            return;
        }

        flags = flags || 0;
        var currentFlags = this.getTileFlagsAt(pos);
        var currentGID = this.getTileGIDAt(pos);

        if (currentGID !== gid || currentFlags !== flags) {
            var gidAndFlags = (gid | flags) >>> 0;
            // setting gid=0 is equal to remove the tile
            if (gid === 0)
                this.removeTileAt(pos);
            else if (currentGID === 0)            // empty tile. create a new one
                this._updateTileForGID(gidAndFlags, pos);
            else {                // modifying an existing tile with a non-empty tile
                var z = pos.x + pos.y * this._layerSize.width;
                var sprite = this.getChildByTag(z);
                if (sprite) {
                    var rect = this._texGrids[gid];
                    var tex = this._textures[rect.texId];
                    sprite.setTexture(tex);
                    sprite.setTextureRect(rect, false);
                    if (flags != null)
                        this._setupTileSprite(sprite, pos, gidAndFlags);

                    this.tiles[z] = gidAndFlags;
                } else {
                    this._updateTileForGID(gidAndFlags, pos);
                }
            }
        }
    },

    addChild: function (child, localZOrder, tag) {
        _ccsg.Node.prototype.addChild.call(this, child, localZOrder, tag);
        if (tag !== undefined) {
            this._spriteTiles[tag] = child;
            child._vertexZ = this._vertexZ + cc.renderer.assignedZStep * tag / this.tiles.length;
            // child._renderCmd._needDraw = false;
        }
    },

    removeChild: function (child, cleanup) {
        if (this._spriteTiles[child.tag]) {
            this._spriteTiles[child.tag] = null;
            // child._renderCmd._needDraw = true;
        }
        _ccsg.Node.prototype.removeChild.call(this, child, cleanup);
    },

    /**
     * Flipped tiles can be changed dynamically
     * @param {cc.Point|Number} pos or x
     * @param {Number} [y]
     * @return {Number}
     */
    getTileFlagsAt:function (pos, y) {
        if(!pos)
            throw new Error("_ccsg.TMXLayer.getTileFlagsAt(): pos should be non-null");
        if(y !== undefined)
            pos = cc.p(pos, y);
        if(pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0)
            throw new Error("_ccsg.TMXLayer.getTileFlagsAt(): invalid position");
        if(!this.tiles){
            cc.logID(7208);
            return null;
        }

        var idx = Math.floor(pos.x) + Math.floor(pos.y) * this._layerSize.width;
        // Bits on the far end of the 32-bit global tile ID are used for tile flags
        var tile = this.tiles[idx];

        return (tile & cc.TiledMap.TileFlag.FLIPPED_ALL) >>> 0;
    },
    // XXX: deprecated
    // tileFlagAt:getTileFlagsAt,

    /**
     * Removes a tile at given tile coordinate
     * @param {cc.Point|Number} pos position or x
     * @param {Number} [y]
     */
    removeTileAt:function (pos, y) {
        if (!pos) {
            throw new Error("_ccsg.TMXLayer.removeTileAt(): pos should be non-null");
        }
        if (y !== undefined) {
            pos = cc.p(pos, y);
        }
        if (pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0) {
            throw new Error("_ccsg.TMXLayer.removeTileAt(): invalid position");
        }
        if (!this.tiles) {
            cc.logID(7209);
            return;
        }

        var gid = this.getTileGIDAt(pos);
        if (gid !== 0) {
            var z = Math.floor(pos.x) + Math.floor(pos.y) * this._layerSize.width;
            // remove tile from GID map
            this.tiles[z] = 0;

            // remove it from sprites and/or texture atlas
            var sprite = this._spriteTiles[z];
            if (sprite) {
                this.removeChild(sprite, true);
            }
        }
    },

    /**
     * Returns the position in pixels of a given tile coordinate
     * @param {cc.Vec2|Number} pos position or x
     * @param {Number} [y]
     * @return {cc.Vec2}
     */
    getPositionAt:function (pos, y) {
        if (y !== undefined)
            pos = cc.p(pos, y);
        pos.x = Math.floor(pos.x);
        pos.y = Math.floor(pos.y);
        var ret = cc.p(0,0);
        switch (this.layerOrientation) {
            case cc.TiledMap.Orientation.ORTHO:
                ret = this._positionForOrthoAt(pos);
                break;
            case cc.TiledMap.Orientation.ISO:
                ret = this._positionForIsoAt(pos);
                break;
            case cc.TiledMap.Orientation.HEX:
                ret = this._positionForHexAt(pos);
                break;
        }
        return ret;
    },
    // XXX: Deprecated. For backward compatibility only
    // positionAt:getPositionAt,

    _positionForIsoAt:function (pos) {
        return cc.p(this._mapTileSize.width / 2 * ( this._layerSize.width + pos.x - pos.y - 1),
            this._mapTileSize.height / 2 * (( this._layerSize.height * 2 - pos.x - pos.y) - 2));
    },

    _positionForOrthoAt:function (pos) {
        return cc.p(pos.x * this._mapTileSize.width,
            (this._layerSize.height - pos.y - 1) * this._mapTileSize.height);
    },

    _positionForHexAt:function (pos) {
        var xy = cc.p(0, 0);
        var offset = this.tileset.tileOffset;

        var odd_even = (this._staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD) ? 1 : -1;
        switch (this._staggerAxis)
        {
            case cc.TiledMap.StaggerAxis.STAGGERAXIS_Y:
            {
                var diffX = 0;
                if (pos.y % 2 === 1)
                {
                    diffX = this._mapTileSize.width/2 * odd_even;
                }
                xy = cc.p(pos.x * this._mapTileSize.width+diffX+offset.x,
                    (this._layerSize.height - pos.y - 1) * (this._mapTileSize.height-(this._mapTileSize.height-this._hexSideLength)/2)-offset.y);
                break;
            }
            case cc.TiledMap.StaggerAxis.STAGGERAXIS_X:
            {
                var diffY = 0;
                if (pos.x % 2 === 1)
                {
                    diffY = this._mapTileSize.height/2 * -odd_even;
                }

                xy = cc.p(pos.x * (this._mapTileSize.width-(this._mapTileSize.width-this._hexSideLength)/2)+offset.x,
                    (this._layerSize.height - pos.y - 1) * this._mapTileSize.height + diffY-offset.y);
                break;
            }
        }
        return xy;
    },

    _calculateLayerOffset:function (pos) {
        var ret = cc.p(0,0);
        switch (this.layerOrientation) {
            case cc.TiledMap.Orientation.ORTHO:
                ret = cc.p(pos.x * this._mapTileSize.width, -pos.y * this._mapTileSize.height);
                break;
            case cc.TiledMap.Orientation.ISO:
                ret = cc.p((this._mapTileSize.width / 2) * (pos.x - pos.y),
                    (this._mapTileSize.height / 2 ) * (-pos.x - pos.y));
                break;
            case cc.TiledMap.Orientation.HEX:
                if(this._staggerAxis === cc.TiledMap.StaggerAxis.STAGGERAXIS_Y)
                {
                    var diffX = (this._staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN) ? this._mapTileSize.width/2 : 0;
                    ret = cc.p(pos.x * this._mapTileSize.width + diffX,
                               -pos.y * (this._mapTileSize.height - (this._mapTileSize.width - this._hexSideLength) / 2));
                }
                else if(this._staggerAxis === cc.TiledMap.StaggerAxis.STAGGERAXIS_X)
                {
                    var diffY = (this._staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD) ? this._mapTileSize.height/2 : 0;
                    ret = cc.p(pos.x * (this._mapTileSize.width - (this._mapTileSize.width - this._hexSideLength) / 2),
                               -pos.y * this._mapTileSize.height + diffY);
                }
                break;
        }
        return ret;
    },

    _updateTileForGID:function (gid, pos) {
        if (!this._texGrids[gid]) {
            return;
        }

        var idx = 0 | (pos.x + pos.y * this._layerSize.width);
        if (idx < this.tiles.length) {
            this.tiles[idx] = gid;
        }
    },

    //The layer recognizes some special properties, like cc_vertez
    _parseInternalProperties:function () {
        // if cc_vertex=automatic, then tiles will be rendered using vertexz
        var vertexz = this.getProperty("cc_vertexz");
        if (vertexz) {
            if (vertexz === "automatic") {
                this._useAutomaticVertexZ = true;
                var alphaFuncVal = this.getProperty("cc_alpha_func");
                var alphaFuncValue = 0;
                if (alphaFuncVal)
                    alphaFuncValue = parseFloat(alphaFuncVal);

                if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {        //todo: need move to WebGL render cmd
                    this.shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST);
                    // NOTE: alpha test shader is hard-coded to use the equivalent of a glAlphaFunc(GL_GREATER) comparison
                    this.shaderProgram.use();
                    this.shaderProgram.setUniformLocationWith1f(cc.UNIFORM_ALPHA_TEST_VALUE_S, alphaFuncValue);
                }
            } else
                this._vertexZvalue = parseInt(vertexz, 10);
        }
    },

    _setupTileSprite:function (sprite, pos, gid) {
        var posInPixel = this.getPositionAt(pos);
        sprite.setPosition(posInPixel);
        sprite.setVertexZ(this._vertexZForPos(pos));
        sprite.setAnchorPoint(0, 0);
        sprite.setOpacity(this._opacity);
        sprite.setFlippedX(false);
        sprite.setFlippedY(false);
        sprite.setRotation(0.0);

        // Rotation in tiled is achieved using 3 flipped states, flipping across the horizontal, vertical, and diagonal axes of the tiles.
        if ((gid & cc.TiledMap.TileFlag.DIAGONAL) >>> 0) {
            // put the anchor in the middle for ease of rotation.
            sprite.setAnchorPoint(0.5, 0.5);
            sprite.setPosition(posInPixel.x + sprite.width/2, posInPixel.y + sprite.height/2);

            var flag = (gid & (cc.TiledMap.TileFlag.HORIZONTAL | cc.TiledMap.TileFlag.VERTICAL) >>> 0) >>> 0;
            // handle the 4 diagonally flipped states.
            if (flag === cc.TiledMap.TileFlag.HORIZONTAL)
                sprite.setRotation(90);
            else if (flag === cc.TiledMap.TileFlag.VERTICAL)
                sprite.setRotation(270);
            else if (flag === (cc.TiledMap.TileFlag.VERTICAL | cc.TiledMap.TileFlag.HORIZONTAL) >>> 0) {
                sprite.setRotation(90);
                sprite.setFlippedX(true);
            } else {
                sprite.setRotation(270);
                sprite.setFlippedX(true);
            }
        } else {
            if ((gid & cc.TiledMap.TileFlag.HORIZONTAL) >>> 0) {
                sprite.setFlippedX(true);
            }

            if ((gid & cc.TiledMap.TileFlag.VERTICAL) >>> 0) {
                sprite.setFlippedY(true);
            }
        }
    },

    _vertexZForPos:function (x, y) {
        if (y === undefined) {
            y = x.y;
            x = x.x;
        }
        var ret = 0;
        var maxVal = 0;
        if (this._useAutomaticVertexZ) {
            switch (this.layerOrientation) {
                case cc.TiledMap.Orientation.ISO:
                    maxVal = this._layerSize.width + this._layerSize.height;
                    ret = -(maxVal - (x + y));
                    break;
                case cc.TiledMap.Orientation.ORTHO:
                    ret = -(this._layerSize.height - y);
                    break;
                case cc.TiledMap.Orientation.HEX:
                    cc.logID(7210);
                    break;
                default:
                    cc.logID(7211);
                    break;
            }
        } else {
            ret = this._vertexZvalue;
        }
        return ret;
    }
});

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

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

var Orientation = null;
var TileFlag = null;
var FLIPPED_MASK = null;
var StaggerAxis = null;
var StaggerIndex = null;

_ccsg.TMXLayer.CanvasRenderCmd = function(renderable){
    this._rootCtor(renderable);
    this._needDraw = true;

    if (!Orientation) {
        Orientation = cc.TiledMap.Orientation;
        TileFlag = cc.TiledMap.TileFlag;
        FLIPPED_MASK = TileFlag.FLIPPED_MASK;
        StaggerAxis = cc.TiledMap.StaggerAxis;
        StaggerIndex = cc.TiledMap.StaggerIndex;
    }
};

var proto = _ccsg.TMXLayer.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = _ccsg.TMXLayer.CanvasRenderCmd;

proto.rendering = function (ctx, scaleX, scaleY) {
    var node = this._node, hasRotation = (node._rotationX || node._rotationY),
        layerOrientation = node.layerOrientation,
        tiles = node.tiles,
        alpha = node._opacity / 255;

    if (!tiles || alpha <= 0) {
        return;
    }

    var maptw = node._mapTileSize.width,
        mapth = node._mapTileSize.height,
        tilew = node.tileset._tileSize.width / cc.director._contentScaleFactor,
        tileh = node.tileset._tileSize.height / cc.director._contentScaleFactor,
        extw = tilew - maptw,
        exth = tileh - mapth,
        winw = cc.winSize.width,
        winh = cc.winSize.height,
        rows = node._layerSize.height,
        cols = node._layerSize.width,
        grids = node._texGrids,
        spTiles = node._spriteTiles,
        wt = this._worldTransform,
        ox = node._position.x,
        oy = node._position.y,
        a = wt.a, b = wt.b, c = wt.c, d = wt.d,
        mapx = ox * a + oy * c + wt.tx,
        mapy = ox * b + oy * d + wt.ty;

    var wrapper = ctx || cc._renderContext, context = wrapper.getContext();

    // Culling
    var startCol = 0, startRow = 0,
        maxCol = cols, maxRow = rows;
    if (!hasRotation && layerOrientation === Orientation.ORTHO) {
        startCol = Math.floor(-(mapx - extw * a) / (maptw * a));
        startRow = Math.floor((mapy - exth * d + mapth * rows * d - winh) / (mapth * d));
        maxCol = Math.ceil((winw - mapx + extw * a) / (maptw * a));
        maxRow = rows - Math.floor(-(mapy + exth * d) / (mapth * d));
        // Adjustment
        if (startCol < 0) startCol = 0;
        if (startRow < 0) startRow = 0;
        if (maxCol > cols) maxCol = cols;
        if (maxRow > rows) maxRow = rows;
    }

    var i, row, col, colOffset = startRow * cols, z, 
        gid, grid, tex, cmd,
        top, left, bottom, right, dw = tilew, dh = tileh,
        w = tilew * a, h = tileh * d, gt, gl, gb, gr,
        flippedX = false, flippedY = false;

    // Draw culled sprite tiles
    z = colOffset + startCol;
    for (i in spTiles) {
        if (i < z && spTiles[i]) {
            cmd = spTiles[i]._renderCmd;
            if (spTiles[i]._localZOrder === 0 && !!cmd.rendering && spTiles[i]._visible) {
                cmd.rendering(ctx, scaleX, scaleY);
            }
        }
        else if (i >= z) {
            break;
        }
    }

    wrapper.setTransform(wt, scaleX, scaleY);
    wrapper.setGlobalAlpha(alpha);

    var axis, tileOffset, odd_even, diffX1, diffY1;

    if (layerOrientation === Orientation.HEX) {
        var index = node._staggerIndex,
            hexSideLength = node._hexSideLength;
        axis = node._staggerAxis;
        tileOffset = node.tileset.tileOffset;
        odd_even = (index === StaggerIndex.STAGGERINDEX_ODD) ? 1 : -1;
        diffX1 = (axis === StaggerAxis.STAGGERAXIS_X) ? ((maptw - hexSideLength)/2) : 0;
        diffY1 = (axis === StaggerAxis.STAGGERAXIS_Y) ? ((mapth - hexSideLength)/2) : 0;
    }

    for (row = startRow; row < maxRow; ++row) {
        for (col = startCol; col < maxCol; ++col) {
            z = colOffset + col;
            // Skip sprite tiles
            if (spTiles[z]) {
                cmd = spTiles[z]._renderCmd;
                if (spTiles[z]._localZOrder === 0 && !!cmd.rendering && spTiles[z]._visible) {
                    cmd.rendering(ctx, scaleX, scaleY);
                    wrapper.setTransform(wt, scaleX, scaleY);
                    wrapper.setGlobalAlpha(alpha);
                }
                continue;
            }

            gid = node.tiles[z];
            grid = grids[(gid & FLIPPED_MASK) >>> 0];
            if (!grid) {
                continue;
            }
            tex = node._textures[grid.texId];
            if (!tex || !tex._htmlElementObj) {
                continue;
            }

            switch (layerOrientation) {
            case Orientation.ORTHO:
                left = col * maptw;
                bottom = -(rows - row - 1) * mapth;
                break;
            case Orientation.ISO:
                left = maptw / 2 * ( cols + col - row - 1);
                bottom = -mapth / 2 * ( rows * 2 - col - row - 2);
                break;
            case Orientation.HEX:
                var diffX2 = (axis === StaggerAxis.STAGGERAXIS_Y && row % 2 === 1) ? (maptw / 2 * odd_even) : 0;
                left = col * (maptw - diffX1) + diffX2 + tileOffset.x;
                var diffY2 = (axis === StaggerAxis.STAGGERAXIS_X && col % 2 === 1) ? (mapth/2 * -odd_even) : 0;
                bottom = -(rows - row - 1) * (mapth -diffY1) - diffY2 + tileOffset.y;
                break;
            }
            right = left + tilew;
            top = bottom - tileh;
            // TMX_ORIENTATION_ISO trim
            if (!hasRotation && layerOrientation === Orientation.ISO) {
                gb = -mapy + bottom*d;
                if (gb < -winh-h) {
                    col += Math.floor((-winh - gb)*2/h) - 1;
                    continue;
                }
                gr = mapx + right*a;
                if (gr < -w) {
                    col += Math.floor((-gr)*2/w) - 1;
                    continue;
                }
                gl = mapx + left*a;
                gt = -mapy + top*d;
                if (gl > winw || gt > 0) {
                    col = maxCol;
                    continue;
                }
            }

            // Rotation and Flip
            if (gid > TileFlag.DIAGONAL) {
                flippedX = (gid & TileFlag.HORIZONTAL) >>> 0;
                flippedY = (gid & TileFlag.VERTICAL) >>> 0;
            }

            if (flippedX) {
                left = -right;
                context.scale(-1, 1);
            }
            if (flippedY) {
                top = -bottom;
                context.scale(1, -1);
            }

            context.drawImage(tex._htmlElementObj,
                grid.x, grid.y, grid.width, grid.height,
                left, top, dw, dh);
            // Revert flip
            if (flippedX) {
                context.scale(-1, 1);
            }
            if (flippedY) {
                context.scale(1, -1);
            }
            cc.g_NumberOfDraws++;
        }
        colOffset += cols;
    }

    // Draw culled sprite tiles
    for (i in spTiles) {
        if (i > z && spTiles[i]) {
            cmd = spTiles[i]._renderCmd;
            if (spTiles[i]._localZOrder === 0 && !!cmd.rendering && spTiles[i]._visible) {
                cmd.rendering(ctx, scaleX, scaleY);
            }
        }
    }
};

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.

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

var Orientation = null;
var TileFlag = null;
var FLIPPED_MASK = null;
var StaggerAxis = null;
var StaggerIndex = null;

_ccsg.TMXLayer.WebGLRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = true;
    this._vertices = [
        {x:0, y:0},
        {x:0, y:0},
        {x:0, y:0},
        {x:0, y:0}
    ];
    this._color = new Uint32Array(1);
    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST);

    var radian = Math.PI * 90 / 180;
    this._sin90 = Math.sin(radian);
    this._cos90 = Math.cos(radian);
    radian = radian * 3;
    this._sin270 = Math.sin(radian);
    this._cos270 = Math.cos(radian);

    if (!Orientation) {
        Orientation = cc.TiledMap.Orientation;
        TileFlag = cc.TiledMap.TileFlag;
        FLIPPED_MASK = TileFlag.FLIPPED_MASK;
        StaggerAxis = cc.TiledMap.StaggerAxis;
        StaggerIndex = cc.TiledMap.StaggerIndex;
    }
};

var proto = _ccsg.TMXLayer.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = _ccsg.TMXLayer.WebGLRenderCmd;

proto.uploadData = function (f32buffer, ui32buffer, vertexDataOffset) {
    var node = this._node, hasRotation = (node._rotationX || node._rotationY),
        layerOrientation = node.layerOrientation,
        tiles = node.tiles;

    if (!tiles) {
        return 0;
    }

    var maptw = node._mapTileSize.width,
        mapth = node._mapTileSize.height,
        tilew = node.tileset._tileSize.width / cc.director._contentScaleFactor,
        tileh = node.tileset._tileSize.height / cc.director._contentScaleFactor,
        extw = tilew - maptw,
        exth = tileh - mapth,
        winw = cc.winSize.width,
        winh = cc.winSize.height,
        rows = node._layerSize.height,
        cols = node._layerSize.width,
        grids = node._texGrids,
        spTiles = node._spriteTiles,
        wt = this._worldTransform,
        a = wt.a, b = wt.b, c = wt.c, d = wt.d, tx = wt.tx, ty = wt.ty,
        ox = node._position.x,
        oy = node._position.y,
        mapx = ox * a + oy * c + tx,
        mapy = ox * b + oy * d + ty;

    var opacity = node._opacity,
        cr = this._displayedColor.r,
        cg = this._displayedColor.g,
        cb = this._displayedColor.b;
    if (node._opacityModifyRGB) {
        var ca = opacity / 255;
        cr *= ca;
        cg *= ca;
        cb *= ca;
    }
    this._color[0] = ((opacity<<24) | (cb<<16) | (cg<<8) | cr);

    // Culling
    var startCol = 0, startRow = 0,
        maxCol = cols, maxRow = rows;
    if (!hasRotation && layerOrientation === Orientation.ORTHO) {
        startCol = Math.floor(-(mapx - extw * a) / (maptw * a));
        startRow = Math.floor((mapy - exth * d + mapth * rows * d - winh) / (mapth * d));
        maxCol = Math.ceil((winw - mapx + extw * a) / (maptw * a));
        maxRow = rows - Math.floor(-(mapy + exth * d) / (mapth * d));
        // Adjustment
        if (startCol < 0) startCol = 0;
        if (startRow < 0) startRow = 0;
        if (maxCol > cols) maxCol = cols;
        if (maxRow > rows) maxRow = rows;
    }

    var row, col,
        offset = vertexDataOffset,
        colOffset = startRow * cols, z, gid, grid,
        i, top, left, bottom, right, 
        w = tilew * a, h = tileh * d, gt, gl, gb, gr,
        wa = a, wb = b, wc = c, wd = d, wtx = tx, wty = ty, // world
        flagged = false, flippedX = false, flippedY = false,
        vertices = this._vertices,
        axis, tileOffset, diffX1, diffY1, odd_even;

    if (layerOrientation === Orientation.HEX) {
        var index = node._staggerIndex,
            hexSideLength = node._hexSideLength;
        axis = node._staggerAxis;
        tileOffset = node.tileset.tileOffset;
        odd_even = (index === StaggerIndex.STAGGERINDEX_ODD) ? 1 : -1;
        diffX1 = (axis === StaggerAxis.STAGGERAXIS_X) ? ((maptw - hexSideLength)/2) : 0;
        diffY1 = (axis === StaggerAxis.STAGGERAXIS_Y) ? ((mapth - hexSideLength)/2) : 0;
    }

    for (row = startRow; row < maxRow; ++row) {
        for (col = startCol; col < maxCol; ++col) {
            // No more buffer
            if (offset + 24 > f32buffer.length) {
                cc.renderer._increaseBatchingSize((offset - vertexDataOffset) / 6, cc.renderer.VertexType.QUAD);
                cc.renderer._batchRendering();
                vertexDataOffset = 0;
                offset = 0;
            }

            z = colOffset + col;
            // Skip sprite tiles
            if (spTiles[z]) {
                continue;
            }

            gid = node.tiles[z];
            grid = grids[(gid & FLIPPED_MASK) >>> 0];
            if (!grid) {
                continue;
            }

            // Vertices
            switch (layerOrientation) {
            case Orientation.ORTHO:
                left = col * maptw;
                bottom = (rows - row - 1) * mapth;
                z = node._vertexZ + cc.renderer.assignedZStep * z / tiles.length;
                break;
            case Orientation.ISO:
                left = maptw / 2 * ( cols + col - row - 1);
                bottom = mapth / 2 * ( rows * 2 - col - row - 2);
                z = node._vertexZ + cc.renderer.assignedZStep * (node.height - bottom) / node.height;
                break;
            case Orientation.HEX:
                var diffX2 = (axis === StaggerAxis.STAGGERAXIS_Y && row % 2 === 1) ? (maptw / 2 * odd_even) : 0;
                left = col * (maptw - diffX1) + diffX2 + tileOffset.x;
                var diffY2 = (axis === StaggerAxis.STAGGERAXIS_X && col % 2 === 1) ? (mapth/2 * -odd_even) : 0;
                bottom = (rows - row - 1) * (mapth -diffY1) + diffY2 - tileOffset.y;
                z = node._vertexZ + cc.renderer.assignedZStep * (node.height - bottom) / node.height;
                break;
            }
            right = left + tilew;
            top = bottom + tileh;
            // TMX_ORIENTATION_ISO trim
            if (!hasRotation && layerOrientation === Orientation.ISO) {
                gb = mapy + bottom*d;
                if (gb > winh+h) {
                    col += Math.floor((gb-winh)*2/h) - 1;
                    continue;
                }
                gr = mapx + right*a;
                if (gr < -w) {
                    col += Math.floor((-gr)*2/w) - 1;
                    continue;
                }
                gl = mapx + left*a;
                gt = mapy + top*d;
                if (gl > winw || gt < 0) {
                    col = maxCol;
                    continue;
                }
            }
            // Rotation and Flip
            if (gid > TileFlag.DIAGONAL) {
                flagged = true;
                flippedX = (gid & TileFlag.HORIZONTAL) >>> 0;
                flippedY = (gid & TileFlag.VERTICAL) >>> 0;
                // if ((gid & TileFlag.DIAGONAL) >>> 0) {
                //     var flag = (gid & (TileFlag.HORIZONTAL | TileFlag.VERTICAL) >>> 0) >>> 0;
                //     // handle the 4 diagonally flipped states.
                //     var la, lb, lc, ld;
                //     if (flag === TileFlag.HORIZONTAL || flag === (TileFlag.VERTICAL | TileFlag.HORIZONTAL) >>> 0) {
                //         lb = -(lc = this._sin90);
                //         la = ld = this._cos90;
                //     }
                //     else {
                //         lb = -(lc = this._sin270);
                //         la = ld = this._cos270;
                //     }
                //     left += grid.width * scalex / 2;
                //     bottom += grid.height * scaley / 2;
                //     wa = la * a + lb * c;
                //     wb = la * b + lb * d;
                //     wc = lc * a + ld * c;
                //     wd = lc * b + ld * d;
                //     wtx = a * left + c * bottom + tx;
                //     wty = d * bottom + ty + b * left;
                //     right = right - left;
                //     top = top - bottom;
                //     left = -right;
                //     bottom = -top;
                // }
            }

            vertices[0].x = left * wa + top * wc + wtx; // tl
            vertices[0].y = left * wb + top * wd + wty;
            vertices[1].x = left * wa + bottom * wc + wtx; // bl
            vertices[1].y = left * wb + bottom * wd + wty;
            vertices[2].x = right * wa + top * wc + wtx; // tr
            vertices[2].y = right * wb + top * wd + wty;
            vertices[3].x = right * wa + bottom * wc + wtx; // br
            vertices[3].y = right * wb + bottom * wd + wty;

            for (i = 0; i < 4; ++i) {
                f32buffer[offset] = vertices[i].x;
                f32buffer[offset + 1] = vertices[i].y;
                f32buffer[offset + 2] = z;
                ui32buffer[offset + 3] = this._color[0];
                switch (i) {
                case 0: // tl
                f32buffer[offset + 4] = flippedX ? grid.r : grid.l;
                f32buffer[offset + 5] = flippedY ? grid.b : grid.t;
                break;
                case 1: // bl
                f32buffer[offset + 4] = flippedX ? grid.r : grid.l;
                f32buffer[offset + 5] = flippedY ? grid.t : grid.b;
                break;
                case 2: // tr
                f32buffer[offset + 4] = flippedX ? grid.l : grid.r;
                f32buffer[offset + 5] = flippedY ? grid.b : grid.t;
                break;
                case 3: // br
                f32buffer[offset + 4] = flippedX ? grid.l : grid.r;
                f32buffer[offset + 5] = flippedY ? grid.t : grid.b;
                break;
                }

                offset += 6;
            }
            if (flagged) {
                wa = a;
                wb = b;
                wc = c;
                wd = d;
                wtx = tx;
                wty = ty;
                flippedX = false;
                flippedY = false;
                flagged = false;
            }
        }
        colOffset += cols;
    }
    return (offset - vertexDataOffset) / 6;
};

/*global _ccsg */

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2012 James Chen
 Copyright (c) 2011-2012 cocos2d-x.org

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

// https://segmentfault.com/q/1010000002914610
var SCROLLY = 40;
var TIMER_NAME = 400;
var LEFT_PADDING = 2;
var Utils = require('../cocos2d/core/platform/utils');

function adjustEditBoxPosition (editBox) {
    var worldPos = editBox.convertToWorldSpace(cc.p(0,0));
    var windowHeight = cc.visibleRect.height;
    var windowWidth = cc.visibleRect.width;
    var factor = 0.5;
    if(windowWidth > windowHeight) {
        factor = 0.7;
    }
    setTimeout(function() {
        if(window.scrollY < SCROLLY && worldPos.y < windowHeight * factor) {
            var scrollOffset = windowHeight * factor - worldPos.y - window.scrollY;
            if (scrollOffset < 35) scrollOffset = 35;
            if (scrollOffset > 320) scrollOffset = 320;
            window.scrollTo(scrollOffset, scrollOffset);
        }
    }, TIMER_NAME);
}

var capitalize = function(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Enum for keyboard return types
 * @readonly
 * @enum cc.EditBox.KeyboardReturnType
 */
var KeyboardReturnType = cc.Enum({
    /**
     * @property {Number} DEFAULT
     */
    DEFAULT: 0,
    /**
     * @property {Number} DONE
     */
    DONE: 1,
    /**
     * @property {Number} SEND
     */
    SEND: 2,
    /**
     * @property {Number} SEARCH
     */
    SEARCH: 3,
    /**
     * @property {Number} GO
     */
    GO: 4
});

/**
 * The EditBox's InputMode defines the type of text that the user is allowed to enter
 * @readonly
 * @enum {number}
 * @memberof cc.EditBox.InputMode
 */
var InputMode = cc.Enum({

    /**
     * @property {Number} ANY
     */
    ANY: 0,

    /**
     * The user is allowed to enter an e-mail address.
     * @property {Number} EMAIL_ADDR
     */
    EMAIL_ADDR: 1,

    /**
     * The user is allowed to enter an integer value.
     * @property {Number} NUMERIC
     */
    NUMERIC: 2,

    /**
     * The user is allowed to enter a phone number.
     * @property {Number} PHONE_NUMBER
     */
    PHONE_NUMBER: 3,

    /**
     * The user is allowed to enter a URL.
     * @property {Number} URL
     */
    URL: 4,

    /**
     * The user is allowed to enter a real number value.
     * This extends kEditBoxInputModeNumeric by allowing a decimal point.
     * @property {Number} DECIMAL
     */
    DECIMAL: 5,

    /**
     * The user is allowed to enter any text, except for line breaks.
     * @property {Number} SINGLE_LINE
     */
    SINGLE_LINE: 6
});

/**
 * Enum for the EditBox's input flags
 * @readonly
 * @enum cc.EditBox.InputFlag
 */
var InputFlag = cc.Enum({
    /**
     * Indicates that the text entered is confidential data that should be
     * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
     *
     * @property {Number} PASSWORD
     */
    PASSWORD: 0,

    /**
     * Indicates that the text entered is sensitive data that the
     * implementation must never store into a dictionary or table for use
     * in predictive, auto-completing, or other accelerated input schemes.
     * A credit card number is an example of sensitive data.
     *
     * @property {Number} SENSITIVE
     */
    SENSITIVE: 1,

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each word should be capitalized.
     *
     * @property {Number} INITIAL_CAPS_WORD
     */
    INITIAL_CAPS_WORD: 2,

    /**
     * This flag is a hint to the implementation that during text editing,
     * the initial letter of each sentence should be capitalized.
     *
     * @property {Number} INITIAL_CAPS_SENTENCE
     */
    INITIAL_CAPS_SENTENCE: 3,

    /**
     * Capitalize all characters automatically.
     *
     * @property {Number} INITIAL_CAPS_ALL_CHARACTERS
     */
    INITIAL_CAPS_ALL_CHARACTERS: 4,

    /**
     * Don't do anything with the input text.
     * @property {Number} DEFAULT
     */
    DEFAULT: 5
});

/**
 * @class
 * @extends cc._Class
 */
cc.EditBoxDelegate = cc._Class.extend({
    /**
     * This method is called when an edit box gains focus after keyboard is shown.
     * @param {cc.EditBox} sender
     */
    editBoxEditingDidBegan: function (sender) {
    },

    /**
     * This method is called when an edit box loses focus after keyboard is hidden.
     * @param {cc.EditBox} sender
     */
    editBoxEditingDidEnded: function (sender) {
    },

    /**
     * This method is called when the edit box text was changed.
     * @param {cc.EditBox} sender
     * @param {String} text
     */
    editBoxTextChanged: function (sender, text) {
    },

    /**
     * This method is called when the return button was pressed.
     * @param {cc.EditBox} sender
     */
    editBoxEditingReturn: function (sender) {
    }
});


/**
 * <p>cc.EditBox is a brief Class for edit box.<br/>
 * You can use this widget to gather small amounts of text from the user.</p>
 *
 */
_ccsg.EditBox = _ccsg.Node.extend({
    _backgroundSprite: null,
    _delegate: null,
    _editBoxInputMode: InputMode.ANY,
    _editBoxInputFlag: InputFlag.DEFAULT,
    _keyboardReturnType: KeyboardReturnType.DEFAULT,
    _maxLength: 50,
    _text: '',
    _placeholderText: '',
    _alwaysOnTop: false,
    _placeholderFontName: '',
    _placeholderFontSize: 14,
    __fullscreen: false,
    __autoResize: false,
    _placeholderColor: null,
    _className: 'EditBox',

    ctor: function (size, normal9SpriteBg) {
        _ccsg.Node.prototype.ctor.call(this);

        this._textColor = cc.Color.WHITE;
        this._placeholderColor = cc.Color.GRAY;

        this.initWithSizeAndBackgroundSprite(size, normal9SpriteBg);
        this._renderCmd._createLabels();
    },

    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            return new _ccsg.EditBox.CanvasRenderCmd(this);
        } else {
            return new _ccsg.EditBox.WebGLRenderCmd(this);
        }
    },

    setContentSize: function (width, height) {
        if (width.width !== undefined && width.height !== undefined) {
            height = width.height;
            width = width.width;
        }
        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._updateEditBoxSize(width, height);
    },

    setVisible: function ( visible ) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.updateVisibility();
    },

    createDomElementIfNeeded: function () {
        if(!this._renderCmd._edTxt) {
            this._renderCmd._createDomTextArea();
        }
    },

    setTabIndex: function(index) {
        if(this._renderCmd._edTxt) {
            this._renderCmd._edTxt.tabIndex = index;
        }
    },

    getTabIndex: function() {
        if(this._renderCmd._edTxt) {
            return this._renderCmd._edTxt.tabIndex;
        }
        cc.warnID(4700);
        return -1;
    },

    setFocus: function() {
        if(this._renderCmd._edTxt) {
            this._renderCmd._edTxt.focus();
        }
    },

    isFocused: function() {
        if(this._renderCmd._edTxt) {
            return document.activeElement === this._renderCmd._edTxt;
        }
        cc.warnID(4700);
        return false;
    },

    stayOnTop: function (flag) {
        if(this._alwaysOnTop === flag) return;

        this._alwaysOnTop = flag;
        this._renderCmd.stayOnTop(this._alwaysOnTop);
    },

    cleanup: function () {
        this._super();

        this._renderCmd._removeDomFromGameContainer();
    },

    _onTouchBegan: function (touch) {
        var touchPoint = touch.getLocation();
        var bb = cc.rect(0,0, this._contentSize.width, this._contentSize.height);
        var hitted = cc.rectContainsPoint(bb, this.convertToNodeSpace(touchPoint));
        if(hitted) {
            return true;
        }
        else {
            this._renderCmd._endEditing();
            return false;
        }
    },

    _onTouchEnded: function () {
        this._renderCmd._beginEditing();
    },

    _updateBackgroundSpriteSize: function (width, height) {
        if(this._backgroundSprite) {
            this._backgroundSprite.setContentSize(width, height);
        }
    },

    _updateEditBoxSize: function(size, height) {
        var newWidth = (typeof size.width === 'number') ? size.width : size;
        var newHeight = (typeof size.height === 'number') ? size.height : height;

        this._updateBackgroundSpriteSize(newWidth, newHeight);
        this._renderCmd.updateSize(newWidth, newHeight);
    },

    setLineHeight: function (lineHeight) {
        this._renderCmd.setLineHeight(lineHeight);
    },

    setFont: function (fontName, fontSize) {
        this._renderCmd.setFont(fontName, fontSize);
    },

    _setFont: function (fontStyle) {
        this._renderCmd._setFont(fontStyle);
    },

    getBackgroundSprite: function() {
        return this._backgroundSprite;
    },

    setFontName: function (fontName) {
        this._renderCmd.setFontName(fontName);
    },

    setFontSize: function (fontSize) {
        this._renderCmd.setFontSize(fontSize);
    },

    setString: function (text) {
        if (text.length >= this._maxLength) {
            text = text.slice(0, this._maxLength);
        }
        this._text = text;
        this._renderCmd.setString(text);
    },

    setFontColor: function (color) {
        this._textColor = color;
        this._renderCmd.setFontColor(color);
    },

    setMaxLength: function (maxLength) {
        if (!isNaN(maxLength)) {
            if(maxLength < 0) {
                //we can't set Number.MAX_VALUE to input's maxLength property
                //so we use a magic number here, it should works at most use cases.
                maxLength = 65535;
            }
            this._maxLength = maxLength;
            this._renderCmd.setMaxLength(maxLength);
        }
    },

    getMaxLength: function () {
        return this._maxLength;
    },

    setPlaceHolder: function (text) {
        if (text !== null) {
            this._renderCmd.setPlaceHolder(text);
            this._placeholderText = text;
        }
    },

    setPlaceholderFont: function (fontName, fontSize) {
        this._placeholderFontName = fontName;
        this._placeholderFontSize = fontSize;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    _setPlaceholderFont: function (fontStyle) {
        var res = cc.LabelTTF._fontStyleRE.exec(fontStyle);
        if (res) {
            this._placeholderFontName = res[2];
            this._placeholderFontSize = parseInt(res[1]);
            this._renderCmd._updateDOMPlaceholderFontStyle();
        }
    },

    setPlaceholderFontName: function (fontName) {
        this._placeholderFontName = fontName;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    setPlaceholderFontSize: function (fontSize) {
        this._placeholderFontSize = fontSize;
        this._renderCmd._updateDOMPlaceholderFontStyle();
    },

    setPlaceholderFontColor: function (color) {
        this._placeholderColor = color;
        this._renderCmd.setPlaceholderFontColor(color);
    },

    setInputFlag: function (inputFlag) {
        this._editBoxInputFlag = inputFlag;
        this._renderCmd.setInputFlag(inputFlag);
    },

    getString: function () {
        return this._text;
    },

    initWithSizeAndBackgroundSprite: function (size, normal9SpriteBg) {
        if(this._backgroundSprite) {
            this._backgroundSprite.removeFromParent();
        }
        this._backgroundSprite = normal9SpriteBg;
        _ccsg.Node.prototype.setContentSize.call(this, size);

        if(this._backgroundSprite && !this._backgroundSprite.parent) {
            this._backgroundSprite.setAnchorPoint(cc.p(0, 0));
            this.addChild(this._backgroundSprite);

            this._updateBackgroundSpriteSize(size.width, size.height);
        }


        this.x = 0;
        this.y = 0;
        return true;
    },

    setDelegate: function (delegate) {
        this._delegate = delegate;
    },

    getPlaceHolder: function () {
        return this._placeholderText;
    },

    setInputMode: function (inputMode) {
        if (this._editBoxInputMode === inputMode) return;

        var oldText = this.getString();
        this._editBoxInputMode = inputMode;

        this._renderCmd.setInputMode(inputMode);
        this._renderCmd.transform();

        this.setString(oldText);
        this._renderCmd._updateLabelPosition(this.getContentSize());
    },

    setReturnType: function (returnType) {
        this._keyboardReturnType = returnType;
        this._renderCmd._updateDomInputType();
    },

    initWithBackgroundColor: function (size, bgColor) {
        this._edWidth = size.width;
        this.dom.style.width = this._edWidth.toString() + 'px';
        this._edHeight = size.height;
        this.dom.style.height = this._edHeight.toString() + 'px';
        this.dom.style.backgroundColor = cc.colorToHex(bgColor);
    }
});

var _p = _ccsg.EditBox.prototype;

// Extended properties
cc.defineGetterSetter(_p, 'font', null, _p._setFont);
cc.defineGetterSetter(_p, 'fontName', null, _p.setFontName);
cc.defineGetterSetter(_p, 'fontSize', null, _p.setFontSize);
cc.defineGetterSetter(_p, 'fontColor', null, _p.setFontColor);
cc.defineGetterSetter(_p, 'string', _p.getString, _p.setString);
cc.defineGetterSetter(_p, 'maxLength', _p.getMaxLength, _p.setMaxLength);
cc.defineGetterSetter(_p, 'placeholder', _p.getPlaceHolder, _p.setPlaceHolder);
cc.defineGetterSetter(_p, 'placeholderFont', null, _p._setPlaceholderFont);
cc.defineGetterSetter(_p, 'placeholderFontName', null, _p.setPlaceholderFontName);
cc.defineGetterSetter(_p, 'placeholderFontSize', null, _p.setPlaceholderFontSize);
cc.defineGetterSetter(_p, 'placeholderFontColor', null, _p.setPlaceholderFontColor);
cc.defineGetterSetter(_p, 'inputFlag', null, _p.setInputFlag);
cc.defineGetterSetter(_p, 'delegate', null, _p.setDelegate);
cc.defineGetterSetter(_p, 'inputMode', null, _p.setInputMode);
cc.defineGetterSetter(_p, 'returnType', null, _p.setReturnType);

_p = null;

_ccsg.EditBox.InputMode = InputMode;
_ccsg.EditBox.InputFlag = InputFlag;
_ccsg.EditBox.KeyboardReturnType = KeyboardReturnType;

(function (editbox) {
    editbox._polyfill = {
        zoomInvalid: false
    };

    if (cc.sys.OS_ANDROID === cc.sys.os
        && (cc.sys.browserType === cc.sys.BROWSER_TYPE_SOUGOU
            || cc.sys.browserType === cc.sys.BROWSER_TYPE_360)) {
        editbox._polyfill.zoomInvalid = true;
    }
})(_ccsg.EditBox);

(function (polyfill) {
    var EditBoxImpl = function () {
    };

    var proto = EditBoxImpl.prototype = Object.create(Object.prototype);

    proto.updateMatrix = function () {
        if (!this._edTxt) return;

        var node = this._node, scaleX = cc.view._scaleX, scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        var t = this._worldTransform;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = t.a * scaleX, b = t.b, c = t.c, d = t.d * scaleY;

        var offsetX = container && container.style.paddingLeft &&  parseInt(container.style.paddingLeft);
        var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
        var tx = t.tx * scaleX + offsetX, ty = t.ty * scaleY + offsetY;

        if (polyfill.zoomInvalid) {
            this.updateSize(node._contentSize.width * a, node._contentSize.height * d);
            a = 1;
            d = 1;
        }

        var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this._edTxt.style['transform'] = matrix;
        this._edTxt.style['-webkit-transform'] = matrix;
        this._edTxt.style['transform-origin'] = '0px 100% 0px';
        this._edTxt.style['-webkit-transform-origin'] = '0px 100% 0px';
    };

    proto.updateVisibility = function () {
        if (!this._edTxt) return;

        if (this._node.visible) {
            this._edTxt.style.visibility = 'visible';
        } else {
            this._edTxt.style.visibility = 'hidden';
        }
    };

    proto.stayOnTop = function (flag) {
        if(flag) {
            this._removeLabels();
            this._edTxt.style.display = '';
        } else {
            this._createLabels();
            this._edTxt.style.display = 'none';
            this._showLabels();
        }
    };

    // Called before editbox focus to register cc.view status
    proto._beginEditingOnMobile = function (editBox) {
        this.__orientationChanged = function () {
            adjustEditBoxPosition(editBox);
        };

        window.addEventListener('orientationchange', this.__orientationChanged);

        if (cc.view.isAutoFullScreenEnabled()) {
            this.__fullscreen = true;
            cc.view.enableAutoFullScreen(false);
            cc.screen.exitFullScreen();
        } else {
            this.__fullscreen = false;
        }
        this.__autoResize = cc.view.__resizeWithBrowserSize;
        cc.view.resizeWithBrowserSize(false);
    };
    // Called after keyboard disappeared to readapte the game view
    proto._endEditingOnMobile = function () {
        if (this.__rotateScreen) {
            cc.container.style['-webkit-transform'] = 'rotate(90deg)';
            cc.container.style.transform = 'rotate(90deg)';

            var view = cc.view;
            var width = view._originalDesignResolutionSize.width;
            var height = view._originalDesignResolutionSize.height;
            if (width > 0) {
                view.setDesignResolutionSize(width, height, view._resolutionPolicy);
            }
            this.__rotateScreen = false;
        }

        window.removeEventListener('orientationchange', this.__orientationChanged);

        window.scrollTo(0, 0);
        if(this.__fullscreen) {
            cc.view.enableAutoFullScreen(true);
        }
        if (this.__autoResize) {
            cc.view.resizeWithBrowserSize(true);
        }
    };
    // Called after editbox focus to readapte the game view
    proto._onFocusOnMobile = function (editBox) {
        if (cc.view._isRotated) {
            cc.container.style['-webkit-transform'] = 'rotate(0deg)';
            cc.container.style.transform = 'rotate(0deg)';
            cc.view._isRotated = false;
            var policy = cc.view.getResolutionPolicy();
            policy.apply(cc.view, cc.view.getDesignResolutionSize());
            cc.view._isRotated = true;
            //use window scrollTo to adjust the input area
            window.scrollTo(35, 35);
            this.__rotateScreen = true;
        } else {
            this.__rotateScreen = false;
        }
        adjustEditBoxPosition(editBox);
    };



    proto._createDomInput = function () {
        this._removeDomFromGameContainer();

        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('input');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        tmpEdTxt.style.textTransform = 'uppercase';
        tmpEdTxt.style.display = 'none';
        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";

        tmpEdTxt.addEventListener('input', function () {
            var editBox = thisPointer._editBox;


            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if (editBox._text !== this.value) {
                    editBox._text = this.value;
                    thisPointer._updateDomTextCases();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();
                e.preventDefault();
                if(this.value === '') {
                    this.style.fontSize = editBox._placeholderFontSize + 'px';
                    this.style.color = cc.colorToHex(editBox._placeholderColor);
                }

                editBox._text = this.value;
                thisPointer._updateDomTextCases();

                thisPointer._endEditing();
                if (editBox._delegate && editBox._delegate.editBoxEditingReturn) {
                    editBox._delegate.editBoxEditingReturn(editBox);
                }
                cc._canvas.focus();
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);
            thisPointer._hiddenLabels();

            if (cc.sys.isMobile) {
                thisPointer._onFocusOnMobile(editBox);
            }

            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegan) {
                editBox._delegate.editBoxEditingDidBegan(editBox);
            }
        });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            editBox._text = this.value;
            thisPointer._updateDomTextCases();

            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnded) {
                editBox._delegate.editBoxEditingDidEnded(editBox);
            }

            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }
            thisPointer._endEditing();
        });

        this._addDomToGameContainer();

        return tmpEdTxt;
    };

    proto._createDomTextArea = function () {
        this._removeDomFromGameContainer();

        var thisPointer = this;
        var tmpEdTxt = this._edTxt = document.createElement('textarea');
        tmpEdTxt.type = 'text';
        tmpEdTxt.style.fontSize = this._edFontSize + 'px';
        tmpEdTxt.style.color = '#000000';
        tmpEdTxt.style.border = 0;
        tmpEdTxt.style.background = 'transparent';
        tmpEdTxt.style.width = '100%';
        tmpEdTxt.style.height = '100%';
        tmpEdTxt.style.active = 0;
        tmpEdTxt.style.outline = 'medium';
        tmpEdTxt.style.padding = '0';
        tmpEdTxt.style.resize = 'none';
        tmpEdTxt.style.textTransform = 'uppercase';
        tmpEdTxt.style.overflow_y = 'scroll';
        tmpEdTxt.style.display = 'none';
        tmpEdTxt.style.position = "absolute";
        tmpEdTxt.style.bottom = "0px";
        tmpEdTxt.style.left = LEFT_PADDING + "px";
        tmpEdTxt.style.className = "cocosEditBox";

        tmpEdTxt.addEventListener('input', function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }

            var editBox = thisPointer._editBox;
            if (editBox._delegate && editBox._delegate.editBoxTextChanged) {
                if(editBox._text.toLowerCase() !== this.value.toLowerCase()) {
                    editBox._text = this.value;
                    thisPointer._updateDomTextCases();
                    editBox._delegate.editBoxTextChanged(editBox, editBox._text);
                }
            }
        });

        tmpEdTxt.addEventListener('focus', function () {
            var editBox = thisPointer._editBox;
            thisPointer._hiddenLabels();

            this.style.fontSize = thisPointer._edFontSize + 'px';
            this.style.color = cc.colorToHex(editBox._textColor);

            if (cc.sys.isMobile) {
                thisPointer._onFocusOnMobile(editBox);
            }

            if (editBox._delegate && editBox._delegate.editBoxEditingDidBegan) {
                editBox._delegate.editBoxEditingDidBegan(editBox);
            }

        });
        tmpEdTxt.addEventListener('keypress', function (e) {
            var editBox = thisPointer._editBox;

            if (e.keyCode === cc.KEY.enter) {
                e.stopPropagation();

                if (editBox._delegate && editBox._delegate.editBoxEditingReturn) {
                    editBox._delegate.editBoxEditingReturn(editBox);
                }
            }
        });
        tmpEdTxt.addEventListener('blur', function () {
            var editBox = thisPointer._editBox;
            editBox._text = this.value;
            thisPointer._updateDomTextCases();

            if (editBox._delegate && editBox._delegate.editBoxEditingDidEnded) {
                editBox._delegate.editBoxEditingDidEnded(editBox);
            }

            if (this.value === '') {
                this.style.fontSize = editBox._placeholderFontSize + 'px';
                this.style.color = cc.colorToHex(editBox._placeholderColor);
            }

            thisPointer._endEditing();
        });

        this._addDomToGameContainer();
        return tmpEdTxt;
    };

    proto._createLabels = function () {
        var editBoxSize = this._editBox.getContentSize();
        if(!this._textLabel) {
            this._textLabel = new _ccsg.Label();
            this._textLabel.setAnchorPoint(cc.p(0, 1));
            this._textLabel.setOverflow(_ccsg.Label.Overflow.CLAMP);
            this._editBox.addChild(this._textLabel, 100);
        }

        if(!this._placeholderLabel) {
            this._placeholderLabel = new _ccsg.Label();
            this._placeholderLabel.setAnchorPoint(cc.p(0, 1));
            this._placeholderLabel.setColor(cc.Color.GRAY);
            this._editBox.addChild(this._placeholderLabel, 100);
        }

        this._updateLabelPosition(editBoxSize);
    };

    proto._removeLabels = function () {
        if(!this._textLabel) return;

        this._editBox.removeChild(this._textLabel);
        this._textLabel = null;
    };

    proto._updateLabelPosition = function (editBoxSize) {
        if(!this._textLabel || !this._placeholderLabel) return;

        var labelContentSize = cc.size(editBoxSize.width - LEFT_PADDING, editBoxSize.height);
        this._textLabel.setContentSize(labelContentSize);
        this._placeholderLabel.setLineHeight(editBoxSize.height);
        var placeholderLabelSize = this._placeholderLabel.getContentSize();

        if (this._editBox._editBoxInputMode === InputMode.ANY){
            this._textLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setVerticalAlign(cc.VerticalTextAlignment.TOP);
            this._textLabel.setVerticalAlign(cc.VerticalTextAlignment.TOP);
            this._textLabel.enableWrapText(true);
        }
        else {
            this._textLabel.enableWrapText(false);
            this._textLabel.setPosition(LEFT_PADDING, editBoxSize.height);
            this._placeholderLabel.setPosition(LEFT_PADDING, (editBoxSize.height + placeholderLabelSize.height) / 2);
            this._placeholderLabel.setVerticalAlign(cc.VerticalTextAlignment.CENTER);
            this._textLabel.setVerticalAlign(cc.VerticalTextAlignment.CENTER);
        }

    };

    proto.setLineHeight = function (lineHeight) {
        if(this._textLabel) {
            this._textLabel.setLineHeight(lineHeight);
        }
    };

    proto._hiddenLabels = function () {
        if(this._textLabel) {
            this._textLabel.setVisible(false);
        }

        if(this._placeholderLabel) {
            this._placeholderLabel.setVisible(false);
        }
    };

    proto._updateDomTextCases = function() {
        var inputFlag = this._editBox._editBoxInputFlag;
        if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            this._editBox._text = this._editBox._text.toUpperCase();
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            this._editBox._text = capitalize(this._editBox._text);
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
            this._editBox._text = capitalizeFirstLetter(this._editBox._text);
        }
    };

    proto._updateLabelStringStyle = function() {
        if (this._edTxt.type === 'password') {
            var passwordString = '';
            var len = this._editBox._text.length;
            for (var i = 0; i < len; ++i) {
                passwordString += '\u25CF';
            }
            if(this._textLabel) {
                this._textLabel.setString(passwordString);
            }
        } else {
            this._updateDomTextCases();
            if(this._textLabel) {
                this._textLabel.setString(this._editBox._text);
            }
        }
    };

    proto._showLabels = function () {
        this._hiddenLabels();
        if (this._edTxt.value === '') {
            if(this._placeholderLabel) {
                this._placeholderLabel.setVisible(true);
                this._placeholderLabel.setString(this._editBox._placeholderText);
            }
        }
        else {
            if(this._textLabel) {
                this._textLabel.setVisible(true);
                this._textLabel.setString(this._editBox._text);
            }
        }
        this._updateLabelStringStyle();
    };

    proto._beginEditing = function() {
        if (!this._editBox._alwaysOnTop) {
            if (this._edTxt.style.display === 'none') {
                this._edTxt.style.display = '';
                this._edTxt.focus();
            }
        }

        if (cc.sys.isMobile && !this._editingMode) {
            // Pre adaptation and 
            this._beginEditingOnMobile(this._editBox);
        }
        this._editingMode = true;
    };

    proto._endEditing = function() {
        if (!this._editBox._alwaysOnTop) {
            this._edTxt.style.display = 'none';
        }
        this._showLabels();
        if (cc.sys.isMobile && this._editingMode) {
            var self = this;
            // Delay end editing adaptation to ensure virtual keyboard is disapeared
            setTimeout(function () {
                self._endEditingOnMobile();
            }, TIMER_NAME);
        }
        this._editingMode = false;
    };

    proto._setFont = function (fontStyle) {
        var res = cc.LabelTTF._fontStyleRE.exec(fontStyle);
        var textFontName = res[2];
        var textFontSize = parseInt(res[1]);
        if (res) {
            this.setFont(textFontName, textFontSize);
        }
    };

    proto.setFont = function (fontName, fontSize) {
        this._edFontName = fontName || this._edFontName;
        this._edFontSize = fontSize || this._edFontSize;
        this._updateDOMFontStyle();
    };

    proto.setFontName = function (fontName) {
        this._edFontName = fontName || this._edFontName;
        this._updateDOMFontStyle();
    };

    proto.setFontSize = function (fontSize) {
        this._edFontSize = fontSize || this._edFontSize;
        this._updateDOMFontStyle();
    };

    proto.setFontColor = function (color) {
        if(!this._edTxt) return;

        if (this._edTxt.value !== this._editBox._placeholderText) {
            this._edTxt.style.color = cc.colorToHex(color);
        }
        if(this._textLabel) {
            this._textLabel.setColor(color);
        }
    };

    proto.setPlaceHolder = function (text) {
        this._placeholderLabel.setString(text);
    };

    proto.setMaxLength = function (maxLength) {
        if(!this._edTxt) return;
        this._edTxt.maxLength = maxLength;
    };

    proto._updateDOMPlaceholderFontStyle = function () {
        this._placeholderLabel.setFontFileOrFamily(this._editBox._placeholderFontName);
        this._placeholderLabel.setFontSize(this._editBox._placeholderFontSize);
    };

    proto.setPlaceholderFontColor = function (color) {
        this._placeholderLabel.setColor(color);
    };

    proto._updateDomInputType = function () {
        var inputMode = this._editBox._editBoxInputMode;
        if(inputMode === InputMode.EMAIL_ADDR) {
            this._edTxt.type = 'email';
        } else if(inputMode === InputMode.NUMERIC ||
                 inputMode === InputMode.DECIMAL) {
            this._edTxt.type = 'number';
        } else if(inputMode === InputMode.PHONE_NUMBER) {
            this._edTxt.type = 'number';
            this._edTxt.pattern = '[0-9]*';
        } else if(inputMode === InputMode.URL) {
            this._edTxt.type = 'url';
        } else {
            this._edTxt.type = 'text';

            if(this._editBox._keyboardReturnType === KeyboardReturnType.SEARCH) {
                this._edTxt.type = 'search';
            }
        }


        if (this._editBox._editBoxInputFlag === InputFlag.PASSWORD) {
            this._edTxt.type = 'password';
        }
    };

    proto.setInputFlag = function (inputFlag) {
        if(!this._edTxt) return;

        this._updateDomInputType();

        this._edTxt.style.textTransform = 'none';

        if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            this._edTxt.style.textTransform = 'uppercase';
        }
        else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            this._edTxt.style.textTransform = 'capitalize';
        }
        this._updateLabelStringStyle();
    };

    proto.setInputMode = function (inputMode) {
        if (inputMode === InputMode.ANY) {
            this._createDomTextArea();
        }
        else {
            this._createDomInput();
        }

        this._updateDomInputType();
        var contentSize = this._node.getContentSize();
        this.updateSize(contentSize.width, contentSize.height);
    };

    proto.setString = function (text) {
        if(!this._edTxt) return;

        if (text !== null) {
            this._edTxt.value = text;

            if (text === '') {
                if(this._placeholderLabel) {
                    this._placeholderLabel.setString(this._editBox._placeholderText);
                    this._placeholderLabel.setColor(this._editBox._placeholderColor);
                }
                if(!this._editingMode) {
                    if (this._placeholderLabel) {
                        this._placeholderLabel.setVisible(true);
                    }
                    if (this._textLabel) {
                        this._textLabel.setVisible(false);
                    }
                }
            }
            else {
                this._edTxt.style.color = cc.colorToHex(this._editBox._textColor);
                if(this._textLabel) {
                    this._textLabel.setColor(this._editBox._textColor);
                }
                if (!this._editingMode) {
                    if(this._placeholderLabel) {
                        this._placeholderLabel.setVisible(false);
                    }
                    if(this._textLabel) {
                        this._textLabel.setVisible(true);
                    }
                }

                this._updateLabelStringStyle();
            }
        }
    };

    proto._updateDOMFontStyle = function() {
        if(!this._edTxt) return;

        if (this._edTxt.value !== '') {
            this._edTxt.style.fontFamily = this._edFontName;
            this._edTxt.style.fontSize = this._edFontSize + 'px';
        }
        if(this._textLabel) {
            this._textLabel.setFontSize(this._edFontSize);
            this._textLabel.setFontFileOrFamily(this._edFontName);
        }
    };


    proto.updateSize = function(newWidth, newHeight) {
        var editboxDomNode = this._edTxt;
        if (!editboxDomNode) return;

        editboxDomNode.style['width'] = newWidth + 'px';
        editboxDomNode.style['height'] = newHeight + 'px';

        this._updateLabelPosition(cc.size(newWidth, newHeight));
    };

    proto._addDomToGameContainer = function () {
        cc.game.container.appendChild(this._edTxt);
    };

    proto._removeDomFromGameContainer = function () {
        var editBox = this._edTxt;
        if(editBox){
            var hasChild = Utils.contains(cc.game.container, editBox);
            if(hasChild) {
                cc.game.container.removeChild(editBox);
            }
        }
        this._edTxt = null;
    };

    proto.initializeRenderCmd = function (node) {
        this._editBox = node;

        //it's a dom node, may be assigned with Input or TextArea.
        this._edFontSize = 14;
        this._edFontName = 'Arial';
        this._textLabel = null;
        this._placeholderLabel = null;
        this._editingMode = false;
        
        this.__fullscreen = false;
        this.__autoResize = false;
        this.__rotateScreen = false;
        this.__orientationChanged = null;
    };

    //define the canvas render command
    _ccsg.EditBox.CanvasRenderCmd = function (node) {
        this._rootCtor(node);
        this.initializeRenderCmd(node);
    };

    var canvasRenderCmdProto = _ccsg.EditBox.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    cc.js.mixin(canvasRenderCmdProto, proto);
    canvasRenderCmdProto.constructor = _ccsg.EditBox.CanvasRenderCmd;

    canvasRenderCmdProto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

    //define the webgl render command
    _ccsg.EditBox.WebGLRenderCmd = function (node) {
        this._rootCtor(node);
        this.initializeRenderCmd(node);
    };

    var webGLRenderCmdProto = _ccsg.EditBox.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
    cc.js.mixin(webGLRenderCmdProto, proto);
    webGLRenderCmdProto.constructor = _ccsg.EditBox.WebGLRenderCmd;

    webGLRenderCmdProto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

}(_ccsg.EditBox._polyfill));

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

/**
 * @class
 * @extends _ccsg.Node
 * @brief Displays a video file.
 *
 * @note VideoPlayer displays a video file based on DOM element
 * VideoPlayer will be rendered above all other graphical elements.
 *
 * @property {String}   path - The video path
 */
_ccsg.VideoPlayer = _ccsg.Node.extend(/** @lends _ccsg.VideoPlayer# */{

    ctor: function () {
        _ccsg.Node.prototype.ctor.call(this);
        // 播放结束等事件处理的队列
        this._EventList = {};
    },

    _createRenderCmd: function(){
        return new _ccsg.VideoPlayer.RenderCmd(this);
    },

    setURL: function (url) {
        this._renderCmd.updateURL(url);
    },

    getURL: function() {
        return this._renderCmd._url;
    },

    play: function () {
        this._renderCmd.play();
    },

    pause: function () {
        this._renderCmd.pause();
    },

    _resume: function () {
        this._renderCmd.play();
    },

    stop: function () {
        this._renderCmd.stop();
    },

    seekTo: function (time) {
        this._renderCmd.seekTo(time);
    },

    isPlaying: function () {
        return this._renderCmd.isPlaying();
    },

    duration: function () {
        return this._renderCmd.duration();
    },

    currentTime: function() {
        return this._renderCmd.currentTime();
    },

    createDomElementIfNeeded: function () {
        if (!this._renderCmd._video) {
            this._renderCmd.createDom();
        }
    },

    setKeepAspectRatioEnabled: function () {
        cc.logID(7700);
    },

    isKeepAspectRatioEnabled: function () {
        return true;
    },

    setFullScreenEnabled: function (enable) {
        var video = this._renderCmd._video;
        if (!video) return;

        if(enable)
            cc.screen.requestFullScreen(video);
        else
            cc.screen.exitFullScreen(video);

    },

    isFullScreenEnabled: function () {
        cc.logID(7701);
    },

    setEventListener: function (event, callback) {
        this._EventList[event] = callback;
    },

    removeEventListener: function (event) {
        this._EventList[event] = null;
    },

    _dispatchEvent: function (event) {
        var callback = this._EventList[event];
        if (callback)
            callback.call(this, this, this._renderCmd._video.src);
    },

    onPlayEvent: function () {
        var callback = this._EventList[_ccsg.VideoPlayer.EventType.PLAYING];
        callback.call(this, this, this._renderCmd._video.src);
    },

    setContentSize: function (width, height) {
        if (width.width !== undefined && width.height !== undefined) {
            height = width.height;
            width = width.width;
        }
        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._renderCmd.updateSize(width, height);
    },

    cleanup: function () {
        this._super();

        this._renderCmd.removeDom();
    },

    onEnter: function () {
        _ccsg.Node.prototype.onEnter.call(this);
        var list = _ccsg.VideoPlayer.elements;
        if(list.indexOf(this) === -1)
            list.push(this);
    },

    onExit: function () {
        _ccsg.Node.prototype.onExit.call(this);
        var list = _ccsg.VideoPlayer.elements;
        var index = list.indexOf(this);
        if(index !== -1)
            list.splice(index, 1);
    },

    setVisible: function ( visible ) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.updateVisibility();
    }
});

// video 队列，所有 vidoe 在 onEnter 的时候都会插入这个队列
_ccsg.VideoPlayer.elements = [];
// video 在 game_hide 事件中被自动暂停的队列，用于回复的时候重新开始播放
_ccsg.VideoPlayer.pauseElements = [];

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
    var list = _ccsg.VideoPlayer.elements;
    for(var node, i=0; i<list.length; i++){
        node = list[i];
        if(list[i]._playing){
            node.pause();
            _ccsg.VideoPlayer.pauseElements.push(node);
        }
    }
});

cc.game.on(cc.game.EVENT_SHOW, function () {
    var list = _ccsg.VideoPlayer.pauseElements;
    var node = list.pop();
    while(node){
        node.play();
        node = list.pop();
    }
});

_ccsg.VideoPlayer.EventType = {
    PLAYING: 0,
    PAUSED: 1,
    STOPPED: 2,
    COMPLETED: 3,
    META_LOADED: 4,
    CLICKED: 5,
    READY_TO_PLAY: 6
};

(function (video) {
    /**
     * Adapter various machines
     * @devicePixelRatio Whether you need to consider devicePixelRatio calculated position
     * @event To get the data using events
     */
    video._polyfill = {
        devicePixelRatio: false,
        event: "canplay",
        canPlayType: []
    };

    (function(){
        /**
         * Some old browser only supports Theora encode video
         * But native does not support this encode,
         * so it is best to provide mp4 and webm or ogv file
         */
        var dom = document.createElement("video");
        if(dom.canPlayType("video/ogg")){
            video._polyfill.canPlayType.push(".ogg");
            video._polyfill.canPlayType.push(".ogv");
        }
        if(dom.canPlayType("video/mp4"))
            video._polyfill.canPlayType.push(".mp4");
        if(dom.canPlayType("video/webm"))
            video._polyfill.canPlayType.push(".webm");
    })();

    if(cc.sys.browserType === cc.sys.BROWSER_TYPE_FIREFOX){
        video._polyfill.autoplayAfterOperation = true;
    }

    if (
        cc.sys.OS_ANDROID === cc.sys.os && (
        cc.sys.browserType === cc.sys.BROWSER_TYPE_SOUGOU ||
        cc.sys.browserType === cc.sys.BROWSER_TYPE_360
    )
    ) {
        video._polyfill.zoomInvalid = true;
    }

    var style = document.createElement("style");
    style.innerHTML = ".cocosVideo:-moz-full-screen{transform:matrix(1,0,0,1,0,0) !important;}" +
        ".cocosVideo:full-screen{transform:matrix(1,0,0,1,0,0) !important;}" +
        ".cocosVideo:-webkit-full-screen{transform:matrix(1,0,0,1,0,0) !important;}";
    document.head.appendChild(style);

})(_ccsg.VideoPlayer);

(function (polyfill) {

    _ccsg.VideoPlayer.RenderCmd = function (node) {
        this._rootCtor(node);

        this._video = null;
        this._url = '';

        // 有一些浏览器第一次播放视频需要特殊处理，这个标记用来标识是否播放过
        this._played = false;
        this._playing = false;
        this._ignorePause = false;
    };

    var proto = _ccsg.VideoPlayer.RenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
    proto.constructor = _ccsg.VideoPlayer.RenderCmd;

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

    proto.updateMatrix = function () {
        if (!this._video) return;
        var node = this._node, scaleX = cc.view._scaleX, scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        var t = this._worldTransform;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = t.a * scaleX, b = t.b, c = t.c, d = t.d * scaleY;

        var offsetX = container && container.style.paddingLeft &&  parseInt(container.style.paddingLeft);
        var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
        var tx = t.tx * scaleX + offsetX, ty = t.ty * scaleY + offsetY;

        if (polyfill.zoomInvalid) {
            this.updateSize(node._contentSize.width * a, node._contentSize.height * d);
            a = 1;
            d = 1;
        }

        var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this._video.style['transform'] = matrix;
        this._video.style['-webkit-transform'] = matrix;
        this._video.style['transform-origin'] = '0px 100% 0px';
        this._video.style['-webkit-transform-origin'] = '0px 100% 0px';
    };

    proto.updateURL = function (path) {
        var source, video, extname;
        var node = this._node;


        if (this._url == path) {
            return;
        }

        this._url = path;

        if(cc.loader.resPath && !/^http/.test(path))
            path = cc.path.join(cc.loader.resPath, path);

        this.removeDom();
        this.createDom();

        this.bindEvent();

        video = this._video;

        var cb = function(){
            if(this._loaded == true)
                return;
            this._loaded = true;
            node.setContentSize(node._contentSize.width, node._contentSize.height);
            video.currentTime = 0;
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.READY_TO_PLAY);
            this.updateVisibility();
            this.updateMatrix();
        }.bind(this);
        video.oncanplay = cb;

        //video.controls = "controls";
        // if preload set to metadata, the canplay event can't be fired on safari
        // video.preload = "metadata";
        video.style["visibility"] = "hidden";
        this._loaded = false;
        this._played = false;
        this._playing = false;

        source = document.createElement("source");
        source.src = path;
        video.appendChild(source);

        extname = cc.path.extname(path);
        for(var i=0; i<polyfill.canPlayType.length; i++){
            if(extname !== polyfill.canPlayType[i]){
                source = document.createElement("source");
                source.src = path.replace(extname, polyfill.canPlayType[i]);
                video.appendChild(source);
            }
        }
    };

    proto.bindEvent = function () {
        var node = this._node, video = this._video, self = this;
        //binding event
        video.onloadedmetadata = function () {
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.META_LOADED);
        };
        video.addEventListener("ended", function(){
            if (self._video !== video) return;
            this._playing = false;
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.COMPLETED);
        }.bind(this));
        video.addEventListener("play", function(){
            if (self._video !== video) return;
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.PLAYING);
        });
        video.addEventListener("pause", function(){
            if (self._ignorePause || self._video !== video) return;
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.PAUSED);
        });
        video.addEventListener("click", function () {
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.CLICKED);
        });
    };

    proto.updateVisibility = function () {
        var node = this._node;
        if (!this._video) return;
        var video = this._video;
        if (node.visible) {
            video.style.visibility = 'visible';
            cc.game.container.appendChild(video);
        } else {
            video.style.visibility = 'hidden';
            video.pause();
            this._playing = false;
            if(video){
                var hasChild = false;
                if('contains' in cc.game.container) {
                    hasChild = cc.game.container.contains(video);
                }else {
                    hasChild = cc.game.container.compareDocumentPosition(video) % 16;
                }
                if(hasChild)
                    cc.game.container.removeChild(video);
            }
        }
    };

    proto.createDom = function () {
        var video = document.createElement('video');
        video.style.position = "absolute";
        video.style.bottom = "0px";
        video.style.left = "0px";
        video.className = "cocosVideo";
        video.setAttribute('preload', true);
        this._video = video;
        cc.game.container.appendChild(video);
    };

    proto.removeDom = function () {
        var video = this._video;
        if(video){
            var hasChild = false;
            if('contains' in cc.game.container) {
                hasChild = cc.game.container.contains(video);
            }else {
                hasChild = cc.game.container.compareDocumentPosition(video) % 16;
            }
            if(hasChild)
                cc.game.container.removeChild(video);
        }
        this._video = null;
        this._url = "";
    };

    proto.updateSize = function (width, height) {
        var video = this._video;
        if (!video) return;

        video.style['width'] = width + 'px';
        video.style['height'] = height + 'px';
    };

    // 播放控制
    proto.play = function () {
        var video = this._video;
        if (!video || !this._node.isVisible()) return;

        this._played = true;
        if (this._playing) {
            return;
        }

        if(_ccsg.VideoPlayer._polyfill.autoplayAfterOperation){
            var self = this;
            setTimeout(function(){
                video.play();
                self._playing = true;
            }, 20);
        }else{
            video.play();
            this._playing = true;
        }
    };

    proto.pause = function () {
        var video = this._video;
        if(!this._playing) return;

        this._playing = false;
        if (!video) {
            return;
        }
        video.pause();
    };

    proto.stop = function () {
        var video = this._video;
        if (!video || !this._node.isVisible()) return;
        this._ignorePause = true;
        video.pause();
        var node = this._node;
        setTimeout(function(){
            node._dispatchEvent(_ccsg.VideoPlayer.EventType.STOPPED);
            this._ignorePause = false;
        }.bind(this), 0);
        // 恢复到视频起始位置
        video.currentTime = 0;
        this._playing = false;
    };

    proto.seekTo = function (sec) {
        var video = this._video;
        if (!video) return;

        if (this._loaded) {
            video.currentTime = sec;
        } else {
            var cb = function () {
                video.currentTime = sec;
                video.removeEventListener(polyfill.event, cb);
            };
            video.addEventListener(polyfill.event, cb);
        }
        if(_ccsg.VideoPlayer._polyfill.autoplayAfterOperation && this.isPlaying()){
            setTimeout(function(){
                video.play();
            }, 20);
        }
    };

    proto.isPlaying = function () {
        var video = this._video;
        if(_ccsg.VideoPlayer._polyfill.autoplayAfterOperation && this._playing){
            setTimeout(function(){
                video.play();
            }, 20);
        }
        return this._playing;
    };

    proto.duration = function () {
        var video = this._video;
        var duration = -1;
        if(!video) return duration;

        duration = video.duration;
        if(duration <= 0) {
            cc.logID(7702);
        }

        return duration;
    };

    proto.currentTime = function () {
        var video = this._video;
        if(!video) return -1;

        return video.currentTime;
    };

})(_ccsg.VideoPlayer._polyfill);

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

_ccsg.WebView = _ccsg.Node.extend(/** @lends _ccsg.WebView# */{

    ctor: function () {
        _ccsg.Node.prototype.ctor.call(this);
        this.setContentSize(cc.size(300, 200));
        this._EventList = {};
    },

    createDomElementIfNeeded: function () {
        if (!this._renderCmd._div) {
            this._renderCmd.createNativeControl();
        }
    },

    setJavascriptInterfaceScheme: function(scheme){},
    loadData: function(data, MIMEType, encoding, baseURL){},
    loadHTMLString: function(string, baseURL){},
    /**
     * Load an URL
     * @param {String} url
     */
    loadURL: function(url){
        this._renderCmd.updateURL(url);
        this._dispatchEvent(_ccsg.WebView.EventType.LOADING);
    },

    /**
     * Stop loading
     */
    stopLoading: function(){
        cc.logID(7800);
    },

    /**
     * Reload the WebView
     */
    reload: function(){
        var iframe = this._renderCmd._iframe;
        if(iframe){
            var win = iframe.contentWindow;
            if(win && win.location)
                win.location.reload();
        }
    },

    /**
     * Determine whether to go back
     */
    canGoBack: function(){
        cc.logID(7801);
        return true;
    },

    /**
     * Determine whether to go forward
     */
    canGoForward: function(){
        cc.logID(7802);
        return true;
    },

    /**
     * go back
     */
    goBack: function(){
        try{
            if(_ccsg.WebView._polyfill.closeHistory)
                return cc.logID(7803);
            var iframe = this._renderCmd._iframe;
            if(iframe){
                var win = iframe.contentWindow;
                if(win && win.location)
                    win.history.back.call(win);
            }
        }catch(err){
            cc.log(err);
        }
    },

    /**
     * go forward
     */
    goForward: function(){
        try{
            if(_ccsg.WebView._polyfill.closeHistory)
                return cc.logID(7804);
            var iframe = this._renderCmd._iframe;
            if(iframe){
                var win = iframe.contentWindow;
                if(win && win.location)
                    win.history.forward.call(win);
            }
        }catch(err){
            cc.log(err);
        }
    },

    /**
     * In the webview execution within a period of js string
     * @param {String} str
     */
    evaluateJS: function(str){
        var iframe = this._renderCmd._iframe;
        if(iframe){
            var win = iframe.contentWindow;
            try{
                win.eval(str);
                this._dispatchEvent(_ccsg.WebView.EventType.JS_EVALUATED);
            }catch(err){
                console.error(err);
            }
        }
    },

    /**
     * Limited scale
     */
    setScalesPageToFit: function(){
        cc.logID(7805);
    },

    /**
     * The binding event
     * @param {_ccsg.WebView.EventType} event
     * @param {Function} callback
     */
    setEventListener: function(event, callback){
        this._EventList[event] = callback;
    },

    /**
     * Delete events
     * @param {_ccsg.WebView.EventType} event
     */
    removeEventListener: function(event){
        this._EventList[event] = null;
    },

    _dispatchEvent: function(event) {
        var callback = this._EventList[event];
        if (callback)
            callback.call(this, this, this._renderCmd._iframe.src);
    },

    _createRenderCmd: function(){
        return new _ccsg.WebView.RenderCmd(this);
    },

    /**
     * Set the contentSize
     * @param {Number} width
     * @param {Number} height
     */
    setContentSize: function(width, height){
        if (width.width !== undefined && width.height !== undefined) {
            height = width.height;
            width = width.width;
        }
        _ccsg.Node.prototype.setContentSize.call(this, width, height);
        this._renderCmd.updateSize(width, height);
    },

    /**
     * remove node
     */
    cleanup: function(){
        this._super();

        this._renderCmd.removeDom();
    },

    setVisible: function ( visible ) {
        _ccsg.Node.prototype.setVisible.call(this, visible);
        this._renderCmd.updateVisibility();
    }
});

_ccsg.WebView.EventType = {
    LOADING: 0,
    LOADED: 1,
    ERROR: 2,
    JS_EVALUATED: 3
};

(function(){

    var polyfill = _ccsg.WebView._polyfill = {
        devicePixelRatio: false,
        enableDiv: false
    };

    if(cc.sys.os === cc.sys.OS_IOS)
        polyfill.enableDiv = true;

    if(cc.sys.isMobile){
        if(cc.sys.browserType === cc.sys.BROWSER_TYPE_FIREFOX){
            polyfill.enableBG = true;
        }
    }else{
        if(cc.sys.browserType === cc.sys.BROWSER_TYPE_IE){
            polyfill.closeHistory = true;
        }
    }


})();

(function(polyfill){

    var RenderCmd;
    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
        RenderCmd = _ccsg.Node.CanvasRenderCmd;
    } else {
        RenderCmd = _ccsg.Node.WebGLRenderCmd;
    }

    _ccsg.WebView.RenderCmd = function(node){
        this._rootCtor(node);

        this._parent = null;
        this._div = null;
        this._iframe = null;
        this._listener = null;
    };

    var proto = _ccsg.WebView.RenderCmd.prototype = Object.create(RenderCmd.prototype);
    proto.constructor = _ccsg.WebView.RenderCmd;

    proto.transform = function (parentCmd, recursive) {
        this.originTransform(parentCmd, recursive);
        this.updateMatrix();
    };

    proto.updateStatus = function(){
        polyfill.devicePixelRatio = cc.view.isRetinaEnabled();
        var flags = _ccsg.Node._dirtyFlags, locFlag = this._dirtyFlag;
        if(locFlag & flags.transformDirty){
            //update the transform
            this.transform(this.getParentRenderCmd(), true);
            this.updateMatrix();
            this._dirtyFlag &= ~_ccsg.Node._dirtyFlags.transformDirty;
        }
    };

    proto.initEvent = function () {
        var node = this._node;
        this._iframe.addEventListener("load", function(){
            node._dispatchEvent(_ccsg.WebView.EventType.LOADED);
        });
        this._iframe.addEventListener("error", function(){
            node._dispatchEvent(_ccsg.WebView.EventType.ERROR);
        });
    };

    proto.resize = function(view){
        view = view || cc.view;
        var node = this._node,
            eventManager = cc.eventManager;
        if(node._parent && node._visible)
            this.updateMatrix();
        else{
            var list = eventManager._listenersMap[cc.game.EVENT_RESIZE].getFixedPriorityListeners();
            eventManager._removeListenerInVector(list, this._listener);
            this._listener = null;
        }
    };

    proto.updateMatrix = function(){
        if (!this._div) return;

        var node = this._node, scaleX = cc.view._scaleX, scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        var t = this._worldTransform;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = t.a * scaleX, b = t.b, c = t.c, d = t.d * scaleY;

        var offsetX = container && container.style.paddingLeft &&  parseInt(container.style.paddingLeft);
        var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
        var tx = t.tx * scaleX + offsetX, ty = t.ty * scaleY + offsetY;

        var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this._div.style['transform'] = matrix;
        this._div.style['-webkit-transform'] = matrix;
        this._div.style['transform-origin'] = '0px 100% 0px';
        this._div.style['-webkit-transform-origin'] = '0px 100% 0px';
    };

    proto.initStyle = function(){
        if(!this._div)  return;
        var div = this._div;
        div.style.position = "absolute";
        div.style.bottom = "0px";
        div.style.left = "0px";
    };

    proto.updateURL = function(url){
        var iframe = this._iframe;
        iframe.src = url;
        var self = this;
        var cb = function(){
            self._loaded = true;
            self.updateVisibility();
            iframe.removeEventListener("load", cb);
        };
        iframe.addEventListener("load", cb);
    };

    proto.updateSize = function(w, h){
        var div = this._div;
        if(div){
            div.style["width"] = w+"px";
            div.style["height"] = h+"px";
        }
    };

    proto.createDom = function () {
        if(polyfill.enableDiv){
            this._div = document.createElement("div");
            this._div.style["-webkit-overflow"] = "auto";
            this._div.style["-webkit-overflow-scrolling"] = "touch";
            this._iframe = document.createElement("iframe");
            this._div.appendChild(this._iframe);
        }else{
            this._div = this._iframe = document.createElement("iframe");
        }

        if(polyfill.enableBG)
            this._div.style["background"] = "#FFF";

        this._div.style["background"] = "#FFF";
        var contentSize = this._node._contentSize;
        this._div.style.height = contentSize.height + "px";
        this._div.style.width = contentSize.width + "px";
        this._div.style.overflow = "scroll";
        this._div.style.border = "none";
        cc.game.container.appendChild(this._div);
        this.updateVisibility();
    };

    proto.createNativeControl = function () {
        this.createDom();
        this.initStyle();
        this.initEvent();
    };

    proto.removeDom = function(){
        var div = this._div;
        if(div){
            var hasChild = false;
            if('contains' in cc.game.container) {
                hasChild = cc.game.container.contains(div);
            }else {
                hasChild = cc.game.container.compareDocumentPosition(div) % 16;
            }
            if(hasChild)
                cc.game.container.removeChild(div);
        }
        this._div = null;
    };

    proto.updateVisibility = function () {
        var node = this._node;
        if (!this._div) return;
        var div = this._div;
        if (node.visible) {
            div.style.visibility = 'visible';
            cc.game.container.appendChild(div);
        } else {
            div.style.visibility = 'hidden';
            if(div){
                var hasChild = false;
                if('contains' in cc.game.container) {
                    hasChild = cc.game.container.contains(div);
                }else {
                    hasChild = cc.game.container.compareDocumentPosition(div) % 16;
                }
                if(hasChild)
                    cc.game.container.removeChild(div);
            }
        }
    };

})(_ccsg.WebView._polyfill);

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2008-2009 Jason Booth

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
/**
 * converts a line to a polygon
 * @param {Float32Array} points
 * @param {Number} stroke
 * @param {Float32Array} vertices
 * @param {Number} offset
 * @param {Number} nuPoints
 */
function vertexLineToPolygon (points, stroke, vertices, offset, nuPoints) {
    nuPoints += offset;
    if (nuPoints <= 1)
        return;

    stroke *= 0.5;
    var idx;
    var nuPointsMinus = nuPoints - 1;
    for (var i = offset; i < nuPoints; i++) {
        idx = i * 2;
        var p1 = cc.p(points[i * 2], points[i * 2 + 1]);
        var perpVector;

        if (i === 0)
            perpVector = cc.pPerp(cc.pNormalize(cc.pSub(p1, cc.p(points[(i + 1) * 2], points[(i + 1) * 2 + 1]))));
        else if (i === nuPointsMinus)
            perpVector = cc.pPerp(cc.pNormalize(cc.pSub(cc.p(points[(i - 1) * 2], points[(i - 1) * 2 + 1]), p1)));
        else {
            var p0 = cc.p(points[(i - 1) * 2], points[(i - 1) * 2 + 1]);
            var p2 = cc.p(points[(i + 1) * 2], points[(i + 1) * 2 + 1]);

            var p2p1 = cc.pNormalize(cc.pSub(p2, p1));
            var p0p1 = cc.pNormalize(cc.pSub(p0, p1));

            // Calculate angle between vectors
            var angle = Math.acos(cc.pDot(p2p1, p0p1));

            if (angle < cc.degreesToRadians(70))
                perpVector = cc.pPerp(cc.pNormalize(cc.pMidpoint(p2p1, p0p1)));
            else if (angle < cc.degreesToRadians(170))
                perpVector = cc.pNormalize(cc.pMidpoint(p2p1, p0p1));
            else
                perpVector = cc.pPerp(cc.pNormalize(cc.pSub(p2, p0)));
        }
        perpVector = cc.pMult(perpVector, stroke);

        vertices[idx * 2] = p1.x + perpVector.x;
        vertices[idx * 2 + 1] = p1.y + perpVector.y;
        vertices[(idx + 1) * 2] = p1.x - perpVector.x;
        vertices[(idx + 1) * 2 + 1] = p1.y - perpVector.y;
    }

    // Validate vertexes
    offset = (offset === 0) ? 0 : offset - 1;
    for (i = offset; i < nuPointsMinus; i++) {
        idx = i * 2;
        var idx1 = idx + 2;

        var v1 = cc.v2(vertices[idx * 2], vertices[idx * 2 + 1]);
        var v2 = cc.v2(vertices[(idx + 1) * 2], vertices[(idx + 1) * 2 + 1]);
        var v3 = cc.v2(vertices[idx1 * 2], vertices[idx1 * 2 + 1]);
        var v4 = cc.v2(vertices[(idx1 + 1) * 2], vertices[(idx1 + 1) * 2 + 1]);

        //BOOL fixVertex = !ccpLineIntersect(ccp(p1.x, p1.y), ccp(p4.x, p4.y), ccp(p2.x, p2.y), ccp(p3.x, p3.y), &s, &t);
        var fixVertexResult = vertexLineIntersect(v1.x, v1.y, v4.x, v4.y, v2.x, v2.y, v3.x, v3.y);
        var isSuccess = !fixVertexResult.isSuccess;
        if (!isSuccess)
            if (fixVertexResult.value < 0.0 || fixVertexResult.value > 1.0)
                isSuccess = true;

        if (isSuccess) {
            vertices[idx1 * 2] = v4.x;
            vertices[idx1 * 2 + 1] = v4.y;
            vertices[(idx1 + 1) * 2] = v3.x;
            vertices[(idx1 + 1) * 2 + 1] = v3.y;
        }
    }
}

/**
 * returns whether or not the line intersects
 * @param {Number} Ax
 * @param {Number} Ay
 * @param {Number} Bx
 * @param {Number} By
 * @param {Number} Cx
 * @param {Number} Cy
 * @param {Number} Dx
 * @param {Number} Dy
 * @return {Object}
 */
function vertexLineIntersect (Ax, Ay, Bx, By, Cx, Cy, Dx, Dy) {
    var distAB, theCos, theSin, newX;

    // FAIL: Line undefined
    if ((Ax === Bx && Ay === By) || (Cx === Dx && Cy === Dy))
        return {isSuccess:false, value:0};

    //  Translate system to make A the origin
    Bx -= Ax;
    By -= Ay;
    Cx -= Ax;
    Cy -= Ay;
    Dx -= Ax;
    Dy -= Ay;

    // Length of segment AB
    distAB = Math.sqrt(Bx * Bx + By * By);

    // Rotate the system so that point B is on the positive X axis.
    theCos = Bx / distAB;
    theSin = By / distAB;
    newX = Cx * theCos + Cy * theSin;
    Cy = Cy * theCos - Cx * theSin;
    Cx = newX;
    newX = Dx * theCos + Dy * theSin;
    Dy = Dy * theCos - Dx * theSin;
    Dx = newX;

    // FAIL: Lines are parallel.
    if (Cy === Dy) return {isSuccess:false, value:0};

    // Discover the relative position of the intersection in the line AB
    var t = (Dx + (Cx - Dx) * Dy / (Dy - Cy)) / distAB;

    // Success.
    return {isSuccess:true, value:t};
}

/**
 * returns wheter or not polygon defined by vertex list is clockwise
 * @param {Array} verts
 * @return {Boolean}
 */
function vertexListIsClockwise (verts) {
    for (var i = 0, len = verts.length; i < len; i++) {
        var a = verts[i];
        var b = verts[(i + 1) % len];
        var c = verts[(i + 2) % len];

        if (cc.pCross(cc.pSub(b, a), cc.pSub(c, b)) > 0)
            return false;
    }

    return true;
}

/**
 * cc.MotionStreak manages a Ribbon based on it's motion in absolute space.                 <br/>
 * You construct it with a fadeTime, minimum segment size, texture path, texture            <br/>
 * length and color. The fadeTime controls how long it takes each vertex in                 <br/>
 * the streak to fade out, the minimum segment size it how many pixels the                  <br/>
 * streak will move before adding a new ribbon segment, and the texture                     <br/>
 * length is the how many pixels the texture is stretched across. The texture               <br/>
 * is vertically aligned along the streak segment.
 * @class
 * @extends _ccsg.Node
 *
 * @property {Texture2D} texture                         - Texture used for the motion streak.
 * @property {Boolean}      fastMode                        - Indicate whether use fast mode.
 * @property {Boolean}      startingPositionInitialized     - Indicate whether starting position initialized.
 * @example
 * //example
 * new _ccsg.MotionStreak(2, 3, 32, cc.Color.GREEN, s_streak);
 */
_ccsg.MotionStreak = _ccsg.Node.extend({
    texture: null,
    fastMode: false,
    startingPositionInitialized: false,

    _blendFunc: null,

    _stroke: 0,
    _fadeDelta: 0,
    _minSeg: 0,

    _maxPoints: 0,
    _nuPoints: 0,
    _previousNuPoints: 0,

    /* Pointers */
    _pointVertexes: null,
    _pointState: null,

    // webgl
    _vertices: null,
    _colorPointer: null,
    _texCoords: null,

    _verticesBuffer: null,
    _colorPointerBuffer: null,
    _texCoordsBuffer: null,
    _className: "MotionStreak",

    /**
     * creates and initializes a motion streak with fade in seconds, minimum segments, stroke's width, color, texture filename or texture   <br/>
     * Constructor of cc.MotionStreak
     * @param {Number} fade time to fade
     * @param {Number} minSeg minimum segment size
     * @param {Number} stroke stroke's width
     * @param {Number} color
     * @param {string|cc.Texture2D} texture texture filename or texture
     */
    ctor: function (fade, minSeg, stroke, color, texture) {
        _ccsg.Node.prototype.ctor.call(this);
        this._positionR = cc.p(0, 0);
        this._blendFunc = new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);

        this.fastMode = false;
        this.startingPositionInitialized = false;

        this.texture = null;

        this._stroke = 0;
        this._fadeDelta = 0;
        this._minSeg = 0;

        this._maxPoints = 0;
        this._nuPoints = 0;
        this._previousNuPoints = 0;

        /** Pointers */
        this._pointVertexes = null;
        this._pointState = null;

        // webgl
        this._vertices = null;
        this._colorPointer = null;
        this._texCoords = null;

        this._verticesBuffer = null;
        this._colorPointerBuffer = null;
        this._texCoordsBuffer = null;

        if(texture !== undefined)
            this.initWithFade(fade, minSeg, stroke, color, texture);
    },

    /**
     * initializes a motion streak with fade in seconds, minimum segments, stroke's width, color and texture filename or texture
     * @param {Number} fade time to fade
     * @param {Number} minSeg minimum segment size
     * @param {Number} stroke stroke's width
     * @param {Number} color
     * @param {string|cc.Texture2D} texture texture filename or texture
     * @return {Boolean}
     */
    initWithFade:function (fade, minSeg, stroke, color, texture) {

        if (cc.js.isString(texture))
            texture = cc.textureCache.addImage(texture);

        this.anchorX = 0;
        this.anchorY = 0;
        this.ignoreAnchor = true;
        this.startingPositionInitialized = false;

        this.fastMode = true;
        this._stroke = stroke;
        this.setMinSeg(minSeg);
        this.setFadeTime(fade);

        // Set blend mode
        this._blendFunc.src = gl.SRC_ALPHA;
        this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA;

        this.setTexture(texture);
        this.color = color;
        this.scheduleUpdate();

        return true;
    },

    /**
     * Gets the texture.
     * @return {Texture2D}
     */
    getTexture:function () {
        return this.texture;
    },

    /**
     * Set the texture.
     * @param {Texture2D} texture
     */
    setTexture:function (texture) {
        if (this.texture !== texture)
            this.texture = texture;
    },

    /**
     * Gets the blend func.
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return this._blendFunc;
    },

    /**
     * Set the blend func.
     * @param {Number} src
     * @param {Number} dst
     */
    setBlendFunc:function (src, dst) {
        if (dst === undefined) {
            this._blendFunc = src;
        } else {
            this._blendFunc.src = src;
            this._blendFunc.dst = dst;
        }
    },

    /**
     * Gets opacity.
     * @warning cc.MotionStreak.getOpacity has not been supported.
     * @returns {number}
     */
    getOpacity:function () {
        cc.logID(5901);
        return 0;
    },

    /**
     * Set opacity.
     * @warning cc.MotionStreak.setOpacity has not been supported.
     * @param opacity
     */
    setOpacity:function (opacity) {
        cc.logID(5902);
    },

    /**
     * Set opacity modify RGB.
     * @warning cc.MotionStreak.setOpacityModifyRGB has not been supported.
     * @param value
     */
    setOpacityModifyRGB:function (value) {
    },

    /**
     * Checking OpacityModifyRGB.
     * @returns {boolean}
     */
    isOpacityModifyRGB:function () {
        return false;
    },

    /**
     * Get Fade Time.
     * @returns {Number}
     */
    getFadeTime: function () {
        return 1.0 / this._fadeDelta;
    },

    /**
     * Set Fade Time.
     * @param {Number} fade
     */
    setFadeTime: function (fade) {
        this._fadeDelta = 1.0 / fade;

        var locMaxPoints = (0 | (fade * 60)) + 2;
        this._maxPoints = locMaxPoints;
        this._nuPoints = 0;
        this._pointState = new Float32Array(locMaxPoints);
        this._pointVertexes = new Float32Array(locMaxPoints * 2);

        this._vertices = new Float32Array(locMaxPoints * 4);
        this._texCoords = new Float32Array(locMaxPoints * 4);
        this._colorPointer = new Uint8Array(locMaxPoints * 8);

        this._verticesBuffer = gl.createBuffer();
        this._texCoordsBuffer = gl.createBuffer();
        this._colorPointerBuffer = gl.createBuffer();

        //bind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._texCoords, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._colorPointerBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._colorPointer, gl.DYNAMIC_DRAW);
    },

    /**
     * Get Minimum Segment Size.
     * @return {Number}
     */
    getMinSeg: function () {
        return this._minSeg;
    },

    /**
     * Set Minimum Segment Size.
     * @param {Number} minSeg
     */
    setMinSeg: function (minSeg) {
        this._minSeg = (minSeg === -1.0) ? (this._stroke / 5.0) : minSeg;
        this._minSeg *= this._minSeg;
    },

    /**
     * Checking fast mode.
     * @returns {boolean}
     */
    isFastMode:function () {
        return this.fastMode;
    },

    /**
     * set fast mode
     * @param {Boolean} fastMode
     */
    setFastMode:function (fastMode) {
        this.fastMode = fastMode;
    },

    /**
     * Checking starting position initialized.
     * @returns {boolean}
     */
    isStartingPositionInitialized:function () {
        return this.startingPositionInitialized;
    },

    /**
     * Set Starting Position Initialized.
     * @param {Boolean} startingPositionInitialized
     */
    setStartingPositionInitialized:function (startingPositionInitialized) {
        this.startingPositionInitialized = startingPositionInitialized;
    },

    /**
     * Get stroke.
     * @returns {Number} stroke
     */
    getStroke:function () {
        return this._stroke;
    },

    /**
     * Set stroke.
     * @param {Number} stroke
     */
    setStroke:function (stroke) {
        this._stroke = stroke;
    },

    /**
     * color used for the tint
     * @param {cc.Color} color
     */
    tintWithColor:function (color) {
        this.color = color;

        // Fast assignation
        var locColorPointer = this._colorPointer;
        for (var i = 0, len = this._nuPoints * 2; i < len; i++) {
            locColorPointer[i * 4] = color.r;
            locColorPointer[i * 4 + 1] = color.g;
            locColorPointer[i * 4 + 2] = color.b;
        }
    },

    /**
     * Remove all living segments of the ribbon
     */
    reset:function () {
        this._nuPoints = 0;
    },

    /**
     * Set the position. <br />
     *
     * @param {cc.Point|Number} position
     * @param {Number} [yValue=undefined] If not exists, the first parameter must be cc.Point.
     */
    setPosition:function (position, yValue) {
        this.startingPositionInitialized = true;
        if(yValue === undefined){
            this._positionR.x = position.x;
            this._positionR.y = position.y;
        } else {
            this._positionR.x = position;
            this._positionR.y = yValue;
        }
    },

    /**
     * Gets the position.x
     * @return {Number}
     */
    getPositionX:function () {
        return this._positionR.x;
    },

    /**
     * Set the position.x
     * @param {Number} x
     */
    setPositionX:function (x) {
        this._positionR.x = x;
        if(!this.startingPositionInitialized)
            this.startingPositionInitialized = true;
    },

    /**
     * Gets the position.y
     * @return {Number}
     */
    getPositionY:function () {
        return  this._positionR.y;
    },

    /**
     * Set the position.y
     * @param {Number} y
     */
    setPositionY:function (y) {
        this._positionR.y = y;
        if(!this.startingPositionInitialized)
            this.startingPositionInitialized = true;
    },

    /**
     * <p>schedules the "update" method.                                                                           <br/>
     * It will use the order number 0. This method will be called every frame.                                  <br/>
     * Scheduled methods with a lower order value will be called before the ones that have a higher order value.<br/>
     * Only one "update" method could be scheduled per node.</p>
     * @param {Number} delta
     */
    update:function (delta) {
        if (!this.startingPositionInitialized)
            return;

        delta *= this._fadeDelta;

        var newIdx, newIdx2, i, i2;
        var mov = 0;

        // Update current points
        var locNuPoints = this._nuPoints;
        var locPointState = this._pointState, locPointVertexes = this._pointVertexes, locVertices = this._vertices;
        var locColorPointer = this._colorPointer;

        for (i = 0; i < locNuPoints; i++) {
            locPointState[i] -= delta;

            if (locPointState[i] <= 0)
                mov++;
            else {
                newIdx = i - mov;
                if (mov > 0) {
                    // Move data
                    locPointState[newIdx] = locPointState[i];
                    // Move point
                    locPointVertexes[newIdx * 2] = locPointVertexes[i * 2];
                    locPointVertexes[newIdx * 2 + 1] = locPointVertexes[i * 2 + 1];

                    // Move vertices
                    i2 = i * 2;
                    newIdx2 = newIdx * 2;
                    locVertices[newIdx2 * 2] = locVertices[i2 * 2];
                    locVertices[newIdx2 * 2 + 1] = locVertices[i2 * 2 + 1];
                    locVertices[(newIdx2 + 1) * 2] = locVertices[(i2 + 1) * 2];
                    locVertices[(newIdx2 + 1) * 2 + 1] = locVertices[(i2 + 1) * 2 + 1];

                    // Move color
                    i2 *= 4;
                    newIdx2 *= 4;
                    locColorPointer[newIdx2 + 0] = locColorPointer[i2 + 0];
                    locColorPointer[newIdx2 + 1] = locColorPointer[i2 + 1];
                    locColorPointer[newIdx2 + 2] = locColorPointer[i2 + 2];
                    locColorPointer[newIdx2 + 4] = locColorPointer[i2 + 4];
                    locColorPointer[newIdx2 + 5] = locColorPointer[i2 + 5];
                    locColorPointer[newIdx2 + 6] = locColorPointer[i2 + 6];
                } else
                    newIdx2 = newIdx * 8;

                var op = locPointState[newIdx] * 255.0;
                locColorPointer[newIdx2 + 3] = op;
                locColorPointer[newIdx2 + 7] = op;
            }
        }
        locNuPoints -= mov;

        // Append new point
        var appendNewPoint = true;
        if (locNuPoints >= this._maxPoints)
            appendNewPoint = false;
        else if (locNuPoints > 0) {
            var locPoint1 = cc.p(locPointVertexes[(locNuPoints - 1) * 2], locPointVertexes[(locNuPoints - 1) * 2 + 1]);
            var a1 = cc.pDistanceSQ(locPoint1, this._positionR) < this._minSeg;
            var locPoint2 = cc.p(locPointVertexes[(locNuPoints - 2) * 2], locPointVertexes[(locNuPoints - 2) * 2 + 1]);
            var a2 = (locNuPoints === 1) ? false : (cc.pDistanceSQ(locPoint2, this._positionR) < (this._minSeg * 2.0));
            if (a1 || a2)
                appendNewPoint = false;
        }

        if (appendNewPoint) {
            locPointVertexes[locNuPoints * 2] = this._positionR.x;
            locPointVertexes[locNuPoints * 2 + 1] = this._positionR.y;
            locPointState[locNuPoints] = 1.0;

            // Color assignment
            var offset = locNuPoints * 8;

            var locDisplayedColor = this.getDisplayedColor();
            locColorPointer[offset] = locDisplayedColor.r;
            locColorPointer[offset + 1] = locDisplayedColor.g;
            locColorPointer[offset + 2] = locDisplayedColor.b;
            //*((ccColor3B*)(m_pColorPointer + offset+4)) = this._color;
            locColorPointer[offset + 4] = locDisplayedColor.r;
            locColorPointer[offset + 5] = locDisplayedColor.g;
            locColorPointer[offset + 6] = locDisplayedColor.b;

            // Opacity
            locColorPointer[offset + 3] = 255;
            locColorPointer[offset + 7] = 255;

            // Generate polygon
            if (locNuPoints > 0 && this.fastMode) {
                if (locNuPoints > 1)
                    vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, locNuPoints, 1);
                else
                    vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, 0, 2);
            }
            locNuPoints++;
        }

        if (!this.fastMode)
            vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, 0, locNuPoints);

        // Updated Tex Coords only if they are different than previous step
        if (locNuPoints && this._previousNuPoints !== locNuPoints) {
            var texDelta = 1.0 / locNuPoints;
            var locTexCoords = this._texCoords;
            for (i = 0; i < locNuPoints; i++) {
                locTexCoords[i * 4] = 0;
                locTexCoords[i * 4 + 1] = texDelta * i;

                locTexCoords[(i * 2 + 1) * 2] = 1;
                locTexCoords[(i * 2 + 1) * 2 + 1] = texDelta * i;
            }

            this._previousNuPoints = locNuPoints;
        }

        this._nuPoints = locNuPoints;
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_WEBGL)
            return new _ccsg.MotionStreak.WebGLRenderCmd(this);
        else
            return null;  //MotionStreak doesn't support Canvas mode
    }
});

// fireball#2856

var motionStreakPro = _ccsg.MotionStreak.prototype;
Object.defineProperty(motionStreakPro, 'x', {
    get: motionStreakPro.getPositionX,
    set: motionStreakPro.setPositionX
});

Object.defineProperty(motionStreakPro, 'y', {
    get: motionStreakPro.getPositionY,
    set: motionStreakPro.setPositionY
});

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

_ccsg.MotionStreak.WebGLRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = true;
    this._matrix = new cc.math.Matrix4();
    this._matrix.identity();
    this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLOR);
};

_ccsg.MotionStreak.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
_ccsg.MotionStreak.WebGLRenderCmd.prototype.constructor = _ccsg.Sprite.WebGLRenderCmd;

_ccsg.MotionStreak.WebGLRenderCmd.prototype.rendering = function(ctx){
    var node = this._node;
    if (node._nuPoints <= 1)
        return;

    if (node.texture && node.texture.isLoaded()) {
        ctx = ctx || cc._renderContext;

        // update the color
        this._updateDisplayColor();

        var wt = this._worldTransform, mat = this._matrix.mat;
        mat[0] = wt.a;
        mat[4] = wt.c;
        mat[12] = wt.tx;
        mat[1] = wt.b;
        mat[5] = wt.d;
        mat[13] = wt.ty;

        this._shaderProgram.use();
        this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix);
        cc.gl.blendFunc(node._blendFunc.src, node._blendFunc.dst);

        cc.gl.bindTexture2DN(0, node.texture);

        ctx.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION);
        ctx.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR);
        ctx.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS);

        //position
        ctx.bindBuffer(ctx.ARRAY_BUFFER, node._verticesBuffer);
        ctx.bufferData(ctx.ARRAY_BUFFER, node._vertices, ctx.DYNAMIC_DRAW);
        ctx.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 2, ctx.FLOAT, false, 0, 0);

        //texcoords
        ctx.bindBuffer(ctx.ARRAY_BUFFER, node._texCoordsBuffer);
        ctx.bufferData(ctx.ARRAY_BUFFER, node._texCoords, ctx.DYNAMIC_DRAW);
        ctx.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, ctx.FLOAT, false, 0, 0);

        //colors
        ctx.bindBuffer(ctx.ARRAY_BUFFER, node._colorPointerBuffer);
        ctx.bufferData(ctx.ARRAY_BUFFER, node._colorPointer, ctx.DYNAMIC_DRAW);
        ctx.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, ctx.UNSIGNED_BYTE, true, 0, 0);

        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, node._nuPoints * 2);
        cc.g_NumberOfDraws++;
    }
};

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2009      Jason Booth

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

/**
 * cc.RenderTexture is a generic rendering target. To render things into it,<br/>
 * simply construct a render target, call begin on it, call visit on any cocos<br/>
 * scenes or objects to render them, and call end. For convenience, render texture<br/>
 * adds a sprite as it's display child with the results, so you can simply add<br/>
 * the render texture to your scene and treat it like any other CocosNode.<br/>
 * There are also functions for saving the render texture to disk in PNG or JPG format.
 * @class
 * @extends _ccsg.Node
 *
 * @property {_ccsg.Sprite}    sprite          - The sprite.
 * @property {_ccsg.Sprite}    clearFlags      - Code for "auto" update.
 * @property {Number}       clearDepthVal   - Clear depth value.
 * @property {Boolean}      autoDraw        - Indicate auto draw mode activate or not.
 * @property {Number}       clearStencilVal - Clear stencil value.
 * @property {cc.Color}     clearColorVal   - Clear color value, valid only when "autoDraw" is true.
 */
cc.RenderTexture = _ccsg.Node.extend(/** @lends cc.RenderTexture# */{
    sprite: null,

    //
    // <p>Code for "auto" update<br/>
    // Valid flags: GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT.<br/>
    // They can be OR'ed. Valid when "autoDraw is YES.</p>
    // @public
    //
    clearFlags: 0,

    clearDepthVal: 0,
    autoDraw: false,

    _texture: null,
    _pixelFormat: 0,

    clearStencilVal: 0,
    _clearColor: null,

    _className: "RenderTexture",

    /**
     * creates a RenderTexture object with width and height in Points and a pixel format, only RGB and RGBA formats are valid
     * Constructor of cc.RenderTexture for Canvas
     * @param {Number} width
     * @param {Number} height
     * @param {cc.ImageFormat.JPEG|cc.ImageFormat.PNG|cc.ImageFormat.RAWDATA} format
     * @param {Number} depthStencilFormat
     * @example
     * // Example
     * var rt = new cc.RenderTexture(width, height, format, depthStencilFormat)
     * @function
     */
    ctor: function(width, height, format, depthStencilFormat){
        _ccsg.Node.prototype.ctor.call(this);
        this._cascadeColorEnabled = true;
        this._cascadeOpacityEnabled = true;
        this._pixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;
        this._clearColor = new cc.Color(0, 0, 0, 255);

        if (width !== undefined && height !== undefined) {
            format = format || cc.Texture2D.PIXEL_FORMAT_RGBA8888;
            depthStencilFormat = depthStencilFormat || 0;
            this.initWithWidthAndHeight(width, height, format, depthStencilFormat);
        }
        this.setAnchorPoint(0, 0);
    },

    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.RenderTexture.CanvasRenderCmd(this);
        else
            return new cc.RenderTexture.WebGLRenderCmd(this);
    },

    visit: function (parent) {
        var cmd = this._renderCmd, parentCmd = parent ? parent._renderCmd : null;

        // quick return if not visible
        if (!this._visible) {
            cmd._propagateFlagsDown(parentCmd);
            return;
        }

        var renderer = cc.renderer;

        cmd.visit(parentCmd);
        renderer.pushRenderCommand(cmd);
        this.sprite.visit(this);
        cmd._dirtyFlag = 0;
    },

    /**
     * Clear RenderTexture.
     * @function
     */
    cleanup: function () {
        _ccsg.Node.prototype.onExit.call(this);
        this._renderCmd.cleanup();
    },

    /**
     * Gets the sprite
     * @return {_ccsg.Sprite}
     */
    getSprite: function () {
        return this.sprite;
    },

    /**
     * Set the sprite
     * @param {_ccsg.Sprite} sprite
     */
    setSprite: function (sprite) {
        this.sprite = sprite;
    },

    /**
     * Used for grab part of screen to a texture.
     * @param {cc.Vec2} rtBegin
     * @param {Rect} fullRect
     * @param {Rect} fullViewport
     */
    setVirtualViewport: function (rtBegin, fullRect, fullViewport) {
        this._renderCmd.setVirtualViewport(rtBegin, fullRect, fullViewport);
    },

    /**
     * Initializes the instance of cc.RenderTexture
     * @function
     * @param {Number} width
     * @param {Number} height
     * @param {cc.ImageFormat.JPEG|cc.ImageFormat.PNG|cc.ImageFormat.RAWDATA} [format]
     * @param {Number} [depthStencilFormat]
     * @return {Boolean}
     */
    initWithWidthAndHeight: function (width, height, format, depthStencilFormat) {
        return this._renderCmd.initWithWidthAndHeight(width, height, format, depthStencilFormat);
    },

    /**
     * starts grabbing
     * @function
     */
    begin: function () {
        cc.renderer._turnToCacheMode(this.__instanceId);
        this._renderCmd.begin();
    },
    /**
     * starts rendering to the texture while clearing the texture first.<br/>
     * This is more efficient then calling -clear first and then -begin
     * @param {Number} r red 0-255
     * @param {Number} g green 0-255
     * @param {Number} b blue 0-255
     * @param {Number} a alpha 0-255 0 is transparent
     * @param {Number} [depthValue=]
     * @param {Number} [stencilValue=]
     */
    beginWithClear: function (r, g, b, a, depthValue, stencilValue) {
        //todo: only for WebGL?
        var gl = cc._renderContext;
        depthValue = depthValue || gl.COLOR_BUFFER_BIT;
        stencilValue = stencilValue || (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this._beginWithClear(r, g, b, a, depthValue, stencilValue, (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT));
    },

    _beginWithClear: function (r, g, b, a, depthValue, stencilValue, flags) {
        this.begin();
        this._renderCmd._beginWithClear(r, g, b, a, depthValue, stencilValue, flags);
    },

    /**
     * ends grabbing
     * @function
     */
    end: function () {
        this._renderCmd.end();
    },

    /**
     * clears the texture with a color
     * @param {Number|cc.Rect} r red 0-1
     * @param {Number} g green 0-1
     * @param {Number} b blue 0-1
     * @param {Number} a alpha 0-1
     */
    clear: function (r, g, b, a) {
        this.beginWithClear(r, g, b, a);
        this.end();
    },

    /**
     * clears the texture with rect.
     * @function
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    clearRect: function (x, y, width, height) {
        this._renderCmd.clearRect(x, y, width, height);
    },

    /**
     * clears the texture with a specified depth value
     * @function
     * @param {Number} depthValue
     */
    clearDepth: function (depthValue) {
        this._renderCmd.clearDepth(depthValue);
    },

    /**
     * clears the texture with a specified stencil value
     * @function
     * @param {Number} stencilValue
     */
    clearStencil: function (stencilValue) {
        this._renderCmd.clearStencil(stencilValue);
    },

    /**
     * Valid flags: GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT. They can be OR'ed. Valid when "autoDraw is YES.
     * @return {Number}
     */
    getClearFlags: function () {
        return this.clearFlags;
    },

    /**
     * Set the clearFlags
     * @param {Number} clearFlags
     */
    setClearFlags: function (clearFlags) {
        this.clearFlags = clearFlags;
    },

    /**
     * Clear color value. Valid only when "autoDraw" is true.
     * @function
     * @return {cc.Color}
     */
    getClearColor: function () {
        return this._clearColor;
    },

    /**
     * Set the clear color value. Valid only when "autoDraw" is true.
     * @function
     * @param {cc.Color} clearColor The clear color
     */
    setClearColor: function (clearColor) {
        var locClearColor = this._clearColor;
        locClearColor.r = clearColor.r;
        locClearColor.g = clearColor.g;
        locClearColor.b = clearColor.b;
        locClearColor.a = clearColor.a;
        this._renderCmd.updateClearColor(clearColor);
    },

    /**
     * Value for clearDepth. Valid only when autoDraw is true.
     * @return {Number}
     */
    getClearDepth: function () {
        return this.clearDepthVal;
    },

    /**
     * Set value for clearDepth. Valid only when autoDraw is true.
     * @param {Number} clearDepth
     */
    setClearDepth: function (clearDepth) {
        this.clearDepthVal = clearDepth;
    },

    /**
     * Value for clear Stencil. Valid only when autoDraw is true
     * @return {Number}
     */
    getClearStencil: function () {
        return this.clearStencilVal;
    },

    /**
     * Set value for clear Stencil. Valid only when autoDraw is true
     * @return {Number}
     */
    setClearStencil: function (clearStencil) {
        this.clearStencilVal = clearStencil;
    },

    /**
     * When enabled, it will render its children into the texture automatically. Disabled by default for compatibility reasons. <br/>
     * Will be enabled in the future.
     * @return {Boolean}
     */
    isAutoDraw: function () {
        return this.autoDraw;
    },

    /**
     * When enabled, it will render its children into the texture automatically. Disabled by default for compatibility reasons. <br/>
     * Will be enabled in the future.
     * @return {Boolean}
     */
    setAutoDraw: function (autoDraw) {
        this.autoDraw = autoDraw;
    },

    //---- some stub functions for jsb
    /**
     * saves the texture into a file using JPEG format. The file will be saved in the Documents folder.
     * Returns YES if the operation is successful.
     * (doesn't support in HTML5)
     * @param {Number} filePath
     * @param {Number} format
     */
    saveToFile: function (filePath, format) {
        cc.log("saveToFile isn't supported on Cocos2d-Html5");
    },

    /**
     * creates a new CCImage from with the texture's data. Caller is responsible for releasing it by calling delete.
     * @return {*}
     */
    newCCImage: function (flipImage) {
        cc.log("saveToFile isn't supported on cocos2d-html5");
        return null;
    },

    /**
     * Listen "come to background" message, and save render texture. It only has effect on Android.
     * @param {cc._Class} obj
     */
    listenToBackground: function (obj) {
    },

    /**
     * Listen "come to foreground" message and restore the frame buffer object. It only has effect on Android.
     * @param {cc._Class} obj
     */
    listenToForeground: function (obj) {
    }
});

var _p = cc.RenderTexture.prototype;
// Extended
/** @expose */
_p.clearColorVal;
cc.defineGetterSetter(_p, "clearColorVal", _p.getClearColor, _p.setClearColor);


/**
 * creates a RenderTexture object with width and height in Points and a pixel format, only RGB and RGBA formats are valid
 * @deprecated since v3.0 please use new cc.RenderTexture() instead.
 * @param {Number} width
 * @param {Number} height
 * @param {cc.ImageFormat.JPEG|cc.ImageFormat.PNG|cc.ImageFormat.RAWDATA} format
 * @param {Number} depthStencilFormat
 * @return {cc.RenderTexture}
 */
cc.RenderTexture.create = function (width, height, format, depthStencilFormat) {
    return new cc.RenderTexture(width, height, format, depthStencilFormat);
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

cc.RenderTexture.CanvasRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = false;
    this._clearColorStr = "rgba(255,255,255,1)";

    this._cacheCanvas = document.createElement('canvas');
    this._cacheContext = new cc.CanvasContextWrapper(this._cacheCanvas.getContext('2d'));
};

var proto = cc.RenderTexture.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
proto.constructor = cc.RenderTexture.CanvasRenderCmd;

proto.cleanup = function(){
    this._cacheContext = null;
    this._cacheCanvas = null;
};

proto.clearStencil = function (stencilValue) { };

proto.setVirtualViewport = function(rtBegin, fullRect, fullViewport) {};

proto.updateClearColor = function(clearColor){
    this._clearColorStr = "rgba(" + (0 | clearColor.r) + "," + (0 | clearColor.g) + "," + (0 | clearColor.b) + "," + clearColor.a / 255 + ")";
};

proto.initWithWidthAndHeight = function(width, height, format, depthStencilFormat){
    var node = this._node;
    var locCacheCanvas = this._cacheCanvas;
    locCacheCanvas.width = 0 | width;
    locCacheCanvas.height = 0 | height;

    var texture = new cc.Texture2D();
    texture.initWithElement(locCacheCanvas);
    texture.handleLoadedTexture();

    var locSprite = node.sprite = new _ccsg.Sprite(texture);
    locSprite.setBlendFunc(cc.macro.ONE, cc.macro.ONE_MINUS_SRC_ALPHA);
    // Disabled by default.
    node.autoDraw = false;
    // add sprite for backward compatibility
    node.addChild(locSprite);
    return true;
};

proto.begin = function(){};

proto._beginWithClear = function(r, g, b, a, depthValue, stencilValue, flags){
    r = r || 0;
    g = g || 0;
    b = b || 0;
    a = isNaN(a) ? 255 : a;

    var context = this._cacheContext.getContext();
    var locCanvas = this._cacheCanvas;
    context.setTransform(1,0,0,1,0,0);
    this._cacheContext.setFillStyle("rgba(" + (0 | r) + "," + (0 | g) + "," + (0 | b) + "," + a / 255 + ")");
    context.clearRect(0, 0, locCanvas.width, locCanvas.height);
    context.fillRect(0, 0, locCanvas.width, locCanvas.height);
};

proto.end = function(){
    var node = this._node;

    cc.renderer._renderingToCacheCanvas(this._cacheContext, node.__instanceId);
    var spriteRenderCmd = node.sprite._renderCmd;
    spriteRenderCmd._notifyRegionStatus && spriteRenderCmd._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty);
};

proto.clearRect = function(x, y, width, height){
    this._cacheContext.clearRect(x, y, width, -height);
};

proto.clearDepth = function(depthValue){
    cc.log("clearDepth isn't supported on Cocos2d-Html5");
};

/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

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

var misc = require('../cocos2d/core/utils/misc');

cc.RenderTexture.WebGLRenderCmd = function(renderableObject){
    this._rootCtor(renderableObject);
    this._needDraw = true;

    this._fBO = null;
    this._oldFBO = null;
    this._textureCopy = null;
    this._depthRenderBuffer = null;

    this._rtTextureRect = new cc.Rect();
    this._fullRect = new cc.Rect();
    this._fullViewport = new cc.Rect();
};

var proto = cc.RenderTexture.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
proto.constructor = cc.RenderTexture.WebGLRenderCmd;

proto.setVirtualViewport = function(rtBegin, fullRect, fullViewport) {
    this._rtTextureRect.x = rtBegin.x;
    this._rtTextureRect.y = rtBegin.y;

    this._fullRect = fullRect;
    this._fullViewport = fullViewport;
};

proto.needDraw = function () {
    return this._needDraw && this._node.autoDraw;
};

proto.rendering = function (ctx) {
    var gl = ctx || cc._renderContext;
    var node = this._node;
    if (node.autoDraw) {
        node.begin();

        var locClearFlags = node.clearFlags;
        if (locClearFlags) {
            var oldClearColor = [0.0, 0.0, 0.0, 0.0];
            var oldDepthClearValue = 0.0;
            var oldStencilClearValue = 0;

            // backup and set
            if (locClearFlags & gl.COLOR_BUFFER_BIT) {
                oldClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
                gl.clearColor(node._clearColor.r / 255, node._clearColor.g / 255, node._clearColor.b / 255, node._clearColor.a / 255);
            }

            if (locClearFlags & gl.DEPTH_BUFFER_BIT) {
                oldDepthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
                gl.clearDepth(node.clearDepthVal);
            }

            if (locClearFlags & gl.STENCIL_BUFFER_BIT) {
                oldStencilClearValue = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
                gl.clearStencil(node.clearStencilVal);
            }

            // clear
            gl.clear(locClearFlags);

            // restore
            if (locClearFlags & gl.COLOR_BUFFER_BIT)
                gl.clearColor(oldClearColor[0], oldClearColor[1], oldClearColor[2], oldClearColor[3]);

            if (locClearFlags & gl.DEPTH_BUFFER_BIT)
                gl.clearDepth(oldDepthClearValue);

            if (locClearFlags & gl.STENCIL_BUFFER_BIT)
                gl.clearStencil(oldStencilClearValue);
        }

        //! make sure all children are drawn
        node.sortAllChildren();
        var locChildren = node._children;
        for (var i = 0; i < locChildren.length; i++) {
            var getChild = locChildren[i];
            if (getChild !== node.sprite){
                getChild.visit(node.sprite);    //TODO it's very Strange
            }
        }
        node.end();
    }
};

proto.clearStencil = function(stencilValue) {
    var gl = cc._renderContext;
    // save old stencil value
    var stencilClearValue = gl.getParameter(gl.STENCIL_CLEAR_VALUE);

    gl.clearStencil(stencilValue);
    gl.clear(gl.STENCIL_BUFFER_BIT);

    // restore clear color
    gl.clearStencil(stencilClearValue);
};

proto.cleanup = function(){
    var node = this._node;
    //node.sprite = null;
    this._textureCopy = null;

    var gl = cc._renderContext;
    gl.deleteFramebuffer(this._fBO);
    if (this._depthRenderBuffer)
        gl.deleteRenderbuffer(this._depthRenderBuffer);
};

proto.updateClearColor = function(clearColor){ };

proto.initWithWidthAndHeight = function(width, height, format, depthStencilFormat){
    var node = this._node;
    if(format === cc.Texture2D.PIXEL_FORMAT_A8)
        cc.log( "cc.RenderTexture._initWithWidthAndHeightForWebGL() : only RGB and RGBA formats are valid for a render texture;");

    var gl = cc._renderContext;
    this._fullRect = new cc.Rect(0,0, width, height);
    this._fullViewport = new cc.Rect(0,0, width, height);

    width = 0 | width;
    height = 0 | height;

    this._oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);

    // textures must be power of two squared
    var powW , powH;

    if (cc.configuration.supportsNPOT()) {
        powW = width;
        powH = height;
    } else {
        powW = misc.NextPOT(width);
        powH = misc.NextPOT(height);
    }

    //void *data = malloc(powW * powH * 4);
    var dataLen = powW * powH * 4;
    var data = new Uint8Array(dataLen);
    //memset(data, 0, (int)(powW * powH * 4));
    for (var i = 0; i < powW * powH * 4; i++)
        data[i] = 0;

    this._pixelFormat = format;

    var locTexture = node._texture = new cc.Texture2D();
    if (!node._texture)
        return false;

    locTexture.initWithData(data, node._pixelFormat, powW, powH, cc.size(width, height));
    //free( data );

    var oldRBO = gl.getParameter(gl.RENDERBUFFER_BINDING);

    if (cc.configuration.checkForGLExtension("GL_QCOM")) {
        this._textureCopy = new cc.Texture2D();
        if (!this._textureCopy)
            return false;
        this._textureCopy.initWithData(data, node._pixelFormat, powW, powH, cc.size(width, height));
    }

    // generate FBO
    this._fBO = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fBO);

    // associate texture with FBO
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, locTexture._webTextureObj, 0);

    if (depthStencilFormat !== 0) {
        //create and attach depth buffer
        this._depthRenderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, depthStencilFormat, powW, powH);
        if(depthStencilFormat === gl.DEPTH_STENCIL)
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this._depthRenderBuffer);
        else if(depthStencilFormat === gl.STENCIL_INDEX || depthStencilFormat === gl.STENCIL_INDEX8)
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, this._depthRenderBuffer);
        else if(depthStencilFormat === gl.DEPTH_COMPONENT16)
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthRenderBuffer);
    }

    // check if it worked (probably worth doing :) )
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
        cc.log("Could not attach texture to the framebuffer");

    locTexture.setAliasTexParameters();

    var locSprite = node.sprite = new _ccsg.Sprite(locTexture);
    locSprite.scaleY = -1;
    locSprite.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.bindRenderbuffer(gl.RENDERBUFFER, oldRBO);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._oldFBO);

    // Disabled by default.
    node.autoDraw = false;

    // add sprite for backward compatibility
    node.addChild(locSprite);
    return true;
};

proto.begin = function(){
    var node = this._node;
    // Save the current matrix
    cc.math.glMatrixMode(cc.math.KM_GL_PROJECTION);
    cc.math.glPushMatrix();
    cc.math.glMatrixMode(cc.math.KM_GL_MODELVIEW);
    cc.math.glPushMatrix();

    var gl = cc._renderContext;

    var director = cc.director;
    director.setProjection(director.getProjection());

    var texSize = node._texture.getContentSizeInPixels();

    // Calculate the adjustment ratios based on the old and new projections
    var size = cc.director.getWinSizeInPixels();
    var widthRatio = size.width / texSize.width;
    var heightRatio = size.height / texSize.height;

    var orthoMatrix = cc.math.Matrix4.createOrthographicProjection(-1.0 / widthRatio, 1.0 / widthRatio,
        -1.0 / heightRatio, 1.0 / heightRatio, -1, 1);
    cc.math.glMultMatrix(orthoMatrix);

    //calculate viewport
    var viewport = new cc.Rect(0, 0, 0, 0);
    viewport.width = this._fullViewport.width;
    viewport.height = this._fullViewport.height;
    var viewPortRectWidthRatio = viewport.width / this._fullRect.width;
    var viewPortRectHeightRatio = viewport.height / this._fullRect.height;
    viewport.x = (this._fullRect.x - this._rtTextureRect.x) * viewPortRectWidthRatio;
    viewport.y = (this._fullRect.y - this._rtTextureRect.y) * viewPortRectHeightRatio;
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

    this._oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fBO);//Will direct drawing to the frame buffer created above

    /*  Certain Qualcomm Andreno gpu's will retain data in memory after a frame buffer switch which corrupts the render to the texture.
     *   The solution is to clear the frame buffer before rendering to the texture. However, calling glClear has the unintended result of clearing the current texture.
     *   Create a temporary texture to overcome this. At the end of CCRenderTexture::begin(), switch the attached texture to the second one, call glClear,
     *   and then switch back to the original texture. This solution is unnecessary for other devices as they don't have the same issue with switching frame buffers.
     */
    if (cc.configuration.checkForGLExtension("GL_QCOM")) {
        // -- bind a temporary texture so we can clear the render buffer without losing our texture
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._textureCopy._webTextureObj, 0);
        //cc.checkGLErrorDebug();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, node._texture._webTextureObj, 0);
    }
};

proto._beginWithClear = function(r, g, b, a, depthValue, stencilValue, flags){
    r = r / 255;
    g = g / 255;
    b = b / 255;
    a = a / 255;

    var gl = cc._renderContext;

    // save clear color
    var clearColor = [0.0, 0.0, 0.0, 0.0];
    var depthClearValue = 0.0;
    var stencilClearValue = 0;

    if (flags & gl.COLOR_BUFFER_BIT) {
        clearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
        gl.clearColor(r, g, b, a);
    }

    if (flags & gl.DEPTH_BUFFER_BIT) {
        depthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
        gl.clearDepth(depthValue);
    }

    if (flags & gl.STENCIL_BUFFER_BIT) {
        stencilClearValue = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
        gl.clearStencil(stencilValue);
    }

    gl.clear(flags);

    // restore
    if (flags & gl.COLOR_BUFFER_BIT)
        gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);

    if (flags & gl.DEPTH_BUFFER_BIT)
        gl.clearDepth(depthClearValue);

    if (flags & gl.STENCIL_BUFFER_BIT)
        gl.clearStencil(stencilClearValue);
};

proto.end = function(){
    var node = this._node;
    cc.renderer._renderingToBuffer(node.__instanceId);

    var gl = cc._renderContext;
    var director = cc.director;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._oldFBO);

    //restore viewport
    director.setViewport();
    cc.math.glMatrixMode(cc.math.KM_GL_PROJECTION);
    cc.math.glPopMatrix();
    cc.math.glMatrixMode(cc.math.KM_GL_MODELVIEW);
    cc.math.glPopMatrix();

    /* var size = director.getWinSizeInPixels();

     // restore viewport
     gl.viewport(0, 0, size.width, size.height);

     // special viewport for 3d projection + retina display
     if (director.getProjection() == cc.Director.PROJECTION_3D) {
     gl.viewport((-size.width / 2), (-size.height / 2), size.width, size.height));
     }

     director.setProjection(director.getProjection());*/
};

proto.clearRect = function(x, y, width, height){
    //TODO need to implement
};

proto.clearDepth = function(depthValue){
    var node = this._node;
    node.begin();

    var gl = cc._renderContext;
    //! save old depth value
    var depthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);

    gl.clearDepth(depthValue);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    // restore clear color
    gl.clearDepth(depthClearValue);
    node.end();
};


}).call(window, cc, ccui, ccs, cp);

//# sourceMappingURL=modular-cocos2d-cut.js.map