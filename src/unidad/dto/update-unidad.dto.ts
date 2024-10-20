import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadtDto } from './create-unidad.dto';

export class UpdateUnidadDto extends PartialType(CreateUnidadtDto) {}
