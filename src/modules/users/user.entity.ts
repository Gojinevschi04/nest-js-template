import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './enums/user.role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
}
