import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { Unit, UnitSchema } from 'src/schemas/unidad.schemas';
import { Class, ClassSchema } from 'src/schemas/clase.schema';
import { Course,CourseSchema } from 'src/schemas/Cursos.schemas';;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
