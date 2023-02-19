import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Collection, HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: 'category' })
export class Category {
  @ApiProperty()
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
