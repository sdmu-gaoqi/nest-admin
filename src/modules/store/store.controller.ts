import { Controller, Get, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryStoreParams } from 'src/utils/dto/store.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwtAuthGuard';

@ApiTags('门店')
@Controller('store')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private storeService: StoreService) {}

  @ApiOperation({ summary: '门店列表' })
  @Get()
  @ApiQuery({ type: QueryStoreParams })
  storeList(@Query() param) {
    return this.storeService.getStoreList(param);
  }
}
