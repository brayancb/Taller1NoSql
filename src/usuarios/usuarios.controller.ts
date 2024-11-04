import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createUser(createUsuarioDto.name, createUsuarioDto.isAdmin);
  }

  @Post('login')
  login(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.loginUser(createUsuarioDto.name);
  }
}
