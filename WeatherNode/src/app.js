const sensors = require('./sensors/sensors.js');
const dataAccess = require('./data/data.js');
const config = require('./config.json');

setInterval(async () => {
  const readings = await sensors.read(config);
  console.dir(readings);
  await dataAccess.save(config, readings);
}, config.interval);
