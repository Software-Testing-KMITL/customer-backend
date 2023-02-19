import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'product' })
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
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }])
  category: Category[];

  @ApiProperty()
  @Prop()
  picture: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
