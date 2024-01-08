import { Injectable } from '@nestjs/common';
import { UploadJsonDto } from './common.controller';
import * as fs from 'fs';
import * as COS from 'cos-nodejs-sdk-v5';

const cos = new COS({});

@Injectable()
export class CommonService {
  uploadJson(data: UploadJsonDto) {
    const fileName = `${data.fileName}.json`;
    const workingDirectory = 'work/frontend/dist/web/uploads';
    const filePath = `./src/files/${fileName}`;
    const file = fs.writeFileSync(filePath, JSON.stringify(data));
    cos.uploadFile(
      {
        FilePath: filePath,
        Bucket: '',
        Region: '',
        Key: '',
      },
      (err, data) => {
        console.log(err, data);
      },
    );

    // setTimeout(() => {
    //   fs.unlinkSync(filePath);
    // }, 3000);
  }
}
