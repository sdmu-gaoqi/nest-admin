import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/utils/bcrypt';
import { RegistDto } from 'src/utils/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRedis() private redis: Redis,
  ) {}

  sign(user: { userName: string; userId: number }) {
    const token = this.jwtService.sign(user);
    this.redis.set(`${user.userId}-${user.userName}`, token, 'EX', 86400 * 7);
    return token;
  }

  redisToken(user: { userName: string; userId: number }) {
    if (!user) {
      return null;
    }
    const redisTokenKey = `${user.userId}-${user.userName}`;
    const redisTokenValue = this.redis.get(redisTokenKey);
    if (redisTokenValue) {
      return redisTokenValue;
    }
    return null;
  }

  async validateUser(userName: string, password: string): Promise<any> {
    return true;
    //   const user = await this.userService.findOneByUsername(userName);
    //   if (user && BcryptService.compare(password, user.password)) {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const { password, ...result } = user;
    //     return result;
    //   }
    //   return null;
    // }

    // async regist(data: RegistDto) {
    //   return this.userService.register(data);
    // }
  }
}
