var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');

var level = require('levelup');
var seedData = require('./seed-data.json');
var config = require('../config/sharesheet.json')["leveldb"];

// remove existing db
exec('rm -rf ' + config['location'], function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
  } else {
    createDB();
  }
});

function createDB() {

  // create dir
  fs.mkdirSync(config['location']);

  // create db
  var db = level(config['location'], { "valueEncoding": config['encoding'] });

  // key count
  var count = 0;

  seedData["spreadsheets"].forEach(function (data) {

    var id = count++;

    var key = 'spreadsheet!'+id;

    data.id = id;

    db.put(key, data, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
    });
  });

}
