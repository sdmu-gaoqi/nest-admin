import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants, userCookie } from '../constants';

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.signedCookies[userCookie]) {
    token = req.signedCookies[userCookie];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // 从cookie中获取token
      ignoreExpiration: false, // 是否忽视token过期的情况
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
