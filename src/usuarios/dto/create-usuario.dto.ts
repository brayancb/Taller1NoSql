import { IsArray, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CursoUsuarioDto {
  @IsString()
  @IsNotEmpty()
  idCurso: string;

  @IsString()
  @IsNotEmpty()
  estado: 'INICIADO' | 'EN CURSO' | 'COMPLETADO';

  @IsString()
  @IsNotEmpty()
  fechaIngreso: string;

  @IsNumber()
  @IsNotEmpty()
  progreso: number;
}

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    name: string; // Nombre del usuario
  
    @IsString()
    @IsNotEmpty()
    email: string; // Correo electrónico
  
    @IsString()
    @IsNotEmpty()
    password: string; // Contraseña
    
    @IsOptional()
    @IsArray()
    @IsString()
    @ValidateNested({ each: true })
    @Type(() => CursoUsuarioDto)
    cursos?: CursoUsuarioDto[]; // Arreglo de IDs de cursos asociados al usuario con su estado y progreso
  }

