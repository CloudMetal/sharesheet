
var levelup = require('level');

// level db
var db = levelup(__dirname + '/db', { "valueEncoding": "json" });

// /**
//  * Faux db.
//  */

// var spreadsheets = [];


// var test = {
//   id: 0,
//   name: "test",
//   data: [
//     ["", "Maserati", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
//     ["2009", 0, 2941, 4303, 354, 5814],
//     ["2010", 5, 2905, 2867, 412, 5284],
//     ["2011", 4, 2517, 4822, 552, 6127],
//     ["2012", 2, 2422, 5399, 776, 4151]
//   ]
// };

// spreadsheets.push(test);

/**
 * GET all spreadsheets.
 */

exports.all = function(req, res){
  find(function (err, value) {
    if (err) console.log(err);
    res.json(200, { "spreadsheets": value });
  });
};

/**
 * GET spreadsheet :id.
 */

exports.show = function(req, res){
  var id = req.params.id;
  
  db.get('spreadsheet!'+id, function (err, value) {

    if (err) {
      if (err.notFound) {
        return res.send(404, 'spreadsheet does not exist');
      }
      console.log(err);
      return res.send(400, err);
    }

    res.json(200, { "spreadsheet": value });

  });
};

/**
 * POST a new spreadsheet.
 */

exports.create = function(req, res){
  var spreadsheet = req.body;
  var id = spreadsheets.push(spreadsheet) - 1;
  spreadsheet.id = id;
  res.send({ id: id });
};

/**
 * DELETE spreadsheet :id.
 */

exports.remove = function(req, res){
  var id = req.params.id;
  var i = indexOf(id);
  spreadsheets.splice(i, 1);
  res.send(200);
};

/**
 * PUT changes to spreadsheet :id.
 */

exports.update = function(req, res){
  var id = req.params.id;
  var i = indexOf(id);
  var body = req.body;
  var spreadsheet = spreadsheets[i];
  if (!spreadsheet) return res.send(404, 'spreadsheet does not exist');
  spreadsheet.name = body.name;
  res.send(200);
};


/**
 * Index of `id` in db.
 */

function indexOf(id) {
  for (var i = 0, len = spreadsheets.length; i < len; ++i) {
    if (id == spreadsheets[i].id) {
      return i;
    }
  }
}

/**
 * Find all spreadsheets in db.
 */

function find(callback) {
  var data = [];
  db.createReadStream({ start: 'spreadsheet!', end: 'spreadsheet!\xff' })
    .on('data', function (value) {
      data.push(value.value)
    })
    .on('close', function () {
      callback(null, data);
    });
};
