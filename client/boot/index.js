
/**
 * Module dependencies.
 */

var request = require('superagent');
var MenuView = require('menu-view');
var Spreadsheet = require('spreadsheet');
var SpreadsheetView = require('spreadsheet-view');
var page = require('page');

// get dom content
var els = {
  navContainer: document.querySelector('#content nav'),
  contentContainer: document.querySelector('#content article')
}

var store = {
  spreadsheets: []
};

var spreadsheetMenu;

// routes

page('/', loadMenu, index);
page('/spreadsheet/*', loadMenu);
page('/spreadsheet', index);
page('/spreadsheet/:id', show);
page();

// route endpoints

function index() {

};

function show(ctx) {
  find(ctx.params.id, function (err, data) {
    console.log(data);
    var model = new Spreadsheet(data["spreadsheet"]);
    var view = new SpreadsheetView(model);
    els.contentContainer.innerHTML = "";
    els.contentContainer.appendChild(view.el);
  });
};

// middleware

function loadMenu(ctx, next) {
  if (store.spreadsheets.length) {
    createMenu();
  } else {
    find('all', function (err, data) {
      parseSpreadsheets(data["spreadsheets"]);
      createMenu();
    });
  }
  next();
};

// helper methods

function createMenu() {
  if (spreadsheetMenu) { return; }
  spreadsheetMenu = new MenuView(store.spreadsheets);
  els.navContainer.appendChild(spreadsheetMenu.el);
  spreadsheetMenu.render();
};

function parseSpreadsheets(spreadsheets) {
  // clear existing spreadsheets
  store.spreadsheets = [];

  spreadsheets.forEach(function (data) {
    var model = new Spreadsheet(data)
    store.spreadsheets.push(model);
  });
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

