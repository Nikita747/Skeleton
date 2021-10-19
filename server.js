const config = require('./config');
const app = require('./app');
const port = config.port;

const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.info('Application started on http://%s:%d', config.host, port)
);
