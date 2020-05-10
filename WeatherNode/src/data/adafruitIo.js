/* eslint-disable no-console */

const https = require('https');

async function save(config, readings) {

  readings.forEach((sensorReadings) => {
    const { id } = sensorReadings;

    sensorReadings.readings.forEach(element => {
      const feed = config.feeds.find((f) => f.type === element.type && f.sensor === id);

      const data = JSON.stringify({ value: element.value});

      const options = {
        method: 'POST',
        headers: {
          'X-AIO-key': config.aioKey,
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }

      const request = https.request(`https://io.adafruit.com/api/v2/${config.user}/feeds/${feed.id}/data`, options);
      request.write(data);
      request.end();
    });
  });

}

module.exports = {
  save,
};
