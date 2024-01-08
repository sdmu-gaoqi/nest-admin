import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/utils/bcrypt';
import { LoginDto, RegistDto } from 'src/utils/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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
    const user = await this.userService.findOneByUsername(userName);
    if (user && BcryptService.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginDto) {
    const user = await this.userService.login(data);
    // 先从redis中取到token 取不到再去重新生成
    const rsToken = await this.redisToken(user);
    if (rsToken) {
      console.log(rsToken);
      return rsToken;
    }

    // 生成token时在redis中保存 有效期7天
    if (user && BcryptService.compare(data.password, user.password)) {
      const token = this.sign({
        userName: user.userName,
        userId: user.userId,
      });

      return token;
    }
    if (!user) {
      throw new HttpException('没有该用户', HttpStatus.BAD_REQUEST);
    }
    return null;
  }

  async regist(data: RegistDto) {
    return this.userService.register(data);
  }
}
