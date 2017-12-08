/* eslint-disable import/no-dynamic-require, global-require  */

function save(config, reading) {
  const DataAccess = require(config.data.type);
  const dataAccess = new DataAccess(config);
  dataAccess.save(reading);
}

module.exports = {
  save,
};
