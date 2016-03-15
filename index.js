/* jshint node: true */
'use strict';

var ComponentFilter = require('./component-filter');

module.exports = {
  name: 'ember-cli-component-filter',

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('template', {
      name: 'ember-cli-component-filter',
      ext: 'hbs',
      toTree: function(tree) {
        return ComponentFilter(tree);
      }
    });

    if (type === 'parent') {
      this.parentRegistry = registry;
    }
  }
};
