// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require("sproutcore-views/views/view");
require("sproutcore-runtime");

var set = SC.set;
var get = SC.get;

/** 
  @class

  Overview
  ========

  UI.LayoutManager is an internal class used by UI.LayoutSupport to manage and
  update the layout of a view. The main API entry-points are: 
  layoutForManagedView(), and destroy(). The former returns a layout hash of
  properties to set on the view, and the latter cleans up the internal state
  of the layout manager.
  
  @private
  @extends SC.Object
 */
UI.LayoutManager = SC.Object.extend(
/** @scope UI.LayoutManager.prototype */{

  _direction: null,

  _anchors: null,
  _remainingSpace: null,

  _propertyMetadata: {
    remainingSpace: {
      neighbors: ['top','right','bottom','left']
    },
    top: {
      constraint: 'height',
      direction: 'vertical',
      neighbors: ['left','right']
    },
    right: {
      constraint: 'width',
      direction: 'horizontal',
      neighbors: ['top','bottom']
    },
    bottom: {
      constraint: 'height',
      direction: 'vertical',
      neighbors: ['left','right']
    },
    left: {
      constraint: 'width',
      direction: 'horizontal',
      neighbors: ['top','bottom']
    }
  },
  

  init: function() {
    this._anchors = {};
    return this._super();
  },

  layoutForManagedView: function(view, anchor, options) {
    if (anchor === 'remainingSpace') {
      return this._layoutForContentView(view, anchor, options);
    }

    return this._layoutForAnchoredView(view, anchor, options);
  },

  destroy: function() {
    this._direction = null;
    this._anchors = {};
    this._remainingSpace = null;
  },

  _layoutForAnchoredView: function(view, anchor, options) {
    var direction = this._direction,
        meta = this._propertyMetadata[anchor],
        neighbors = meta.neighbors,
        size = options.size,
        anchors = this._anchors,
        layout = {};

    if (direction !== null && direction !== meta.direction) { throw new SC.Error("You can't setup a horizontal anchor in a vertical view and vice versa."); }
    if (size === undefined || size === null) { throw new SC.Error("Anchors require a size property"); }

    layout[anchor] = 0;
    layout[meta.constraint] = size;

    for (var i=0,l=neighbors.length; i<l; i++) {
      var neighbor = neighbors[i];
      layout[neighbor] = 0;
    }

    this._direction = meta.direction;
    this._anchors[anchor] = {
      view: view,
      constraint: size
    };

    this._reflowContentView();

    return layout;
  },

  _layoutForContentView: function(view, anchor) {
    var direction = this._direction, anchors = this._anchors;
    var beforeAnchorName, afterAnchorName, beforeAnchor, afterAnchor;
    var remainingSpace = {
      view: view,
      before: null,
      after: null
    };

    if (direction === 'horizontal') {
      beforeAnchorName = 'left';
      afterAnchorName = 'right';
    }
    else if (direction === 'vertical') {
      beforeAnchorName = 'top';
      afterAnchorName = 'bottom';
    }

    beforeAnchor = anchors[beforeAnchorName];
    remainingSpace.before = beforeAnchor? beforeAnchor.constraint : 0;

    afterAnchor = anchors[afterAnchorName];
    remainingSpace.after = afterAnchor? afterAnchor.constraint : 0;

    this._remainingSpace = remainingSpace;

    var layout = {};
    var neighbors = this._propertyMetadata[anchor].neighbors;

    for (var i=0,l=neighbors.length; i<l; i++) {
      var neighbor = neighbors[i];
      layout[neighbor] = 0;
    }

    layout[beforeAnchorName] = remainingSpace.before;
    layout[afterAnchorName] = remainingSpace.after;

    return layout;
  },

  _reflowContentView: function() {
    var remainingSpace = this._remainingSpace;

    if (!remainingSpace) { return; }
    else if (!remainingSpace.view) { return; }


    var layout = this._layoutForContentView(remainingSpace ,'remainingSpace');
    var element = get(remainingSpace.view,'element');

    if (element) {
      for (var prop in layout) {
        $(element).css(prop,layout[prop]); 
      }
    }
  }
});

UI.rootLayoutManager = UI.LayoutManager.create({});
