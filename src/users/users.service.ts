import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

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

  async getUserById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      username
    })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }
}
