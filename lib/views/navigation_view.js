// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var get = SC.get;
var set = SC.set;

require('sproutcore-views/views/view');

/** 
  @class

  Usage
  =======

  {{#ui NavigationView controller="path.to.controller"}}
    {{#collection MyApp.collectionController}}
      <h2>{{content.title}}</h2>
    {{/collleciton}}
  {{/ui}}

  The block provided in a {{#ui NavigationView}} helper defined the root view.
  It will be displayed on launch. To push new views to the NavigationView, call
  push(viewInstance) and pop() on the associated controller.
  
  @extends SC.View
*/
UI.NavigationView = SC.View.extend(
/** @scope UI.NavigationView.prototype */{

  controller: null,

  contentView: null,

  toString: function() { return 'UI.NavigationView'; }
});
