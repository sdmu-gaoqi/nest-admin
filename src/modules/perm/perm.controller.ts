import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PermService } from './perm.service';
import { CreatePermDto } from 'src/utils/dto/perm.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwtAuthGuard';

@ApiTags('权限管理')
@UseGuards(JwtAuthGuard)
@Controller('perm')
export class PermController {
  constructor(private permService: PermService) {}
  @ApiOperation({ summary: '添加权限点' })
  @Post()
  create(@Body() body: CreatePermDto) {
    return this.permService.create(body);
  }

  @ApiOperation({ summary: '获取权限树' })
  @Get('tree')
  getTree() {
    return this.permService.getTree();
  }

  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.permService.delete(id);
  }
}
