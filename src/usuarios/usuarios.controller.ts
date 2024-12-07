import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Post('/register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('/listar')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Post('/login')
  login(@Body() createUsuarioDto: CreateUsuarioDto) {
    const { email, password } = createUsuarioDto;
    return this.usuariosService.login(email, password);
  }

  // Actualizar cursos del usuario
  // Este enpoint llama al metodo addCourseToUser del servicio de usuarios para agregar un curso al arreglo de cursos del usuario
  @Post('/enroll/:email/:courseId')
  async enrollCourse(
    @Param('email') email: string,
    @Param('courseId') courseId: string,
  ) {
    await this.usuariosService.addCourseToUser(email, courseId);
    return { message: `Usuario ${email} inscrito en el curso ${courseId}` };
  }
  
  // Actualizar el PROGRESO de un curso para un usuario y cambiar su ESTADO
  @Post('/updateCourseStatus/:email/:courseId')
  async updateCourseStatus(
    @Param('email') email: string,
    @Param('courseId') courseId: string,
    @Body() updateData: { progreso: number },
  ) {
    const { progreso } = updateData;
    await this.usuariosService.updateCourseStatus(email, courseId, progreso);
    return { message: `Progreso del curso ${courseId} actualizado para el usuario ${email}` };
  }

  // Endpoint para obtener los cursos de un usuario
    @Get('/cursos/:email')
  async getUserCourses(@Param('email') email: string) {
    const usuario = await this.usuariosService.findOne(email);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario.cursos;
  }
}
