/* eslint-disable no-console */
const mqtt = require('mqtt');

class Mqtt {
  constructor(config) {
    this.config = config.data.config;
    this.client = mqtt.connect(this.config.host);
  }

  save(reading) {
    const { id } = reading;

    if (this.client.connected) {
      reading.readings.forEach((element) => {
        const topic = this.config.topics.find(f => f.sensor === id && f.type === element.type);

        console.log(`${topic.topic} - ${element.value}`);
        this.client.publish(topic.topic, element.value.toString(), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }, this);
    }
  }
}

module.exports = Mqtt;

