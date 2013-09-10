
var path = require('path');
var exec = require('child_process').exec;

var level = require('level');
var seedData = require('./seed-data.json');

var location = path.join(__dirname, '../server/db');

// remove existing db
exec('rm -rf ' + location, function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
  } else {
    createDB();
  }
});

function createDB() {   

  // create db
  var db = level(dbPath, { "valueEncoding": "json" });

  // key count
  var count = 0;

  seedData["spreadsheets"].forEach(function (data) {

    var key = 'spreadsheet!'+(count++);

    db.put(key, data, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
    });
  });

}
