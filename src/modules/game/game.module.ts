import { Module } from '@nestjs/common';
import { GameMysqlModule } from 'src/repository/game/game.mysql.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [GameMysqlModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
