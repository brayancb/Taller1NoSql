import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DynamoDBModule } from '../dynamodbDTO/dynamodb.module'; // Asegúrate de importar el módulo correcto

@Module({
  imports: [
    DynamoDBModule, // Importa el módulo DynamoDB
  ],
  controllers: [UsuariosController],
  providers: [UsuarioService],
})
export class UsuariosModule {}