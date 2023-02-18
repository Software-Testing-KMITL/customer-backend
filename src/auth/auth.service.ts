import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly configService: ConfigService,
  ) {
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const user = await this.usersService.getUserByUsername(username)

    const isMatching = await bcrypt.compare(password, user.hashedPassword)

    if (!isMatching) {
      throw new ConflictException('wrong username or password')
    }

    const accessToken = this.jwtService.sign({
      userId: user._id.toString()
    })

    return {
      profile: {
        username: user.username,
        phoneNumber: user.phoneNumber
      },
      accessToken
    }
  }

}
