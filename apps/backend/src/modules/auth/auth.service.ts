import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Registrierung fehlgeschlagen');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });
    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto) {
    let user: User | null;
    if (dto.identifier.includes('@')) {
      user = await this.usersService.findByEmail(dto.identifier);
    } else {
      user = await this.usersService.findByUsername(dto.identifier);
    }
    if (!user?.passwordHash) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }
    return { id: user.id, email: user.email };
  }
}
