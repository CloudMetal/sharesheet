
/**
 * Module dependencies.
 */

var domify = require('domify');
var html = require('./template');
var MenuItemView = require('menu-item-view');

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
    var item = new MenuItemView(model);
    self.el.appendChild(item.el);
  });

};
