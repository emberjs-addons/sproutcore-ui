// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var get = SC.get;
var set = SC.set;

/** 
  @class

  Usage
  =======

  Navigating content
  --------

  The basic usage of NavigationView is to navigate a tree of data. To set up
  the navigation view in that scenario, set `controller` to the path of the
  instance of UI.NavigationController. Internally, UI.NavigationView will fetch
  the `tree` property from the controller and use it to generate the navigatable
  hierarchy.

    {{ui NavigationView controller="path.to.controller"}}

  When the navigation view reaches a leaf node, it will call `viewForLeaf()` which
  returns a view instance to be pushed on the navigation view.

  Navigating between views
  --------

  If you instead wanted to use NavigationView to display a wizard-like interface
  with multiple static panes, you can define them with a block:

    {{#ui NavigationView controller="MyApp.navController"}}
      {{#view MyApp.FirstView}}
        <h1>First View</h2>
      {{/view}}
      {{#view MyApp.SecondView}}
        <h1>Second View</h2>
      {{/view}}
      {{#view MyApp.ThirdView}}
        <h1>Third View</h2>
      {{/view}}
    {{/ui}}

  In this case, calling MyApp.navController.advance() will push the second view
  into the navigation view and push the first view out to the left.

  Customization
  ----

  If providing a tree of data or a static set of views does not fit your use case,
  you can use NavigationView in a more raw manner by using push() and pop() to
  animate views in and move back out.
  
  *Note*: If you decide to use push() and pop() to maintain your own view you need to
  specify the root view as a Handlebars block.
  
  @extends SC.View
*/
UI.NavigationView = SC.View.extend(
/** @scope UI.NavigationView.prototype */{

  controller: null,

  createChildViews: function() {
    var controller = get(this, 'controller');

    if (!controller) {
      throw new SC.Error('controller property of UI.NavigationView not set');
    }
    else if (SC.typeOf(controller) == 'string') {
      controller = SC.getPath(controller);
    }

    var tree = get(controller,'tree') || [],
        len = tree.length,
        childViews = [],
        childView = null;

    for (var i=0; i<len; i++) {
      childView = this.createChildView(SC.View, {
        classNames: ['ui-navigation-item']                                
      });

      childViews.push(childView);
    }

    set(this, 'childViews', childViews);
  },

  toString: function() {
    return 'UI.NavigationView';
  }
});
