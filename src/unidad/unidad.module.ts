import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { unidad, UnitSchema } from 'src/schemas/unidad.schemas'; // Ruta corregida

@Module({
  imports: [
    MongooseModule.forFeature([{ name: unidad.name, schema: UnitSchema }]),
  ],
  controllers: [UnidadController],
  providers: [UnidadService],
  exports: [UnidadService],
})
export class UnidadModule {}
