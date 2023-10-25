import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UpdateAppDto } from 'src/utils/dto/app.dto';

@ApiTags('应用接口')
@Controller('/app')
export class AppController {
  constructor(readonly service: AppService) {}

  @Get()
  @ApiOperation({ summary: '应用列表' })
  @ApiParam({ name: 'id', description: 'id', required: true, example: '1' })
  public list() {
    const list = this.service.getList();
    return list;
  }

  @Put(':id')
  @ApiOperation({ summary: '更新应用' })
  @ApiBody({ type: UpdateAppDto })
  public update(@Param() params, @Body() body: UpdateAppDto) {
    return params.id;
  }
}
