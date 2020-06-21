const bmp180 = require('bmp180-sensor');

async function read(config) {
  const sensor = await bmp180({ address: 0x77, mode: 1 });

  const reading = await sensor.read();

  sensor.close();

  return {
    id: config.id,
    readings: [
      { type: 't', value: reading.temperature.toFixed(2) },
      { type: 'p', value: reading.pressure.toFixed(2) },
    ],
  };
}

module.exports = {
  read,
};