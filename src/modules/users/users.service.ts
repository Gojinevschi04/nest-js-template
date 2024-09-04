import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// // import { User } from './user.entity';
// import { CreateUserDto } from './create-user.dto';
// import { UpdateUserDto } from './update-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  // constructor(
  //   // @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

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
  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id: id });
  // }
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
