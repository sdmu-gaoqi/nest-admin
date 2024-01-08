import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegistDto } from 'src/utils/dto/auth.dto';
import UserInfo from 'src/decorators/userinfo';
import { User_Feature } from 'src/feature/user';
import { JwtAuthGuard } from 'src/utils/guard/jwtAuthGuard';
import { noCheckAuth } from 'src/constants';

@Controller('user')
@ApiTags('用户管理')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: '创建用户' })
  @Post()
  @SetMetadata(noCheckAuth, true)
  createUser(@Body() body: RegistDto) {
    return this.userService.register(body);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('')
  userInfo(@UserInfo() userInfo: User_Feature) {
    return this.userService.userInfo(userInfo);
  }
}
