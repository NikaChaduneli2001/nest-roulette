import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateUsersDto {
  @IsString()
  @IsOptional()
  fullName: string;
  @IsOptional()
  @IsNumber()
  phone: number;
}
