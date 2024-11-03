import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateClassCommentDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number; // Valoración de 1.0 a 5.0

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsOptional()
  date?: Date;
}

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  videoUrl: string; // URL del video

  @IsArray()
  @IsOptional()
  comments?: CreateClassCommentDto[];

  @IsNumber()
  @IsNotEmpty()
  order: number; // Orden de la clase dentro de la unidad


  @IsNotEmpty()
  unitId: String; // Referencia a la unidad correspondiente
}


