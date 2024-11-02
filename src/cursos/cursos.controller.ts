import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { crearCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post('crearCurso')
  create(@Body() createCursoDto: crearCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  // Obtener solo la información básica de todos los cursos
  @Get('infoBasica')
  findAllBasicInfo() {
    return this.cursosService.findAllBasicInfo();
  }

  // Obtener el detalle completo de todos los cursos
  @Get('listar')
  findAll() {
    return this.cursosService.findAll();
  }

  // Actualizar un curso por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  // Eliminar un curso por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }

  // Obtener un curso con unidades y clases anidadas
  @Get('cursoFull/:id')
  async getCourseWithUnitsAndClasses(@Param('id') id: string) {
    return this.cursosService.findCourseWithUnitsAndClasses(id);
  }
}
