module.exports = {
    "env": {
        "node": true,
        "jest/globals": true,
    },
    "extends": [
        "airbnb-base",
        "plugin:jest/recommended",
    ],
    plugins: [
      "import",
      "jest",
    ],
};