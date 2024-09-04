import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/user.entity';
import { UserRole } from '../../modules/users/enums/user.role';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export default class UserSeeder implements Seeder {
  constructor(private configService: ConfigService) {}

  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
    const saltOrRounds = this.configService.get<string>(
      'SALT_ROUNDS',
    ) as string;
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: 'john',
        firstName: 'string',
        lastName: 'string',
        password: await bcrypt.hash('changeme', +saltOrRounds),
        role: UserRole.Admin,
      },
      {
        username: 'maria',
        firstName: 'string',
        lastName: 'string',
        password: await bcrypt.hash('guess', +saltOrRounds),
        role: UserRole.Moderator,
      },
      {
        username: 'weqe',
        firstName: 'string',
        lastName: 'string',
        password: await bcrypt.hash('655587', +saltOrRounds),
        role: UserRole.User,
      },
    ]);
  }
}
