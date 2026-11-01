import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class DeleteDto {
  @ApiProperty({
    description: 'The email of the user',
  })
  @MinLength(5)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The tenant of the user',
  })
  @MinLength(5)
  tenant: string;
}
