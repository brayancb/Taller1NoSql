import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from 'src/schemas/clase.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClaseService {
  constructor(
    @InjectModel(Class.name) private claseModel: Model<Class>,
  ) {}

  // 1-Crear una nueva clase
  async create(createClassDto: CreateClassDto): Promise<Class> {
    const newClass = new this.claseModel(createClassDto);
    return newClass.save();
  }

  // 2- Obtener todas las clases de una unidad específica
  async findClassesByUnit(unitId: string): Promise<Class[]> {
    return this.claseModel.find({ unitId: new Types.ObjectId(unitId) }).exec();
  }

  // 3- Obtener todas las clases
  async findAll(): Promise<Class[]> {
    return this.claseModel.find().exec();
  }

  // Obtener una clase por su ID
  async findOne(id: string): Promise<Class> {
    const clase = await this.claseModel.findById(id).exec();
    if (!clase) {
      throw new NotFoundException(`Clase with ID ${id} not found`);
    }
    return clase;
  }

  // Actualizar una clase por su ID
  async update(id: string, updateClassDto: UpdateClaseDto): Promise<Class> {
    const updatedClase = await this.claseModel
      .findByIdAndUpdate(id, updateClassDto, { new: true })
      .exec();

    if (!updatedClase) {
      throw new NotFoundException(`Clase with ID ${id} not found`);
    }
    return updatedClase;
  }

  // Eliminar una clase por su ID
  async remove(id: string): Promise<void> {
    const result = await this.claseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Clase with ID ${id} not found`);
    }
  }
}