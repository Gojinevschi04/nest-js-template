import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  Paginate,
  Paginated,
  PaginatedSwaggerDocs,
  PaginateQuery,
} from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from './config-user';
import { Public } from '../auth/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiBody({
    type: UserDto,
    description: 'Create new user',
  })
  @Post()
  create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @PaginatedSwaggerDocs(User, USER_PAGINATION_CONFIG)
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.usersService.findAll(query);
  }

  @Public()
  @ApiCreatedResponse({
    description: 'User data found',
    type: UserDto,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto | null> {
    return this.usersService.findOneById(id);
  }

  @ApiBody({
    type: UserDto,
    description: 'Update user',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
