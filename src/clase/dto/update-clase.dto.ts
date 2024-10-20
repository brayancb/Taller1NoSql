import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-clase.dto';

export class UpdateClaseDto extends PartialType(CreateClassDto) {}
