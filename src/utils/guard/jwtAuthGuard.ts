import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { noCheckAuth } from 'src/constants';

// 继承AuthGuard 修改内部实例
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
    return user;
  }

  getResponse(context) {
    const res = context.switchToHttp().getResponse();
    return res;
  }
}
