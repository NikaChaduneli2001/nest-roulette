import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class registerUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
  @IsString()
  fullName: string;
  @IsNumber()
  phone: number;
  @IsNumber()
  balance: number;
  @IsEnum(Role)
  role: Role;
  @IsBoolean()
  active: boolean;
}
