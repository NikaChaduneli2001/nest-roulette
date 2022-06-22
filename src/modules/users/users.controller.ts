import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { getAllUsersDto } from 'src/dto/get.users.dto';
import { registerUserDto } from 'src/dto/register.users.dto';
import { updateUsersDto } from 'src/dto/update.users.dto';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async register(@Body() data: registerUserDto) {
    try {
      const result = await this.usersService.register(data);
      if (result) {
        return {
          status: 'success',
          message: 'User registered successfully',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async deleteUser(@Req() req) {
    try {
      const result = await this.usersService.deleteUser(Number(req.params.id));
      if (result) {
        return {
          status: 'success',
          message: 'User deleted successfully',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
      };
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async getOneUserById(@Param(':id') id: number) {
    try {
      const result = await this.usersService.findUserById(id);
      if (result) {
        return {
          status: 'success',
          message: 'User get successfully',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
      };
    }
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async getAllUsers(@Query() data: getAllUsersDto) {
    try {
      const result = await this.usersService.getAllUsers(data);
      if (result) {
        return {
          status: 'success',
          message: 'Users get successfully',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
      };
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async updateUser(@Req() req, @Body() data: updateUsersDto) {
    try {
      const result = await this.usersService.updateUser(
        Number(req.params.id),
        data,
      );
      if (result) {
        return {
          status: 'success',
          message: 'User updated successfully',
          data: result,
        };
      } else {
        return { status: 'error', message: 'User not found' };
      }
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }
}
