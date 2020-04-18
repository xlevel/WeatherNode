
const mqtt = require('mqtt');
const mqttClient = require('./mqtt');

jest.mock('mqtt');

describe('Mqtt save', () => {

    it('should connect to specified host', async () => {
        const config = { host: "mqtt://mqtt.test.com" };
        const mockClient = {
            end: jest.fn()
        };
        mqtt.connect.mockImplementation(() => mockClient);

        await mqttClient.save(config, {});

        expect(mqtt.connect).toHaveBeenCalledWith("mqtt://mqtt.test.com");
    });

    it('should close the client connection', async () => {
        const config = { host: "mqtt://mqtt.test.com" };
        const mockClient = {
            end: jest.fn()
        };
        mqtt.connect.mockImplementation(() => mockClient);

        await mqttClient.save(config, {});

        expect(mockClient.end).toHaveBeenCalled();
    });

    it.each([
        [{
            id: 'sensor 1',
            readings: [
                { type: 't', value: 19.2 },
            ],
        }, 1],
        [{
            id: 'sensor 1',
            readings: [
                { type: 't', value: 19.2 },
                { type: 'h', value: 45.5 },
            ],
        }, 2],
        [{
            id: 'sensor 1',
            readings: [
                { type: 't', value: 19.2 },
                { type: 'h', value: 45.5 },
                { type: 'p', value: 945 },
            ],
        }, 3],
    ])('should call publish for each reading (%#)', async (reading, expected) => {
        const config = {
            host: "mqtt://mqtt.test.com",
            topics: [
                {
                    topic: "test/temp",
                    sensor: "sensor 1",
                    type: "t"
                },
                {
                    topic: "test/hum",
                    sensor: "sensor 1",
                    type: "h"
                },
                {
                    topic: "test/pres",
                    sensor: "sensor 1",
                    type: "p"
                }
            ]
        };

        const mockClient = {
            end: jest.fn(),
            publish: jest.fn()
        };
        mqtt.connect.mockImplementation(() => mockClient);

        await mqttClient.save(config, reading);

        expect(mockClient.publish.mock.calls.length).toBe(expected);
    });

    it.each([
        [{
            id: 'sensor 1',
            readings: [
                { type: 't', value: 19.2 },
            ],
        },
            "test/temp",
            "19.2"],
        [{
            id: 'sensor 2',
            readings: [
                { type: 'h', value: 45.5 },
            ],
        },
            "test/hum",
            "45.5"],
        [{
            id: 'sensor 3',
            readings: [
                { type: 'p', value: 945 },
            ],
        },
            "test/pres",
            "945"],
    ])('should call publish with the correct topic and value (%#)', async (reading, expectedTopic, expectedValue) => {
        const config = {
            host: "mqtt://mqtt.test.com",
            topics: [
                {
                    topic: "test/temp",
                    sensor: "sensor 1",
                    type: "t"
                },
                {
                    topic: "test/hum",
                    sensor: "sensor 2",
                    type: "h"
                },
                {
                    topic: "test/pres",
                    sensor: "sensor 3",
                    type: "p"
                }
            ]
        };

        const mockClient = {
            end: jest.fn(),
            publish: jest.fn()
        };
        mqtt.connect.mockImplementation(() => mockClient);

        await mqttClient.save(config, reading);

        expect(mockClient.publish).toHaveBeenCalledWith(expectedTopic, expectedValue);
    });

});
