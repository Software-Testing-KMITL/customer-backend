import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: createMock<AuthService>() }
      ]

    }).compile();

    authController = module.get(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('POST /login', () => {
    const username = 'User'
    const password = '1234'
    const phoneNumber = '0878162718'

    it('should return status code 200 with user profile and access token when username and password are valid', async () => {
      // Given
      authService.login.mockResolvedValueOnce({
        profile: {
          username,
          phoneNumber
        },
        accessToken: 'test'
      })

      const loginDto = {
        username,
        password
      }

      // When
      const actual = await authController.login(loginDto)

      // Then
      expect(actual.status.code).toEqual(200)
      expect(actual.status.message).toBeDefined()
      expect(actual.profile).toBeDefined()
      expect(actual.accessToken).toBeDefined()
      expect(actual.profile.username).toEqual(username)
      expect(actual.profile.phoneNumber).toEqual(phoneNumber)

    })


    it('should throw not found exception when username is invalid and password valid', async () => {
      // Given
      authService.login.mockImplementationOnce(() => {
        throw new NotFoundException()
      })

      const loginDto = {
        username: 'wrong username',
        password
      }

      // When
      const login = async () => authController.login(loginDto)

      // Then
      await expect(login).rejects.toThrowError(NotFoundException)
    })

    it('should throw conflict exception when username is valid and password invalid', async () => {
      // Given
      authService.login.mockImplementationOnce(() => {
        throw new ConflictException()
      })

      const loginDto = {
        username,
        password: 'wrong password'
      }

      // When
      const login = async () => authController.login(loginDto)

      // Then
      await expect(login).rejects.toThrowError(ConflictException)
    })

    it('should throw not found exception when username is invalid and password valid', async () => {
      // Given
      authService.login.mockImplementationOnce(() => {
        throw new NotFoundException()
      })

      const loginDto = {
        username: 'wrong password',
        password
      }

      // When
      const login = async () => authController.login(loginDto)

      // Then
      await expect(login).rejects.toThrowError(NotFoundException)
    })

  })
});
