// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;
var viewClass;
var views = [];

function validateLayout(element,layout) {
  equals(element.length, 1, "View should be in dom");
  equals(element.css('position'),'absolute');

  for (var property in layout) {
    equals(element.css(property),layout[property]+'px','Testing '+property+' of '+element);
  }
}

function generateView(className,anchor,dimensionName,dimensionValue) {
  var view;

  SC.run(function(){
    view = SC.View.create(UI.LayoutSupport, {
      classNames: [className],
      anchor: anchor,
    });

    if (dimensionName){
      set(view,dimensionName,dimensionValue);
    }

    views.push(view);
    view.append();
  });

  return view;
}

module("Layout Manager",{
  setup: function() {
    console.group('Layout Manager - Setup for new test');

    viewClass = SC.View.extend(UI.LayoutSupport, {
      classNames: ['layout_manager_test']
    });
  },

  teardown: function() {
    var l = views.length;

    for(var i=0; i<l; i++) {
     views[i].destroy(); 
    }

    views = [];

    console.groupEnd();
  }  
});

test("by default fill up page", function() {

  generateView('layout_manager_test', 'fill');
  validateLayout($('.layout_manager_test'), { top: 0, left: 0, right: 0, bottom: 0 });
});

test("top anchoring", function() {

  var viewHeight = 43;
  generateView('layout_manager_test', 'top', 'height', viewHeight);
  validateLayout($('.layout_manager_test'), { top: 0, left: 0, right: 0, height: viewHeight });
});

test("bottom anchoring", function() {

  var viewHeight = 43;
  generateView('layout_manager_test', 'bottom', 'height', viewHeight);
  validateLayout($('.layout_manager_test'), { bottom: 0, left: 0, right: 0, height: viewHeight });
});

test("left anchoring", function() {

  var viewHeight = 43;
  generateView('layout_manager_test', 'left', 'width', viewHeight);
  validateLayout($('.layout_manager_test'), { bottom: 0, left: 0, top: 0, width: viewHeight });
});

test("right anchoring", function() {

  var viewHeight = 43;
  generateView('layout_manager_test', 'right', 'width', viewHeight);
  validateLayout($('.layout_manager_test'), { bottom: 0, top: 0, right: 0, width: viewHeight });
});

test("top with no constraint", function() {
  generateView('layout_manager_test', 'top');
  validateLayout($('.layout_manager_test'), { bottom: 0, top: 0, right: 0, left: 0 });
});

test("right with no constraint", function() {
  generateView('layout_manager_test', 'right');
  validateLayout($('.layout_manager_test'), { bottom: 0, top: 0, right: 0, left: 0 });
});

test("left with no constraint", function() {
  generateView('layout_manager_test', 'left');
  validateLayout($('.layout_manager_test'), { bottom: 0, top: 0, right: 0, left: 0 });
});

test("bottom with no constraint", function() {
  generateView('layout_manager_test', 'bottom');
  validateLayout($('.layout_manager_test'), { bottom: 0, top: 0, right: 0, left: 0 });
});

test("Testing a full layout", function() {

  var viewHeight = 43;
  var sideBarWidth = 250;

  generateView('layout_manager_test', 'top', 'height', viewHeight);
  generateView('layout_manager_test2', 'bottom', 'height', viewHeight);
  generateView('layout_manager_test3', 'left', 'width', sideBarWidth);
  generateView('layout_manager_test4', 'right', 'width', sideBarWidth);
  generateView('layout_manager_test5', 'fill');

  validateLayout($('.layout_manager_test').css('background','red'), { top: 0, left: 0, right: 0, height: viewHeight });
  validateLayout($('.layout_manager_test2').css('background','blue'), { bottom: 0, left: 0, right: 0, height: viewHeight });
  validateLayout($('.layout_manager_test3').css('background','green'), { top: viewHeight, left: 0, bottom: viewHeight, width: sideBarWidth });
  validateLayout($('.layout_manager_test4').css('background','yellow'), { top: viewHeight, right: 0, bottom: viewHeight, width: sideBarWidth });
  validateLayout($('.layout_manager_test5').css('background','gray'), { top: viewHeight, right: sideBarWidth, bottom: viewHeight, left: sideBarWidth });
});

test('Nesting a view inside another one', function() {
  var sideBarWidth = 250;
  var viewHeight = 43;

  var parentView = generateView('layout_manager_test', 'left', 'width', sideBarWidth);

  var nestedView = parentView.createChildView(SC.View.extend(UI.LayoutSupport), {
    anchor: 'top',
    height: viewHeight,
    classNames: ['nested_test_nested_view']
  });

  var buffer = nestedView.renderToBuffer().string();

  var fragment = SC.$(buffer);
  parentView.$().append(fragment);

  var childViews = get(parentView, 'childViews');
  childViews.push(nestedView);

  validateLayout($('.layout_manager_test'), { top: 0, left: 0, bottom: 0, width: sideBarWidth });
  validateLayout($('.nested_test_nested_view'), { top: 0, left: 0, right: 0, height: viewHeight });

  $('.layout_manager_test').css('background-color','blue');
  $('.nested_test_nested_view').css('background-color','red');

  equals($('.layout_manager_test .nested_test_nested_view').length,1,"The parent view should have one child");
});
