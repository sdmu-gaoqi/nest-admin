import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User_Feature } from 'src/feature/user';
import { BcryptService } from 'src/utils/bcrypt';
import { LoginDto, RegistDto } from 'src/utils/dto/auth.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private bcrypt: BcryptService,
    @InjectRepository(User_Feature)
    private userRepository: Repository<User_Feature>,
  ) {}
  async login(data: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
      userName: data.userName,
    });
    const nowDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.userRepository.update(findUser.userId, { lastLoginTime: nowDate });

    return findUser;
  }

  async register(data: RegistDto) {
    const result = await this.userRepository.save({
      ...data,
      createdBy: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedBy: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      admin: 0,
      status: 1,
      password: await BcryptService.hash(data.password),
    });
    return result;
  }
}
