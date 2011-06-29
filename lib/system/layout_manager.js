// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;

/** 
  @class

  Overview
  ==========

  UI.LayoutManager manages the allocation of available space to the views.
  Views can be anchored to: top, right, bottom, left, or fill. If they are
  anchored to "fill", they will stretch to fill the available space. If they 
  are anchored to any of the other sides, UI.LayoutManager will determine
  the dimensions and/or position they need to apply to fill their desired
  space.

  For example, if a view is anchored to the top of an empty space and has a 
  height of 50px, UI.LayoutManager will give it a layout of:

    {
      top: 0,
      right: 0,
      left: 0,
      height: 50
    }

  If you then anchor a view to the left with a width of 250px, it will have a 
  layout of:

    {
      top: 50,
      bottom: 0,
      left: 0,
      width: 250
    }

  Notice that it has a top of 50px: That is because UI.LayoutManager already
  knows that the top 50px of the available space is already allocated, and 
  accounts for it.

  Usage
  ===========

  Usually you will not interact directlly with UI.LayoutManager. Instead, you
  will mix-in UI.LayoutSupport to your view, and it will take care of the 
  talking to UI.LayoutManager and setting the appropriate styles on the 
  element.

  @extends SC.Object
*/
UI.LayoutManager = SC.Object.extend(
/** @scope UI.LayoutManager.prototype */{

  /**
    A hash containing the top/left/right/bottom values which define the 
    available space for views to live in.

    @type Hash
  */
  _availableSpace: null,

  init: function() {
    
    this._availableSpace = {top:0,left:0,right:0,bottom:0};

    return this._super();
  },

  /**
    A hash containing the top/left/right/bottom values which define the 
    available space for views to live in.

    @type Hash
  */
  _propertyMetadata: {
    top: {
      constraint: 'height',
      opposite: 'bottom',
      neighbors: ['left','right']
    },
    right: {
      constraint: 'width',
      opposite: 'left',
      neighbors: ['top','bottom']
    },
    bottom: {
      constraint: 'height',
      opposite: 'top',
      neighbors: ['left','right']
    },
    left: {
      constraint: 'width',
      opposite: 'right',
      neighbors: ['top','bottom']
    },
    fill: {
      neighbors: ['top', 'left','right','bottom']
    }
  },

  /**
    A hash containing the top/left/right/bottom values which define the 
    available space for views to live in.

    @type Hash
  */
  layoutFor: function(options) {
    var anchor = options.anchor;
    var layout = {
      anchor: anchor
    };

    this._consumeSpace(layout, options);
    return layout;
  },

  /**
    A hash containing the top/left/right/bottom values which define the 
    available space for views to live in.

    @type Hash
  */
  _consumeSpace: function(layout, options){
    var space = this._availableSpace;

    var anchor = options.anchor;
    var meta = this._propertyMetadata[anchor];
    var opposite = meta.opposite;
    var neighbors = meta.neighbors;

    layout[anchor] = space[anchor];
    
    for (var i=0,l=meta.neighbors.length; i<l; i++) {
      var neighbor = neighbors[i];
      layout[neighbor] = space[neighbor];
    }

    var constraint = meta.constraint;
    var constraintValue = options[constraint];

    if (constraintValue !== undefined && constraintValue !== null) {
      layout[constraint] = constraintValue;
      space[anchor] += constraintValue;
    }
    else {
      layout[opposite] = space[opposite];
    }
  },

  /**
    If a view is destroyed, then reclaim the space that it lives in.

    @param {Hash} layout Usually, you pass into cleanUpLayout the same 
      layout hash that was returned from layoutFor()
  */
  cleanUpLayout: function(layout) {
    var anchor = layout.anchor;
    var space = this._availableSpace;
    var meta = this._propertyMetadata[anchor];
    var constraint = meta.constraint;
    var constraintValue = layout[constraint];
    
    if (constraintValue !== undefined && constraintValue !== null) {
      space[anchor] -= layout[constraint];
    }
  }
});

/**
  @class

  A singleton instance of UI.LayoutManager used for managing the global
  layout of the window. If there is no view in the view hierarchy of an
  SC.View which mixes-in UI.LayoutSupport, then this instance will be 
  used instead.

  You will not usually use this class directly.
*/
UI.rootLayoutManager = UI.LayoutManager.create();
