import { Injectable } from '@nestjs/common';
import { makeBetDto } from 'src/dto/makebet.dto';
import { GameRepositoryService } from 'src/repository/game/game.mysql.service';
import { BetType } from '../../enums/bet.type.enum';
import { BetNumbers } from '../../enums/bet.numbers.enum';
@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepositoryService) {}

  async makeBet(data: makeBetDto) {
    const numbersArray = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];
    const winningNumber = 13;
    if (data.gameMode === 'Normal') {
      for (let i = 0; i < data.bet.length; i++) {
        if (data.bet[i].betType == BetType.even) {
          data.bet[i].betAmount *= 2;
          data.wonMoney += data.bet[i].betAmount;
        } else if (data.bet[i].betType == BetType.odd) {
          data.bet[i].betAmount *= 2;
          data.wonMoney += data.bet[i].betAmount;
        } else {
          return { message: 'you lose' };
        }

        for (let j = 0; j < numbersArray.length; j++) {
          if (data.bet[i].betType == numbersArray[j]) {
            data.bet[i].betAmount *= 36;
            data.wonMoney += data.bet[i].betAmount;
          } else {
            return { message: 'you lose' };
          }
        }
      }
    } else if (data.gameMode === 'Test') {
      for (let i = 0; i < data.bet.length; i++) {
        if (data.bet[i].betType == winningNumber) {
          data.bet[i].betAmount *= 100;
          data.wonMoney += data.bet[i].betAmount;
        }
      }
    }
    return await this.gameRepository.makeBet(data);
  }
}
