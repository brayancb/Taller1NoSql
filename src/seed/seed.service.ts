import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from 'src/schemas/Cursos.schemas';
import { Unit } from 'src/schemas/unidad.schemas';
import { Class } from 'src/schemas/clase.schema';
import { driver } from '../neo4j/neo4j.config';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Unit.name) private unitModel: Model<Unit>,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  async seedDatabase() {
    // Curso 1: JavaScript Básico
    const course1Exists = await this.courseModel.exists({ _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d1') });
    if (!course1Exists) {
      const course1 = new this.courseModel({
        _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d1'),
        name: "Curso de Programación en JavaScript",
        shortDescription: "Aprende desde lo básico hasta avanzado en JavaScript.",
        image: "https://linkalaimagen.com/imagen_principal.jpg",
        banner: "https://linkalbanner.com/banner.jpg",
        enrolledUsers: 0,
        comments: [
          { author: "jorge", rating: 3, detail: "Curso básico, algo desordenado", date: new Date("2024-10-15T14:48:00.000Z") },
          { author: "Marta", rating: 4.5, detail: "Buena introducción", date: new Date("2024-10-16T09:30:00.000Z") }
        ],
        rating: 4.8,
      });
      await course1.save();

            // Crear nodo de curso en Neo4j
            const session = driver.session();
            try {
              await session.run(
                'CREATE (c:Curso {id: $id, name: $name})',
                { id: course1._id.toString(), name: course1.name },
              );
            } finally {
              await session.close();
            }
          

      const units1 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07c5'), name: "Introducción a JavaScript", order: 1, courseId: course1._id },
        { _id: new Types.ObjectId('67243acbc56c0990e35a07c6'), name: "JavaScript nivel intermedio", order: 2, courseId: course1._id }
      ];
      await this.unitModel.insertMany(units1);

      const classes1 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07c7'), name: "Arraylist en JavaScript", description: "Clase introductoria a Arraylist en JS.", videoUrl: "https://youtube.com/video.mp4", order: 1, unitId: units1[0]._id, comments: [
          { author: "jorge", like: 0, disLike: 0, detail: "¿Qué es un componente?", date: new Date("2024-11-03T00:00:00.000Z") }
        ]}
      ];
      await this.classModel.insertMany(classes1);
    }

    // Curso 2: Python Avanzado
    const course2Exists = await this.courseModel.exists({ _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d2') });
    if (!course2Exists) {
      const course2 = new this.courseModel({
        _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d2'),
        name: "Curso de Python Avanzado",
        shortDescription: "Domina Python y sus aplicaciones avanzadas.",
        image: "https://linkalaimagen.com/python.jpg",
        banner: "https://linkalbanner.com/python_banner.jpg",
        enrolledUsers: 0,
        comments: [
          { author: "Ana", rating: 5, detail: "Curso excelente para profundizar en Python.", date: new Date("2024-10-20T08:30:00.000Z") }
        ],
        rating: 4.9,
      });
      await course2.save();

            // Crear nodo de curso en Neo4j
            const session = driver.session();
            try {
              await session.run(
                'CREATE (c:Curso {id: $id, name: $name})',
                { id: course2._id.toString(), name: course2.name },
              );
            } finally {
              await session.close();
            }
          

      const units2 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07c8'), name: "Automatización con Python", order: 1, courseId: course2._id },
        { _id: new Types.ObjectId('67243acbc56c0990e35a07c9'), name: "Web Scraping Avanzado", order: 2, courseId: course2._id }
      ];
      await this.unitModel.insertMany(units2);

      const classes2 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07d0'), name: "Introducción a Web Scraping", description: "Clase avanzada de Web Scraping en Python.", videoUrl: "https://youtube.com/python_scraping.mp4", order: 1, unitId: units2[1]._id, comments: [
          { author: "luis", like: 2, disLike: 0, detail: "Clase excelente, bien explicada.", date: new Date("2024-11-04T00:00:00.000Z") }
        ]}
      ];
      await this.classModel.insertMany(classes2);
    }

    // Curso 3: Desarrollo Web con React
    const course3Exists = await this.courseModel.exists({ _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d3') });
    if (!course3Exists) {
      const course3 = new this.courseModel({
        _id: new Types.ObjectId('67239fb5b27a1a90bbdfc7d3'),
        name: "Desarrollo Web con React",
        shortDescription: "Aprende a crear aplicaciones web con React.",
        image: "https://linkalaimagen.com/react.jpg",
        banner: "https://linkalbanner.com/react_banner.jpg",
        enrolledUsers: 0,
        comments: [
          { author: "Carlos", rating: 4, detail: "Muy buen curso, práctico y detallado.", date: new Date("2024-10-25T11:15:00.000Z") }
        ],
        rating: 4.7,
      });
      await course3.save();

            // Crear nodo de curso en Neo4j
            const session = driver.session();
            try {
              await session.run(
                'CREATE (c:Curso {id: $id, name: $name})',
                { id: course3._id.toString(), name: course3.name },
              );
            } finally {
              await session.close();
            }

      const units3 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07d1'), name: "Fundamentos de React", order: 1, courseId: course3._id },
        { _id: new Types.ObjectId('67243acbc56c0990e35a07d2'), name: "Componentes y Hooks", order: 2, courseId: course3._id }
      ];
      await this.unitModel.insertMany(units3);

      const classes3 = [
        { _id: new Types.ObjectId('67243acbc56c0990e35a07d3'), name: "Introducción a Hooks", description: "Clase sobre Hooks en React.", videoUrl: "https://youtube.com/react_hooks.mp4", order: 1, unitId: units3[1]._id, comments: [
          { author: "Maria", like: 1, disLike: 0, detail: "Muy útil para entender los hooks.", date: new Date("2024-11-05T00:00:00.000Z") }
        ]}
      ];
      await this.classModel.insertMany(classes3);
    }

    console.log('Base de datos poblada con éxito');
  }
}
