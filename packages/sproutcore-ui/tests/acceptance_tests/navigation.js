// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;

var containerView;
var content = [{title:"One"},{title:"Two"},{title:"Three"}];

var itemViewClass = SC.View.extend(UI.LayoutSupport, {
  classNames: ['navigation-item'],
  anchorTo: 'remainingSpace',
  render: function(buf) {
    buf.push(get(this, 'content'));
  }
});

module("Navigation Acceptance test", {
  setup: function() {
    console.group('Navigation Acceptance Test - Setup for new test');

    application = SC.Application.create();
    application.ready();

    application.navigationController = UI.NavigationController.create();

    application.collectionView = SC.CollectionView.extend(UI.LayoutSupport, {
      anchorTo: 'remainingSpace',
      content: content
    }); 

    containerView = SC.View.create(UI.LayoutSupport, {
      elementId: 'container-view',
      anchorTo: 'left',
      size: 250,
      template: SC.Handlebars.compile('{{#ui NavigationView elementId="navigation_view" controller="application.navigationController"}}\
                                         {{#collection application.collectionView itemClass="navigation-item"}}\
                                           <b>{{content.title}}</b>\
                                         {{/collection}}\
                                       {{/ui}}')
    });


    SC.run(function() {
      containerView.append();
    });
  },

  teardown: function() {
    application.navigationController.destroy();
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

  var view = SC.CollectionView.extend(UI.LayoutSupport, {
    classNames: ['__test_second'],
    anchorTo: 'remainingSpace',
    content: secondContent,
    itemViewClass: itemViewClass
  });

  SC.run(function() {
    application.navigationController.pushView(view);
  });

  equals($('.__test_second').length,1,".__test_second should be a valid selector in DOM");
  equals($('.__test_second .navigation-item').length,content.length,"There should be one item per content object");
  equals($('.__test_second .navigation-item').first().text(),secondContent[0],"The DOM must contain the proper value from content array");
  equals(application.navigationController.get('views').length,2,"There should be two items in the stack");
});

test("Popping a view", function() {

  var secondContent = ["Seven","Eight","Nine"];

  var pushedView = SC.CollectionView.extend(UI.LayoutSupport, {
    __my_acceptance_test: true,
    anchorTo: 'remainingSpace',
    classNames: ['__test_second'],
    content: secondContent,
    itemViewClass: itemViewClass
  });

  var poppedView;

  SC.run(function() {
    application.navigationController.pushView(pushedView);
  });

  equals(application.navigationController.get('views').length,2,"There should be two items in the stack");

  SC.run(function() {
    poppedView = application.navigationController.popView();
  });
  
  ok(poppedView.__my_acceptance_test,"the return value from pop() should be the most recently pushed view");
  equals(application.navigationController.get('views').length,1,"There should be one item in the stack (the root one created in the setup()");
});
