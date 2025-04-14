import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import {
  ConsoleLogger,
  LogLevel,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';
import { AppModule } from './app.module';
import { constants } from './common/constants/constants';

async function bootstrap() {
  const appEnv = process.env.ENVIRONMENT;
  let logLevels: LogLevel[];

  switch (appEnv) {
    case constants.PROD:
      logLevels = ['warn', 'error'];
      break;
    default:
      logLevels = ['log', 'warn', 'error'];
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    {
      logger: new ConsoleLogger({
        prefix: 'OneTrip',
        logLevels,
        // json: true,
      }),
    },
  );

  const config = new DocumentBuilder()
    .setTitle('OneTrip API')
    .setDescription(
      'The API documentation for OneTrip - a comprehensive ticket booking system that enables users to search, book, and manage tickets for various events, transportation, and travel packages.',
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('tickets', 'Ticket reservation and management')
    .addTag('events', 'Event information and availability')
    .addTag('bookings', 'Booking creation and management')
    .addTag('payments', 'Payment processing endpoints')
    .addTag('notifications', 'User notification services')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory);

  await app.register(fastifyHelmet, {
    dnsPrefetchControl: true,
    frameguard: true,
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true,
      preload: false,
    },
    ieNoOpen: true,
    xssFilter: true,
    contentSecurityPolicy: false,
  });
  await app.register(fastifyCors);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  return app.listen(process.env.PORT ?? 9000);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
