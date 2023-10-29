import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryStoreParams } from 'src/utils/dto/store.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('门店')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @ApiOperation({ summary: '门店列表' })
  @Get()
  @ApiQuery({ type: QueryStoreParams })
  @UseGuards(AuthGuard('jwt'))
  storeList(@Query() param) {
    return this.storeService.getStoreList(param);
  }
}
