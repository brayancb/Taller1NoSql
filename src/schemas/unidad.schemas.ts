import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Unit {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  order: number; // Orden de la unidad dentro del curso

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId; // Referencia al curso correspondiente

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }] })
  classes: Types.ObjectId[]; // Referencia a las clases dentro de la unidad
}

export type UnitDocument = Unit & Document;
export const UnitSchema = SchemaFactory.createForClass(Unit);
