import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from 'src/schemas/unidad.schemas';
import { Class, ClassSchema } from 'src/schemas/clase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema },{ name: Class.name, schema: ClassSchema } ]), 
  ],
  controllers: [UnidadController],
  providers: [UnidadService],
  exports: [UnidadService],
})
export class UnidadModule {}
