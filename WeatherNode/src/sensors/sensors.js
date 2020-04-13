function validateConfig(config) {
  if (!config) {
    throw new Error('Error: Missing initialization configuration');
  }

  if (!config.sensors) {
    throw new Error('Error: Missing sensor configuration');
  }
}

async function read(config) {
  validateConfig(config);

  return Promise.all(
    config.sensors.map(async (sensorConfig) => {
      // eslint-disable-next-line
      const sensor = require(sensorConfig.type);
      return sensor.read(sensorConfig);
    }),
  );
}

module.exports = {
  read,
};
