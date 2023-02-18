import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersSeed {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Command({ command: 'create:user', describe: 'create a user' })
  async create() {
    const user: CreateUserDto = {
      username: 'User',
      password: '1234',
      phoneNumber: '0878172637'
    }

    await this.usersService.create(user)
  }
}
