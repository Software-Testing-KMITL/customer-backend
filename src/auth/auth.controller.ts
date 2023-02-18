import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const credentials = await this.authService.login(loginDto)
    return {
      status: {
        code: 200,
        message: 'login successfully'
      },
      ...credentials
    }
  }

}
