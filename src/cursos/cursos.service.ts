import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { crearCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Course, CourseDocument } from 'src/schemas/Cursos.schemas';

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  // Crear un nuevo curso
  async create(createCursoDto: crearCursoDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCursoDto);
    return createdCourse.save();
  }

  // Obtener todos los cursos (solo información básica: nombre, imagen, descripción y valoración)
  async findAllBasicInfo(): Promise<{ name: string; image: string; shortDescription: string; rating: number }[]> {
    return this.courseModel
      .find({}, 'name image shortDescription rating') // Selecciona solo estos campos
      .exec();
  }

  // Obtener el detalle completo de todos los cursos
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Obtener un curso específico por ID (con detalle completo)
  async findOne(id: string): Promise<Course> {
    return this.courseModel
      .findById(id)
      .populate('units') // Popula las unidades referenciadas
      .exec();
  }

  // Actualizar un curso específico por ID
  async update(id: string, updateCursoDto: UpdateCursoDto): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(id, updateCursoDto, { new: true }).exec();
  }

  // Eliminar un curso por ID
  async remove(id: string): Promise<any> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
