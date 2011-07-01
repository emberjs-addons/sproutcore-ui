// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('sproutcore-ui/controllers/view_controller');

var get = SC.get;
var set = SC.set;

/** 
  @class
  
  @extends UI.ViewController
*/
UI.NavigationController = UI.ViewController.extend(
/** @scope UI.NavigationController.prototype */{

  navigationView: null,

  _stack: null,

  init: function() {
    this._stack = [];
  },

  initWithRootView: function(rootView) {
    this._stack = [rootView];
  },

  pushView: function(newView,animated) {
    //console.log('UI.NavigationController#pushView'); 

    if (SC.View.detect(newView) === false) {
      throw new Error("UI.NavigationController#pushView only takes SC.View objects");
    }

    var navView = get(this,'navigationView');
    
    // Create instance and append it to DOM
    newView = navView.pushView(newView, animated);

    this._stack.push(newView);
  },

  popView: function(animated) {
    //console.log('UI.NavigationController#popView'); 
    var poppedView = this._stack.pop();
    
    var navView = get(this,'navigationView');
    navView.popView(poppedView,animated);

    return poppedView;
  },

  views: function(key, value) {
    if (value !== undefined) { return; }
    return this._stack.slice(0);
  }.property(),

  destroy: function() {
    var navView = get(this,'navigationView'),
        stack = this._stack,
        len = stack.length;

    for (var i=len-1; i>=0; i--) {
      navView.popView(stack[i],false);
    }

    return this._super();
  }
});
