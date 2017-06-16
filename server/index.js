import http from "http";
import app from "./server";

const LOCAL_IP = require('../envConfig').LOCAL_IP;
const PORT = require('../envConfig').PORT;

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
  console.info(`Open up http://${ LOCAL_IP }:${ PORT }/ in your browser.`);
});

if (process.env.NODE_ENV == 'development' && module.hot) {
  module.hot.accept("./server", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}
