// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var get = SC.get;
var set = SC.set;

require("sproutcore-ui/system/namespace");
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

  init: function() {
    this._super();

    var controller = get(this, 'controller');

    if (SC.typeOf(controller) === "string") {
      controller = SC.getPath(controller);
      set(this, 'controller', controller); 
    }

    set(controller, 'navigationView', this);
  },

  didInsertElement: function() {

    var controller = get(this, 'controller');
    var block = get(this, 'handlebarsBlock');

    if (block) {
      var view = SC.View.extend({
        template: block
      });

      controller.pushView(view);
    }
  },

  pushView: function(view,animated) {
    //console.log('UI.NavigationView#pushView'); 
    
    var childViews = get(this, 'childViews'),
        controller = get(this, 'controller'),
        buffer = "",
        view, fragment;

    view = this.createChildView(view, {
      controller: controller
    });

    buffer = buffer + view.renderToBuffer().string();
    fragment = SC.$(buffer);

    view._notifyWillInsertElement();

      this.$().append(fragment);
      childViews.push(view);

    view._notifyDidInsertElement();

    return view;
  },

  popView: function(view,animated) {
    //console.log('UI.NavigationView#popView'); 
    
    view.destroy();
  },

  toString: function() { return 'UI.NavigationView'; }
});
