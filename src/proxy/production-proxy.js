const proxy = {
  '/api/user': {
    target: 'https://google.com',
  },
  '/api/user-authentication': {
    target: 'https://google.com',
  },
  '/api/cms': {
    target: 'https://google.com',
  },
};
module.exports = proxy;
