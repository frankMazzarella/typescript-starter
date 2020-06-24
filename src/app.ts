import compression from 'compression';
import express from 'express';
import fs from 'fs';
import os from 'os';

import router from './router';
import LoggerService from './services/Logger.service';
import SecretsService from './services/Secrets.service';

const logger = new LoggerService('app');
handleErrors();
SecretsService.validateEnvars();
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
  const port = SecretsService.env.PORT;
  app.use(compression());
  app.use('/api/v1', router);
  app.get('/healthcheck', (req, res) => res.send({ uptime: process.uptime() }));
  app.listen(port, () => {
    logger.info(`${packageJson.name} v${packageJson.version} has started on port ${port} [host: ${os.hostname}]`);
  });
}
