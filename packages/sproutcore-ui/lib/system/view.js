// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

require("sproutcore-ui/system/namespace");
require("sproutcore-runtime");
require("sproutcore-views/views/view");

var get = SC.get;
var set = SC.set;

UI.THEMES = {};

UI._Templates = SC.Object.extend({

  themeTemplates: null,

  unknownProperty: function(key) {
    var themeTemplates = get(this,'themeTemplates');
    var templates = themeTemplates? themeTemplates[key] : null;

    return templates || SC.TEMPLATES[key];
  }
});

/** 
  @class
  
  @extends
*/
SC.View.reopen(
/** @scope SC.View.prototype */{
  
  /**
  
    @type String
  */
  themeName: null,

  /**
    Returns a hash to find the templateName in

    First, try to see if the theme overrides the template. If it does, use that
    one. Otherwise, return SC.TEMPLATES
  */
  templates: function(key, value) {
    var theme = get(this, 'themeName');

    return UI._Templates.create({themeTemplates: UI.THEMES[theme]});
  }.property('themeName')
});
