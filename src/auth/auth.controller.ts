import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/utils/dto/auth.dto';
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
}
