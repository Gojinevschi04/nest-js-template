import { UserRole } from './enums/user.role';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}
