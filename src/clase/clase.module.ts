import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Class, ClassSchema } from 'src/schemas/clase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
  ],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
