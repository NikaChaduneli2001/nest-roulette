import { Injectable } from '@nestjs/common';
import { makeBetDto } from 'src/dto/makebet.dto';
import { RouletteEntity } from 'src/entities/roulette.entitie';
import { Repository } from 'typeorm';

@Injectable()
export class GameRepositoryService {
  constructor(private readonly gameRepository: Repository<RouletteEntity>) {}

  async makeBet(data: makeBetDto) {
    const newBet: RouletteEntity = new RouletteEntity();
    newBet.user = data.userId;
    newBet.bet = JSON.parse(JSON.stringify(data.bet));
    newBet.wonMoney = 0;
    newBet.date = new Date();

    const bet = await this.gameRepository.save(newBet);
    return {
      id: bet.id,
      user: bet.user,
      bet: bet.bet,
      money: bet.wonMoney,
      date: bet.date,
    };
  }
}
