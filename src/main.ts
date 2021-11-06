import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('PORT', 8080));
}
bootstrap();
