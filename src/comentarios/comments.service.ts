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
        CREATE (u)-[:COMENTO]->(com:Comentario {text: $text, rating: $rating, date: datetime()})-[:EN]->(c)
        `,
        { email, courseId, text, rating },
      );
      console.log('Comentario añadido correctamente');

      // Actualizar el rating promedio del curso
      await session.run(
        `
        MATCH (c:Curso {id: $courseId})<-[:EN]-(com:Comentario)
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
}