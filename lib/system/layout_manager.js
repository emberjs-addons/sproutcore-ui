// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;

/** 
  @class
  
  @extends SC.Object
*/
UI.LayoutManager = SC.Object.extend(
/** @scope UI.LayoutManager.prototype */{

  _availableSpace: {top:0,left:0,right:0,bottom:0},
  _possibleAnchors: ['top', 'right', 'bottom', 'left'],

  element: null,

  layoutFor: function(options) {
    var anchor = options.anchor;
    var layout = {
      anchor: anchor
    };

    this['_consume_'+layout.anchor+'_space'](layout, options);

    return layout;
  },

  _consume_top_space: function(layout, options){
    var space = this._availableSpace;

    var height = options.height;

    layout.top = space.top;
    layout.left = space.left;
    layout.right = space.right;

    if (height !== undefined && height !== null) {
      layout.height = height;
      space.top += height;
    }
    else {
      layout.bottom = space.bottom;
    }
  },

  _consume_bottom_space: function(layout, options){
    var space = this._availableSpace;

    var height = options.height;

    layout.bottom = space.bottom;
    layout.left = space.left;
    layout.right = space.right;

    if (height !== undefined && height !== null) {
      layout.height = height;
      space.bottom += height;
    }
    else {
      layout.top = space.top;
    }
  },

  _consume_right_space: function(layout, options){
    var space = this._availableSpace;

    var width = options.width;

    layout.top = space.top;
    layout.bottom = space.bottom;
    layout.right = space.right;

    if (width !== undefined && width !== null) {
      layout.width = width;
      space.right += width;
    }
    else {
      layout.left = space.left;
    }

  },

  _consume_left_space: function(layout, options){
    var space = this._availableSpace;

    var width = options.width;

    layout.top = space.top;
    layout.bottom = space.bottom;
    layout.left = space.left;

    if (width !== undefined && width !== null) {
      layout.width = width;
      space.left += width;
    }
    else {
      layout.right = space.right;
    }

  },

  cleanUpLayout: function(layout) {
    console.log('_cleanup_'+layout.anchor+'_space');
    this['_cleanup_'+layout.anchor+'_space'](layout);
  },

  _cleanup_top_space: function(layout) {
    var space = this._availableSpace;
    space.top -= layout.height;
  },

  _cleanup_right_space: function(layout) {
    var space = this._availableSpace;
    space.right -= layout.width;
  },

  _cleanup_left_space: function(layout) {
    var space = this._availableSpace;
    space.left -= layout.width;
  },

  _cleanup_bottom_space: function(layout) {
    var space = this._availableSpace;
    space.bottom -= layout.height;
  }

});

UI.rootLayoutManager = UI.LayoutManager.create({
  element: $(document.body)
});
