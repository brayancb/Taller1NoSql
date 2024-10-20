import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  rating: number; // Valoración de 1.0 a 5.0

  @Prop({ required: true })
  detail: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  image: string; // Imagen de la pantalla principal

  @Prop({ required: true })
  banner: string; // Imagen del banner en el detalle

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Unit' }] })
  units: Types.ObjectId[]; // Referencia a las unidades

  @Prop({ default: 0 })
  enrolledUsers: number;

  @Prop([CommentSchema])
  comments: Comment[]; // Comentarios directamente dentro de cursos

  @Prop({ required: true })
  rating: number; // Valoración del curso
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
