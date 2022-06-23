import { Injectable } from '@nestjs/common';
import { makeBetDto } from 'src/dto/makebet.dto';
import { GameRepositoryService } from 'src/repository/game/game.mysql.service';
import { BetType } from '../../enums/bet.type.enum';
import { BetNumbers } from '../../enums/bet.numbers.enum';
import { UsersRepositoryService } from 'src/repository/users/users.mysql.service';
@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepositoryService,
    private readonly userRepo: UsersRepositoryService,
  ) {}

  async makeBet(data: makeBetDto, userId: number) {
    const numbersArray = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];
    const winningNumber = 13;
    const user = await this.userRepo.findUserById(userId);
    if (data.gameMode === 'Normal') {
      for (let i = 0; i < data.bet.length; i++) {
        if (user.balance > data.bet[i].betAmount) {
          if (data.bet[i].betType == BetType.even) {
            data.bet[i].betAmount *= 2;
            data.wonMoney += data.bet[i].betAmount;
            await this.userRepo.fillBalance(userId, data.wonMoney);
          } else if (data.bet[i].betType == BetType.odd) {
            data.bet[i].betAmount *= 2;
            data.wonMoney += data.bet[i].betAmount;
            await this.userRepo.fillBalance(userId, data.wonMoney);
          } else {
            await this.userRepo.reduceAmount(userId, data.bet[i].betAmount);
            return { message: 'you lose' };
          }

          for (let j = 0; j < numbersArray.length; j++) {
            if (data.bet[i].betType == numbersArray[j]) {
              data.bet[i].betAmount *= 36;
              data.wonMoney += data.bet[i].betAmount;
              await this.userRepo.fillBalance(userId, data.wonMoney);
            } else {
              await this.userRepo.reduceAmount(userId, data.bet[i].betAmount);
              return { message: 'you lose' };
            }
          }
        } else {
          return { message: 'you do not have enough money' };
        }
      }
    } else if (data.gameMode === 'Test') {
      for (let i = 0; i < data.bet.length; i++) {
        if (user.balance > data.bet[i].betAmount) {
          if (data.bet[i].betType == winningNumber) {
            data.bet[i].betAmount *= 100;
            data.wonMoney += data.bet[i].betAmount;
            await this.userRepo.fillBalance(userId, data.wonMoney);
          } else {
            await this.userRepo.reduceAmount(userId, data.bet[i].betAmount);
            return { message: 'you lose' };
          }
        } else {
          return { mesasge: 'you do not have enough money' };
        }
      }
    }
    return await this.gameRepository.makeBet(data, userId);
  }

  async fillBalance(userId: number, betId: number) {
    try {
      return await this.gameRepository.fillUserBalance(userId, betId);
    } catch {
      return null;
    }
  }
}
