import dotenv from 'dotenv';

export default class Secrets {
  public static env: { [key: string]: string; } = {
    PORT: '3000',
    LOG_LEVEL: 'info',
  };

  public static validateEnvars() {
    Object.keys(Secrets.env).forEach((variableKey) => {
      if (Secrets.env[variableKey] === '') {
        throw new Error(`missing envar ${variableKey}`);
      }
    });
  }

  public static initialize(): void {
    dotenv.config();
    Secrets.setEnvars();
  }

  private static setEnvars(): void {
    Object.keys(Secrets.env).forEach((variableKey) => {
      const variableValue = process.env[variableKey];
      if (typeof variableValue === 'string' && variableValue !== '') {
        Secrets.env[variableKey] = variableValue;
      }
    });
  }
}

// TODO: see about calling initialize in app.ts instead of like this; make validateEnvars() private
Secrets.initialize();
