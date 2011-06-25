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
    console.group('Navigation Acceptance Test - Setup for new test');

    application = SC.Application.create();
    application.ready();

    application.navigationController = UI.NavigationController.create();

    application.collectionController = SC.CollectionView.extend({
      content: content
    }); 

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
    containerView.destroy();
    application.destroy();

    console.groupEnd();
  }  
});

test("Using a collection as the root view in a navigation view", function() {
  equals($('#navigation_view').length,1,"#navigation_view should be a valid selector in DOM");
  equals($('#navigation_view .navigation-item').length,content.length,"There should be one item per content object");
  equals($('#navigation_view .navigation-item').first().text().trim(),content[0].title,"The DOM must contain the proper value from content array");
});

test("Pushing views", function() {
  var secondContent = ["Four","Five","Six"];

  var view = SC.CollectionView.extend({
    classNames: ['__test_second'],
    content: secondContent,

    itemViewClass: SC.View.extend({
      classNames: ['navigation-item'],
      render: function(buf) {
        buf.push(get(this, 'content'));
      }
    })
  });

  SC.run(function() {
    application.navigationController.pushView(view);
  });

  equals($('.__test_second').length,1,".__test_second should be a valid selector in DOM");
  equals($('.__test_second .navigation-item').length,content.length,"There should be one item per content object");
  equals($('.__test_second .navigation-item').first().text(),secondContent[0],"The DOM must contain the proper value from content array");
});
