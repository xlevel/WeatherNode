const mqtt = require('mqtt');

async function save(config, readings) {
  if (!config.host) {
    throw new Error('Unspecified MQTT host');
  }

  if (!config.clientId) {
    throw new Error('Unspecified MQTT client id');
  }
  
  const options = { clientId: config.clientId };

  if (config.username) {
    options.username = config.username;
  }

  if (config.password) {
    options.password = config.password;
  }

  const client = mqtt.connect(config.host, options);
  
  if (readings) {
    readings.forEach((sensorReadings) => {
      const { id } = sensorReadings;

      sensorReadings.readings.forEach((element) => {
        const topic = config.topics.find((f) => f.sensor === id && f.type === element.type);
        client.publish(topic.topic, element.value.toString(), { qos: 1 }, () => { client.end(); });
      })
    });
  }
}

module.exports = {
  save,
};

//, username: 'mqttUser', password: 'mqttPassword'