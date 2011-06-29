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

  _direction: null,

  _anchors: null,

  _propertyMetadata: {
    top: {
      constraint: 'height',
      direction: 'vertical',
      opposite: 'bottom',
      neighbors: ['left','right']
    },
    right: {
      constraint: 'width',
      direction: 'horizontal',
      opposite: 'left',
      neighbors: ['top','bottom']
    },
    bottom: {
      constraint: 'height',
      direction: 'vertical',
      opposite: 'top',
      neighbors: ['left','right']
    },
    left: {
      constraint: 'width',
      direction: 'horizontal',
      opposite: 'right',
      neighbors: ['top','bottom']
    }
  },
  

  init: function() {
    this._anchors = [];
    return this._super();
  },

  layoutForAnchor: function(view, anchor, options) {
    var direction = this._direction,
        meta = this._propertyMetadata[anchor],
        neighbors = meta.neighbors,
        size = options.size,
        anchors = this._anchors,
        layout = {};

    if (anchor === 'contentView') {
      return this._layoutForContentView(view, anchor, options);
    }

    if ( ((anchor === 'top' || anchor === 'bottom') && direction === 'horizontal') ||
         ((anchor === 'left' || anchor === 'right') && direction === 'vertical')) {
      throw new SC.Error("You can't setup a horizontal anchor in a vertical view and vice versa.");
    }

    if (size === undefined || size === null) { throw new SC.Error("Anchors require a size property"); }

    layout[anchor] = 0;
    layout[meta.constraint] = size;

    this._direction = meta.direction;
    this._anchors[anchor] = this._anchorMetaForView(view);

    for (var i=0,l=neighbors.length; i<l; i++) {
      var neighbor = neighbors[i];
      layout[neighbor] = 0;
    }

    return layout;
  },

  destroyAnchor: function(view) {
    var anchors = this._anchors;

    for (var i=0, l=anchors.length; i<l; i++) {
      var anchor = anchors[i];

      if (anchor.view === view) {
        this._cleanupAnchor(anchor, i);
        break;
      }
    }
  },

  _anchorMetaForView: function(view) {
    return {
      view: view,
      before: 0,
      after: 0
    }
  },

  _cleanupAnchor: function(anchor, index) {

  }
});

UI.rootLayoutManager = UI.LayoutManager.create();
