import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: [
      'https://admin-obai-kharboutli.vercel.app', // First frontend URL
      'https://photographer-git-master-emernemly.vercel.app',
    ], // Update this with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }; // Enable CORS with the specified options
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}

bootstrap();
