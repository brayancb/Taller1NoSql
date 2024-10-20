import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class cursos extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop()
  imagen_principal: string;

  @Prop()
  imagen_banner: string;

  @Prop({ default: 0 })
  inscritos: number;

  @Prop({ default: 0, min: 1, max: 5 })
  valoracion_promedio: number;

  // Referencia a la colección de unidades
  @Prop({ type: [{ type: Types.ObjectId, ref: 'unidad' }] })
  unidades: Types.ObjectId[];

  // Referencia a la colección de comentarios
  @Prop({ type: [{ type: Types.ObjectId, ref: 'comentario' }] })
  comentarios: Types.ObjectId[];

  // Referencia a la colección de valoraciones
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Rating' }] })
  valoraciones: Types.ObjectId[];
}

export const cursoSchema = SchemaFactory.createForClass(cursos);
