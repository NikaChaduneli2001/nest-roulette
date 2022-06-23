import { Injectable, Query } from '@nestjs/common';
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
    newBet.gameMode = data.gameMode;

    const bet = await this.gameRepository.save(newBet);
    return {
      id: bet.id,
      user: bet.user,
      bet: bet.bet,
      money: bet.wonMoney,
      date: bet.date,
      mode: bet.gameMode,
    };
  }

  async fillUserBalance(userId: number, betId: number): Promise<any> {
    const query = await this.gameRepository.createQueryBuilder('bet');
    query.leftJoin('bet.user', 'user');
    query.where('active=false');
    query.andWhere({ user: userId });
    query.andWhere({ id: betId });
    if (query) {
      const result = await query.getRawMany();
      if (result && result !== null && result && undefined) {
        return result.map((res) => ({
          id: res.bet_id,
          user: {
            fullName: res.user_fullName,
            role: res.user_role,
            phone: res.user_phone,
            balance: res.user_balance,
          },
          betList: JSON.parse(res.bet.bet),
          date: res.bet_data,
          mode: res.bet_gameMode,
          wonMoney: res.bet_wonMoney,
          endBalance: res.user_balance + res.bet_wonMoney,
        }));
      }
    }
  }
}
