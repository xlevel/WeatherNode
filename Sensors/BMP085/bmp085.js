const bmp180 = require('bmp180-sensor');

async function read(config) {
  const sensor = await bmp180(config.settings.address || 0x77, config.settings.mode || 1);

  const reading = await sensor.read();

  sensor.close();

  console.log(reading);
  return {
    id: config.id,
    readings: [
      // { type: 't', value: reading.temperature.toFixed(2) },
      // { type: 'h', value: reading.humidity.toFixed(2) },
    ],
  };
}

module.exports = {
  read,
};