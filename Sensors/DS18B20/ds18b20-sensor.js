'use strict'; // eslint-disable-line

const sensorLib = require('ds18b20');

class DS18B20Sensor {
  constructor(config) {
    this.config = config;
  }

  read(callback) {
    const reading = sensorLib.temperatureSync(this.config.settings.id);

    const data = {
      id: this.config.id,
      readings: [
        { type: 't', value: reading.toFixed(2) },
      ],
    };

    callback(data);
  }
}

module.exports = DS18B20Sensor;
