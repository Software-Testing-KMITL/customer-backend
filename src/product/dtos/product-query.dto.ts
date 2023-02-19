import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductQuery {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  perPage: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  category: string[];
}
