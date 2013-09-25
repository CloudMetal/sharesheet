
/**
 * Module dependencies.
 */

var request = require('superagent');
var MenuView = require('menu-view');
var Spreadsheet = require('spreadsheet');
var page = require('page');

// get dom content
var content = document.querySelector('#content');

var store = {
  spreadsheets: []
};

var spreadsheetMenu;

// routes

page('/', index);
page();

// route endpoints

function index() {
  request
  .get('/api/v1/spreadsheet/all')
  .end(function (err, res) {
    if (err) console.log(err);
    parseSpreadsheets(res.body["spreadsheets"]);
    createMenu();
  });
}

// helper methods

function parseSpreadsheets(spreadsheets) {
  // clear existing spreadsheets
  store.spreadsheets = [];

  spreadsheets.forEach(function (data) {
    var model = new Spreadsheet(data)
    store.spreadsheets.push(model);
  });
};

function createMenu() {
  spreadsheetMenu = new MenuView(store.spreadsheets);
  content.appendChild(spreadsheetMenu.el);
  spreadsheetMenu.render();
}
