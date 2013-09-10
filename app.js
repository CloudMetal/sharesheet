
/**
 * Module dependencies.
 */

var express = require('express');
// var build = require('./server/build');
var levelup = require('level');
var app = express();

// level db
var db = levelup(__dirname + '/server/db', { "valueEncoding": "json" });

// configure

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
// app.use(express.static(__dirname + '/build'));

// spreadsheets

// app.get('/spreadsheet/all', spreadsheets.all);
// app.get('/spreadsheet/:id', spreadsheets.show);
// app.post('/spreadsheet', spreadsheets.create);
// app.put('/spreadsheet/:id', spreadsheets.update);
// app.del('/spreadsheet/:id', spreadsheets.remove);

app.get('/spreadsheet/all', function (req, res) {
  getData('spreadsheet', function (data) {
    res.json(200, { "spreadsheets": data });
  });
});

// catch-all

// app.all('*', build, function(req, res) {
//   res.sendfile('index.html');
// });

// bind

app.listen(3000);
console.log('listening on 3000');


// helper methods

function getData(key, callback) {
  var data = [];
  db.createReadStream({ start: key + '!', end: key + '!\xff' })
    .on('data', function (value) {
      data.push(value.value)
    })
    .on('close', function () {
      console.log(data);
      callback(data);
    });
};
