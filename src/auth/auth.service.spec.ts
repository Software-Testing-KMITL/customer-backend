import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

jest.mock('bcrypt')

describe('AuthService', () => {
  let authService: AuthService
  let usersService: DeepMocked<UsersService>
  let jwtService: DeepMocked<JwtService>
  let bcryptCompare: jest.Mock

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockImplementation((s1: string, s2: string) => {
      return s1 === s2
    });
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: JwtService, useValue: createMock<JwtService>() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('POST /login', () => {

    it('should return profile and access token when username and password is valid', async () => {
      // Given
      jwtService.sign.mockReturnValueOnce('test')

      const username = 'User'
      const hashedPassword = '1234'
      const phoneNumber = '0878173728'
    
      const user: Partial<UserDocument> = {
        _id: new mongoose.Types.ObjectId(),
        username,
        hashedPassword,
        phoneNumber
      }

      usersService.getUserByUsername.mockResolvedValueOnce(user as UserDocument)

      const loginDto = {
        username,
        password: hashedPassword
      }

      // When
      const actual = await authService.login(loginDto)

      // Then
      expect(actual.accessToken).toBeDefined()
      expect(actual.profile).toBeDefined()
      expect(actual.profile.username).toEqual(username)
      expect(actual.profile.phoneNumber).toEqual(phoneNumber)
    
    });

  }) 
});
