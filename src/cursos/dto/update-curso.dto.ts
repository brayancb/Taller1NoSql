import { PartialType } from '@nestjs/mapped-types';
import { crearCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(crearCursoDto) {}
