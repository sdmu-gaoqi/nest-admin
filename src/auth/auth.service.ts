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
  ) {}

  createToken(user: { userName: string; userId: number }) {
    return this.jwtService.sign(user);
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
    if (user && BcryptService.compare(data.password, user.password)) {
      const token = this.createToken({
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
