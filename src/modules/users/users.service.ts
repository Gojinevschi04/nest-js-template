import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { CreateUserDto } from './create-user.dto';
// import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = new User();
  //   user.firstName = createUserDto.firstName;
  //   user.lastName = createUserDto.lastName;
  //   user.username = createUserDto.username;
  //   user.password = createUserDto.password;
  //
  //   return this.usersRepository.save(user);
  // }
  //
  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  //
  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  //
  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
  //   const oldUserData = await this.usersRepository.findOneBy({ id: id });
  //
  //   if (!oldUserData) {
  //     return null;
  //   }
  //
  //   oldUserData.firstName = updateUserDto.firstName;
  //   oldUserData.lastName = updateUserDto.lastName;
  //
  //   return this.usersRepository.save(oldUserData);
  // }
  //
  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
