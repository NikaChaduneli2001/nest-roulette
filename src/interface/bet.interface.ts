import { BetNumbers } from 'src/enums/bet.numbers.enum';
import { BetType } from 'src/enums/bet.type.enum';

export interface betListInterface {
  betAmount: number;
  betType: BetNumbers | BetType;
}
