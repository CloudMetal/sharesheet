
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

// Generating html for the thead from the model data
SpreadsheetView.prototype.thead = function () {
  var data = this.model.data()[0];
  var returnString = "";

  for (var i = 0; i < data.length; i++) {
    returnString += "<th>" + data[i] + "</th>";
  }

  return returnString;
};

// Generating html for the tbody from the model data
SpreadsheetView.prototype.tbody = function () {
  var data = this.model.data();
  var returnString = "";
  var i;
  var a;

  for (i = 1; i < data.length; i++) {
    returnString += "<tr>";
    for (a = 0; a < data[i].length; a++) {
      returnString += "<td>" + data[i][a] + "</td>";
    }
    returnString += "</tr>";
  }

  return returnString;
};
