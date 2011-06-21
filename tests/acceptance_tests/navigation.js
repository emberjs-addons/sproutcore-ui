// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;

var NavigationAcceptanceTest = {};
var navigationView;

module("Navigation Acceptance test", {
  setup: function() {

    NavigationAcceptanceTest.navigationController = UI.NavigationController.extend({
      tree: [
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
      ]
    });

    navigationView = SC.View.create({
      template: SC.Handlebars.compile('{{ui NavigationView elementId="navigation_view" controller="NavigationAcceptanceTest.navigationController"}}')
    });

    navigationView.append();
  },

  teardown: function() {

  }  
});

test("#navigation_view should find the element in DOM", function() {
  ok($('#navigation_view'));
});
