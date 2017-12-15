const sensors = require('../src/sensors/sensors.js');
const { expect } = require('chai');

describe('sensors', () => {
  describe('read', () => {
    it('should not throw an error if called with a valid configuration', () => {
      const config = { sensors: [{ id: 'sensor 1', type: './mockSensor.js' }] };

      expect(() => { sensors.read(config, () => {}); }).to.not.throw();
    });

    it('should throw an error if the configuration is null', () => {
      expect(() => { sensors.read(null, () => {}); }).to.throw('Error: Missing initialization configuration');
    });

    it('should throw an error if the configuration is undefined', () => {
      expect(() => { sensors.read(undefined, () => {}); }).to.throw('Error: Missing initialization configuration');
    });

    it('should throw an error if the config contains an undefined array of sensors', () => {
      const config = { sensors: undefined };

      expect(() => { sensors.read(config, () => {}); }).to.throw('Error: Missing sensor configuration');
    });

    it('should throw an error if the config contains a null array of sensors', () => {
      const config = { sensors: null };

      expect(() => { sensors.read(config, () => {}); }).to.throw('Error: Missing sensor configuration');
    });

    it('should return a result with the correct id', () => {
      const config = { sensors: [{ id: 'sensor 1', type: './mockSensor.js' }] };

      sensors.read(config, (result) => {
        expect(result.id).to.equal(config.sensors[0].id);
      });
    });

    it('should return a result with the correct number of readings', () => {
      const config = { sensors: [{ id: 'sensor 1', type: './mockSensor.js' }] };

      sensors.read(config, (result) => {
        expect(result.readings.length).to.equal(3);
      });
    });
  });
});
