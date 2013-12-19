
/**
 * Module dependencies.
 */

var domify = require('domify');
var html = require('./template');
var reactive = require('reactive');
var request = require('superagent');

module.exports = SpreadsheetView;

function SpreadsheetView(model) {
  this.model = model;
  this.el = domify(html);
  reactive(this.el, this.model, this);
};

// Save the spreadsheet
SpreadsheetView.prototype.saveSpreadsheet = function (event) {
  var tableHtml = document.querySelector('table');
  var putBody = {
    id: this.model.id(),
    name: document.querySelector("#spreadsheet-name").innerHTML
  };
  var tableData = [[]];
  var i,
      a;

  var theadHtml = tableHtml.querySelectorAll('thead>tr th');
  var tbodyRowsHtml = tableHtml.querySelectorAll('tbody>tr');
  var tbodyTdHtml;
  var rowArray;

  // each row gets its own array in data
  for (i = 0; i < theadHtml.length; i++) {
    tableData[0][i] = theadHtml[i].innerHTML;
  }

  // iterate over the rows
  for (i = 0; i < tbodyRowsHtml.length; i++) {
    // create a new array for each row.
    rowArray = [];

    tbodyTdHtml = tbodyRowsHtml[i].querySelectorAll('td');
    // iterate over the row and add data to data object
    for (a = 0; a < tbodyTdHtml.length; a++) {
      rowArray.push(tbodyTdHtml[a].innerHTML);
    }
    tableData.push(rowArray)
  }

  putBody.data = tableData;

  request.put('/api/v1/spreadsheet/' + this.model.id())
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(putBody))
    .end(function (err, res) {
      if (err) {
        console.log('error updating spreadsheet', err);
      }
      console.log(res, 'res');
    });

};

// Generating html for the thead from the model data
SpreadsheetView.prototype.thead = function () {
  var data = this.model.data()[0];
  var returnString = "";

  for (var i = 0; i < data.length; i++) {
    returnString += "<th contenteditable=\"true\">" + data[i] + "</th>";
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
      returnString += "<td contenteditable=\"true\">" + data[i][a] + "</td>";
    }
    returnString += "</tr>";
  }

  return returnString;
};
