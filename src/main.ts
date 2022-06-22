import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as bcrypt from 'bcrypt';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // somewhere in your initialization file
  const salt = await bcrypt.genSalt(10);
  const SecretHash = await bcrypt.hash('secret', salt);
  app.use(
    session({
      secret: SecretHash,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
