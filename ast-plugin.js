'use strict';
/* jshint node: true */

module.exports = function(addonContext) {
  function Plugin(options) {
    this.options = options;
    this.syntax = null; // set by HTMLBars
  }

  Plugin.prototype.transform = function(ast) {
    var pluginContext = this;
    var walker = new this.syntax.Walker();

    walker.visit(ast, function(node) {
      if (pluginContext.detect(node)) {
        pluginContext.process(node);
      }
    });

    return ast;
  };

  Plugin.prototype.detect = function(node) {
    return node.type === 'MustacheStatement' && node.escaped;
  };

  Plugin.prototype.process = function(node) {
    this.log(node.path.original);
  };

  Plugin.prototype.log = function(componentName) {
    addonContext.logComponent(componentName);
  };

  return Plugin;
};
