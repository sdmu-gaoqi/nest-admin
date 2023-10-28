import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Feature } from 'src/feature/user';
import { LoginDto } from 'src/utils/dto/auth.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User_Feature)
    private userRepository: Repository<User_Feature>,
  ) {}
  async login(data: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
      userName: data.userName,
      password: data.password,
    });

    return findUser;
  }
}
