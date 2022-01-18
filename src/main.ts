import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
      .setTitle('Тестовое задание')
      .setDescription('Документация')
      .setVersion('1.0.0')
      .addTag('test')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`));
}
bootstrap();
