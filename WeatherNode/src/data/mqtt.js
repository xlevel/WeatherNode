const mqtt = require('mqtt');

async function save(config, reading) {
  const client = mqtt.connect(config.host);
  const { id } = reading;

  if (reading.readings) {
    reading.readings.forEach(element => {
      const topic = config.topics.find((f) => f.sensor === id && f.type === element.type);
      client.publish(topic.topic, element.value.toString());
    });
  }

  client.end();
}

module.exports = {
  save,
};
