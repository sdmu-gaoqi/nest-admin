import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MultiUploadDto,
  UploadDto,
  UploadJsonDto,
} from 'src/utils/dto/upload.dto';
import * as fs from 'fs';
import * as COS from 'cos-nodejs-sdk-v5';

const cos = new COS({
  SecretId: '',
  SecretKey: '',
});

@Injectable()
export class CommonService {
  async upload(data: UploadDto | MultiUploadDto) {
    // console.log(data, 'data');
  }
  async uploadJson(data: UploadJsonDto) {
    const fileName = `${data.fileName}.json`;
    const workingDirectory = 'work/frontend/dist/web/uploads';
    const filePath = `${data.path}/${fileName}`;
    const file = fs.writeFileSync(filePath, JSON.stringify(data));
    try {
      const data = await cos.uploadFile({
        FilePath: filePath,
        Bucket: '',
        Region: '',
        Key: '',
      });
      return data;
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
