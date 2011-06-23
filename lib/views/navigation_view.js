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

  Navigating content
  --------

  The basic usage of NavigationView is to navigate a hierarchy of data represented
  as a tree. To set up the navigation view in that scenario, set `controller` to 
  the path of an instance of UI.NavigationController. Internally, UI.NavigationView 
  will fetch the `content` property from the controller and use it to generate the 
  navigatable hierarchy.

    {{ui NavigationView controller="path.to.controller"}}

  When the navigation view reaches a leaf in the tree, it will call `contentViewFor()` 
  which returns a view instance to be pushed on the navigation view for that content 
  object.

  Navigating between views
  --------

  If you instead wanted to use NavigationView to navigate through a predefined set
  of views, you can define them with a block:

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

  In this case, calling MyApp.navController.push() will push the second view
  into the navigation view and push the current one out to the left.

  Customization
  ----

  If providing a content tree or a static set of views does not fit your use case,
  you can pass SC.View instances to push() and pop() to animate views in and move 
  back out, respectively.

    // To push a view instance to a controller's stack:
    MyApp.navigationController.push(MyApp.secondView.create());
    
    // To pop the current view:
    MyApp.navigationController.pop();
  
  *Note*: If you decide to use push() and pop() to maintain your own stack you need to
  specify the root view using the rootView property in your template:

    {{ui NavigationView controller="path.to.controller" rootView="MyApp.rootView"}}
  
  @extends SC.View
*/
UI.NavigationView = SC.View.extend(
/** @scope UI.NavigationView.prototype */{

  controller: null,

  toString: function() {
    return 'UI.NavigationView';
  },

  didInsertElement: function() {
    console.log('NAVIGATIONVIEW: didInsertElement');

    var rootView = get(this, 'rootView');

    // Just push the root view to the DOM. User wants to maintain their own stack
    if (rootView) {

    }
    //
    else if (get(this,'usesBlock')) {

    }
    else {

    }
  }
});
