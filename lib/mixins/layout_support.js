// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;
var get = SC.get;

/** 
  @class
  
  @extends SC.Object
*/
UI.LayoutSupport = SC.Mixin.create(
/** @scope UI.LayoutManager.prototype */{

  hasLayoutSupport: true,

  anchor: null,
  width: null,
  height: null,

  _layout: null,

  layoutManager: UI.LayoutManager.create({
    element: get(this, 'element')                                      
  }),

  render: function(buffer) {
    var layoutManager = this._getLayoutManager();
    var layout = this._layout = layoutManager.layoutFor({
      anchor: get(this,'anchor'),
      width: get(this,'width'),
      height: get(this,'height')
    });

    this._applyLayout(buffer,layout);

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

    return this._managerCache = manager || UI.rootLayoutManager;
  },

  _applyLayout: function(buffer,layout) {
    buffer.style('position','absolute');

    for (var prop in layout) {
      buffer.style(prop,layout[prop]); 
    }
  },

  destroy: function() {
    var manager = this._getLayoutManager();
    manager.cleanUpLayout(this._layout);
    return this._super();
  }

});
