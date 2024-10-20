import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, ArrayNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number; // Rating debe ser entre 1.0 a 5.0

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsOptional()
  date?: Date;
}

export class crearCursoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  image: string; // URL de la imagen

  @IsString()
  @IsNotEmpty()
  banner: string; // URL del banner

  @IsArray()
  @ArrayNotEmpty()
  units: string[]; // Arreglo de IDs de unidades referenciadas

  @IsOptional()
  @IsNumber()
  enrolledUsers?: number;

  @IsArray()
  @IsOptional()
  comments?: CreateCommentDto[];

  @IsNumber()
  @IsNotEmpty()
  rating: number; // Valoración del curso
}
