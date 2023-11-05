import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Accountable APIs')
    .setDescription('The Accountable API description')
    .setVersion('0.0.1')
    .addTag('accountable')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(8000);
}
bootstrap();
