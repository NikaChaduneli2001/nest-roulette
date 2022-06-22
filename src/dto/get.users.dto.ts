import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum sortDir {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class searchBy {
  @IsOptional()
  @IsString()
  fullName: string;
  @IsOptional()
  @IsEmail()
  email: number;
}
export class getAllUsersDto {
  @IsOptional()
  sortBy?: string;
  @IsEnum(sortDir)
  @IsOptional()
  sortDir?: sortDir;
  @Type(() => searchBy)
  @IsOptional()
  searchBy?: searchBy;
  @IsOptional()
  page?: number;
  @IsOptional()
  limit?: number;
}
