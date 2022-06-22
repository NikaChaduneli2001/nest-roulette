import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouletteEntity } from 'src/entities/roulette.entitie';
import { GameRepositoryService } from './game.mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([RouletteEntity])],
  providers: [GameRepositoryService],
  exports: [GameRepositoryService],
})
export class GameMysqlModule {}
