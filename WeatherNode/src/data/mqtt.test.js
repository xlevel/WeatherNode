const mqtt = require('mqtt');
const mqttClient = require('./mqtt');

jest.mock('mqtt');

describe('Mqtt save', () => {

  it('should connect to specified host', async () => {
    const config = { host: 'mqtt://mqtt.test.com', clientId: 'clientId' };
    const mockClient = {
      end: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, []);

    expect(mqtt.connect).toHaveBeenCalledWith('mqtt://mqtt.test.com', expect.any(Object));
  });

  it('should have client id in the options if specified in the config', async () => {
    const config = { host: 'mqtt://mqtt.test.com', clientId: 'clientId' };
    const mockClient = {
      end: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, []);

    expect(mqtt.connect).toHaveBeenCalledWith(expect.any(String), { clientId: 'clientId' });
  });

  it('should have username in the options if specified in the config', async () => {
    const config = { host: 'mqtt://mqtt.test.com', clientId: 'clientId', username: 'user' };
    const mockClient = {
      end: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, []);

    expect(mqtt.connect).toHaveBeenCalledWith(expect.any(String), { clientId: 'clientId', username: 'user' });
  });

  it('should have password in the options if specified in the config', async () => {
    const config = { host: 'mqtt://mqtt.test.com', clientId: 'clientId', password: 'password' };
    const mockClient = {
      end: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, []);

    expect(mqtt.connect).toHaveBeenCalledWith(expect.any(String), { clientId: 'clientId', password: 'password' });
  });

  it('should throw error if host is not specified', async () => {
    const config = { clientId: 'clientId' };
    const mockClient = {};

    mqtt.connect.mockImplementation(() => mockClient);
    expect.assertions(1);

    try {
      await mqttClient.save(config, []);
    } catch(e) {
      expect(e.message).toEqual('Unspecified MQTT host');
    }
  });

  it('should throw error if client Id is not specified', async () => {
    const config = { host: 'mqtt://mqtt.test.com' };
    const mockClient = {};

    mqtt.connect.mockImplementation(() => mockClient);
    expect.assertions(1);

    try {
      await mqttClient.save(config, []);
    } catch(e) {
      expect(e.message).toEqual('Unspecified MQTT client id');
    }
  });

  // Throw error if no host

  // throw error if no client Id

  it('should specify a Quality of Service of 1', async () => {
    const config = {
      host: 'mqtt://mqtt.test.com',
      clientId: 'clientId',
      topics: [
        {
          topic: 'test/temp',
          sensor: 'sensor 1',
          type: 't',
        },
      ],
    };
    const mockClient = {
      end: jest.fn(),
      publish: jest.fn()
    };
    mqtt.connect.mockImplementation(() => mockClient);

    const reading = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    await mqttClient.save(config, reading);

    expect(mockClient.publish).toHaveBeenCalledWith(expect.any(String), expect.any(String), { qos: 1 }, expect.any(Function));
    });

  it('should close the client connection', async () => {
    const config = {
      host: 'mqtt://mqtt.test.com',
      clientId: 'clientId',
      topics: [
        {
          topic: 'test/temp',
          sensor: 'sensor 1',
          type: 't',
        },
      ],
    };
    const mockClient = {
      end: jest.fn(),
      publish: (topic, message, options, callback) => { 
        callback();
     }
    };
    mqtt.connect.mockImplementation(() => mockClient);

    const reading = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    await mqttClient.save(config, reading);

    expect(mockClient.end).toHaveBeenCalled();
    });

  it.each([
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }], 1],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
      ],
    }], 2],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
        { type: 'p', value: 945 },
      ],
    }], 3],
  ])('should call publish for each reading (%#)', async (reading, expected) => {
    const config = {
      host: 'mqtt://mqtt.test.com',
      clientId: 'clientId',
      topics: [
        {
          topic: 'test/temp',
          sensor: 'sensor 1',
          type: 't',
        },
        {
          topic: 'test/hum',
          sensor: 'sensor 1',
          type: 'h',
        },
        {
          topic: 'test/pres',
          sensor: 'sensor 1',
          type: 'p',
        },
      ],
    };

    const mockClient = {
      end: jest.fn(),
      publish: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, reading);

    expect(mockClient.publish.mock.calls.length).toBe(expected);
  });

  it.each([
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }],
      'test/temp',
      '19.2'],
    [[{
      id: 'sensor 2',
      readings: [
        { type: 'h', value: 45.5 },
      ],
    }],
      'test/hum',
      '45.5'],
    [[{
      id: 'sensor 3',
      readings: [
        { type: 'p', value: 945 },
      ],
    }],
      'test/pres',
      '945'],
  ])('should call publish with the correct topic and value (%#)', async (reading, expectedTopic, expectedValue) => {
    const config = {
      host: 'mqtt://mqtt.test.com',
      clientId: 'clientId',
      topics: [
        {
          topic: 'test/temp',
          sensor: 'sensor 1',
          type: 't',
        },
        {
          topic: 'test/hum',
          sensor: 'sensor 2',
          type: 'h',
        },
        {
          topic: 'test/pres',
          sensor: 'sensor 3',
          type: 'p',
        },
      ],
    };

    const mockClient = {
      end: jest.fn(),
      publish: jest.fn(),
    };
    mqtt.connect.mockImplementation(() => mockClient);

    await mqttClient.save(config, reading);

    expect(mockClient.publish).toHaveBeenCalledWith(expectedTopic, expectedValue, expect.any(Object), expect.any(Function));
  });
});
