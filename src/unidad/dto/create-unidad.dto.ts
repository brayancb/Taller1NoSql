import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateUnidadtDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  order: number; // Orden de la unidad en el curso

  @IsString()
  @IsNotEmpty()
  courseId: string; // Referencia al ID del curso

  @IsArray()
  @IsNotEmpty()
  classes: string[]; // IDs de las clases referenciadas
}
