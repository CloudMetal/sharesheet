
/**
 * Module dependencies.
 */

var domify = require('domify');
var html = require('./template');
var reactive = require('reactive');
var request = require('superagent');
var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

module.exports = SpreadsheetView;

function SpreadsheetView(model) {
  this.model = model;
  this.el = domify(html);
  reactive(this.el, this.model, this);
};

// Save the spreadsheet
SpreadsheetView.prototype.save = function (event) {
  request.put('/api/v1/spreadsheet/' + this.model.id())
    .set('Content-Type', 'application/json')
    .send(this.model.toJSON())
    .end(function (err, res) {
      if (err) {
        console.log('error updating spreadsheet', err);
      }
      console.log(res, 'res');
    });
};

SpreadsheetView.prototype.contentChange = function (e) {
  console.log('content change');
  var cell = e.target.dataset.cell.split(':');
  var row = cell[0];
  var column = cell[1];
  var value = e.target.innerText;
  console.log(cell);
  console.log(value);
  this.model.data()[row][column] = value;
};

// Generating html for the tbody from the model data
SpreadsheetView.prototype.table = function () {
  var data = this.model.data();
  var returnString = "";
  var i;
  var a;

  var columns = data[0].length;
  returnString += "<tr>";
  returnString += "<td></td>"; // spacer
  for (i = 0; i < columns; i++) {
    returnString += "<td>" + alphabet[i] + "</td>";
  }
  returnString += "</tr>";

  for (i = 0; i < data.length; i++) {
    returnString += "<tr>";
    for (a = 0; a < data[i].length; a++) {
      // add row headers
      if (a == 0) returnString += "<td>" + (i + 1) + "</td>";
      returnString += "<td contenteditable=\"true\" data-cell=\"" + i + ':' + a + "\">" + data[i][a] + "</td>";
    }
    returnString += "</tr>";
  }

  return returnString;
};
