import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUserDto } from 'src/dto/register.users.dto';
import { UserEntity } from 'src/entities/users.entitie';
import { UsersInterface } from 'src/interface/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { getAllUsersDto } from 'src/dto/get.users.dto';
import { raw } from 'express';
import { updateUsersDto } from 'src/dto/update.users.dto';
import { createUserInterface } from 'src/interface/user.interface';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(data: registerUserDto): Promise<UsersInterface> {
    const salt = await bcrypt.genSalt(10);
    const newUser: UserEntity = new UserEntity();
    newUser.fullName = data.fullName;
    newUser.password = await bcrypt.hash(data.password, salt);
    newUser.balance = data.balance;
    newUser.phone = data.phone;
    newUser.role = data.role;
    newUser.active = false;
    const user = await this.userRepository.save(newUser);
    return createUserInterface(user);
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return createUserInterface(user);
      }
    }
    return null;
  }

  async findUserById(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      return createUserInterface(user);
    }
    return null;
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      user.active = true;
      const userDeleted = await this.userRepository.save(user);
      return createUserInterface(userDeleted);
    } else {
      return null;
    }
  }

  async getAllUsers(data: getAllUsersDto): Promise<any> {
    const query = await this.userRepository.createQueryBuilder();
    query.where('active=false');
    if (data.searchBy.fullName) {
      query.andWhere('fullName like :fullName', {
        fullName: `%${data.searchBy.fullName}%`,
      });
    } else if (data.searchBy.email) {
      query.andWhere('email like :email', {
        email: `%${data.searchBy.email}%`,
      });
    }

    if (data.sortBy) {
      query.orderBy(data.sortBy, data.sortDir);
    }

    const limit = 10;
    if (data.limit) {
      Math.min(data.limit, 10);
    }

    query.limit(limit);
    if (data.page) {
      const page = data.page - 1;
      query.offset(page * limit);
    }

    const result = await query.getMany();
    if (result && result !== null && result !== undefined) {
      return result.map((user) => {
        return createUserInterface(user);
      });
    } else {
      return null;
    }
  }

  async updateUser(id: number, data: updateUsersDto) {
    await this.userRepository.save({
      id,
      ...data,
    });
    const update = await this.userRepository.findOne({
      where: { id: id },
    });

    if (update) {
      return createUserInterface(update);
    }
  }
}
