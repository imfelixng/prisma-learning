import "@babel/polyfill/noConflict";
import server from './server.js';

server.start({ port: process.env.PORT || 4000, }, () => console.log('Server is started!'));