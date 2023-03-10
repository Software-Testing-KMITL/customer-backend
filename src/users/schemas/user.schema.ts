import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {

  @Prop({ unique: true, required: true })
  username: string

  @Prop({ required: true })
  hashedPassword: string

  @Prop({ required: true })
  phoneNumber: string
}

export const UserSchema = SchemaFactory.createForClass(User)
