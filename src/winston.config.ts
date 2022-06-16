import { WinstonModuleOptionsFactory } from 'nest-winston';
import { format, LoggerOptions, transports } from 'winston';

export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): LoggerOptions | Promise<LoggerOptions> {
    const config: LoggerOptions = {
      level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
    };

    config.transports = [];

    if (process.env.NODE_ENV === 'local') {
      config.transports.push(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.prettyPrint(),
            format.colorize({ all: true }),
          ),
        }),
      );
    }

    return config;
  }
}
