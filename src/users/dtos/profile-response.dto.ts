import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;
}

export class StatusDto {
  @IsNumber()
  @ApiProperty()
  code: number;

  @IsString()
  @ApiProperty()
  message?: string;
}

export class ResponseUserProfileDto {
  @ApiProperty()
  status: StatusDto;

  @ApiProperty()
  profile: UserProfileDto;
}