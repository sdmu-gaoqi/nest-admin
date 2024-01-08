import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto, UpdateRoleDto } from 'src/utils/dto/role.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwtAuthGuard';
import UserInfo from 'src/decorators/userinfo';
import { User_Feature } from 'src/feature/user';

@Controller('role')
@ApiTags('角色管理')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}
  @ApiOperation({ summary: '创建角色' })
  @Post()
  createRole(@Body() body: RoleDto, @UserInfo() userInfo: User_Feature) {
    return this.roleService.create(body, userInfo);
  }

  @ApiOperation({ summary: '更新角色' })
  @Put()
  update(@Body() body: UpdateRoleDto, @UserInfo() userInfo: User_Feature) {
    return this.roleService.update(body.roleId, body, userInfo);
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.delete(Number(id));
  }
}
