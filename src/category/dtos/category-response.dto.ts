import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateCategoryDto } from './category.dto';

export class StatusDto {
  @IsNumber()
  @ApiProperty()
  code: number;

  @IsString()
  @ApiProperty()
  message: string;
}

export class ResponseCategoriesDto {
  @ApiProperty()
  status: StatusDto;

  @ApiProperty()
  category: CreateCategoryDto[];
}
