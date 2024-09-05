import { UserRole } from '../enums/user.role';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
  @ApiProperty({ enum: ['user', 'admin', 'moderator'] })
  @IsNotEmpty()
  @IsEnum(UserRole)
  @Expose()
  role: UserRole;
}
