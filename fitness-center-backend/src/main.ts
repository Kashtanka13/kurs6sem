import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import detect from 'detect-port';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const defaultPort = Number(process.env.PORT) || 3000;
  const port = await detect(defaultPort);

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Global validation pipe with custom error formatting
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {}).join(', '),
        }));
        return new HttpException(
          { message: 'Validation failed', errors: messages },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Fitness Center API')
    .setDescription('The Fitness Center API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
