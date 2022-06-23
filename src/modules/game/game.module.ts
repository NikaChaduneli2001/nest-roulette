import { Module } from '@nestjs/common';
import { GameMysqlModule } from 'src/repository/game/game.mysql.module';
import { UsersMysqlModule } from 'src/repository/users/users.mysql.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [GameMysqlModule, UsersMysqlModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
