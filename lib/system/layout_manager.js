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

  _availableSpace: null,

  init: function() {
    
    this._availableSpace = {top:0,left:0,right:0,bottom:0};

    return this._super();
  },

  element: null,

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

  layoutFor: function(options) {
    var anchor = options.anchor;
    var layout = {
      anchor: anchor
    };

    this._consumeSpace(layout, options);
    return layout;
  },

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
      console.log('adding',constraintValue,'to',anchor);
      space[anchor] += constraintValue;
    }
    else {
      layout[opposite] = space[opposite];
    }
  },

  cleanUpLayout: function(layout) {
    var anchor = layout.anchor;
    var space = this._availableSpace;
    var meta = this._propertyMetadata[anchor];
    var constraint = meta.constraint;
    var constraintValue = layout[constraint];
    
    if (constraintValue !== undefined && constraintValue !== null) {
      console.log('subtracting',layout[constraint],'from ',anchor);
      space[anchor] -= layout[constraint];
    }
  }
});

UI.rootLayoutManager = UI.LayoutManager.create({
  element: $(document.body)
});
