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

function generateView(className,anchor,size) {
  var view;

  SC.run(function(){
    view = SC.View.create(UI.LayoutSupport, {
      classNames: [className],
    });

    if (anchor !== undefined && dimensionValue !== undefined) {
      set(view, 'anchor', anchor);
      set(view, 'size', size);
    }

    views.push(view);
    view.append();
  });

  return view;
}

function generateNestedView(parentView,classsName,anchor,size) {
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
  },

  teardown: function() {
    var l = views.length;

    for(var i=0; i<l; i++) {
     //views[i].destroy(); 
    }

    views = [];

    console.groupEnd();
  }  
});

test("top anchoring with content view", function() {
  var parentView = generateView('layout_manager_test');
  var topAnchor = generateNestedView(parentView,'top_anchor','top',viewHeight);
  var contentView = generateNestedView(parentView,'content_view','contentView',viewHeight);
});
