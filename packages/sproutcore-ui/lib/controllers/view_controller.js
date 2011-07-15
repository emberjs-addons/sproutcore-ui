// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require("sproutcore-ui/system/namespace");
require('sproutcore-runtime');

var get = SC.get;
var set = SC.set;

/** 
  @class

  Defines the protocol that all subclasses must implement
  
  @extends SC.Object
*/
UI.ViewController = SC.Object.extend(
/** @scope UI.ViewController.prototype */{

  rootNode: null,

  view: null,

  init:function() {
    set(this, 'view', SC.View.create({
      elementId: 'foobar'
    })); 
  },

  appendViews: function(node ) {
    var root = get(this, 'rootNode');
    if (!root) throw new SC.Error("Can't append views without a rootNode specified.");
    
    root.appendChild(get(this,'view'));
  }
});
