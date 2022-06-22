import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entitie';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtSecret } from './password.const';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret.secret,
      signOptions: { expiresIn: '6000m' },
    }),
    UsersModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
