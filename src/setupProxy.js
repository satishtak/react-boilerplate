const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyImport = `./proxy/index.js`;
// eslint-disable-next-line import/no-dynamic-require
const localProxy = require(proxyImport);

module.exports = function (app) {
  Object.keys(localProxy).forEach((context) => {
    app.use(
      context,
      createProxyMiddleware({
        target: localProxy[context].target,
        changeOrigin: true,
      }),
    );
  });
};
