import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/login-user.dto';
import { BearerTokenDto } from './dto/bearerTokenDto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const saltOrRounds = this.configService.get<string>(
      'SALT_ROUNDS',
    ) as string;
    const hash = await bcrypt.hash(pass, +saltOrRounds);
    const isMatch = await bcrypt.compare(pass, hash);
    if (isMatch) {
      return user;
    }

    return null;
  }

  async login(userData: LoginUserDto): Promise<BearerTokenDto> {
    const payload = {
      username: userData.username,
      sub: userData.id,
      role: userData.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
