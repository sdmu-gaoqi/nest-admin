import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegistDto } from 'src/utils/dto/auth.dto';
import { AuthService } from './auth.service';
import { setLoginCookie } from 'src/utils';

@ApiTags('账号相关')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: '登录接口' })
  @ApiBody({ type: LoginDto })
  async login(@Response() res, @Body() body: LoginDto) {
    const token = await this.authService.login(body);
    setLoginCookie(res, token);
    res.status(200).json({ ret: 0, msg: '', data: token });
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegistDto })
  register(@Body() body: RegistDto) {
    return this.authService.regist(body);
  }
}
