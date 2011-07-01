// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;
var viewClass;
var views = [];
var containerView;

function validateLayout(element,layout,desc) {
  equals(element.length, 1, "View should be in dom");
  equals(element.css('position'),'absolute');

  for (var property in layout) {
    equals(element.css(property),layout[property]+'px','Testing '+property+' of '+element+' - '+desc);
  }
}

function generateView(className,anchor,size) {
  var view;
  
  if (anchor !== undefined) {
    viewClass = SC.View.extend(UI.LayoutSupport);
  }
  else {
    viewClass = SC.View;
  }

  SC.run(function(){
    view = viewClass.create({
      classNames: [className],
      anchorTo: anchor,
      size: size,
    });

    views.push(view);
    view.append();
  });

  return view;
}

function generateNestedView(parentView,className,anchor,size) {
  var nestedView = parentView.createChildView(SC.View.extend(UI.LayoutSupport), {
    anchorTo: anchor,
    size: size,
    classNames: [className]
  });
 
  var buffer = nestedView.renderToBuffer().string();
 
  var fragment = SC.$(buffer);
  parentView.$().append(fragment);
 
  var childViews = get(parentView, 'childViews');
  childViews.push(nestedView);
    
  return nestedView;
}

module("Layout Manager",{
  setup: function() {
    console.group('Layout Manager - Setup for new test');

    viewClass = SC.View.extend(UI.LayoutSupport, {
      classNames: ['layout_manager_test']
    });

    containerView = generateView('layout_manager_test_container','remainingSpace');
  },

  teardown: function() {
    containerView.destroy();

    var l = views.length;

    for(var i=0; i<l; i++) {
     views[i].destroy(); 
    }

    views = [];

    console.groupEnd();
  }  
});

test("no anchors", function() {
  var viewHeight = 50;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'), {top:0,left:0,right:0,bottom:0},'vertical, container');

  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'), {top:0,left:0,right:0,bottom:0},'vertical, content');
});

test("vertical anchoring only top anchor", function() {
  var viewHeight = 50;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'), {top:0,left:0,right:0,bottom:0},'vertical, container');

  generateNestedView(parentView,'top_anchor','top',viewHeight);
  validateLayout($('.top_anchor'), {top:0,left:0,right:0,height:viewHeight},'vertical, top');

  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'), {top:viewHeight,left:0,right:0,bottom:0},'vertical, content');
});

test("vertical anchoring only bottom anchor", function() {
  var viewHeight = 50;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'), {top:0,left:0,right:0,bottom:0},'vertical, container');

  generateNestedView(parentView,'bottom_anchor','bottom',viewHeight);
  validateLayout($('.bottom_anchor'), {bottom:0,left:0,right:0,height:viewHeight},'vertical, bottom');

  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'), {top:0,left:0,right:0,bottom:viewHeight},'vertical, content');
});

test("vertical anchoring with content view", function() {
  var viewHeight = 50;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'), {top:0,left:0,right:0,bottom:0},'vertical, container');

  generateNestedView(parentView,'top_anchor','top',viewHeight);
  validateLayout($('.top_anchor'), {top:0,left:0,right:0,height:viewHeight},'vertical, top');

  generateNestedView(parentView,'bottom_anchor','bottom',viewHeight);
  validateLayout($('.bottom_anchor'), {bottom:0,left:0,right:0,height:viewHeight},'vertical, bottom');

  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'), {top:viewHeight,left:0,right:0,bottom:viewHeight},'vertical, content');
});

test("horizontal anchoring only left anchor", function() {
  var sidebarWidth = 250;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'),                       { top:0,left:0,right:0,bottom:0},'horizontal, container');

  generateNestedView(parentView,'left_anchor','left',sidebarWidth);
  validateLayout($('.left_anchor'),                                { top:0,left:0,bottom:0,width:sidebarWidth},'horizontal, left');
  
  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'),                              { top:0,left:sidebarWidth,right:0,bottom:0},'horizontal, content');
});

test("horizontal anchoring only right anchor", function() {
  var sidebarWidth = 250;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'),                       { top:0,left:0,right:0,bottom:0},'horizontal, container');

  generateNestedView(parentView,'right_anchor','right',sidebarWidth);
  validateLayout($('.right_anchor'),                             { top:0,right:0,bottom:0,width:sidebarWidth},'horizontal, right');
  
  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'),                              { top:0,left:0,right:sidebarWidth,bottom:0},'horizontal, content');
});

test("horizontal anchoring with content view", function() {
  var sidebarWidth = 250;

  var parentView = generateNestedView(containerView,'layout_manager_test','remainingSpace');
  validateLayout($('.layout_manager_test'),                       { top:0,left:0,right:0,bottom:0},'horizontal, container');

  generateNestedView(parentView,'left_anchor','left',sidebarWidth);
  validateLayout($('.left_anchor'),                                { top:0,left:0,bottom:0,width:sidebarWidth},'horizontal, left');

  generateNestedView(parentView,'right_anchor','right',sidebarWidth);
  validateLayout($('.right_anchor'),                             { top:0,right:0,bottom:0,width:sidebarWidth},'horizontal, right');
  
  generateNestedView(parentView,'content_view','remainingSpace');
  validateLayout($('.content_view'),                              { top:0,left:sidebarWidth,right:sidebarWidth,bottom:0},'horizontal, content');
});
