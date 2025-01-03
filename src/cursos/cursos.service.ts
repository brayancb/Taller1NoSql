import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { crearCursoDto, CreateCommentDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Course, CourseDocument } from 'src/schemas/Cursos.schemas';
import { Unit, UnitDocument } from 'src/schemas/unidad.schemas';
import { driver } from 'src/Neo4J/neo4j.config';

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Unit.name) private unitModel: Model<UnitDocument>,
  ) {}

  //1- Crear un nuevo curso
  async create(createCursoDto: crearCursoDto): Promise<Course> {
    // Crear y guardar el curso en MongoDB
    const createdCourse = new this.courseModel(createCursoDto);
    const savedCourse = await createdCourse.save();
    //return createdCourse.save();

    // Crear nodo en Neo4j
    const session = driver.session();
    try {
      await session.run(
        'CREATE (c:Curso {id: $id, name: $name, rating: $rating})',
        { id: savedCourse._id.toString(), name: savedCourse.name, rating: savedCourse.rating},
      );
    } finally {
      await session.close();
    }
    return savedCourse;
  }

  //2- Obtener todos los cursos (solo información básica: nombre, imagen, descripción y valoración)
  async findAllBasicInfo(): Promise<
    { name: string; image: string; shortDescription: string; rating: number }[]
  > {
    return this.courseModel
      .find({}, 'name image shortDescription rating') // Selecciona solo estos campos
      .exec();
  }

  //3- Obtener el detalle completo de todos los cursos
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  //Extras

  // Actualizar un curso específico por ID
  async update(id: string, updateCursoDto: UpdateCursoDto): Promise<Course> {
    return this.courseModel
      .findByIdAndUpdate(id, updateCursoDto, { new: true })
      .exec();
  }

  // Eliminar un curso por ID
  async remove(id: string): Promise<any> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  // Método para obtener el curso con sus unidades asociadas
  async findCourseWithUnitsAndClasses(courseId: string): Promise<any> {
    // 1. Consultar el curso por su ID
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    // 2. Consultar las unidades asociadas al curso usando el `courseId`
    const units = await this.unitModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .exec();

    // 3. Combinar el curso con sus unidades
    return {
      ...course.toObject(), // Convertimos el documento de Mongoose a un objeto normal
      units, // Agregamos las unidades al objeto de respuesta
    };
  }

  //Método para obtener los 3 comentarios más valorados por rating
  async findTopComments(courseId: string): Promise<any> {
    // Consultar el curso por su ID
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    // Obtener los comentarios del curso y ordenarlos por 'rating' en orden descendente
    const topComments = course.comments
      .sort((a, b) => b.rating - a.rating) // Ordenar comentarios por 'rating'
      .slice(0, 3); // Obtener los 3 más valorados

    return topComments;
  }

  // Método para obtener todos los comentarios de un curso
  async findAllComments(courseId: string): Promise<any[]> {
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    return course.comments; // Retorna todos los comentarios del curso
  }

  // Método para agregar un comentario a un curso
  async addComment(
    courseId: string,
    createComentDto: CreateCommentDto,
  ): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    const commentWithDate = {
      //En caso de no agregar fecha, por defecto se asigna la fecha actual
      ...createComentDto,
      date: createComentDto.date || new Date(),
    };

    course.comments.push(createComentDto as any);
    return course.save(); // Agregar el nuevo comentario al array de comentarios
  }
}
