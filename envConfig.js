module.exports = {
  PORT: process.env.PORT ? (process.env.PORT.replace(/\s/, '')) : 3000,
  NODE_ENV: process.env.NODE_ENV ? (process.env.NODE_ENV.replace(/\s/, '')) : 'development'
}