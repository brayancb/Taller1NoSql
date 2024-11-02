import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadtDto } from './dto/create-unidad.dto'; // Corregido el nombre del DTO
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Unit, UnitDocument } from 'src/schemas/unidad.schemas'; // Ruta corregida
import { Class, ClassDocument } from 'src/schemas/clase.schema';

@Injectable()
export class UnidadService {
  constructor(
    @InjectModel(Unit.name) private unidadModel: Model<UnitDocument>, 
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  //1- Crear una nueva unidad
  async create(createUnidadDto: CreateUnidadtDto): Promise<Unit> {
    const createdUnit = new this.unidadModel(createUnidadDto);
    return createdUnit.save();
  }

  //2- Obtener todas las unidades de un curso específico
  async findByCourse(courseId: string): Promise<Unit[]> {
    return this.unidadModel.find({ courseId: new Types.ObjectId(courseId) }).exec();
  }

  //3- Obtener todas las unidades
  async findAll(): Promise<Unit[]> {
    return this.unidadModel.find().exec();
  }

//Extras

  // Método para obtener una unidad junto con sus clases asociadas
    async findUnitWithClasses(unitId: string): Promise<any> {
      const unidad = await this.unidadModel.findById(unitId).exec();
      if (!unidad) {
        throw new NotFoundException(`Unidad con ID ${unitId} no encontrada`);
      }
      const classes = await this.classModel.find({ unitId: new Types.ObjectId(unitId) }).exec();
      return {
        ...unidad.toObject(),
        classes,
      };
    }

  // Actualizar una unidad por ID
  async update(id: string, updateUnidadDto: UpdateUnidadDto): Promise<Unit> {
    const updatedUnit = await this.unidadModel
      .findByIdAndUpdate(id, updateUnidadDto, { new: true })
      .exec();

    if (!updatedUnit) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }
    return updatedUnit;
  }

  // Eliminar una unidad por ID
  async remove(id: string): Promise<Unit> {
    const deletedUnit = await this.unidadModel.findByIdAndDelete(id).exec();
    if (!deletedUnit) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }
    return deletedUnit;
  }

  // Agregar una clase a la unidad
  async addClass(unitId: string, classId: string): Promise<Unit> {
    const unidad = await this.unidadModel.findById(unitId).exec();
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${unitId} no encontrada`);
    }

    if (!unidad.classes.includes(new Types.ObjectId(classId))) {
      unidad.classes.push(new Types.ObjectId(classId));
      await unidad.save();
    }

    await unidad.populate('classes');
    return unidad;
  }

  // Eliminar una clase de la unidad
  async removeClass(unitId: string, classId: string): Promise<Unit> {
    const unidad = await this.unidadModel.findById(unitId).exec();
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${unitId} no encontrada`);
    }

    unidad.classes = unidad.classes.filter((id) => id.toString() !== classId);
    await unidad.save();

    await unidad.populate('classes');
    return unidad;
  }

}
