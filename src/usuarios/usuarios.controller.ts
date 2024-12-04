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
}
