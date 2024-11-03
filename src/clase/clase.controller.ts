import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClassDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  // 1- Crear una nueva clase
  @Post('crearClase')
  create(@Body() createClaseDto: CreateClassDto) {
    return this.claseService.create(createClaseDto);
  }

  // 2- Obtener todas las clases de una unidad específica
  @Get('filtrar/:unitId')
  findClassesByUnit(@Param('unitId') unitId: string) {
    return this.claseService.findClassesByUnit(unitId);
  }

  // 3- Obtener todas las clases
  @Get('listar')
  findAll() {
    return this.claseService.findAll();
  }

  // 4- Dar like a un comentario de una clase
  @Patch('like/:classId/comentario/:commentId')
  incrementLike(@Param('classId') classId: string, @Param('commentId') commentId: string) {
    return this.claseService.incrementLike(classId, commentId);
  }

  // 5- Dar dislike a un comentario de una clase
  @Patch('dislike/:classId/comentario/:commentId')
  incrementDisLike(@Param('classId') classId: string, @Param('commentId') commentId: string) {
    return this.claseService.incrementDisLike(classId, commentId);
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
