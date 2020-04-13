
async function read(config) {
  return {
    id: config.id,
    readings: [
      { type: 't', value: 19.2 },
      { type: 'h', value: 45.5 },
      { type: 'p', value: 945 },
    ],
  };
}

module.exports = {
  read,
};
