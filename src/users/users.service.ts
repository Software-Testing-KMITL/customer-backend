import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, phoneNumber } = createUserDto
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user model
    const user = new this.userModel({
      username,
      hashedPassword,
      phoneNumber
    })

    await user.save()

    return {
      username,
      phoneNumber
    }

  }
}
