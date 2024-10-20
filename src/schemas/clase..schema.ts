import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class clase extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  orden: number;  // Orden de la clase dentro de la unidad

  @Prop({ required: true })
  url_video: string;  // URL del video

  @Prop([String])
  adjuntos: string[];  // Archivos adjuntos como URLs

  // Referencia a la unidad a la que pertenece
  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unidad: Types.ObjectId;
}

export const claseSchema = SchemaFactory.createForClass(clase);
