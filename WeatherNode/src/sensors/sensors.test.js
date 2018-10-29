const sensors = require('./sensors');

test('should throw an error if the configuration is null', () => {
  expect(() => {
    sensors.read(null, () => {});
  }).toThrow('Error: Missing initialization configuration');
});
