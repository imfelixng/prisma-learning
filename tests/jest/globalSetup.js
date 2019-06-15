require('@babel/register');
require("@babel/polyfill/noConflict");

// when start server

const server = require('../../src/server.js').default;

module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 });
}