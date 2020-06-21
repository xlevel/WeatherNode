const sensor = require("node-dht-sensor").promises;

async function read(config) {
  const reading = await sensor.read(config.settings.type, config.settings.pin);
  
  return {
    id: config.id,
    readings: [
      { type: 't', value: reading.temperature.toFixed(2) },
      { type: 'h', value: reading.humidity.toFixed(2) },
    ],
  };
}

module.exports = {
  read,
};
