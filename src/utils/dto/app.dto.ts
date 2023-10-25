import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAppDto {
  @IsNotEmpty({ message: '状态不能为空' })
  @ApiProperty({ example: 1, description: '状态' })
  readonly status;
}
