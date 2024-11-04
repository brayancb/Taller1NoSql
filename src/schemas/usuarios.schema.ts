import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 }) // 1 para admin, 0 para usuario normal
  isAdmin: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
