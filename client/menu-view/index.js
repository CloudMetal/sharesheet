
/**
 * Module dependencies.
 */

var domify = require('domify');
var html = require('./template');
var itemHtml = require('./item-template');
var reactive = require('reactive');

/**
 * Export Menu
 */

module.exports = Menu;

function Menu(collection) {
  this.collection = collection;
  this.el = domify(html);
};


Menu.prototype.render = function () {
  var self = this;

  this.collection.forEach(function (model) {
    var html = domify(itemHtml);
    var el = reactive(html, model, self).el;
    self.el.appendChild(el);
  });

};

Menu.prototype.onSelect = function (e) {
  console.log(e);
  e.preventDefault();
};
