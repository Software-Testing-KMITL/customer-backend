import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAccessGuard from 'src/shared/guards/jwt-access.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

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
