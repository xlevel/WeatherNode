const sensors = require('./sensors');

describe('Sensors read', () => {
  test.each([
    [null, 'Error: Missing initialization configuration'],
    [undefined, 'Error: Missing initialization configuration'],
    [{ sensors: null }, 'Error: Missing sensor configuration'],
    [{ sensors: undefined }, 'Error: Missing sensor configuration'],
  ])('should throw an error if the config is %s', async (config, expected) => {
    let errorMessage = false;

    try {
      await sensors.read(config);
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe(expected);
  });

  test.each([
    [{ sensors: [{ id: 'sensor 1', type: './mockSensor.js' }] }, 1],
    [{
      sensors: [
        { id: 'sensor 1', type: './mockSensor.js' },
        { id: 'sensor 2', type: './mockSensor.js' },
      ],
    }, 2],
    [{
      sensors: [
        { id: 'sensor 1', type: './mockSensor.js' },
        { id: 'sensor 2', type: './mockSensor.js' },
        { id: 'sensor 3', type: './mockSensor.js' },
      ],
    }, 3],
  ])('should return one result for each sensor configuration (%#)', async (config, expected) => {
    const result = await sensors.read(config);

    expect(result.length).toBe(expected);
  });

  test('should return a complate sensor reading', async () => {
    const config = { sensors: [{ id: 'sensor 1', type: './mockSensor.js' }] };

    const result = await sensors.read(config);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('sensor 1');
    expect(result[0].readings.length).toBe(3);
  });
});
