import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommonService } from './common.service';

export class UploadJsonDto {
  @ApiProperty({ description: '内容', default: '' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '文件名', default: 'file' })
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ description: '文件地址', default: '' })
  path: string;
}

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  @ApiOperation({ summary: '上传文件' })
  @Post('upload')
  upload(@Body() body) {
    return {};
  }

  @ApiOperation({ summary: 'JSON上传' })
  @Post('upload/json')
  uploadJson(@Body() body: UploadJsonDto) {
    return this.commonService.uploadJson(body);
  }
}
