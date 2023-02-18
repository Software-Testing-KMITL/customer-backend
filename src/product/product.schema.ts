import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  // TODO: change this to -> categoryId from category collection (more properly)
  category: string;

  @Prop()
  picture: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
