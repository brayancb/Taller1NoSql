import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/Cursos.schemas';
import { Unit, UnitSchema } from 'src/schemas/unidad.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema },{ name: Unit.name, schema: UnitSchema },]),
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports : [CursosService]
})
export class CursosModule {}
