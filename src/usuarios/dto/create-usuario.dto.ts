import { IsArray, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
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
    
    @IsArray()
    @IsString()
    cursos: string[]; // Arreglo de IDs de cursos referenciados
  }

