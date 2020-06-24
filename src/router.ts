import * as express from 'express';
import HelloWorldController from './controllers/HelloWorld.controller';

const router = express.Router();

router.get('/helloworld', HelloWorldController.handler);

export default router;
