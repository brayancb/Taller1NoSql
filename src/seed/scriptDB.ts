import { DynamoDBClient, ListTablesCommand, DeleteTableCommand, CreateTableCommand, ScalarAttributeType, KeyType, PutItemCommand } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import { driver } from '../neo4j/neo4j.config';
import { CommentsService } from '../comentarios/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/Cursos.schemas';
import { Unit, UnitSchema } from 'src/schemas/unidad.schemas';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';


// Carga las variables de entorno desde el archivo .env
dotenv.config();

const client = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const listTables = async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log('Existing tables:', data.TableNames);
  } catch (error) {
    console.error('Error listing tables:', error);
  }
};

export const deleteTable = async (tableName: string) => {
  const params = {
    TableName: tableName,
  };

  try {
    await client.send(new DeleteTableCommand(params));
    console.log(`Table ${tableName} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting table ${tableName}:`, error);
  }
};

export const createTable = async () => {
  try {
    // Verificar si la tabla ya existe
    const existingTables = await client.send(new ListTablesCommand({}));
    if (existingTables.TableNames.includes('Users')) {
      console.log('La tabla "Users" ya existe. Se omite la creación.');
      return;
    }
    const params = {
      TableName: 'Users',
      KeySchema: [
        { AttributeName: 'email', KeyType: KeyType.HASH }, // Primary key
      ],
      AttributeDefinitions: [
        { AttributeName: 'email', AttributeType: ScalarAttributeType.S }, // 'S' significa string
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    await client.send(new CreateTableCommand(params));
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

const users = [
  {
    email: 'jorge@example.com',
    name: 'Jorge',
    password: 'password123',
    cursos: [
      { idCurso: '67239fb5b27a1a90bbdfc7d1', estado: 'iniciado', fechaIngreso: new Date().toISOString(), progreso: 10 },
      { idCurso: '67239fb5b27a1a90bbdfc7d2', estado: 'en curso', fechaIngreso: new Date().toISOString(), progreso: 50 }
    ]
  },
  {
    email: 'marta@example.com',
    name: 'Marta',
    password: 'password123',
    cursos: [
      { idCurso: '67239fb5b27a1a90bbdfc7d1', estado: 'completado', fechaIngreso: new Date().toISOString(), progreso: 100 }
    ]
  },
  {
    email: 'ana@example.com',
    name: 'Ana',
    password: 'password123',
    cursos: [
      { idCurso: '67239fb5b27a1a90bbdfc7d2', estado: 'iniciado', fechaIngreso: new Date().toISOString(), progreso: 20 }
    ]
  }
];

export const populateUsers = async () => {
  try {
    for (const user of users) {
      const params = {
        TableName: 'Users',
        Item: {
          email: { S: user.email },
          name: { S: user.name },
          password: { S: user.password },
          cursos: { L: user.cursos.map(curso => ({
            M: {
              idCurso: { S: curso.idCurso },
              estado: { S: curso.estado },
              fechaIngreso: { S: curso.fechaIngreso },
              progreso: { N: curso.progreso.toString() }
            }
          })) }
        }
      };
      await client.send(new PutItemCommand(params));

      // Crear nodo de usuario en Neo4j
      const session = driver.session();
      try {
        await session.run(
          'CREATE (u:Usuario {email: $email, name: $name})',
          { email: user.email, name: user.name },
        );
      } finally {
        await session.close();
      }
    }
    console.log('Users populated successfully');
  } catch (error) {
    console.error('Error populating users:', error);
  }
};

// Nueva función para agregar comentarios de prueba
export const addTestComments = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const commentsService = app.get(CommentsService);
  await commentsService.addTestComments();
  await app.close();
};

// Llama a las funciones según sea necesario
(async () => {
  //await listTables();
  //await deleteTable('Users');
  //await createTable();
  //await populateUsers();
})();