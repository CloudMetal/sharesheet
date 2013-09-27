
/**
 * Module dependencies.
 */

var request = require('superagent');
var MenuView = require('menu-view');
var Spreadsheet = require('spreadsheet');
var SpreadsheetView = require('spreadsheet-view');
var page = require('page');

// get dom content
var content = document.querySelector('#content');

var store = {
  spreadsheets: []
};

var spreadsheetMenu;

// routes

page('/', index);
page('/spreadsheet', index);
page('/spreadsheet/:id', show);
page();

// route endpoints

function index() {
  find('all', function (err, data) {
    parseSpreadsheets(data["spreadsheets"]);
    createMenu();
  });
};

function show(ctx) {
  find(ctx.params.id, function (err, data) {
    console.log(data);
    var model = new Spreadsheet(data.spreadsheet);
    var view = new SpreadsheetView(model);
    content.appendChild(view.el);
  });
};

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
};

function find(id, callback) {
  var id = id || 'all';
  request
    .get('/api/v1/spreadsheet/' + id)
    .end(function (err, res) {
      if (err) console.log(err);
      callback(err, res.body);
    });
};

