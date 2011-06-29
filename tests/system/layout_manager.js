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

test("Testing a full layout", function() {

  var viewHeight = 43;
  var sideBarWidth = 250;

  generateView('layout_manager_test2', 'top', 'height', viewHeight);
  generateView('layout_manager_test3', 'bottom', 'height', viewHeight);
  generateView('layout_manager_test4', 'left', 'width', sideBarWidth);
  generateView('layout_manager_test5', 'right', 'width', sideBarWidth);
  generateView('layout_manager_test6', 'left');

  validateLayout($('.layout_manager_test2'), { top: 0, left: 0, right: 0, height: viewHeight });
  validateLayout($('.layout_manager_test3'), { bottom: 0, left: 0, right: 0, height: viewHeight });
  validateLayout($('.layout_manager_test4'), { top: viewHeight, left: 0, bottom: viewHeight, width: sideBarWidth });
  validateLayout($('.layout_manager_test5'), { top: viewHeight, right: 0, bottom: viewHeight, width: sideBarWidth });
  validateLayout($('.layout_manager_test6'), { top: viewHeight, right: sideBarWidth, bottom: viewHeight, left: sideBarWidth });

  // Un comment these lines to see the layout (also uncomment the call to super in 
  // UI.LayoutSupport#destroy
  
  //$('.layout_manager_test2').css('background-color','red');
  //$('.layout_manager_test3').css('background-color','blue');
  //$('.layout_manager_test4').css('background-color','green');
  //$('.layout_manager_test5').css('background-color','yellow');
  //$('.layout_manager_test6').css('background-color','magenta');
});
