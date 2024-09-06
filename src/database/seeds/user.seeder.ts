import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/user.entity';
import { UserRole } from '../../modules/users/enums/user.role';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default class UserSeeder implements Seeder {
  constructor(private configService: ConfigService) {}

  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
    const saltOrRounds = 10;
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: 'john',
        firstName: 'string',
        lastName: 'string',
        email: '113@212',
        password: await bcrypt.hash('changeme', +saltOrRounds),
        role: UserRole.Admin,
      },
      {
        username: 'maria',
        firstName: 'string',
        lastName: 'string',
        email: '42341@4124',
        password: await bcrypt.hash('guess', +saltOrRounds),
        role: UserRole.Moderator,
      },
      {
        username: 'weqe',
        firstName: 'string',
        lastName: 'string',
        email: '655@6432',
        password: await bcrypt.hash('655587', +saltOrRounds),
        role: UserRole.User,
      },
    ]);
  }
}
