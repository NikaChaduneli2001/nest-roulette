import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Mode } from 'src/enums/game.mode.enum';
import { betListInterface } from 'src/interface/bet.interface';

export class makeBetDto {
  @IsNumber()
  @IsInt()
  userId: number;
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  bet: betListInterface[];
  wonMoney: number;
  @IsEnum(Mode)
  gameMode: Mode;
}
