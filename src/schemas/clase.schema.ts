import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ClassComment extends Document {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  rating: number; // Valoración de 1.0 a 5.0

  @Prop({ required: true })
  detail: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ClassCommentSchema = SchemaFactory.createForClass(ClassComment);

@Schema()
export class Class extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string; // URL del video de la clase

  @Prop([ClassCommentSchema])
  comments: ClassComment[]; // Comentarios directamente dentro de clases

  @Prop({ required: true })
  order: number; // Orden de la clase dentro de la unidad

  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unitId: Types.ObjectId; // Referencia a la unidad correspondiente  
}

export type ClassDocument = Class & Document;
export const ClassSchema = SchemaFactory.createForClass(Class);
