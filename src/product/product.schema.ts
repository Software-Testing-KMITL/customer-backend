import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  amount: number;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  // TODO: change this to -> categoryId from category collection (more properly)
  category: string;

  @ApiProperty()
  @Prop()
  picture: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
