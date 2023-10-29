import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser('codersx'));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('gos-master-server')
    .setDescription('The gos-master-server API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      withCredentials: true,
      requestInterceptor: (request) => {
        request.credentials = 'include';

        return request;
      },
    },
  });

  const logger = new Logger();

  const port = app.get(ConfigService).get('port');

  await app.listen(
    (() => {
      logger.log(`服务启动成功 127.0.0.1:${port}`);
      return port;
    })(),
  );
}
bootstrap();
