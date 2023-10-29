import { ApiProperty } from '@nestjs/swagger';
import { ListDto } from './base.dto';

export class QueryStoreParams extends ListDto {
  @ApiProperty({ example: '', description: '品牌id集合', required: false })
  brandIds: number[];

  @ApiProperty({ description: '门店编号', required: false })
  storeKey?: string;

  @ApiProperty({ description: '门店名称', required: false })
  storeName?: string;
}
