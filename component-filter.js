'use strict';
/* jshint node: true */

var Filter = require('broccoli-filter');
var compile = require('htmlbars').compile;

function ComponentFilter(inputNode, options) {
  if (!(this instanceof ComponentFilter)) {
    return new ComponentFilter(inputNode, options);
  }

  options = options || {};
  Filter.call(this, inputNode, options);
}

ComponentFilter.prototype = Object.create(Filter.prototype);
ComponentFilter.prototype.constructor = ComponentFilter;
ComponentFilter.prototype.extenstions = ['hbs'];
ComponentFilter.prototype.targetExtension = 'hbs';

ComponentFilter.prototype.processString = function(contents, relativePath) {
  var a = compile(contents);
  return contents;
};

module.exports = ComponentFilter;
