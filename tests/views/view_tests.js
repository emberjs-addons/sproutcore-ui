// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var templates = null;

var get = SC.get;
var set = SC.set;

module("View Basics");

test("SC.View has a themeName property (null value means it was defined)", function() {
  equals(SC.View.create().themeName,null);
});

module("Theme Template support", {
  setup: function() {
    __templates_cache = SC.TEMPLATES;

    SC.TEMPLATES = {
      "c": "cTemplate"
    };

    templates = UI._Templates.create({
      themeTemplates: {
        "a": "aTemplate"
      }
    });
  },

  teardown: function() {
    templates.destroy();
    SC.TEMPLATES = __templates_cache;
    __templates_cache = null;
  }  
});

test("UI._Templates must exist", function() {
  ok(UI._Templates);
});

test("templates obj should retrieve theme template", function() {
  equals(get(templates, 'a'),'aTemplate',"templates obj should retrieve theme template");
  equals(get(templates, 'c'),'cTemplate',"templates obj should fall back to SC.TEMPLATES when theme template doesn't match");
});

test("templates obj should return null if no match was found", function() {
  equals(get(templates, 'd'),null);
});

module("Theme Template no theme", {
  setup: function() {
    __templates_cache = SC.TEMPLATES;

    SC.TEMPLATES = {
      "c": "cTemplate"
    };

    templates = UI._Templates.create();
  },

  teardown: function() {
    templates.destroy();
    SC.TEMPLATES = __templates_cache;
    __templates_cache = null;
  }  
});

test("templates obj should fall back to SC.TEMPLATES when theme template doesn't match", function() {
  equals(get(templates, 'c'),'cTemplate');
});
