
/**
 * Module dependencies.
 */

var domify = require('domify');
var reactive = require('reactive');
var html = require('./template');

/**
 * Export Menu
 */

module.exports = MenuItem;

function MenuItem(model) {

  var template = domify(html);
  this.el = reactive(template, model, this).el;

};
