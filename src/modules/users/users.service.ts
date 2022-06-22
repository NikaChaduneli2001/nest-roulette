import { Injectable } from '@nestjs/common';
import { getAllUsersDto } from 'src/dto/get.users.dto';
import { registerUserDto } from 'src/dto/register.users.dto';
import { updateUsersDto } from 'src/dto/update.users.dto';
import { UsersRepositoryService } from 'src/repository/users/users.mysql.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async register(data: registerUserDto) {
    try {
      return await this.usersRepository.registerUser(data);
    } catch {
      return null;
    }
  }

  async findUserByEmailAndPassword(email: string, password: string) {
    try {
      return await this.usersRepository.findUserByEmailAndPassword(
        email,
        password,
      );
    } catch {
      return null;
    }
  }

  async findUserById(id: number) {
    try {
      return await this.usersRepository.findUserById(id);
    } catch {
      return null;
    }
  }

  async getAllUsers(data: getAllUsersDto) {
    try {
      return await this.usersRepository.getAllUsers(data);
    } catch {
      return null;
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.usersRepository.deleteUser(id);
    } catch {
      return null;
    }
  }

  async updateUser(id: number, data: updateUsersDto) {
    try {
      return await this.usersRepository.updateUser(id, data);
    } catch {
      return null;
    }
  }
}
