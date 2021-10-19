require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  appName: process.env.npm_package_name,
  appHostUrl: process.env.APP_HOST_URL
};