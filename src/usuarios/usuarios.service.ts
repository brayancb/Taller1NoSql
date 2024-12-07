import { Injectable, Inject } from '@nestjs/common';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Usuario } from '../schemas/usuario.interface';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuarioService {
  private readonly tableName = 'Users';

  constructor(
    @Inject('DYNAMODB_CLIENT')
    private readonly dynamoDbClient: DynamoDBDocumentClient,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<void> {
    const { name, email, password, cursos } = createUsuarioDto;
  
    console.log('Datos recibidos:', createUsuarioDto);

    const newUser: Usuario = {
      name,
      email,
      password,
      cursos: [], // Inicialmente no tiene cursos
    };
  
    const params = {
      TableName: this.tableName,
      Item: newUser,
    };
  
    await this.dynamoDbClient.send(new PutCommand(params));
  }

  // Obtener todos los usuarios (opcional, no recomendado para grandes tablas)
  async findAll(): Promise<Usuario[]> {
    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDbClient.send(new ScanCommand(params));
    return result.Items as Usuario[];
  }

  // Obtener un usuario por email (Partition Key)
  async findOne(email: string): Promise<Usuario> {
    const params = {
      TableName: this.tableName,
      Key: { email },
    };

    const result = await this.dynamoDbClient.send(new GetCommand(params));
    return result.Item as Usuario;
  }

  // Actualizar cursos del usuario
  async updateCourses(email: string, cursos: string[]): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { email },
      UpdateExpression: 'SET cursos = :cursos',
      ExpressionAttributeValues: {
        ':cursos': cursos,
      },
    };

    await this.dynamoDbClient.send(new UpdateCommand(params));
  }

  // Método para agregar un curso al usuario con información adicional
  // La forma en que se ejecuta el updateCourses sobrescribe los cursos existentes, esta forma no los sobreescribe
  // Falta probarlo asi que por eso deje este y el de arriba para ver cual funciona mejor
  async addCourseToUser(email: string, courseId: string): Promise<void> {
    const nuevoCurso = {
      idCurso: courseId,
      estado: 'INICIADO',
      fechaIngreso: new Date().toISOString(),
      progreso: 0,
    };
    const params = {
      TableName: this.tableName,
      Key: { email },
      UpdateExpression: 'SET cursos = list_append(if_not_exists(cursos, :empty_list), :nuevoCurso)',
      ExpressionAttributeValues: {
        ':nuevoCurso': [nuevoCurso],
        ':empty_list': [],
      },
    };

    await this.dynamoDbClient.send(new UpdateCommand(params));
  }

  // Método para actualizar el progreso de un curso de un usuario y cambiar su estado de acuerdo al progreso
  async updateCourseStatus(
    email: string,
    courseId: string,
    progreso: number,
  ): Promise<void> {
    // Obtener el usuario actual
    const usuario = await this.findOne(email);
  
    if (!usuario || !usuario.cursos) {
      throw new Error('Usuario no encontrado o sin cursos inscritos');
    }

    // Determinar el estado de acuerdo al progreso
    let estado: 'INICIADO' | 'EN CURSO' | 'COMPLETADO';

    if (progreso <= 0) {
      estado = 'INICIADO';
    } else if (progreso > 0 && progreso < 100) {
      estado = 'EN CURSO';
    } else if (progreso >= 100) {
      estado = 'COMPLETADO';
      progreso = 100; // Asegurarse de que el progreso no exceda el 100%
    } else {
      throw new Error('El progreso debe estar entre 0 y 100');
    }
  
    // Actualizar el curso específico
    const cursosActualizados = usuario.cursos.map((curso) => {
      if (curso.idCurso === courseId) {
        return {
          ...curso,
          estado,
          progreso,
        };
      }
      return curso;
    });
  
    // Guardar los cambios en DynamoDB
    const params = {
      TableName: this.tableName,
      Key: { email },
      UpdateExpression: 'SET cursos = :cursos',
      ExpressionAttributeValues: {
        ':cursos': cursosActualizados,
      },
    };
  
    await this.dynamoDbClient.send(new UpdateCommand(params));
  }

  async login (email: string, password: string): Promise<Usuario> {
    const user = await this.findOne(email);
    if (!user || user.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    return user;
  }
}