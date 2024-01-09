import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator'; // 新增代码

export class UploadJsonDto {
  @ApiProperty({
    description: '内容',
    default: '',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '文件名', default: 'file' })
  @IsNotEmpty()
  fileName: string;

  @ApiPropertyOptional({ description: '文件地址', default: 'resources' })
  @IsOptional()
  path: string;
}

export class UploadDto {
  @ApiProperty({
    description: '文件',
    default: '',
    type: 'string',
    format: 'binary',
  })
  // @IsNotEmpty()
  file: any;

  @ApiPropertyOptional({ description: '文件地址', default: '/resources' })
  @IsOptional()
  path: string;
}

export class MultiUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  files: any[];

  @ApiPropertyOptional({ description: '文件地址', default: '/resources' })
  @IsOptional()
  path: string;
}
