const https = require('https');
const adafruitio = require('./adafruitIo');

jest.mock('https');

describe('Adafruit IO save', () => {

  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      write: jest.fn(),
      end: jest.fn(),
    };
    https.request.mockImplementation(() => mockRequest);
  });

  it('should throw error if AIO Key is not specified', async () => {
    const config = {
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    expect.assertions(1);

    try {
      await adafruitio.save(config, []);
    } catch (e) {
      expect(e.message).toEqual('Unspecified AIO Key');
    }
  });

  it('should throw error if user name is not specified', async () => {
    const config = {
      aioKey: 'aio-key-value',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    expect.assertions(1);

    try {
      await adafruitio.save(config, []);
    } catch (e) {
      expect(e.message).toEqual('Unspecified user name');
    }
  });

  it('should have POST method in the options', async () => {
    const readings = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(https.request).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: 'POST' }));
  });

  it('should have the correct headers in the options', async () => {
    const readings = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    const expected = {
      headers: {
        'X-AIO-key': 'aio-key-value',
        'Content-Type': 'application/json',
        'Content-Length': 14
      }
    };

    await adafruitio.save(config, readings);

    expect(https.request).toHaveBeenCalledWith(expect.any(String), expect.objectContaining(expected));
  });

  it('should close the connection after writing', async () => {
    const readings = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(mockRequest.end).toHaveBeenCalled();
  });

  it.each([
    ['currentUser', 'https://io.adafruit.com/api/v2/currentUser/feeds/test-temperature/data'],
    ['user-name', 'https://io.adafruit.com/api/v2/user-name/feeds/test-temperature/data'],
  ])('should containg the user name in the feed path', async (user, expected) => {
    const readings = [{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }];

    const config = {
      aioKey: 'aio-key-value',
      user: user,
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(https.request).toHaveBeenCalledWith(expected, expect.any(Object));
  });

  it.each([
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }],
      'https://io.adafruit.com/api/v2/user-name/feeds/test-temperature/data'],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 'h', value: 45.5 },
      ],
    }],
      'https://io.adafruit.com/api/v2/user-name/feeds/test-humidity/data'],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 'p', value: 945 },
      ],
    }],
      'https://io.adafruit.com/api/v2/user-name/feeds/test-pressure/data'],
    [[{
      id: 'sensor 2',
      readings: [
        { type: 'p', value: 945 },
      ],
    }],
      'https://io.adafruit.com/api/v2/user-name/feeds/test-pressure-2/data']
  ])('should POST a reading to the correct feed endpoint (%#)', async (readings, expected) => {
    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        },
        {
          id: 'test-pressure',
          sensor: 'sensor 1',
          type: 'p'
        },
        {
          id: 'test-humidity',
          sensor: 'sensor 1',
          type: 'h'
        },
        {
          id: 'test-temperature-2',
          sensor: 'sensor 2',
          type: 't'
        },
        {
          id: 'test-pressure-2',
          sensor: 'sensor 2',
          type: 'p'
        },
        {
          id: 'test-humidity-2',
          sensor: 'sensor 2',
          type: 'h'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(https.request).toHaveBeenCalledWith(expected, expect.any(Object));
  });

  it.each([
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }],
    { value: 19.2 }],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 'h', value: 45.5 },
      ],
    }],
    { value: 45.5 }],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 'p', value: 945 },
      ],
    }],
    { value: 945 }]
  ])('should POST the correct value for each reading (%#)', async (readings, expected) => {
    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature',
          sensor: 'sensor 1',
          type: 't'
        },
        {
          id: 'test-pressure',
          sensor: 'sensor 1',
          type: 'p'
        },
        {
          id: 'test-humidity',
          sensor: 'sensor 1',
          type: 'h'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(mockRequest.write).toHaveBeenCalledWith(JSON.stringify(expected));
  });

  it.each([
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    }],
      1],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
      ],
    }],
      2],
    [[{
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
        { type: 'p', value: 945 },
      ],
    },
    {
      id: 'sensor 2',
      readings: [
        { type: 't', value: 19.2 },
        { type: 'h', value: 45.5 },
        { type: 'p', value: 945 },
      ],
    }],
      6]
  ])('should POST once for each reading and sensor (%#)', async (readings, expected) => {
    const config = {
      aioKey: 'aio-key-value',
      user: 'user-name',
      feeds: [
        {
          id: 'test-temperature-1',
          sensor: 'sensor 1',
          type: 't'
        },
        {
          id: 'test-pressure-1',
          sensor: 'sensor 1',
          type: 'p'
        },
        {
          id: 'test-humidity-1',
          sensor: 'sensor 1',
          type: 'h'
        },
        {
          id: 'test-temperature-2',
          sensor: 'sensor 2',
          type: 't'
        },
        {
          id: 'test-pressure-2',
          sensor: 'sensor 2',
          type: 'p'
        },
        {
          id: 'test-humidity-2',
          sensor: 'sensor 2',
          type: 'h'
        }
      ]
    };

    await adafruitio.save(config, readings);

    expect(mockRequest.write.mock.calls.length).toBe(expected);
  });
});