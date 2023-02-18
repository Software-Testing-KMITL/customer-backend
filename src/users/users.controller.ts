import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAccessGuard from 'src/shared/guards/jwt-access.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserDocument } from './user.schema';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: UserDocument) {
    return {
      status: {
        code: 200,
        message: 'get user profile successfully'
      },
      profile: {
        username: user.username,
        phoneNumber: user.phoneNumber
      }
    }
  }
}
