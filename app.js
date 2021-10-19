const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const expressSwagger = require('express-swagger-generator');
const config = require('./config');

const express = require('express');
const app = express();

const errorHandler = require('./src/helpers/error-handler');
const indexRouter = require('./src/routes/index.route');

// app.use(helmet()); // Swagger Dependency
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compress());
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.disable('etag');
app.disable('x-powered-by');

// Host the public folder
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(['/help', '/api/help'], (req, res) => res.redirect('/api-docs'));
app.use('/api/', indexRouter);

const appName = config.appName ? config.appName.charAt(0).toUpperCase() + config.appName.slice(1) : '';
const options = {
  swaggerDefinition: {
    info: {
      description: `${appName} API Server`,
      title: appName,
      version: '1.0.0',
    },
    host: config.appHostUrl,
    basePath: '/api',
    produces: ['application/json'],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, // app absolute path
  files: ['./src/routes/*.js'] // Path to the API handle folder
};

expressSwagger(app)(options);

// Configure a middleware for 404s and the error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;