import {
  // Body,
  Controller,
  // Delete,
  // Get,
  // Param,
  // ParseIntPipe,
  // Post,
  // Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './create-user.dto';
// import { User } from './user.entity';
// import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
  //   return this.usersService.findOne(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User | null> {
  //   return this.usersService.update(id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
