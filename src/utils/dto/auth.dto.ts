import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', default: 'admin' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: '密码', default: '123456' })
  password: string;
}

export class RegistDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  password: string;
}
