import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entitie';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(user: UserEntity) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      balance: user.balance,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
