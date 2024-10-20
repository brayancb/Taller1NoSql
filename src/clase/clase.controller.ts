import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClassDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  // Crear una nueva clase
  @Post('crearClase')
  create(@Body() createClaseDto: CreateClassDto) {
    return this.claseService.create(createClaseDto);
  }

  // Obtener todas las clases
  @Get('listar')
  findAll() {
    return this.claseService.findAll();
  }

  // Obtener una clase por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claseService.findOne(id); // Eliminamos el operador + para que tome el ID como string
  }

  // Actualizar una clase por su ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaseDto: UpdateClaseDto) {
    return this.claseService.update(id, updateClaseDto); // Eliminamos el operador + para el ID
  }

  // Eliminar una clase por su ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claseService.remove(id); // Eliminamos el operador + para que el ID sea un string
  }
}
