import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { noCheckAuth } from 'src/constants';
import { UserService } from 'src/user/user.service';

// 继承AuthGuard 修改内部实例
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }
  @Inject()
  reflector: Reflector;

  canActivate(context: ExecutionContext) {
    const notCheckAuth = this.reflector.get(noCheckAuth, context.getHandler());
    if (notCheckAuth) {
      return true;
    }
    // 正常情况全部走这里
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(401);
    }

    const nowDate = +new Date() / 1000;
    // token有效期剩余一天
    console.log(user, 'usera');
    if (user.exp - nowDate < 24 * 3600) {
      const token = this.authService.sign({
        userId: user.userId,
        userName: user.userName,
      });
    }

    return user;
  }
}
