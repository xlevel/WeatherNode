const sensorLib = require('node-dht-sensor');

class DHT22Sensor {
  constructor(config) {
    this.config = config;
    const type = config.settings.type ? config.settings.type : 22;
    sensorLib.initialize(type, config.settings.pin);
  }

  read(callback) {
    const reading = sensorLib.read();
    const data = {
      id: this.config.id,
      readings: [
        { type: 't', value: reading.temperature.toFixed(2) },
        { type: 'h', value: reading.humidity.toFixed(2) },
      ],
    };

    callback(data);
  }
}

module.exports = DHT22Sensor;
