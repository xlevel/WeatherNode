const sensors = require('./sensors/sensors.js');
const dataAccess = require('./data/data.js');
const config = require('./config.json');

setInterval(() => {
  sensors.read(config, (result) => {
    dataAccess.save(config, result);
  });
}, config.interval);

