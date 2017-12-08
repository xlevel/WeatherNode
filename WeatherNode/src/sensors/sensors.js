/* eslint-disable import/no-dynamic-require, global-require  */

function validateConfig(config) {
  if (!config) {
    throw new Error('Error: Missing initialization configuration');
  }

  if (!config.sensors) {
    throw new Error('Error: Missing sensor configuration');
  }
}

function read(config, callback) {
  validateConfig(config);

  config.sensors.forEach((sensorConfig) => {
    const SensorType = require(sensorConfig.type);
    const sensor = new SensorType(sensorConfig);

    sensor.read(callback);
  });
}

module.exports = {
  read,
};
