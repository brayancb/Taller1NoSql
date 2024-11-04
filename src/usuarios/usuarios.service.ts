import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/usuarios.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  
  // Crear un nuevo usuario
  async createUser(name: string, isAdmin: number): Promise<User> {
    const newUser = new this.userModel({ name, isAdmin });
    return newUser.save();
  }

  // Login del usuario
  async loginUser(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name }).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con nombre ${name} no encontrado`);
    }
    return user;
  }
}
