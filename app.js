
/**
 * Module dependencies.
 */

var express = require('express');
var build = require('./server/build');
var spreadsheets = require('./server/spreadsheets');
var app = express();
var port = process.env.PORT || 3000;

// configure

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/build'));

// spreadsheets

app.get('/api/v1/spreadsheet/all', spreadsheets.all);
app.get('/api/v1/spreadsheet/:id', spreadsheets.show);
// app.post('/api/v1/spreadsheet', spreadsheets.create);
// app.put('/spreadsheet/:id', spreadsheets.update);
// app.del('/spreadsheet/:id', spreadsheets.remove);

// catch-all

app.all('*', build, function(req, res) {
  res.sendfile('index.html');
});

// bind

app.listen(port);
console.log('listening on %d', port);
