
/**
 * Module dependencies.
 */

var domify = require('domify');
var html = require('./template');
var reactive = require('reactive');

module.exports = SpreadsheetView;

function SpreadsheetView(model) {
  this.model = model;
  this.el = domify(html);
  reactive(this.el, this.model, this);
};
