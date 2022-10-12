import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getCorsConfig } from './core/configs/cors.config';
import { prefix } from './core/configs/prefix.config';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);

  const IS_PROD = process.env.NODE_ENV === 'production';
  const PORT = config.get<number>('PORT') || 3456;

  app.set('trust proxy', 1);
  app.enableCors(getCorsConfig());
  app.setGlobalPrefix(prefix);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const docBuilder = new DocumentBuilder()
    .setTitle('Quasar Nest example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup(`${prefix}/swagger`, app, document);

  await app.listen(PORT);

  console.log(`-------------------------`);
  console.log('SERVER STARTED');
  console.log(`ENV: ${IS_PROD ? 'Production' : 'Development'}`);
  console.log(`Listening: http://localhost:${PORT}`);
  console.log(`-------------------------`);
}

bootstrap();
