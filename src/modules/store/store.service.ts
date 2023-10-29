import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store_Feature } from 'src/feature/store';
import { QueryStoreParams } from 'src/utils/dto/store.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store_Feature)
    private storeRepository: Repository<Store_Feature>,
  ) {}
  async getStoreList(param: QueryStoreParams) {
    delete param.current;
    delete param.size;
    const [list, total] = await this.storeRepository.findAndCountBy(param);
    return {
      list,
      total,
    };
  }
}
