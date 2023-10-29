import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ListDto {
  @ApiProperty({ example: '1', description: '页码', required: false })
  @IsNotEmpty()
  current: number;

  @ApiProperty({ example: '10', description: '条数', required: false })
  @IsNotEmpty()
  size: number;
}
