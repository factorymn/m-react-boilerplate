module.exports = {
  LOCAL_IP: 'localhost',
  PORT: process.env.PORT ? (process.env.PORT.replace(/\s/, '')) : 3223,
  NODE_ENV: process.env.NODE_ENV ? (process.env.NODE_ENV.replace(/\s/, '')) : 'development'
}
