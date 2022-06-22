import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entitie';
import { UsersRepositoryService } from './users.mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersRepositoryService],
  exports: [UsersRepositoryService],
})
export class UsersMysqlModule {}
