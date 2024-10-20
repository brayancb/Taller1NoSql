import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class unidad extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  orden: number;  // Orden de la unidad dentro del curso

  // Referencia a la colección de clases
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }] })
  clases: Types.ObjectId[];

  // Referencia al curso al que pertenece
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  curso: Types.ObjectId;
}

export const unidadSchema = SchemaFactory.createForClass(unidad);
