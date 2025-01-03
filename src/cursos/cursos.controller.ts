import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { crearCursoDto, CreateCommentDto } from './dto/create-curso.dto';
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
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }

  // Obtener un curso con unidades y clases anidadas
  @Get('cursoFull/:id')
  async getCourseWithUnitsAndClasses(@Param('id') id: string) {
    return this.cursosService.findCourseWithUnitsAndClasses(id);
  }

  //Obtener los 3 comentarios más valorados
  @Get('comentarios/top/:id')
  async getTopComments(@Param('id') id: string) {
    return this.cursosService.findTopComments(id);
  }

  //Obtener todos los comentarios para un curso
  @Get('comentarios/:id')
  async getAllComments(@Param('id') id: string) {
    return this.cursosService.findAllComments(id);
  }

  //Agregar un comentario a un curso
  @Post(':id/addComentario')
  async addCommentToCourse(
    @Param('id') courseId: string,
    @Body() createComentDto: CreateCommentDto,
  ) {
    return this.cursosService.addComment(courseId, createComentDto);
  }
}
