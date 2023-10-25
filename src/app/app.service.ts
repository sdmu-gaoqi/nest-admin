import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getList() {
    return Array.from({ length: 10 }).map((_, index) => ({
      name: `app-${index + 1}`,
      id: index + 1,
    }));
  }
}
