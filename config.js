const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const PROD_APIHOST = 'http://smarticon-api-lb-1742056434.us-east-1.elb.amazonaws.com';
const DEV_APIHOST = 'http://smarticon-api-beta-lb-64708113.us-east-1.elb.amazonaws.com:1337';

module.exports = Object.assign({
  PROD_APIHOST,
  DEV_APIHOST,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  // apiVersion: 'v1',
  apiHost: process.env.APIHOST || (process.env.NODE_ENV === 'production' ? PROD_APIHOST : DEV_APIHOST),     // eslint-disable-line max-len
  // apiHost: process.env.APIHOST || 'http://52.1.220.95:1337' || 'localhost',
  // apiHost: process.env.APIHOST || 'http://10.0.1.53:1337' || 'localhost',
  apiPort: process.env.APIPORT,
  loginCookie: 'api_login',
  tokenCookie: 'api_token',
  loginHeader: 'X-User-Email',
  tokenHeader: 'X-User-Token',
  googleAnalyticsId: 'UA-41559965-2',
  app: {
    title: 'AppName',
    description: 'AppName description',
    head: {
      titleTemplate: 'AppName: %s',
      meta: [
        { name: 'description', content: 'AppName description' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'AppName' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'AppName' },
        { property: 'og:description', content: 'AppName description' }
      ]
    }
  }
}, environment);
