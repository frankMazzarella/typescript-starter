import Secrets from './Secrets.service';
import { LogLevel } from '../models/LogLevel.model';

export default class Logger {
  private loggerName: string;
  private logLevel = this.getLogLevel();

  constructor(loggerName: string) {
    this.loggerName = loggerName;
  }

  public error(log: string): void {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    if (this.logLevel !== LogLevel.OFF && levels.indexOf(this.logLevel) !== -1) {
      process.stderr.write(this.logFormatter(log, LogLevel.ERROR));
    }
  }

  public warn(log: string): void {
    const levels = [LogLevel.DEBUG, LogLevel.WARN, LogLevel.INFO];
    if (this.logLevel !== LogLevel.OFF && levels.indexOf(this.logLevel) !== -1) {
      process.stdout.write(this.logFormatter(log, LogLevel.WARN));
    }
  }

  public info(log: string): void {
    const levels = [LogLevel.INFO, LogLevel.DEBUG];
    if (this.logLevel !== LogLevel.OFF && levels.indexOf(this.logLevel) !== -1) {
      process.stdout.write(this.logFormatter(log, LogLevel.INFO));
    }
  }

  public debug(log: string): void {
    const levels = [LogLevel.DEBUG];
    if (this.logLevel !== LogLevel.OFF && levels.indexOf(this.logLevel) !== -1) {
      process.stderr.write(this.logFormatter(log, LogLevel.DEBUG));
    }
  }

  private logFormatter(log: string, logLevel: LogLevel): string {
    const now = new Date();
    return `[${now.toISOString()}] [${logLevel}] [${this.loggerName}] - ${log}\n`;
  }

  private getLogLevel(): LogLevel {
    const logLevelEnvar = Secrets.env.LOG_LEVEL.toUpperCase();
    let logLevel: LogLevel;
    switch (logLevelEnvar) {
      case LogLevel.ERROR: logLevel = LogLevel.ERROR; break;
      case LogLevel.WARN: logLevel = LogLevel.WARN; break;
      case LogLevel.INFO: logLevel = LogLevel.INFO; break;
      case LogLevel.DEBUG: logLevel = LogLevel.DEBUG; break;
      case LogLevel.OFF: logLevel = LogLevel.OFF; break;
      default: logLevel = LogLevel.INFO; break;
    }
    return logLevel;
  }
}
