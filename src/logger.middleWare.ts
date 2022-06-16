import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  use(req: any, res: any, next: (error?: any) => void) {
    res.on('finish', () => {
      const { ip, method, originalUrl } = req;
      const { statusCode, statusMessage } = res;
      const clientIP = req.headers['x-forwarded-for'] ?? ip;
      const message = `${clientIP} ${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      const msg = {
        clientIP,
        method,
        statusCode,
        statusMessage,
        protocol: req.protocol,
        hostname: req.get('host'),
        originalUrl,
        query: req.query,
        params: req.params,
        body: req.body,
      };

      if (statusCode >= 500) {
        return this.logger.error(message, msg);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message, msg);
      }

      return this.logger.info(message, msg);
    });

    next();
  }
}
