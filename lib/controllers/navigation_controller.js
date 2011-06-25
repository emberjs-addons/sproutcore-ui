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

  pushView: function(newView) {
    console.log('UI.NavigationController#pushView'); 

    var navView = get(this,'navigationView');
    navView.pushView(newView);
  }
});
