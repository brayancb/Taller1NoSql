import { Injectable } from '@nestjs/common';
import { driver } from '../neo4j/neo4j.config';

@Injectable()
export class CommentsService {
  async addComment(email: string, courseId: string, text: string, rating: number): Promise<void> {
    const session = driver.session();
    try {
      await session.run(
        `
        MATCH (u:Usuario {email: $email})
        MATCH (c:Curso {id: $courseId})
        CREATE (u)-[:COMENTO {text: $text, rating: $rating, date: datetime()}]->(c)
        `,
        { email, courseId, text, rating },
      );
      console.log('Comentario añadido correctamente');

      // Actualizar el rating promedio del curso
      await session.run(
        `
        MATCH (c:Curso {id: $courseId})<-[:COMENTO]-(com:Comentario)
        WITH c, AVG(com.rating) AS avgRating
        SET c.rating = avgRating
        RETURN c
        `,
        { courseId },
      );
    } finally {
      await session.close();
    }
  }

  async getUserComments(email: string): Promise<any[]> {
    const session = driver.session();
    try {
      const result = await session.run(
        `
        MATCH (u:Usuario {email: $email})-[:COMENTO]->(com)-[:EN]->(c:Curso)
        RETURN com.text AS text, com.rating AS rating, com.date AS date, c.name AS courseName
        `,
        { email },
      );

      return result.records.map(record => ({
        text: record.get('text'),
        rating: record.get('rating'),
        date: record.get('date'),
        courseName: record.get('courseName'),
      }));
    } finally {
      await session.close();
    }
  }
    // Nueva función para obtener todos los nodos existentes
    async getAllNodes(): Promise<any[]> {
      const session = driver.session();
      try {
        const result = await session.run(
          `
          MATCH (n)
          RETURN n
          `
        );
  
        return result.records.map(record => record.get('n').properties);
      } finally {
        await session.close();
      }
    }

      // Nueva función para mostrar la relación usuario -> arista (mensaje) -> curso
  async getUserCourseComments(email: string): Promise<any[]> {
    const session = driver.session();
    try {
      const result = await session.run(
        `
        MATCH (u:Usuario {email: $email})-[r:COMENTO]->(c:Curso)
        RETURN u.email AS userEmail, r.text AS commentText, r.rating AS commentRating, r.date AS commentDate, c.id AS courseId, c.name AS courseName
        `,
        { email },
      );

      return result.records.map(record => ({
        userEmail: record.get('userEmail'),
        commentText: record.get('commentText'),
        commentRating: record.get('commentRating'),
        courseId: record.get('courseId'),
        courseName: record.get('courseName'),
      }));
    } finally {
      await session.close();
    }
  }
  
}