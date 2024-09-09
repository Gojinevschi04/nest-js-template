import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class UserEmailDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @Expose()
  @IsEmail()
  email: string;
}
