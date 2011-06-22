// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================



var set = SC.set;
var get = SC.get;

NavigationAcceptanceTest = {};

var navigationView;

var navigation_tree = [
  {
    value: 'one',
    children: [
      { value: "one one" },
      { value: "one two" },
      { value: "one three" },
      { value: "one four" },
      { value: "one five" }
    ]
  },
  {
    value: 'two',
    children: [
      { value: "two one" },
      { value: "two two" },
      { value: "two three" },
      { value: "two four" },
      { value: "two five" }
    ]
  },
  {
    value: 'three',
    children: [
      { value: "three one" },
      { value: "three two" },
      { value: "three three" },
      { value: "three four" },
      { value: "three five" }
    ]
  }
];

module("Navigation Acceptance test", {
  setup: function() {

    NavigationAcceptanceTest.navigationController = UI.NavigationController.create({
      tree: navigation_tree
    });

    navigationView = SC.View.create({
      template: SC.Handlebars.compile('{{ui NavigationView elementId="navigation_view" controller="NavigationAcceptanceTest.navigationController"}}')
    });

    navigationView.append();
  },

  teardown: function() {

  }  
});

test("#navigation_view should be a valid selector in DOM", function() {
  equals($('#navigation_view').length,1);
});

test("It should create a #navigation-item for each item", function() {
  equals($('.ui-navigation-item').length,navigation_tree.length);
});
