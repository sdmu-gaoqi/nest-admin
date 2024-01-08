import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Perm_Feature } from 'src/feature/perm';
import { Role_Feature } from 'src/feature/role';
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

    @InjectRepository(Role_Feature)
    private roleReepository: Repository<Role_Feature>,

    @InjectRepository(Role_Feature)
    private permRepositor: Repository<Perm_Feature>,
  ) {}

  async findOneByUsername(userName: string) {
    const user = await this.userRepository.findOneBy({ userName });
    return user;
  }

  async login(data: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
      userName: data.userName,
    });
    if (!findUser) {
      throw new BadRequestException('用户不存在');
    }
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

  async userInfo(user: User_Feature) {
    const findUser = await this.userRepository.findOne({
      where: {
        userId: user.userId,
      },
      relations: ['roles', 'roles.perms'],
    });

    return findUser;
  }
}
