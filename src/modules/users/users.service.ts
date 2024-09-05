import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from './config-user';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: UserDto): Promise<UserDto> {
    const saltOrRounds = this.configService.get<string>(
      'SALT_ROUNDS',
    ) as string;
    const user = plainToInstance(User, createUserDto);

    user.password = await bcrypt.hash(createUserDto.password, +saltOrRounds);

    return plainToInstance(UserDto, this.usersRepository.save(user));
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.usersRepository, USER_PAGINATION_CONFIG);
  }

  async findOneById(id: number): Promise<UserDto | null> {
    return plainToInstance(UserDto, this.usersRepository.findOneBy({ id: id }));
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async update(id: number, updateUserDto: UserDto): Promise<UserDto | null> {
    let oldUserData = await this.usersRepository.findOneBy({ id: id });

    if (!oldUserData) {
      return null;
    }
    const saltOrRounds = this.configService.get<string>(
      'SALT_ROUNDS',
    ) as string;
    oldUserData = plainToInstance(User, updateUserDto);

    oldUserData.password = await bcrypt.hash(
      updateUserDto.password,
      +saltOrRounds,
    );

    return plainToInstance(UserDto, this.usersRepository.save(oldUserData));
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
