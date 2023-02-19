import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class StatusDto {
  @IsNumber()
  @ApiProperty()
  code: number;

  @IsString()
  @ApiProperty()
  message: string;
}

export class ResponseProductsProfileDto {
  @ApiProperty()
  status: StatusDto;

  @ApiProperty()
  products: CreateProductDto[];
}

export class ResponseProductProfileDto {
  @ApiProperty()
  status: StatusDto;

  @ApiProperty()
  product: CreateProductDto;
}