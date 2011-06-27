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

  pushView: function(newView) {
    console.log('UI.NavigationController#pushView'); 

    this._stack.push(newView);

    var navView = get(this,'navigationView');
    navView.pushView(newView);
  },

  popView: function() {
    console.log('UI.NavigationController#popView'); 
    var poppedView = this._stack.pop();
    
    var navView = get(this,'navigationView');
    navView.popView();

    return poppedView;
  },

  views: function(key, value) {
    if (value !== undefined) { return; }
    return this._stack.slice(0);
  }.property()
});
