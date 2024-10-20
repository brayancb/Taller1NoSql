import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  autor: string;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  detalle: string;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ default: 0 })
  me_gusta: number;

  @Prop({ default: 0 })
  no_me_gusta: number;

  // Referencia al curso al que pertenece el comentario
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  curso: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
