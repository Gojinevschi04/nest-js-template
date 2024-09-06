import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from './config-user';
import { plainToInstance } from 'class-transformer';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
    @InjectQueue('email') private readonly emailQueue: Queue,
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

  async changePassword(
    userData: User,
    userChangePasswordDto: UserChangePasswordDto,
  ): Promise<void> {
    const isMatch = await bcrypt.compare(
      userChangePasswordDto.currentPassword,
      userData.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Wrong Password');
    }
    if (
      userChangePasswordDto.newPassword !==
      userChangePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException("Confirmed password doesn't match");
    }
    if (
      userChangePasswordDto.currentPassword ===
      userChangePasswordDto.newPassword
    ) {
      throw new BadRequestException(
        "Your new password can't be your old password",
      );
    }
    const saltOrRounds = this.configService.get<string>(
      'SALT_ROUNDS',
    ) as string;
    userData.password = await bcrypt.hash(
      userChangePasswordDto.newPassword,
      +saltOrRounds,
    );
    await this.usersRepository.save(userData);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async sendEmail(data: { to: string; subject: string; text: string }) {
    data = {
      to: 'andreitilru@gmail.com',
      subject: 'test',
      text: 'congratulations!',
    };
    console.log(321);
    await this.emailQueue.add(data);
    console.log(123);
    return { message: 'Email added to the queue' };
  }
}
