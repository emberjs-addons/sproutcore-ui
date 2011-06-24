// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================



var set = SC.set;
var get = SC.get;

var containerView;
var content = [{title:"One"},{title:"Two"},{title:"Three"}];

module("Navigation Acceptance test", {
  setup: function() {
    console.group('Navigation Acceptance Test');

    application = SC.Application.create();
    application.ready();

    application.collectionController = SC.CollectionView.extend({
      content: content
    }); 

    application.navigationController = UI.NavigationController.create();

    containerView = SC.View.create({
      elementId: 'container-view',
      template: SC.Handlebars.compile('{{#ui NavigationView elementId="navigation_view" controller="application.navigationController"}}\
                                         {{#collection application.collectionController itemClass="navigation-item"}}\
                                           <b>{{content.title}}</b>\
                                         {{/collection}}\
                                       {{/ui}}')
    });


    SC.run(function() {
      containerView.append();
    });
  },

  teardown: function() {
    //containerView.destroy();
    //application.destroy();

    console.groupEnd();
  }  
});

test("Using a collection as the root view in a navigation view", function() {
  equals($('#navigation_view').length,1,"#navigation_view should be a valid selector in DOM");
  equals($('.navigation-item').length,content.length,"There should be one item per content object");
});

test("Pushing views", function() {
  item = $('.navigation-item:first');

  item.trigger('click');
});
