// ==========================================================================
// Project:  SproutCore Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var set = SC.set;

/**
  Handlebars helper for all structural views in SproutCore UI.

  The helper expects the path to be either a path to an instance of a 
  view controller, or the view controller class. For example, a navigation
  view controller could be implemented either as:

    {{ui NavigationViewController contentBinding="MyApp.storiesController.topStories"}}

  Where MyNewsApp.topStories is an instance of UI.NavigationViewController.
  This will create an anonymous view controller and bind its content property
  to the specified content array.

  Alternatively, the same view controller could be implemented as:

    {{ui MyNewsApp.navigationViewController}} 

  Note that the type of view is inferred automatically. 

  The convention is to use the former style when the name of the class makes 
  it hard to guess what type of view it is, where as the latter style is 
  preffered when it eliminates duplication in the naming.
 */
Handlebars.registerHelper('ui',function(path, options){

  console.log('HELPER: path = ',path);
  
  // Normalize path
  var viewClass = (path.indexOf('.') >= 0)? SC.getPath(path) : UI[path],
      itemHash = {},
      fn = options.fn;

  if (fn) {
    itemHash.handlebarsBlock = fn;
    delete options.fn;
  }

  viewClass = SC.Handlebars.ViewHelper.viewClassFromHTMLOptions(viewClass, itemHash);
  return Handlebars.helpers.view.call(this, viewClass, options);
});
