import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
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
}
