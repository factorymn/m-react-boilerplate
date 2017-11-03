const os = require('os');

const ifaces = os.networkInterfaces();
let LOCAL_IP = 'localhost';

if (process.env.NODE_ENV !== 'production') {
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if ('IPv4' !== iface.family || iface.internal !== false) { // eslint-disable-line yoda
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      LOCAL_IP = iface.address;
    });
  });
}

module.exports = {
  LOCAL_IP: 'localhost',
  PORT: process.env.PORT ? (process.env.PORT.replace(/\s/, '')) : 3223,
  NODE_ENV: process.env.NODE_ENV ? (process.env.NODE_ENV.replace(/\s/, '')) : 'development'
}
