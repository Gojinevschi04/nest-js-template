import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BearerTokenDto } from './dto/bearerTokenDto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRole } from '../users/enums/user.role';
import { Roles } from '../users/users.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginDto,
    description: 'User credentials',
  })
  @ApiCreatedResponse({
    description: 'Authentication successfully',
    type: BearerTokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async login(@Request() req: any): Promise<BearerTokenDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Admin)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
