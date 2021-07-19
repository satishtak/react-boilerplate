const ENV =
  process.env && process.env.REACT_APP_ENV_PROXY ? process.env.REACT_APP_ENV_PROXY : 'development';
// require environment configuration file based on env variable
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./${ENV}-proxy.js`);
module.exports = config;
