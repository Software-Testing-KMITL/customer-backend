import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from 'src/users/schemas/user.schema';
import mongoose from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';

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

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);

    // pre-configuration
    jwtService.sign.mockReturnValue('test');
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('POST /login', () => {
    const username = 'User'
    const password = '1234'
    const hashedPassword = '1234'
    const phoneNumber = '0878173728'
    const userInDB: Partial<UserDocument> = {
      _id: new mongoose.Types.ObjectId(),
      username,
      hashedPassword,
      phoneNumber
    }


    it('should return profile and access token when username and password is valid', async () => {
      // Given
      usersService.getUserByUsername.mockResolvedValueOnce(userInDB as UserDocument)

      const loginDto = {
        username,
        password
      }

      // When
      const actual = await authService.login(loginDto)

      // Then
      expect(actual.accessToken).toBeDefined()
      expect(actual.profile).toBeDefined()
      expect(actual.profile.username).toEqual(username)
      expect(actual.profile.phoneNumber).toEqual(phoneNumber)
    
    });

    it('should throw not found exception when username is invalid and password is valid', async () => {
      // Given
      usersService.getUserByUsername.mockImplementationOnce((username: never) => {
        throw new NotFoundException
      });

      const loginDto = {
        username: 'wrong username',
        password
      }

      // When
      const login = async () => await authService.login(loginDto)
      // Then
      await expect(login).rejects.toThrowError(NotFoundException)

    })

    it('should throw conflict exception when username is valid and password is invalid', async () => {
      // Given
      usersService.getUserByUsername.mockResolvedValueOnce(userInDB as UserDocument)

      const loginDto = {
        username,
        password: 'wrong password'
      }

      // When
      const login = async () => await authService.login(loginDto)

      // Then
      await expect(login).rejects.toThrowError(ConflictException)

    })

    it('should throw not found exception when username is invalid and password is invalid', async () => {
      // Given
      usersService.getUserByUsername.mockImplementationOnce((username: never) => {
        throw new NotFoundException
      });

      const loginDto = {
        username: 'wrong username',
        password: 'wrong password'
      }

      // When
      const login = async () => await authService.login(loginDto)

      // Then
      await expect(login).rejects.toThrowError(NotFoundException)

    })

  }) 
});
