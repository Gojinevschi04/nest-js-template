import { UserRole } from './enums/user.role';

export class LoginUserDto {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
