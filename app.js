
/**
 * Module dependencies.
 */

var express = require('express');
var build = require('./server/build');
var spreadsheets = require('./server/spreadsheets');
var app = express();

// configure

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/build'));

// spreadsheets

app.get('/spreadsheet/all', spreadsheets.all);
app.get('/spreadsheet/:id', spreadsheets.show);
app.post('/spreadsheet', spreadsheets.create);
app.put('/spreadsheet/:id', spreadsheets.update);
app.del('/spreadsheet/:id', spreadsheets.remove);

// catch-all

app.all('*', build, function(req, res) {
  res.sendfile('index.html');
});

// bind

app.listen(3000);
console.log('listening on 3000');
