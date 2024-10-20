import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadtDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Post('crearUnidad')
  create(@Body() createUnidadDto: CreateUnidadtDto) {
    return this.unidadService.create(createUnidadDto);
  }


    // Nueva ruta para obtener unidades filtradas por `courseId`
    @Get('course/:courseId')
    async findByCourse(@Param('courseId') courseId: string) {
      const unidades = await this.unidadService.findByCourse(courseId);
      if (!unidades || unidades.length === 0) {
        throw new NotFoundException(`No se encontraron unidades para el curso con ID ${courseId}`);
      }
      return unidades;
    }

  @Get('listar')
  findAll() {
    return this.unidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadDto: UpdateUnidadDto) {
    return this.unidadService.update(id, updateUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadService.remove(id);
  }
}
