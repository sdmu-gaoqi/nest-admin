import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: '密码' })
  password: string;
}
