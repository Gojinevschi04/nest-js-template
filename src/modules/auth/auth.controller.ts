import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BearerTokenDto } from './dto/bearerTokenDto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
