const sensors = require('./sensors/sensors.js');
const DataAccess = require('./data/data.js');
const config = require('./config.json');

const dataAccessClient = new DataAccess(config);

setInterval(() => {
  sensors.read(config, (result) => {
    dataAccessClient.save(result);
  });
}, config.interval);

