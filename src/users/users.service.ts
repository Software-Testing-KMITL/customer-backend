import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor() {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, phoneNumber } = createUserDto
    const hashedPassword = bcrypt.hash(password, 10)

    // create user model
  }
}
