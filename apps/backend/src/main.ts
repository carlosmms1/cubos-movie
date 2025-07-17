import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { IoCModule } from './modules/ioc.module';

async function bootstrap() {
  const ioc = await NestFactory.create(IoCModule);
  ioc.enableCors();
  ioc.useGlobalPipes(new ValidationPipe({ transform: true }));
  await ioc.listen(3000);
}
bootstrap();
