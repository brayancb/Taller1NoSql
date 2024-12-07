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
      cursos,
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

  // Método para agregar un curso al usuario
  // La forma en que se ejecuta el updateCourses sobrescribe los cursos existentes, esta forma no los sobreescribe
  // Falta probarlo asi que por eso deje este y el de arriba para ver cual funciona mejor
  async addCourseToUser(email: string, courseId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { email },
      UpdateExpression: 'SET cursos = list_append(if_not_exists(cursos, :empty_list), :courseId)',
      ExpressionAttributeValues: {
        ':courseId': [courseId],
        ':empty_list': [],
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