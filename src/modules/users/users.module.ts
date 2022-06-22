import { Module } from '@nestjs/common';
import { UsersMysqlModule } from 'src/repository/users/users.mysql.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UsersMysqlModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
