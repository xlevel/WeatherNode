/* eslint-disable no-console */

async function save(config, reading) {
  console.dir(config, { depth: 5 });
  console.dir(reading, { depth: 5 });
}

module.exports = {
  save,
};
