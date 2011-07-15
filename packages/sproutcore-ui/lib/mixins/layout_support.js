// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require("sproutcore-ui/system/namespace");
require("sproutcore-metal");

var set = SC.set;
var get = SC.get;

/** 
  @class

  Overview
  =======

  UI.LayoutSupport provides anchoring support for the childviews of any 
  SC.View it is mixed to.

  Anchoring allows a view to get anchored to a side of its parent view. It's
  primarily used when building out the structure of an application. An example
  usage is a toolbar across the top of the page, with a sidebar for the 
  content space under it. In this scenario, the toolbar would be anchored to
  the top of the container view, and the sidebar would be anchored to the
  left of the view under it. 

  You will not generally interact with UI.LayoutSupport directly. Rather, 
  you simply specify the anchorTo property, and the size property, and it'll
  take care of the rest.

  Usage
  =======

  A typical usage scenario is for building a top toolbar and a bottom toolbar
  with a third view filling out the remaining space for content. In that case,
  your handlebars template will look like this:

    {{#view MyApp.containerView}}
      {{#view MyApp.topToolbarView anchorTo="top" size="50"}}

      {{/view}}
      {{#view MyApp.contentAreaView anchorTo="remainingSpace"}}

      {{/view}}
      {{#view MyApp.bottomToolbarView anchorTo="bottom" size="50"}}

      {{/view}}
    {{/view}}

  And your application's javascript file will be look like so: 

    MyApp.containerView = SC.View.create(UI.LayoutSupport,{...});
    MyApp.topToolbarView = SC.View.create(UI.LayoutSupport,{...});
    MyApp.contentAreaView = SC.View.create(UI.LayoutSupport,{...});
    MyApp.bottomToolbarView = SC.View.create(UI.LayoutSupport,{...});

  Notes: 
  --------

  - Each view which mixes-in UI.LayoutSupport becomes the layout manager
    for its children. That means, you can create complex layouts by combining
    the view hierarchy with UI.LayoutSupport.

  - Each UI.LayoutSupported-view supports anchors in a single direction (either
    horizontal or vertical). In other words, you can't have one view with both 
    top and left anchors, but you can create a view with top and bottom anchors.
  
  @extends SC.Object
*/
UI.LayoutSupport = SC.Mixin.create(
/** @scope UI.LayoutManager.prototype */{

  hasLayoutSupport: true,

  anchorTo: null,
  size: null,

  _layout: null,

  layoutManager: null,

  init: function() {

    set(this,'layoutManager', UI.LayoutManager.create({}));

    return this._super();
  },

  _getLayoutManager: function() {
    if (this._managerCache) return this._managerCache;
    var manager = null,
        view = get(this, 'parentView');

    while (view) {
      manager = get(view, 'layoutManager');
      if (manager) { break; }

      view = get(view, 'parentView');
    }

    manager = this._managerCache = manager || UI.rootLayoutManager;
    return manager;
  },

  applyLayout: function(buffer,layout) {
    buffer.style('position','absolute');

    for (var prop in layout) {
      buffer.style(prop,layout[prop]); 
    }
  },

  render: function(buffer) {
    var layoutManager = this._getLayoutManager();

    var layout = this._layout = layoutManager.layoutForManagedView(this, get(this,'anchorTo'), {
      size: get(this,'size')
    });

    this.applyLayout(buffer,layout);

    return this._super(buffer);
  },

  destroy: function() {

    var manager = this._getLayoutManager();
    manager.destroy();

    this._managerCache = undefined;

    return this._super();
  }

});
