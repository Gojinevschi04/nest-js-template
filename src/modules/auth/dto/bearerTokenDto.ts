import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BearerTokenDto {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
