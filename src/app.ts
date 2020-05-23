import compression from 'compression';
import express from 'express';
import fs from 'fs';
import os from 'os';

handleErrors();
initServer();

// TODO: verify these log correctly
function handleErrors() {
  process.on('unhandledRejection', (reason, promise) => {
    const promiseStr = JSON.stringify(promise);
    const reasonStr = JSON.stringify(reason);
    console.error(`process terminating due to unhandled rejection at: ${promiseStr}, reason: ${reasonStr}`);
    process.exit(1);
  });

  process.on('uncaughtException', (err) => {
    console.error(`process terminating due to uncaught exception: ${err}`);
    process.exit(1);
  });
}

function initServer() {
  const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
  const app = express();
  const port = 3000;
  app.use(compression());
  app.get('/healthcheck', (req, res) => res.send({ uptime: process.uptime() }));
  app.listen(port, () => {
    console.log(`${packageJson.name} v${packageJson.version} has started on port ${port} [host: ${os.hostname}]`);
  });
}
