import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

class userModel {
  constructor() {}
  static find = jest.fn();
  static findById = jest.fn();
  static findOne = jest.fn();
  async save() {
    return 'save';
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('get user profile', () => {
    const username = 'User';
    const hashedPassword = '1234';
    const phoneNumber = '0878173728';
    const _id = new mongoose.Types.ObjectId();
    const userInDB: Partial<UserDocument> = {
      _id: _id,
      username,
      hashedPassword,
      phoneNumber,
    };

    it('should return user profile when userId is valid', async () => {
      // Given
      userModel.findById.mockResolvedValueOnce(userInDB);

      // When
      const profile = await usersService.getUserById(_id.toString());

      // Then
      expect(profile).toEqual({
        _id,
        username,
        hashedPassword,
        phoneNumber,
      });
    });

    it('should throw NotFoundException when userId is invalid', async () => {
      // Given
      userModel.findById.mockResolvedValueOnce(null);

      // When
      const profile = async () => await usersService.getUserById('invalid');

      // Then
      await expect(profile).rejects.toThrowError(NotFoundException);
    });

    it('should return user profile when username is valid', async () => {
      // Given
      userModel.findOne.mockResolvedValueOnce(userInDB);

      // When
      const profile = await usersService.getUserByUsername(username);

      // Then
      expect(profile).toEqual({
        _id,
        username,
        hashedPassword,
        phoneNumber,
      });
    });

    it('should throw NotFoundException when username is invalid', async () => {
      // Given
      userModel.findOne.mockResolvedValueOnce(null);

      // When
      const profile = async () => await usersService.getUserByUsername('invalid');

      // Then
      await expect(profile).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create user', () => {
    const username = 'User';
    const password = '1234';
    const phoneNumber = '0878173728';
    const _id = new mongoose.Types.ObjectId();
    const userInDB: Partial<UserDocument> = {
      _id: _id,
      username,
      phoneNumber,
    };

    it ('should create user when given username password and phoneNumber', async () => {
      // Given
      // userModel.save.mockResolvedValueOnce(userInDB);

      // When
      const user = await usersService.create({
        username,
        password,
        phoneNumber,
      });

      // Then
      expect(user).toEqual({
        username,
        phoneNumber,
      });

    });
  });
});
