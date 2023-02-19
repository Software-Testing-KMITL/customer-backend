import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  // TODO: mock userModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('GET /profile', () => {
    const username = 'User'
    const hashedPassword = '1234'
    const phoneNumber = '0878173728'
    const _id = new mongoose.Types.ObjectId()
    const userInDB: Partial<UserDocument> = {
      _id: _id,
      username,
      hashedPassword,
      phoneNumber
    }

    it('should return user profile when userId is valid', async () => {
      // Given
      usersService.getUserById.mockResolvedValueOnce(userInDB as UserDocument)

      // When
      const profile = await service.getProfile(_id.toString())

      // Then
      expect(profile).toEqual({
        username,
        phoneNumber
      })
    });
    

  });
});
