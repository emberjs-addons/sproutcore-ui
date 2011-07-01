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

function validateLayout(element,layout) {
  equals(element.length, 1, "View should be in dom");
  equals(element.css('position'),'absolute');

  for (var property in layout) {
    equals(element.css(property),layout[property]+'px','Testing '+property+' of '+element);
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
      anchor: anchor,
      size: size,
    });

    views.push(view);
    view.append();
  });

  return view;
}

function generateNestedView(parentView,className,anchor,size) {
  var nestedView = parentView.createChildView(SC.View.extend(UI.LayoutSupport), {
    anchor: anchor,
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

    containerView = generateView('layout_manager_test_container','contentView');
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

test("vertical anchoring with content view", function() {
  var viewHeight = 50;

  var parentView = generateNestedView(containerView,'layout_manager_test','contentView');
  generateNestedView(parentView,'top_anchor','top',viewHeight);
  generateNestedView(parentView,'bottom_anchor','bottom',viewHeight);
  generateNestedView(parentView,'content_view','contentView');

  validateLayout($('.layout_manager_test'), {top:0,left:0,right:0,bottom:0});
  validateLayout($('.top_anchor'), {top:0,left:0,right:0,height:viewHeight});
  validateLayout($('.bottom_anchor'), {bottom:0,left:0,right:0,height:viewHeight});
  validateLayout($('.content_view'), {top:viewHeight,left:0,right:0,bottom:viewHeight});

  //validateLayout($('.layout_manager_test').css('background','red'), {top:0,left:0,right:0,bottom:0});
  //validateLayout($('.top_anchor').css('background','blue'), {top:0,left:0,right:0,height:viewHeight});
  //validateLayout($('.bottom_anchor').css('background','yellow'), {bottom:0,left:0,right:0,height:viewHeight});
  //validateLayout($('.content_view').css('background','green'), {top:viewHeight,left:0,right:0,bottom:viewHeight});
});

test("horizontal anchoring with content view", function() {
  var sidebarWidth = 250;

  var parentView = generateNestedView(containerView,'layout_manager_test','contentView');
  generateNestedView(parentView,'left_anchor','left',sidebarWidth);
  generateNestedView(parentView,'right_anchor','right',sidebarWidth);
  generateNestedView(parentView,'content_view','contentView');

  //validateLayout($('.layout_manager_test'),                           { top:0,left:0,right:0,bottom:0});
  //validateLayout($('.left_anchor'),                                   { top:0,left:0,bottom:0,width:sidebarWidth});
  //validateLayout($('.right_anchor'),                                  { top:0,right:0,bottom:0,width:sidebarWidth});
  //validateLayout($('.content_view'),                                  { top:0,left:sidebarWidth,right:sidebarWidth,bottom:0});

  validateLayout($('.layout_manager_test').css('background','red'), { top:0,left:0,right:0,bottom:0});
  validateLayout($('.top_anchor').css('background','blue'),         { top:0,left:0,bottom:0,width:sidebarWidth});
  validateLayout($('.bottom_anchor').css('background','yellow'),    { top:0,right:0,bottom:0,width:sidebarWidth});
  validateLayout($('.content_view').css('background','green'),      { top:0,left:sidebarWidth,right:sidebarWidth,bottom:0});
});
