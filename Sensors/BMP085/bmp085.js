'use strict'; // eslint-disable-line

const SensorLib = require('bmp085');

class BMP085Sensor {
  constructor(config) {
    this.config = config;
  }

  read(callback) {
    const sensor = new SensorLib();
    sensor.read((sensorData) => {
      const data = {
        id: this.config.id,
        readings: [
          { type: 't', value: sensorData.temperature.toFixed(2) },
          { type: 'p', value: sensorData.pressure.toFixed(2) },
        ],
      };
      callback(data);
    });
  }
}

module.exports = BMP085Sensor;

