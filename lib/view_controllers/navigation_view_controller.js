// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require('sproutcore-ui/view_controllers/view_controller');

var get = SC.get;
var set = SC.set;

/** 
  @class
  
  @extends UI.ViewController
*/
UI.NavigationViewController = UI.ViewController.extend(
/** @scope UI.NavigationViewController.prototype */{
  tree: []

});
