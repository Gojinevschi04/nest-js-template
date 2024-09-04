import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/login-user.dto';
import { BearerTokenDto } from './dto/bearerTokenDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userData: LoginUserDto): Promise<BearerTokenDto> {
    const payload = { username: userData.username, sub: userData.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
