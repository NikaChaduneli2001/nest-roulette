import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import e from 'express';
import { makeBetDto } from 'src/dto/makebet.dto';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameSerice: GameService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles(Role.User)
  async makeBet(@Body() data: makeBetDto) {
    try {
      const result = await this.gameSerice.makeBet(data);
      if (result) {
        return {
          status: 'success',
          message: 'User registered successfully',
          data: result,
        };
      }
    } catch (e) {
      return {
        status: 'error',
        message: e.message,
      };
    }
  }

  @Put(':userId/:betId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async fillBalance(@Param() userId: number, betId: number) {
    try {
      const result = await this.gameSerice.fillBalance(userId, betId);
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
}
