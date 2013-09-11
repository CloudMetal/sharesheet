
/**
 * Module dependencies.
 */

var model = require('model');

/**
 * Spreadsheet model.
 */

module.exports = model('Spreadsheet')
  .attr('name')
  .attr('created_at')
  .attr('updated_at');

