'use strict';

const app = module.exports = require('koa')(),
      config = require('config'),
      helmet = require('koa-helmet');

if (config.logging.xResponseTime) {
  app.use(require('koa-response-time')());
}

app.use(helmet());
app.use(helmet.csp({
  directives: {
    baseUri: ["'self'"],
    childSrc: ["'self'"],
    connectSrc: ["'self'"],
    defaultSrc: ["'self'"],
    fontSrc: ["'self", 'https://cdnjs.cloudflare.com'],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
    imgSrc: ["'self'", 'https://shawandpartners.com'],
    mediaSrc: ["'none'"],
    objectSrc: ["'none'"],
    scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
    styleSrc: ["'self'", 'https://cdnjs.cloudflare.com']
  }
}));

app.use(require('koa-static')(__dirname + '/../../frontend/build'),
                              {maxage: config.resources.maxAge});

if (config.logging.requestsTime) {
  app.use(require('koa-logger')());
}

app.listen(config.server.port);

console.log('Server listening on ' + config.server.port);