import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegistDto } from 'src/utils/dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('账号相关')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: '登录接口' })
  @ApiBody({ type: LoginDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegistDto })
  register(@Body() body: RegistDto) {
    return this.authService.regist(body);
  }
}
