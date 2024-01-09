import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('账号相关')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
}
