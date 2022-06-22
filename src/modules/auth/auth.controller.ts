import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { loginDto } from '../../dto/user.login.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() data: loginDto) {
    try {
      const foundUser = await this.usersService.findUserByEmailAndPassword(
        data.email,
        data.password,
      );
      this.logger.log(`found user ${JSON.stringify(foundUser)}`);
      if (foundUser) {
        const jwtToken = await this.authService.loginUser(foundUser);
        this.logger.log(`users token: ${JSON.stringify(jwtToken)}`);
        return {
          status: 'success',
          data: {
            email: foundUser.email,
            fullName: foundUser.fullName,
            role: foundUser.role,
            balance: foundUser.balance,
            jwtToken,
          },
        };
      } else {
        return { status: 'error', data: { message: 'User not found' } };
      }
    } catch {
      return { status: 'error', message: 'User not found' };
    }
  }

  @Get('/logout')
  async logout(@Req() req) {
    const foundUser = await this.usersService.findUserById(req.user.userId);
    if (foundUser) {
      return {
        status: 'success',
        data: {
          message: 'User logged out',
          data: {
            email: foundUser.email,
            fullName: foundUser.fullName,
            role: foundUser.role,
            endBalance: foundUser.balance,
          },
        },
      };
    }
    req.session.destroy();
  }
}
