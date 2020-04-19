async function save(config, readings) {
  // eslint-disable-next-line
  const dataAccessClient = require(config.data.type);
  dataAccessClient.save(config.data.config, readings);
}

module.exports = {
  save,
};
