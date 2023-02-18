import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import JwtAccessGuard from 'src/shared/guards/jwt-access.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ResponseUserProfileDto } from './dtos/profile-response.dto'

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Response user profile',
    type: ResponseUserProfileDto,
  })
  @UseGuards(JwtAccessGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: UserDocument) {
    return {
      status: {
        code: 200,
        message: 'get user profile successfully',
      },
      profile: {
        username: user.username,
        phoneNumber: user.phoneNumber,
      },
    };
  }
}
