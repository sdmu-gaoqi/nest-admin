import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CommonService } from './common.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // 新增代码
import {
  MultiUploadDto,
  UploadDto,
  UploadJsonDto,
} from 'src/utils/dto/upload.dto';

const getFileExt = (fileName: string) => {
  const ext = fileName.split('.').at(-1) || '';
  return ext;
};

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  @ApiOperation({ summary: '单个文件上传' })
  @Post('upload')
  @ApiBody({ type: UploadDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'resources',
        filename: (req, file, cb) => {
          const randomName = Date.now();
          cb(null, `${randomName}.${getFileExt(file.originalname)}`);
        },
      }),
    }),
  )
  upload(@Body() body: UploadDto, @UploadedFile() file: any) {
    return this.commonService.upload(body);
  }

  @ApiOperation({ summary: '多文件上传' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: 'resources',
        filename: (req, file, cb) => {
          const randomName = Date.now();
          cb(null, `${randomName}.${getFileExt(file.originalname)}`);
        },
      }),
    }),
  )
  @Post('multi-upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MultiUploadDto })
  @ApiResponse({ type: MultiUploadDto, isArray: true })
  multiUpload(
    @Body() body: MultiUploadDto,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return this.commonService.upload(body);
  }

  @ApiOperation({ summary: 'JSON上传' })
  @Post('upload/json')
  uploadJson(@Body() body: UploadJsonDto) {
    return this.commonService.uploadJson(body);
  }
}
