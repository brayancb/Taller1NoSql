import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaseModule } from './clase/clase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UnidadModule } from './unidad/unidad.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [
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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
