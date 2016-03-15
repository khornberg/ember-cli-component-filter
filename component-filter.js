'use strict';
/* jshint node: true */

var Filter = require('broccoli-filter');
var compile = require('htmlbars').compile;
var plugin = require('./ast-plugin');

function ComponentFilter(inputNode, options) {
  if (!(this instanceof ComponentFilter)) {
    return new ComponentFilter(inputNode, options);
  }

  options = options || {};
  Filter.call(this, inputNode, options);
  this._components = [];
  this.components = this.filterComponents();
}

ComponentFilter.prototype = Object.create(Filter.prototype);
ComponentFilter.prototype.constructor = ComponentFilter;
ComponentFilter.prototype.extenstions = ['hbs'];
ComponentFilter.prototype.targetExtension = 'hbs';

ComponentFilter.prototype.astPlugin = function() {
  if (this._astPlugin) {
    return this._astPlugin;
  }

  var plugins = [];
  return this._astPlugin = plugins.push(plugin(this));
};

ComponentFilter.prototype.logComponent = function(componentName) {
  this._components.push(componentName);
};

ComponentFilter.prototype.filterComponents = function() {
  return this._components.filter(function(component) {
    // var nonComponents = {outlet: null, 'yield': null, 'each-in': null, 'if': null, 'else': null, 'else-if': null};
    // return component in nonComponents;
    return true;
  });
};

ComponentFilter.prototype.processString = function(contents, relativePath) {
  compile(contents, {
    moduleName: relativePath,
    plugins: {
      ast: [plugin(this)]
    }
  });
  console.log(this._components);
  return contents;
};

module.exports = ComponentFilter;
