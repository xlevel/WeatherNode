/* eslint-disable import/no-dynamic-require, global-require  */

class DataAccess {
  constructor(config) {
    this.config = config;
    const DataAccessClient = require(config.data.type);
    this.dataAccessClient = new DataAccessClient(config);
  }

  save(reading) {
    this.dataAccessClient.save(reading);
  }
}

module.exports = DataAccess;
