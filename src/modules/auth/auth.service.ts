import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { BearerTokenDto } from './dto/bearerTokenDto';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return user;
    }

    return null;
  }

  async login(userData: LoginUserDto): Promise<BearerTokenDto> {
    const bearerDto = new BearerTokenDto();
    bearerDto.accessToken = this.jwtService.sign(instanceToPlain(userData));
    return bearerDto;
  }
}
