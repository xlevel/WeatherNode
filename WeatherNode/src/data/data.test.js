const data = require('./data');

describe('Data save', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(global.console, 'log').mockImplementation();
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should save the reading too the specified data client', async () => {
    const config = {
      data: {
        type: './mockDataClient.js',
        config: {
          value: true,
        },
      },
    };

    const readings = {
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    };

    await data.save(config, readings);

    expect(spy).toHaveBeenCalledWith({ id: 'sensor 1', readings: [{ type: 't', value: 19.2 }] });
  });

  it('should pass the config too the specified data client', async () => {
    const config = {
      data: {
        type: './mockDataClient.js',
        config: {
          value: true,
        },
      },
    };

    const readings = {
      id: 'sensor 1',
      readings: [
        { type: 't', value: 19.2 },
      ],
    };

    await data.save(config, readings);

    expect(spy).toHaveBeenCalledWith({ value: true });
  });
});
