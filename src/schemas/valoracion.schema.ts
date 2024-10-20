import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Rating extends Document {
  @Prop({ required: true, min: 1, max: 5 })
  puntuacion: number;

  @Prop({ required: true })
  autor: string;

  @Prop({ default: Date.now })
  fecha: Date;

  // Referencia al curso al que pertenece la valoración
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  curso: Types.ObjectId;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
