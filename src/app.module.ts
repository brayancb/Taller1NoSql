import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaseModule } from './clase/clase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UnidadModule } from './unidad/unidad.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosModule } from './cursos/cursos.module';
import { SeedModule } from './seed/seed.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { createTable, deleteTable, listTables, populateUsers, addTestComments } from './seed/scriptDB';
import { CommentsModule } from './comentarios/comments.module';

let initialized = false;

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    }),
    ClaseModule,
    UnidadModule,
    CursosModule,
    UsuariosModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    if (!initialized) {
      initialized = true;
      console.log('Initializing DynamoDB tables...');
      try {
        await createTable();
        await populateUsers();
        await listTables();
        await addTestComments();
      } catch (error) {
        console.error('Error initializing DynamoDB tables:', error);
      }
    }
  }
}