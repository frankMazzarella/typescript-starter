import { Request, Response } from 'express';
import LoggerService from '../services/Logger.service';

const logger = new LoggerService('HelloWorldController');

export default class HelloWorldController {
  public static handler(req: Request, res: Response): void {
    logger.error('Hello, World!');
    logger.warn('Hello, World!');
    logger.info('Hello, World!');
    logger.debug('Hello, World!');
    res.send('Hello, World!');
  }
}
