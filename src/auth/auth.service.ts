import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/utils/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: { userName: string; userId: number }) {
    return this.jwtService.sign(user);
  }

  async login(data: LoginDto) {
    const user = await this.userService.login(data);
    if (user) {
      const token = this.createToken({
        userName: user.userName,
        userId: user.userId,
      });
      return token;
    }
    return user;
  }
}
