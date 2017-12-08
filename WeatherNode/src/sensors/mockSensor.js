class MockSensor {
  constructor(config) {
    this.config = config;
  }

  read(callback) {
    const data = {
      id: this.config.id,
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
        { type: 'p', value: 945 },
      ],
    };

    callback(data);
  }
}

module.exports = MockSensor;
